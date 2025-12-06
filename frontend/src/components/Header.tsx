import React from 'react';

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="https://picsum.photos/50?random=10" alt="AI-Agri Logo" className="h-10 w-10 rounded-full mr-3" />
                        <h1 className="text-2xl font-bold text-primary-800">AI-Agri Advisor</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`px-3 py-2 rounded-md ${activeTab === 'home' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:text-primary-700'}`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-3 py-2 rounded-md ${activeTab === 'chat' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:text-primary-700'}`}
                        >
                            AI Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('weather')}
                            className={`px-3 py-2 rounded-md ${activeTab === 'weather' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:text-primary-700'}`}
                        >
                            Weather
                        </button>
                        <button
                            onClick={() => setActiveTab('schemes')}
                            className={`px-3 py-2 rounded-md ${activeTab === 'schemes' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:text-primary-700'}`}
                        >
                            Schemes
                        </button>
                        <button
                            onClick={() => setActiveTab('fertilizers')}
                            className={`px-3 py-2 rounded-md ${activeTab === 'fertilizers' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:text-primary-700'}`}
                        >
                            Fertilizers
                        </button>
                    </nav>
                    <button className="md:hidden text-gray-600">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
