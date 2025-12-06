import React from 'react';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => {
    return (
        <div
            className="feature-card bg-white rounded-xl p-6 shadow-md text-center transition duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${icon} text-primary-600 text-2xl`}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default FeatureCard;
