import React, { useState } from 'react';

interface Recommendation {
    name: string;
    dosage: string;
    timing: string;
    target?: string;
}

interface CropData {
    fertilizers: Recommendation[];
    pesticides: Recommendation[];
}

const FertilizersPesticides: React.FC = () => {
    const [selectedCrop, setSelectedCrop] = useState<string>("Wheat");

    const recommendations: Record<string, CropData> = {
        "Wheat": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "At sowing and during tillering stage" },
                { name: "DAP", dosage: "120 kg/ha", timing: "Basal application at sowing" },
                { name: "MOP", dosage: "60 kg/ha", timing: "At sowing" }
            ],
            pesticides: [
                { name: "Chlorpyriphos", target: "Termites", dosage: "4 L/ha", timing: "Soil treatment before sowing" },
                { name: "Mancozeb", target: "Leaf rust", dosage: "2.5 g/L", timing: "At first appearance of disease" }
            ]
        },
        "Rice": {
            fertilizers: [
                { name: "Urea", dosage: "150 kg/ha", timing: "Split application: basal, tillering, panicle initiation" },
                { name: "SSP", dosage: "250 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "80 kg/ha", timing: "Split application" }
            ],
            pesticides: [
                { name: "Carbofuran", target: "Stem borer", dosage: "1 kg/ha", timing: "At transplanting" },
                { name: "Tricyclazole", target: "Blast disease", dosage: "1 g/L", timing: "Preventive spray" }
            ]
        },
        "Cotton": {
            fertilizers: [
                { name: "Urea", dosage: "200 kg/ha", timing: "Split application" },
                { name: "DAP", dosage: "150 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "100 kg/ha", timing: "Split application" }
            ],
            pesticides: [
                { name: "Acephate", target: "Bollworms", dosage: "1.5 g/L", timing: "At first appearance" },
                { name: "Dicofol", target: "Mites", dosage: "2.5 mL/L", timing: "When infestation noticed" }
            ]
        }
    };

    const currentData = recommendations[selectedCrop] || recommendations["Wheat"];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fertilizers & Pesticides</h2>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Crop-Specific Recommendations</h3>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Select Crop</label>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(recommendations).map(crop => (
                                <button
                                    key={crop}
                                    onClick={() => setSelectedCrop(crop)}
                                    className={`px-4 py-2 rounded-full ${selectedCrop === crop ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                >
                                    {crop}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Fertilizer Recommendations</h4>
                            <div className="space-y-4">
                                {currentData.fertilizers.map((item, index) => (
                                    <div key={index} className="bg-primary-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-primary-800">{item.name}</h5>
                                        <div className="text-sm text-gray-700 mt-2">
                                            <div><span className="font-medium">Dosage:</span> {item.dosage}</div>
                                            <div><span className="font-medium">Timing:</span> {item.timing}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Pesticide Recommendations</h4>
                            <div className="space-y-4">
                                {currentData.pesticides.map((item, index) => (
                                    <div key={index} className="bg-green-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-green-800">{item.name}</h5>
                                        <div className="text-sm text-gray-700 mt-2">
                                            <div><span className="font-medium">Target:</span> {item.target}</div>
                                            <div><span className="font-medium">Dosage:</span> {item.dosage}</div>
                                            <div><span className="font-medium">Timing:</span> {item.timing}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">General Guidelines</h3>
                    <div className="prose max-w-none">
                        <ul className="list-disc pl-5">
                            <li>Always conduct soil testing before fertilizer application</li>
                            <li>Follow recommended dosage to avoid soil degradation</li>
                            <li>Use protective gear when handling pesticides</li>
                            <li>Follow the recommended waiting period after pesticide application before harvest</li>
                            <li>Consider integrated pest management (IPM) approaches for sustainable farming</li>
                            <li>Rotate pesticides to prevent resistance development in pests</li>
                            <li>Store fertilizers and pesticides in their original containers away from children and animals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FertilizersPesticides;
