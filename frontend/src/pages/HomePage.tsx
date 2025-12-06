import React from 'react';
import FeatureCard from '../components/FeatureCard';
import Testimonial from '../components/Testimonial';

interface HomePageProps {
    setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
    // Curated list of high-quality agriculture/farming images
    const bgImages = [
        "https://images.unsplash.com/photo-1625246333195-0929dfaca00a?q=80&w=1920&auto=format&fit=crop", // Green fields
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop", // Sunset field
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop", // Wheat field
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1920&auto=format&fit=crop", // Modern farming
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1920&auto=format&fit=crop"  // Vineyard/Orchard
    ];

    const [heroImage, setHeroImage] = React.useState(bgImages[0]);

    React.useEffect(() => {
        const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
        setHeroImage(randomImage);
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section
                className="hero-bg text-white py-20 px-4 transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroImage}')`
                }}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Your AI-Powered Farming Assistant</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">Get personalized advice, weather alerts, government scheme information, and crop management tips.</p>
                    <button
                        onClick={() => setActiveTab('chat')}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        Get Started Today
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How We Can Help You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon="fas fa-comments"
                            title="AI Chat Assistant"
                            description="Get instant answers to your farming questions"
                            onClick={() => setActiveTab('chat')}
                        />
                        <FeatureCard
                            icon="fas fa-cloud-sun"
                            title="Weather Alerts"
                            description="Receive timely weather forecasts"
                            onClick={() => setActiveTab('weather')}
                        />
                        <FeatureCard
                            icon="fas fa-file-invoice-dollar"
                            title="Government Schemes"
                            description="Discover eligible government schemes"
                            onClick={() => setActiveTab('schemes')}
                        />
                        <FeatureCard
                            icon="fas fa-seedling"
                            title="Fertilizers & Pesticides"
                            description="Get recommendations for your crops"
                            onClick={() => setActiveTab('fertilizers')}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Farmers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Testimonial
                            name="Rajesh Kumar"
                            location="Punjab"
                            text="The weather alerts have saved my crops multiple times during unexpected rainfall. This AI assistant is like having an expert by my side 24/7."
                            image="https://picsum.photos/100?random=11"
                        />
                        <Testimonial
                            name="Priya Singh"
                            location="Maharashtra"
                            text="The government scheme information helped me secure a subsidy for drip irrigation. I'm grateful for this platform."
                            image="https://picsum.photos/100?random=12"
                        />
                        <Testimonial
                            name="Vikram Patel"
                            location="Gujarat"
                            text="The fertilizer recommendations have improved my yield by 25%. The AI chat gives practical advice that works in real farming conditions."
                            image="https://picsum.photos/100?random=13"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
