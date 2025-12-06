import React, { useState, useEffect, useRef } from 'react';
import { callGemini } from '../services/api';

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    image?: string;
}

const ChatAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Namaste! I am your AI agriculture assistant. Ask me anything about farming in your language.", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const languages = [
        "English", "Hindi", "Telugu", "Tamil", "Kannada", "Marathi", "Punjabi", "Gujarati", "Bengali"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Speech-to-Text (Input)
    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();

            // Map simple language names to locales
            const localeMap: Record<string, string> = {
                "English": "en-IN", "Hindi": "hi-IN", "Telugu": "te-IN",
                "Tamil": "ta-IN", "Kannada": "kn-IN", "Marathi": "mr-IN",
                "Punjabi": "pa-IN", "Gujarati": "gu-IN", "Bengali": "bn-IN"
            };

            recognition.lang = localeMap[selectedLanguage] || 'en-IN';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognition.start();
        } else {
            alert("Your browser does not support voice input.");
        }
    };

    // Text-to-Speech (Output)
    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            // Attempt to find a matching voice - simple fallback
            // Note: Mobile data voices often auto-match lang code
            const langCode = {
                "English": "en-IN", "Hindi": "hi-IN", "Telugu": "te-IN",
                "Tamil": "ta-IN", "Kannada": "kn-IN", "Marathi": "mr-IN",
                "Punjabi": "pa-IN", "Gujarati": "gu-IN", "Bengali": "bn-IN"
            }[selectedLanguage] || 'en-US';

            utterance.lang = langCode;
            utterance.onend = () => setIsSpeaking(false);
            utterance.onstart = () => setIsSpeaking(true);

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Your browser does not support text-to-speech.");
        }
    };

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

        // Call backend with multimodal support
        const aiResponse = await callGemini(newUserMessage.text, newUserMessage.image, selectedLanguage);

        setIsTyping(false);

        setMessages(prev => [
            ...prev,
            { id: Date.now() + 1, text: aiResponse, sender: "bot" }
        ]);

        // Auto-speak response if desirable, or let user click to speak. 
        // For accessibility, auto-speaking might be intrusive, but user requested "announce report".
        // Let's enable it by default for the "Voice Mode" feel.
        speakText(aiResponse);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">AI-Agri Chat Assistant</h2>
            <div className="flex justify-center mb-6">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Language:</span>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="bg-transparent border-none text-primary-700 font-semibold focus:ring-0 cursor-pointer"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[70vh]">
                <div className="flex-grow p-6 overflow-y-auto">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 relative group ${message.sender === "user" ? "bg-primary-500 text-white chat-bubble user" : "bg-gray-200 text-gray-800 chat-bubble"}`}>
                                {message.image && (
                                    <div className="mb-2">
                                        <img
                                            src={message.image}
                                            alt="Uploaded by user"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                                <p className="whitespace-pre-line">{message.text}</p>

                                {message.sender === "bot" && (
                                    <button
                                        onClick={() => speakText(message.text)}
                                        className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100"
                                        title="Listen"
                                    >
                                        <i className={`fas ${isSpeaking && message.text === new SpeechSynthesisUtterance().text ? "fa-stop" : "fa-volume-up"}`}></i>
                                    </button>
                                )}
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

                <div className="p-4 bg-gray-50 border-t border-gray-200">
                    {uploadedImage && (
                        <div className="relative inline-block mb-2">
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

                    <div className="flex items-center space-x-2">
                        {/* Image Upload */}
                        <div className="file-upload bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm">
                            <i className="fas fa-image text-gray-500 text-lg"></i>
                            <input
                                type="file"
                                className="file-upload-input"
                                accept="image/*"
                                onChange={handleImageUpload}
                                title="Upload Image"
                            />
                        </div>

                        {/* Text Input */}
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={`Ask a question in ${selectedLanguage} or upload an image...`}
                                className="w-full border border-gray-300 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                            />

                            {/* Voice Input */}
                            <button
                                onClick={startListening}
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isListening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-primary-600"}`}
                                title="Voice Input"
                            >
                                <i className="fas fa-microphone"></i>
                            </button>
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSendMessage}
                            disabled={inputText.trim() === "" && !uploadedImage}
                            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition duration-300"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        Supports text, voice, and image analysis for crop diseases.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatAssistant;
