import React from 'react';

interface TestimonialProps {
    name: string;
    location: string;
    text: string;
    image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, location, text, image }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-600 italic mb-6">"{text}"</p>
            <div className="flex items-center">
                <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h4 className="font-semibold text-gray-800">{name}</h4>
                    <p className="text-gray-600 text-sm">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
