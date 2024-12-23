import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mic, MicOff, Paperclip, Trash2, X } from 'lucide-react';
import "./ChatComponent.css";

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI('AIzaSyAHRwVNpM9r3E3XBBr14nPSy6r8OnLqe5g');

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Speech Recognition setup
  const [recognition, setRecognition] = useState(null);
  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsRecording(!isRecording);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteMessage = (index) => {
    setChatHistory(prev => prev.filter((_, i) => i !== index));
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      setChatHistory([]);
      localStorage.removeItem('chatHistory');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;
    
    setLoading(true);
    setError(null);

    // Create message content
    let messageContent = message;
    let attachmentInfo = '';
    
    if (selectedFile) {
      attachmentInfo = `[Attached file: ${selectedFile.name}] `;
      messageContent = attachmentInfo + messageContent;
      
      // Convert file to base64 if needed
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    }

    // Add user message immediately
    const userMessage = { 
      role: 'user', 
      content: messageContent,
      timestamp: new Date().toLocaleTimeString(),
      hasAttachment: !!selectedFile
    };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(messageContent);
      const response = await result.response;
      const text = response.text();

      // Add AI response
      const aiMessage = { 
        role: 'assistant', 
        content: text, 
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`Gemini  ${isExpanded ? 'h-[600px]' : 'h-16'}`}>
      {/* Chat Header */}
      <div 
        className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center"
      >
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleChat}>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-semibold">Gemini AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearHistory}
            className="p-1 hover:bg-blue-700 rounded"
            title="Clear chat history"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200"
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-white rounded-b-lg shadow-xl flex flex-col h-[calc(100%-4rem)]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`max-w-[80%] relative ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.timestamp}
                  </div>
                  <button
                    onClick={() => deleteMessage(index)}
                    className="absolute top-0 -left-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} className="text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div className="px-4 py-2 bg-gray-50 border-t flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedFile.name}
              </span>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                disabled={loading}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".txt,.pdf,.doc,.docx,image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Attach file"
              >
                <Paperclip size={20} />
              </button>
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2 ${isRecording ? 'text-red-500' : 'text-gray-500'} hover:text-gray-700`}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                type="submit"
                disabled={loading || (!message.trim() && !selectedFile)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">↻</span>
                    <span>Sending</span>
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;