import React, { useState } from 'react';

interface WeatherData {
    current: { temp: number; condition: string; humidity: number; wind: number };
    forecast: { day: string; high: number; low: number; condition: string }[];
    alerts: string[];
}

const WeatherAlerts: React.FC = () => {
    const [location, setLocation] = useState<string>("Punjab");

    const weatherData: Record<string, WeatherData> = {
        "Punjab": {
            current: { temp: 28, condition: "Partly Cloudy", humidity: 65, wind: 12 },
            forecast: [
                { day: "Today", high: 30, low: 22, condition: "Partly Cloudy" },
                { day: "Tomorrow", high: 29, low: 21, condition: "Sunny" },
                { day: "Day 3", high: 31, low: 23, condition: "Clear" },
                { day: "Day 4", high: 27, low: 20, condition: "Light Rain" },
                { day: "Day 5", high: 26, low: 19, condition: "Rain" }
            ],
            alerts: ["Light rainfall expected in 3 days. Prepare drainage systems."]
        },
        "Maharashtra": {
            current: { temp: 32, condition: "Sunny", humidity: 55, wind: 8 },
            forecast: [
                { day: "Today", high: 32, low: 24, condition: "Sunny" },
                { day: "Tomorrow", high: 33, low: 25, condition: "Sunny" },
                { day: "Day 3", high: 34, low: 25, condition: "Clear" },
                { day: "Day 4", high: 33, low: 24, condition: "Partly Cloudy" },
                { day: "Day 5", high: 32, low: 24, condition: "Partly Cloudy" }
            ],
            alerts: ["High temperatures expected. Ensure proper irrigation."]
        },
        "Gujarat": {
            current: { temp: 35, condition: "Clear", humidity: 45, wind: 10 },
            forecast: [
                { day: "Today", high: 35, low: 26, condition: "Clear" },
                { day: "Tomorrow", high: 36, low: 27, condition: "Sunny" },
                { day: "Day 3", high: 37, low: 27, condition: "Sunny" },
                { day: "Day 4", high: 36, low: 26, condition: "Clear" },
                { day: "Day 5", high: 35, low: 25, condition: "Clear" }
            ],
            alerts: ["Heatwave warning. Protect crops with shade nets if possible."]
        }
    };

    const currentData = weatherData[location] || weatherData["Punjab"];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Weather Alerts & Forecast</h2>

            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Select Your Region</h3>
                        <div className="flex space-x-2">
                            {Object.keys(weatherData).map(region => (
                                <button
                                    key={region}
                                    onClick={() => setLocation(region)}
                                    className={`px-4 py-2 rounded-full ${location === region ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-primary-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">Current Weather</h4>
                            <div className="text-4xl font-bold text-primary-600">{currentData.current.temp}°C</div>
                            <div className="text-gray-600">{currentData.current.condition}</div>
                        </div>
                        <div className="bg-primary-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">Humidity</h4>
                            <div className="text-4xl font-bold text-primary-600">{currentData.current.humidity}%</div>
                            <div className="text-gray-600">Relative humidity</div>
                        </div>
                        <div className="bg-primary-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">Wind Speed</h4>
                            <div className="text-4xl font-bold text-primary-600">{currentData.current.wind} km/h</div>
                            <div className="text-gray-600">Wind speed</div>
                        </div>
                    </div>

                    <h4 className="font-semibold text-gray-800 mb-4">5-Day Forecast</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {currentData.forecast.map((day, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
                                <div className="font-medium text-gray-800">{day.day}</div>
                                <div className="text-2xl font-bold text-primary-600">{day.high}°</div>
                                <div className="text-gray-600 text-sm">{day.low}°</div>
                                <div className="text-gray-600 text-sm mt-1">{day.condition}</div>
                            </div>
                        ))}
                    </div>

                    <h4 className="font-semibold text-gray-800 mb-4">Weather Alerts</h4>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        {currentData.alerts.map((alert, index) => (
                            <div key={index} className="flex">
                                <div className="mr-3 text-yellow-400">
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <div className="text-yellow-700">
                                    <p>{alert}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Weather Advisory</h3>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="prose max-w-none">
                        <p>Based on the current weather conditions and forecast, here are some recommendations for your farming activities:</p>
                        <ul className="list-disc pl-5 mt-3">
                            <li>Schedule irrigation during early morning or late evening to reduce water evaporation</li>
                            <li>Consider using shade nets for sensitive crops during peak sunlight hours</li>
                            <li>Monitor soil moisture levels regularly and adjust irrigation accordingly</li>
                            <li>Prepare drainage systems in case of predicted rainfall</li>
                            <li>Delay application of fertilizers if heavy rain is expected within 24 hours</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherAlerts;
