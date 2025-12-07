import React, { useState, useEffect } from 'react';

interface Advisory {
    irrigation: string;
    protection: string;
    soil: string;
    fertilizer: string;
}

interface WeatherData {
    current: {
        temp: number;
        feelsLike: number;
        condition: string;
        humidity: number;
        wind: number;
        gusts: number;
        code: number; // Added for logic
    };
    forecast: { day: string; high: number; low: number; condition: string; code: number }[];
    alerts: string[];
    advisories: Advisory;
}

const WeatherAlerts: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pincode, setPincode] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [location, setLocation] = useState("");

    const getWeatherCondition = (code: number): string => {
        const codes: { [key: number]: string } = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Slight snow",
            73: "Moderate snow",
            75: "Heavy snow",
            95: "Thunderstorm",
        };
        return codes[code] || "Variable";
    };

    const generateAdvisories = (current: any, forecast: any[]): Advisory => {
        const isRainy = (code: number) => [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(code);
        const rainForecast = forecast.some(day => isRainy(day.code));

        let advisory: Advisory = {
            irrigation: "Schedule watering early morning to minimize evaporation.",
            protection: "Monitor for pests and diseases.",
            soil: "Monitor soil moisture levels.",
            fertilizer: "Conditions are suitable for application if soil moisture is adequate."
        };

        // Irrigation Logic
        if (isRainy(current.code) || rainForecast) {
            advisory.irrigation = "Rain is forecast. Suspend irrigation to avoid waterlogging and save water.";
        } else if (current.temp > 35) {
            advisory.irrigation = "High evaporation rates expected. Irrigate frequently, preferably in the evening.";
        }

        // Crop Protection
        if (current.wind > 20) {
            advisory.protection = "High winds expected. Secure young plants and loose structures.";
        } else if (current.temp < 10) {
            advisory.protection = "Risk of cold stress. Mulch to retain soil warmth.";
        } else if (current.temp > 38) {
            advisory.protection = "Heat stress likely. Use shade nets to protect sensitive crops.";
        }

        // Soil Health
        if (isRainy(current.code) || rainForecast) {
            advisory.soil = "Ensure proper drainage to prevent root rot due to excess moisture.";
        }

        // Fertilizer
        if (isRainy(current.code) || rainForecast || current.wind > 20) {
            advisory.fertilizer = "Delay fertilizer application. Rain/wind may cause runoff or uneven distribution.";
        }

        return advisory;
    };

    const fetchWeather = async (city: string, pin: string) => {
        setLoading(true);
        setError("");
        try {
            let lat, lon;

            // Geocoding using Nominatim
            const query = pin ? `${city} ${pin}` : city;
            const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1`
            );
            const geoData = await geoRes.json();

            if (!geoData || geoData.length === 0) {
                if (city.trim() && pin.trim()) {
                    throw new Error("Location not found. Please check if the City name and PIN code match.");
                }
                throw new Error("Location not found. Please try a different city or PIN code.");
            }

            let bestMatch = geoData[0];

            if (pin.trim()) {
                const cleanPin = pin.trim();
                const match = geoData.find((item: any) => {
                    const postalCode = item.address?.postcode;
                    // Check if postalCode exists and if it loosely matches (sometimes APIs return spaces or slightly different formats)
                    return postalCode && postalCode.replace(/\s/g, '') === cleanPin.replace(/\s/g, '');
                });

                if (match) {
                    bestMatch = match;
                } else {
                    // We found results (e.g. for the city), but NONE matched the PIN.
                    // This is the specific "City/PIN Mismatch" case that was previously being hidden.
                    throw new Error("Location not found. Please check if the City name and PIN code match.");
                }
            }

            lat = bestMatch.lat;
            lon = bestMatch.lon;

            // Extract detailed location info
            const address = bestMatch.address;
            const placeName = address.city || address.town || address.village || address.hamlet || address.suburb || bestMatch.display_name.split(",")[0];
            const taluk = address.taluk || address.subdistrict || address.county || "";
            const district = address.district || address.state_district || "";
            const state = address.state || "";

            // Construct display string
            let locationParts = [placeName];
            if (taluk && taluk !== placeName) locationParts.push(taluk);
            if (district && district !== taluk) locationParts.push(district);
            if (state) locationParts.push(state);

            setLocation(locationParts.join(", "));

            // Weather Data using Open-Meteo
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
            );
            const weatherData = await weatherRes.json();

            if (weatherData.error) {
                throw new Error("Failed to fetch weather data.");
            }

            // Map API response to our WeatherData interface
            const current = weatherData.current_weather;
            const daily = weatherData.daily;

            const forecast = daily.time.slice(0, 5).map((date: string, index: number) => ({
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                high: Math.round(daily.temperature_2m_max[index]),
                low: Math.round(daily.temperature_2m_min[index]),
                condition: getWeatherCondition(daily.weathercode[index]),
                code: daily.weathercode[index]
            }));

            // Default to local logic first (instant)
            let advisory = generateAdvisories({ ...current, code: current.weathercode }, forecast);

            // Try to get AI-powered advice
            try {
                const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/farming-advisory`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        weather: {
                            current: { ...current, condition: getWeatherCondition(current.weathercode) },
                            forecast: forecast
                        }
                    })
                });

                if (apiResponse.ok) {
                    const aiAdvisory = await apiResponse.json();
                    // Validate keys exist before replacing
                    if (aiAdvisory.irrigation && aiAdvisory.protection) {
                        advisory = aiAdvisory;
                    }
                }
            } catch (e) {
                console.log("AI Advisory failed, using local fallback:", e);
                // Silent failure, falls back to local 'advisory' variable
            }

            setWeather({
                current: {
                    temp: Math.round(current.temperature),
                    feelsLike: Math.round(current.temperature), // OpenMeteo basic doesn't give feels_like freely easily, approximating
                    condition: getWeatherCondition(current.weathercode),
                    humidity: 60, // Placeholder as basic OpenMeteo current_weather doesn't have humidity
                    wind: Math.round(current.windspeed),
                    gusts: Math.round(current.windspeed * 1.2), // Estimate
                    code: current.weathercode
                },
                forecast,
                alerts: [], // OpenMeteo requires separate endpoint for alerts or parsing, leaving empty for now or mocking if needed
                advisories: advisory
            });

            // Simulate alerts based on conditions for demo
            const simulatedAlerts: string[] = [];
            if (current.temperature > 35) simulatedAlerts.push("Heatwave warning: Ensure proper irrigation.");
            if (current.windspeed > 20) simulatedAlerts.push("High winds: Secure loose structures.");
            if (current.weathercode >= 95) simulatedAlerts.push("Thunderstorm alert: Avoid open fields.");

            setWeather(prev => prev ? { ...prev, alerts: simulatedAlerts } : null);

        } catch (err: any) {
            setError(err.message || "An error occurred while fetching data.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather("New Delhi", "");
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim() || pincode.trim()) {
            fetchWeather(searchTerm, pincode);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Weather Alerts & Forecast</h2>

            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="flex gap-2 flex-col md:flex-row">
                            <input
                                type="text"
                                placeholder="City or Village Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                            />
                            <input
                                type="text"
                                placeholder="PIN Code (Optional)"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="w-full md:w-48 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <i className="fas fa-search"></i>
                                )}
                                Search
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                    </div>

                    {weather && (
                        <>
                            <div className="flex items-center justify-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                    {location}
                                </h3>
                            </div>

                            {/* Current Weather Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Temperature Card */}
                                <div className="bg-primary-50 p-4 rounded-lg transform transition hover:scale-105 duration-300">
                                    <h4 className="font-semibold text-gray-800 mb-2">Temperature</h4>
                                    <div className="text-4xl font-bold text-primary-600">{weather.current.temp}°C</div>
                                    <div className="text-gray-600">Feels like {weather.current.feelsLike}°C</div>
                                    <div className="text-sm text-gray-500 mt-1">{weather.current.condition}</div>
                                </div>

                                {/* Humidity Card */}
                                <div className="bg-primary-50 p-4 rounded-lg transform transition hover:scale-105 duration-300">
                                    <h4 className="font-semibold text-gray-800 mb-2">Humidity</h4>
                                    <div className="text-4xl font-bold text-primary-600">{weather.current.humidity}%</div>
                                    <div className="text-gray-600">Relative humidity</div>
                                </div>

                                {/* Wind Card */}
                                <div className="bg-primary-50 p-4 rounded-lg transform transition hover:scale-105 duration-300">
                                    <h4 className="font-semibold text-gray-800 mb-2">Wind</h4>
                                    <div className="text-4xl font-bold text-primary-600">{weather.current.wind} <span className="text-xl">km/h</span></div>
                                    <div className="text-gray-600">Gusts: {weather.current.gusts} km/h</div>
                                </div>
                            </div>

                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">5-Day Forecast</h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                                {weather.forecast.map((day, index) => (
                                    <div key={index} className="bg-gray-100 p-3 rounded-lg text-center hover:bg-gray-200 transition-colors">
                                        <div className="font-medium text-gray-800">{day.day}</div>
                                        <div className="text-2xl font-bold text-primary-600">{day.high}°</div>
                                        <div className="text-gray-600 text-sm">{day.low}°</div>
                                        <div className="text-gray-600 text-sm mt-1">{day.condition}</div>
                                    </div>
                                ))}
                            </div>

                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Farming Alerts</h4>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                {weather.alerts.map((alert, index) => (
                                    <div key={index} className="flex items-start mb-2 last:mb-0">
                                        <div className="mr-3 text-yellow-500 mt-1">
                                            <i className="fas fa-exclamation-triangle"></i>
                                        </div>
                                        <div className="text-yellow-800 font-medium">
                                            <p>{alert}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Weather Advisory</h3>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="prose max-w-none text-gray-700">
                        <p className="text-gray-600 italic mb-4">Based on the current weather conditions, here are some recommendations:</p>
                        {weather && (
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="bg-blue-100 text-blue-600 p-2 rounded-full text-xs mt-1">
                                        <i className="fas fa-water"></i>
                                    </span>
                                    <div>
                                        <strong className="text-gray-900 block">Irrigation</strong>
                                        <span className="text-gray-600">{weather.advisories.irrigation}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-green-100 text-green-600 p-2 rounded-full text-xs mt-1">
                                        <i className="fas fa-leaf"></i>
                                    </span>
                                    <div>
                                        <strong className="text-gray-900 block">Crop Protection</strong>
                                        <span className="text-gray-600">{weather.advisories.protection}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-amber-100 text-amber-600 p-2 rounded-full text-xs mt-1">
                                        <i className="fas fa-layer-group"></i>
                                    </span>
                                    <div>
                                        <strong className="text-gray-900 block">Soil Health</strong>
                                        <span className="text-gray-600">{weather.advisories.soil}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-purple-100 text-purple-600 p-2 rounded-full text-xs mt-1">
                                        <i className="fas fa-fill-drip"></i>
                                    </span>
                                    <div>
                                        <strong className="text-gray-900 block">Fertilizer</strong>
                                        <span className="text-gray-600">{weather.advisories.fertilizer}</span>
                                    </div>
                                </li>
                            </ul>
                        )}
                        {!weather && <p>Search for a location to view farming recommendations.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherAlerts;
