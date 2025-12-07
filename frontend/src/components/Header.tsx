import React, { useState } from 'react';

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (tab: string) => {
        setActiveTab(tab);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="https://picsum.photos/50?random=10" alt="AI-Agri Logo" className="h-10 w-10 rounded-full mr-3" />
                        <h1 className="text-2xl font-bold text-primary-800">AI-Agri Advisor</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex space-x-6">
                            <button
                                onClick={() => setActiveTab('home')}
                                className={`px-3 py-2 rounded-md ${activeTab === 'home' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`px-3 py-2 rounded-md ${activeTab === 'chat' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                AI Chat
                            </button>
                            <button
                                onClick={() => setActiveTab('weather')}
                                className={`px-3 py-2 rounded-md ${activeTab === 'weather' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Weather
                            </button>
                            <button
                                onClick={() => setActiveTab('schemes')}
                                className={`px-3 py-2 rounded-md ${activeTab === 'schemes' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Schemes
                            </button>
                            <button
                                onClick={() => setActiveTab('fertilizers')}
                                className={`px-3 py-2 rounded-md ${activeTab === 'fertilizers' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Fertilizers
                            </button>
                        </nav>
                        <button
                            className="md:hidden text-gray-600 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-2">
                            <button
                                onClick={() => handleNavClick('home')}
                                className={`px-3 py-2 rounded-md text-left ${activeTab === 'home' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavClick('chat')}
                                className={`px-3 py-2 rounded-md text-left ${activeTab === 'chat' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                AI Chat
                            </button>
                            <button
                                onClick={() => handleNavClick('weather')}
                                className={`px-3 py-2 rounded-md text-left ${activeTab === 'weather' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Weather
                            </button>
                            <button
                                onClick={() => handleNavClick('schemes')}
                                className={`px-3 py-2 rounded-md text-left ${activeTab === 'schemes' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Schemes
                            </button>
                            <button
                                onClick={() => handleNavClick('fertilizers')}
                                className={`px-3 py-2 rounded-md text-left ${activeTab === 'fertilizers' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600 hover:text-green-700'}`}
                            >
                                Fertilizers
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
