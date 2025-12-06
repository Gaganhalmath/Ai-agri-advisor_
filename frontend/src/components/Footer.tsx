import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AI-Agri Advisor</h3>
                        <p className="text-gray-400">Your intelligent farming assistant providing personalized advice and recommendations.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">AI Chat</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Weather Alerts</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Government Schemes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Farming Tips</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Crop Calendar</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Market Prices</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Expert Advice</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-2 text-gray-400"></i>
                                <span className="text-gray-400">support@aiagri.com</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone mr-2 text-gray-400"></i>
                                <span className="text-gray-400">+91 1800-123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                                <span className="text-gray-400">New Delhi, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2023 AI-Agri Advisor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
