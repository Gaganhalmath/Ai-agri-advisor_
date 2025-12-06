import React, { useState } from 'react';

// Hardcoded lists for dropdowns could be moved to constants or fetched from backend if available
const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CROPS = [
    "Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Pulses", "Oilseeds", "Soybean", "Groundnut"
];

const GovernmentSchemes: React.FC = () => {
    const [state, setState] = useState<string>("");
    const [crop, setCrop] = useState<string>("");
    const [schemes, setSchemes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSchemes = async () => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams();
            if (state) queryParams.append("state", state);
            if (crop) queryParams.append("crop", crop);

            const response = await fetch(`https://ai-agri-advisor.onrender.com/api/schemes?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error("Failed to fetch schemes");
            }
            const data = await response.json();
            setSchemes(data);
        } catch (err) {
            setError("Failed to load schemes. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchSchemes();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Government Schemes</h2>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Eligible Schemes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State</label>
                        <select
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">Select State</option>
                            {STATES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="crop" className="block text-gray-700 font-medium mb-2">Crop Type</label>
                        <select
                            id="crop"
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">Select Crop</option>
                            {CROPS.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className={`bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Checking...' : 'Check Eligibility'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Schemes {schemes.length > 0 && `(${schemes.length})`}</h3>

                {loading && <p className="text-center text-gray-500">Loading schemes...</p>}

                {error && (
                    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-6">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && schemes.length === 0 && (
                    <div className="text-center bg-gray-100 p-8 rounded-lg">
                        <p className="text-gray-600">No schemes found matching your criteria. Try adjusting your search filters.</p>
                    </div>
                )}

                <div className="grid gap-6">
                    {schemes.map((scheme, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md border-l-4 border-green-500 p-6 hover:shadow-lg transition duration-300">
                            <h4 className="text-xl font-bold text-green-700 mb-2">{scheme.title}</h4>
                            <p className="text-gray-700 mb-4">{scheme.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-md">
                                    <h5 className="font-semibold text-green-800 mb-1">Benefits</h5>
                                    <p className="text-sm text-gray-700">{scheme.benefits}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-md">
                                    <h5 className="font-semibold text-blue-800 mb-1">Eligibility</h5>
                                    <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <a
                                    href={scheme.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-primary-600 font-medium hover:text-primary-800 hover:underline"
                                >
                                    Apply Here →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GovernmentSchemes;
