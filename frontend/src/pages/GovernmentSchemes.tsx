import React from 'react';

const GovernmentSchemes: React.FC = () => {
    const schemes = [
        {
            title: "PM-KISAN",
            description: "Pradhan Mantri Kisan Samman Nidhi provides financial assistance to landholding farmer families.",
            eligibility: "Small and marginal farmer families with cultivable land",
            benefits: "₹6,000 per year in three equal installments",
            link: "#"
        },
        {
            title: "PMFBY",
            description: "Pradhan Mantri Fasal Bima Yojana provides insurance coverage for crop loss.",
            eligibility: "All farmers including sharecroppers and tenant farmers",
            benefits: "Premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops",
            link: "#"
        },
        {
            title: "NAIS",
            description: "National Agricultural Insurance Scheme provides coverage for food crops, oilseeds, and annual commercial crops.",
            eligibility: "All farmers growing notified crops in notified areas",
            benefits: "Comprehensive risk insurance against yield losses",
            link: "#"
        },
        {
            title: "SMAM",
            description: "Sub-Mission on Agricultural Mechanization promotes agricultural mechanization among small and marginal farmers.",
            eligibility: "Individual farmers, custom hiring centers, farmer groups",
            benefits: "Financial assistance for purchasing agricultural machinery",
            link: "#"
        },
        {
            title: "PKVY",
            description: "Paramparagat Krishi Vikas Yojana promotes organic farming practices.",
            eligibility: "Farmers willing to practice organic farming",
            benefits: "Financial assistance of ₹50,000 per hectare/3 years",
            link: "#"
        },
        {
            title: "NFSM",
            description: "National Food Security Mission increases production of rice, wheat, pulses, and coarse cereals.",
            eligibility: "Farmers in identified districts across the country",
            benefits: "Assistance for seeds, treatments, nutrient management etc.",
            link: "#"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Government Schemes</h2>

            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Eligible Schemes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2">State</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>Punjab</option>
                                <option>Maharashtra</option>
                                <option>Gujarat</option>
                                <option>Uttar Pradesh</option>
                                <option>Karnataka</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Crop Type</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>Wheat</option>
                                <option>Rice</option>
                                <option>Cotton</option>
                                <option>Sugarcane</option>
                                <option>Pulses</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                        Check Eligibility
                    </button>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Schemes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {schemes.map((scheme, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                            <h4 className="text-lg font-semibold text-primary-800 mb-2">{scheme.title}</h4>
                            <p className="text-gray-600 mb-4">{scheme.description}</p>
                            <div className="mb-4">
                                <h5 className="font-medium text-gray-800 mb-1">Eligibility</h5>
                                <p className="text-gray-600 text-sm">{scheme.eligibility}</p>
                            </div>
                            <div className="mb-4">
                                <h5 className="font-medium text-gray-800 mb-1">Benefits</h5>
                                <p className="text-gray-600 text-sm">{scheme.benefits}</p>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                                Learn more <i className="fas fa-arrow-right ml-2 text-xs"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GovernmentSchemes;
