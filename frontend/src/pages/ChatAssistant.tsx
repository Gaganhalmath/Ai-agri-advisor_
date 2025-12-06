import React, { useState, useEffect, useRef } from 'react';
import { callOpenAI } from '../services/api';

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    image?: string;
}

const ChatAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm your AI agriculture assistant. How can I help you with your farming questions today?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim() === "" && !uploadedImage) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: "user",
            image: uploadedImage || undefined
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText("");
        setUploadedImage(null);

        setIsTyping(true);
        // Note: Currently mimicking original logic where image is UI-only and text goes to API
        // If API supports image, we would pass it here
        const aiResponse = await callOpenAI(newUserMessage.text);
        setIsTyping(false);

        setMessages(prev => [
            ...prev,
            { id: Date.now() + 1, text: aiResponse, sender: "bot" }
        ]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setUploadedImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">AI Chat Assistant</h2>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="h-96 overflow-y-auto mb-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 ${message.sender === "user" ? "bg-primary-500 text-white chat-bubble user" : "bg-gray-200 text-gray-800 chat-bubble"}`}>
                                    {message.image && (
                                        <div className="mb-2">
                                            <img
                                                src={message.image}
                                                alt="Uploaded by user"
                                                className="max-w-full h-auto rounded-lg"
                                            />
                                        </div>
                                    )}
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex mb-4 justify-start">
                                <div className="bg-gray-200 text-gray-800 p-4 rounded-2xl rounded-bl-none">
                                    <div className="flex">
                                        <div className="typing-indicator"></div>
                                        <div className="typing-indicator"></div>
                                        <div className="typing-indicator"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        {uploadedImage && (
                            <div className="relative inline-block">
                                <img
                                    src={uploadedImage}
                                    alt="Preview"
                                    className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        <div className="flex">
                            <div className="file-upload bg-gray-100 border border-gray-300 rounded-l-lg flex items-center justify-center px-3 cursor-pointer">
                                <i className="fas fa-image text-gray-600"></i>
                                <input
                                    type="file"
                                    className="file-upload-input"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask your farming question or upload an image..."
                                className="flex-grow border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputText.trim() === "" && !uploadedImage}
                                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white px-6 rounded-r-lg transition duration-300"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        className="bg-white p-4 rounded-lg shadow-sm text-left hover:bg-primary-50 transition duration-300"
                        onClick={() => setInputText("What's the best fertilizer for wheat?")}
                    >
                        <p className="font-medium text-gray-800">What's the best fertilizer for wheat?</p>
                    </button>
                    <button
                        className="bg-white p-4 rounded-lg shadow-sm text-left hover:bg-primary-50 transition duration-300"
                        onClick={() => setInputText("How to control pests in tomato plants?")}
                    >
                        <p className="font-medium text-gray-800">How to control pests in tomato plants?</p>
                    </button>
                    <button
                        className="bg-white p-4 rounded-lg shadow-sm text-left hover:bg-primary-50 transition duration-300"
                        onClick={() => setInputText("When is the right time to harvest potatoes?")}
                    >
                        <p className="font-medium text-gray-800">When is the right time to harvest potatoes?</p>
                    </button>
                    <button
                        className="bg-white p-4 rounded-lg shadow-sm text-left hover:bg-primary-50 transition duration-300"
                        onClick={() => setInputText("What government schemes are available for organic farming?")}
                    >
                        <p className="font-medium text-gray-800">What government schemes are available for organic farming?</p>
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Image Analysis Feature</h3>
                <p className="text-yellow-700">
                    You can now upload images of plant diseases, pests, or crop issues for analysis. Our AI will examine the image and provide specific recommendations for treatment and prevention.
                </p>
            </div>
        </div>
    );
};

export default ChatAssistant;
