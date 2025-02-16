import { useState, useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const chatflowId = "b85606d2-cd18-46e5-9320-7717d543e685";
    const apiHost = "https://banderglitch-myportfolio.hf.space";

    useEffect(() => {
        // Add welcome message
        setMessages([
            {
                type: 'bot',
                content: "👋 Welcome! I'm your interactive guide to Nernay's portfolio.\n\nI can help you discover:\n• Innovative Projects & Solutions\n• Technical Expertise & Skills\n• Professional Experience\n• Collaboration Opportunities\n\nWhat would you like to know?"
            }
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (messageContent) => {
        if (!messageContent.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: messageContent }]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${apiHost}/api/v1/prediction/${chatflowId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: messageContent,
                }),
            });

            const data = await response.json();
            
            // Add bot response
            setMessages(prev => [...prev, { type: 'bot', content: data.text }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                type: 'bot', 
                content: "Sorry, I encountered an error. Please try again." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-[#0f1117] flex flex-col">
            {/* Header */}
            <div className="bg-[#1a1c25] p-4 flex items-center justify-between border-b border-gray-800">
                <h1 className="text-xl text-white font-semibold">
                    Chat with Nernay's AI Assistant
                </h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="px-4 py-2 rounded-lg bg-[#2d2f39] hover:bg-[#3d3f49] text-white transition-colors"
                >
                    Back to Portfolio
                </motion.button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 mb-4 ${
                                message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.type === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm">AI</span>
                                </div>
                            )}
                            <div
                                className={`rounded-lg p-4 max-w-[80%] ${
                                    message.type === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-[#1e1f29] text-white'
                                }`}
                            >
                                {message.content}
                            </div>
                            {message.type === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm">You</span>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-white">
                            <div className="animate-bounce">●</div>
                            <div className="animate-bounce [animation-delay:0.2s]">●</div>
                            <div className="animate-bounce [animation-delay:0.4s]">●</div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#1a1c25] border-t border-gray-800">
                    <div className="max-w-3xl mx-auto flex gap-4">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                            placeholder="Ask me anything about Nernay..."
                            className="flex-1 bg-[#2d2f39] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={() => sendMessage(inputMessage)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;