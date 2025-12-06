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
                { name: "MOP", dosage: "60 kg/ha", timing: "At sowing" },
                { name: "SSP", dosage: "150 kg/ha", timing: "Basal application" }
            ],
            pesticides: [
                { name: "Chlorpyriphos", target: "Termites", dosage: "4 L/ha", timing: "Soil treatment before sowing" },
                { name: "Mancozeb", target: "Leaf rust", dosage: "2.5 g/L", timing: "At first appearance of disease" },
                { name: "Propiconazole", target: "Rust & blight", dosage: "1 mL/L", timing: "Early disease stage" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "At pest incidence" }
            ]
        },
        "Rice": {
            fertilizers: [
                { name: "Urea", dosage: "150 kg/ha", timing: "Basal, tillering, panicle initiation" },
                { name: "SSP", dosage: "250 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "80 kg/ha", timing: "Split application" },
                { name: "Zinc Sulphate", dosage: "25 kg/ha", timing: "At transplanting" }
            ],
            pesticides: [
                { name: "Carbofuran", target: "Stem borer", dosage: "1 kg/ha", timing: "At transplanting" },
                { name: "Tricyclazole", target: "Blast disease", dosage: "1 g/L", timing: "Preventive spray" },
                { name: "Chlorantraniliprole", target: "Leaf folder", dosage: "0.3 mL/L", timing: "At pest appearance" },
                { name: "Hexaconazole", target: "Sheath blight", dosage: "2 mL/L", timing: "At early infection" }
            ]
        },
        "Maize": {
            fertilizers: [
                { name: "Urea", dosage: "120 kg/ha", timing: "Basal and knee-high stage" },
                { name: "DAP", dosage: "100 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "40 kg/ha", timing: "Before tasseling" },
                { name: "Zinc Sulphate", dosage: "20 kg/ha", timing: "Basal or early growth" }
            ],
            pesticides: [
                { name: "Chlorantraniliprole", target: "Fall armyworm", dosage: "0.4 mL/L", timing: "At early infestation" },
                { name: "Lambda-cyhalothrin", target: "Stem borers", dosage: "1 mL/L", timing: "At light pest attack" },
                { name: "Mancozeb", target: "Leaf blight", dosage: "2.5 g/L", timing: "At first symptoms" },
                { name: "Carbendazim", target: "Root rot", dosage: "1 g/L", timing: "Seed treatment" }
            ]
        },
        "Cotton": {
            fertilizers: [
                { name: "Urea", dosage: "200 kg/ha", timing: "Split application" },
                { name: "DAP", dosage: "150 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "100 kg/ha", timing: "Split application" },
                { name: "Magnesium Sulphate", dosage: "25 kg/ha", timing: "At flowering" }
            ],
            pesticides: [
                { name: "Acephate", target: "Bollworms", dosage: "1.5 g/L", timing: "At first appearance" },
                { name: "Dicofol", target: "Mites", dosage: "2.5 mL/L", timing: "On infestation" },
                { name: "Imidacloprid", target: "Whiteflies", dosage: "1 mL/L", timing: "Early incidence" },
                { name: "Spinosad", target: "Helicoverpa", dosage: "0.3 mL/L", timing: "During boll formation" }
            ]
        },
        "Sugarcane": {
            fertilizers: [
                { name: "Urea", dosage: "250 kg/ha", timing: "Tillering and grand growth stage" },
                { name: "DAP", dosage: "125 kg/ha", timing: "Basal application" },
                { name: "MOP", dosage: "120 kg/ha", timing: "At elongation stage" },
                { name: "Gypsum", dosage: "500 kg/ha", timing: "Improves soil sulphur" }
            ],
            pesticides: [
                { name: "Chlorpyriphos", target: "Early shoot borer", dosage: "4 L/ha", timing: "At 45 days" },
                { name: "Fipronil", target: "Termites", dosage: "1 L/ha", timing: "Before planting" },
                { name: "Carbendazim", target: "Red rot", dosage: "1 g/L", timing: "Seed set treatment" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "At infestation" }
            ]
        },
        "Pulses": {
            fertilizers: [
                { name: "DAP", dosage: "100 kg/ha", timing: "Basal application" },
                { name: "Urea", dosage: "25 kg/ha", timing: "Early vegetative stage only" },
                { name: "SSP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "Rhizobium Culture", dosage: "200 g/acre", timing: "Seed treatment" }
            ],
            pesticides: [
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "At pest appearance" },
                { name: "Chlorantraniliprole", target: "Pod borer", dosage: "0.4 mL/L", timing: "Flowering stage" },
                { name: "Carbendazim", target: "Root rot", dosage: "1 g/L", timing: "Seed treatment" },
                { name: "Mancozeb", target: "Leaf spot", dosage: "2.5 g/L", timing: "At first symptoms" }
            ]
        },
        "Oilseeds": {
            fertilizers: [
                { name: "SSP", dosage: "200 kg/ha", timing: "Basal application" },
                { name: "Urea", dosage: "30–40 kg/ha", timing: "Early stage" },
                { name: "MOP", dosage: "40 kg/ha", timing: "Flowering" },
                { name: "Boron", dosage: "10 kg/ha", timing: "Improves seed setting" }
            ],
            pesticides: [
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "Early infestation" },
                { name: "Chlorpyriphos", target: "Soil pests", dosage: "4 L/ha", timing: "Before sowing" },
                { name: "Mancozeb", target: "Leaf blight", dosage: "2.5 g/L", timing: "When symptoms appear" },
                { name: "Triazophos", target: "Leaf miner", dosage: "2 mL/L", timing: "At pest incidence" }
            ]
        },
        "Soybean": {
            fertilizers: [
                { name: "SSP", dosage: "250 kg/ha", timing: "Basal application" },
                { name: "Urea", dosage: "20–25 kg/ha", timing: "Early vegetative stage" },
                { name: "Potash", dosage: "40 kg/ha", timing: "Before flowering" },
                { name: "Rhizobium Inoculant", dosage: "200 g/acre", timing: "Seed treatment" }
            ],
            pesticides: [
                { name: "Chlorantraniliprole", target: "Girdle beetle", dosage: "0.4 mL/L", timing: "At early attack" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "At first signs" },
                { name: "Mancozeb", target: "Rust", dosage: "2.5 g/L", timing: "At first yellow spots" },
                { name: "Hexaconazole", target: "Anthracnose", dosage: "1 mL/L", timing: "On symptom appearance" }
            ]
        },
        "Groundnut": {
            fertilizers: [
                { name: "Gypsum", dosage: "500 kg/ha", timing: "At flowering" },
                { name: "SSP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "40 kg/ha", timing: "Before pegging" },
                { name: "Boron", dosage: "10 kg/ha", timing: "Improves kernel quality" }
            ],
            pesticides: [
                { name: "Chlorpyriphos", target: "White grubs", dosage: "4 L/ha", timing: "Before sowing" },
                { name: "Hexaconazole", target: "Leaf spot", dosage: "1 mL/L", timing: "At infection" },
                { name: "Mancozeb", target: "Rust", dosage: "2.5 g/L", timing: "When spots appear" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "Early infestation" }
            ]
        },
        "Jowar": {
            fertilizers: [
                { name: "Urea", dosage: "80 kg/ha", timing: "Basal & knee-high stage" },
                { name: "DAP", dosage: "60 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "40 kg/ha", timing: "Before flowering" },
                { name: "Zinc Sulphate", dosage: "20 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Chlorantraniliprole", target: "Stem borer", dosage: "0.4 mL/L", timing: "At incidence" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "Early pest signs" },
                { name: "Mancozeb", target: "Leaf blight", dosage: "2.5 g/L", timing: "At first appearance" },
                { name: "Propiconazole", target: "Rust", dosage: "1 mL/L", timing: "At infection" }
            ]
        },
        "Bajra": {
            fertilizers: [
                { name: "Urea", dosage: "80 kg/ha", timing: "Split application" },
                { name: "DAP", dosage: "60 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "30 kg/ha", timing: "Before flowering" },
                { name: "Zinc Sulphate", dosage: "10 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Chlorantraniliprole", target: "Shoot fly", dosage: "0.4 mL/L", timing: "At pest incidence" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "Early signs" },
                { name: "Mancozeb", target: "Downy mildew", dosage: "2.5 g/L", timing: "At symptom onset" },
                { name: "Deltamethrin", target: "Earhead caterpillar", dosage: "1 mL/L", timing: "At flowering stage" }
            ]
        },
        "Ragi": {
            fertilizers: [
                { name: "Urea", dosage: "60 kg/ha", timing: "Tillering stage" },
                { name: "DAP", dosage: "50 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "40 kg/ha", timing: "Before panicle initiation" },
                { name: "Zinc Sulphate", dosage: "10 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Mancozeb", target: "Leaf spot", dosage: "2.5 g/L", timing: "At early stage" },
                { name: "Carbendazim", target: "Blast disease", dosage: "1 g/L", timing: "At first appearance" },
                { name: "Imidacloprid", target: "Stem borers", dosage: "0.5 mL/L", timing: "At pest incidence" },
                { name: "Chlorpyriphos", target: "Cutworms", dosage: "4 L/ha", timing: "Pre-planting" }
            ]
        },
        "Jute": {
            fertilizers: [
                { name: "Urea", dosage: "80 kg/ha", timing: "Split application" },
                { name: "SSP", dosage: "100 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "40 kg/ha", timing: "Early vegetative stage" },
                { name: "Zinc Sulphate", dosage: "10 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Carbendazim", target: "Stem rot", dosage: "1 g/L", timing: "Seed treatment" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "Early infestation" },
                { name: "Chlorpyriphos", target: "Hairy caterpillar", dosage: "4 L/ha", timing: "At attack" },
                { name: "Mancozeb", target: "Leaf spot", dosage: "2.5 g/L", timing: "First appearance" }
            ]
        },
        "Tea": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "Split dose" },
                { name: "SSP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "50 kg/ha", timing: "Growth stage" },
                { name: "Zinc Sulphate", dosage: "20 kg/ha", timing: "Annually" }
            ],
            pesticides: [
                { name: "Imidacloprid", target: "Tea mosquito bug", dosage: "0.5 mL/L", timing: "At early attack" },
                { name: "Hexaconazole", target: "Blister blight", dosage: "2 mL/L", timing: "Preventive spray" },
                { name: "Chlorpyriphos", target: "Termites", dosage: "4 L/ha", timing: "Soil application" },
                { name: "Flubendiamide", target: "Looper caterpillars", dosage: "0.3 mL/L", timing: "Early stage" }
            ]
        },
        "Coffee": {
            fertilizers: [
                { name: "NPK 15:15:15", dosage: "200 kg/ha", timing: "Pre-monsoon" },
                { name: "Urea", dosage: "50 kg/ha", timing: "Post-monsoon" },
                { name: "Rock Phosphate", dosage: "150 kg/ha", timing: "Annually" },
                { name: "MOP", dosage: "40 kg/ha", timing: "During fruit setting" }
            ],
            pesticides: [
                { name: "Chlorpyriphos", target: "Stem borer", dosage: "4 mL/L", timing: "At pruning" },
                { name: "Copper Oxychloride", target: "Rust", dosage: "3 g/L", timing: "At first signs" },
                { name: "Hexaconazole", target: "Black rot", dosage: "2 mL/L", timing: "Early infection" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "During new growth" }
            ]
        },
        "Potato": {
            fertilizers: [
                { name: "Urea", dosage: "120 kg/ha", timing: "Split application" },
                { name: "DAP", dosage: "100 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "100 kg/ha", timing: "Tuber development" },
                { name: "Zinc Sulphate", dosage: "25 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Mancozeb", target: "Late blight", dosage: "2.5 g/L", timing: "Preventive spray" },
                { name: "Metalaxyl", target: "Early blight", dosage: "1.5 g/L", timing: "Initial symptoms" },
                { name: "Imidacloprid", target: "Aphids", dosage: "0.5 mL/L", timing: "As needed" },
                { name: "Chlorpyriphos", target: "Cutworms", dosage: "4 L/ha", timing: "Soil treatment" }
            ]
        },
        "Onion": {
            fertilizers: [
                { name: "Urea", dosage: "90 kg/ha", timing: "Early vegetative stage" },
                { name: "DAP", dosage: "100 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "80 kg/ha", timing: "Bulb formation" },
                { name: "Zinc Sulphate", dosage: "25 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Mancozeb", target: "Purple blotch", dosage: "2.5 g/L", timing: "At symptoms" },
                { name: "Chlorpyriphos", target: "Thrips", dosage: "1 mL/L", timing: "Early attack" },
                { name: "Carbendazim", target: "Basal rot", dosage: "1 g/L", timing: "Seed treatment" },
                { name: "Lambda-cyhalothrin", target: "Onion maggot", dosage: "1 mL/L", timing: "At infestation" }
            ]
        },
        "Tomato": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "Split application" },
                { name: "DAP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "80 kg/ha", timing: "Flowering & fruiting" },
                { name: "Calcium Nitrate", dosage: "50 kg/ha", timing: "Fruit firmness improvement" }
            ],
            pesticides: [
                { name: "Mancozeb", target: "Early blight", dosage: "2.5 g/L", timing: "Early symptoms" },
                { name: "Chlorantraniliprole", target: "Fruit borer", dosage: "0.4 mL/L", timing: "At fruiting" },
                { name: "Imidacloprid", target: "Whiteflies", dosage: "0.5 mL/L", timing: "At pest appearance" },
                { name: "Copper Oxychloride", target: "Bacterial wilt", dosage: "3 g/L", timing: "Preventive" }
            ]
        },
        "Grapes": {
            fertilizers: [
                { name: "Urea", dosage: "80 kg/ha", timing: "Early growth" },
                { name: "DAP", dosage: "120 kg/ha", timing: "Basal" },
                { name: "SOP (Sulphate of Potash)", dosage: "75 kg/ha", timing: "Fruit growth" },
                { name: "Calcium Nitrate", dosage: "40 kg/ha", timing: "Berry strength" }
            ],
            pesticides: [
                { name: "Copper Oxychloride", target: "Downy mildew", dosage: "3 g/L", timing: "Preventive spray" },
                { name: "Sulphur", target: "Powdery mildew", dosage: "2 g/L", timing: "During early season" },
                { name: "Imidacloprid", target: "Leafhoppers", dosage: "0.5 mL/L", timing: "At appearance" },
                { name: "Chlorantraniliprole", target: "Thrips", dosage: "0.4 mL/L", timing: "At fruit set" }
            ]
        },
        "Apple": {
            fertilizers: [
                { name: "Urea", dosage: "80 kg/ha", timing: "Spring flush" },
                { name: "DAP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "100 kg/ha", timing: "Fruit set stage" },
                { name: "Farmyard Manure", dosage: "40 tons/ha", timing: "Winter application" }
            ],
            pesticides: [
                { name: "Copper Oxychloride", target: "Scab", dosage: "3 g/L", timing: "Pre-bloom" },
                { name: "Chlorpyriphos", target: "Stem borers", dosage: "4 L/ha", timing: "At appearance" },
                { name: "Sulphur", target: "Powdery mildew", dosage: "2 g/L", timing: "Early season" },
                { name: "Carbendazim", target: "Die-back", dosage: "1 g/L", timing: "At infection" }
            ]
        },
        "Mango": {
            fertilizers: [
                { name: "Urea", dosage: "250 g/tree", timing: "Vegetative flush" },
                { name: "SSP", dosage: "1 kg/tree", timing: "Basal" },
                { name: "MOP", dosage: "500 g/tree", timing: "Fruit development" },
                { name: "FYM", dosage: "40 kg/tree", timing: "Winter" }
            ],
            pesticides: [
                { name: "Carbaryl", target: "Fruit fly", dosage: "2 g/L", timing: "Before ripening" },
                { name: "Copper Oxychloride", target: "Anthracnose", dosage: "3 g/L", timing: "Pre-bloom" },
                { name: "Imidacloprid", target: "Hoppers", dosage: "0.5 mL/L", timing: "At pest incidence" },
                { name: "Wettable Sulphur", target: "Powdery mildew", dosage: "2 g/L", timing: "At flowering" }
            ]
        },
        "Turmeric": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "Split during growth" },
                { name: "SSP", dosage: "200 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "100 kg/ha", timing: "Rhizome formation" },
                { name: "Zinc Sulphate", dosage: "20 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Mancozeb", target: "Leaf spot", dosage: "2.5 g/L", timing: "At early stage" },
                { name: "Carbendazim", target: "Rhizome rot", dosage: "1 g/L", timing: "Soil drench" },
                { name: "Chlorpyriphos", target: "Shoot borer", dosage: "1 mL/L", timing: "At appearance" },
                { name: "Neem Oil", target: "General pests", dosage: "3 mL/L", timing: "Weekly spray" }
            ]
        },
        "Ginger": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "Split application" },
                { name: "SSP", dosage: "150 kg/ha", timing: "Basal" },
                { name: "MOP", dosage: "90 kg/ha", timing: "During rhizome swelling" },
                { name: "Zinc Sulphate", dosage: "25 kg/ha", timing: "Basal" }
            ],
            pesticides: [
                { name: "Carbendazim", target: "Rhizome rot", dosage: "1 g/L", timing: "Soil drench" },
                { name: "Mancozeb", target: "Leaf spot", dosage: "2.5 g/L", timing: "At early symptoms" },
                { name: "Chlorpyriphos", target: "Rhizome fly", dosage: "1 mL/L", timing: "At infestation" },
                { name: "Neem Oil", target: "General pests", dosage: "3 mL/L", timing: "Weekly" }
            ]
        },
        "Chillies": {
            fertilizers: [
                { name: "Urea", dosage: "100 kg/ha", timing: "Split doses" },
                { name: "DAP", dosage: "120 kg/ha", timing: "Basal" },
                { name: "Potash", dosage: "80 kg/ha", timing: "Flowering and fruiting" },
                { name: "Calcium Nitrate", dosage: "40 kg/ha", timing: "Fruit setting" }
            ],
            pesticides: [
                { name: "Imidacloprid", target: "Thrips & aphids", dosage: "0.5 mL/L", timing: "Early infestation" },
                { name: "Chlorantraniliprole", target: "Fruit borer", dosage: "0.4 mL/L", timing: "At fruit set" },
                { name: "Mancozeb", target: "Die-back & leaf spot", dosage: "2.5 g/L", timing: "At symptom onset" },
                { name: "Copper Oxychloride", target: "Anthracnose", dosage: "3 g/L", timing: "Preventive spray" }
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
