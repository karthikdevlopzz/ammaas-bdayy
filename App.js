import React, { useState } from 'react';
import { Upload, MessageCircle, Brain, BookOpen, Sparkles, X, Send } from 'lucide-react';

export default function StudyBuddy() {
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const text = event.target.result;
      const fileObj = {
        id: Date.now(),
        name: file.name,
        content: text,
        uploadDate: new Date().toLocaleDateString()
      };
      
      setFiles(prev => [...prev, fileObj]);
      setCurrentFile(fileObj);
      
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: `Summarize these study notes in a clear, concise way with key points:\n\n${text.substring(0, 3000)}`
            }]
          })
        });
        
        const data = await response.json();
        const summaryText = data.content[0].text;
        setSummary(summaryText);
        setActiveTab('summary');
      } catch (err) {
        setSummary('Error generating summary. Please try again.');
      }
      
      setLoading(false);
    };
    
    reader.readAsText(file);
  };

  const handleChat = async () => {
    if (!chatInput.trim() || !currentFile) return;
    
    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Based on these study notes, answer this question: ${chatInput}\n\nNotes: ${currentFile.content.substring(0, 2000)}`
          }]
        })
      });
      
      const data = await response.json();
      const aiMsg = { role: 'assistant', text: data.content[0].text };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' };
      setChatMessages(prev => [...prev, errorMsg]);
    }
    
    setLoading(false);
  };

  const generateFlashcards = async () => {
    if (!currentFile) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Create 5 flashcards from these notes. Return ONLY valid JSON in this exact format with no other text:
[{"question": "...", "answer": "..."}]

Notes: ${currentFile.content.substring(0, 2000)}`
          }]
        })
      });
      
      const data = await response.json();
      let text = data.content[0].text.trim();
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const cards = JSON.parse(text);
      setFlashcards(cards);
      setActiveTab('flashcards');
    } catch (err) {
      console.error('Flashcard error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StudyAI
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Your AI-powered study companion</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'upload'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Notes
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'summary'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={!summary}
            >
              <BookOpen className="w-5 h-5" />
              Summary
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'chat'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={!currentFile}
            >
              <MessageCircle className="w-5 h-5" />
              Ask Questions
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={!currentFile}
            >
              <Sparkles className="w-5 h-5" />
              Flashcards
            </button>
          </div>

          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center hover:border-indigo-500 transition-colors">
                <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Your Study Notes</h3>
                <p className="text-gray-600 mb-4">Support for TXT files</p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={loading}
                  />
                  <span className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors inline-block">
                    {loading ? 'Processing...' : 'Choose File'}
                  </span>
                </label>
              </div>

              {files.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Files</h3>
                  <div className="space-y-3">
                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setCurrentFile(file)}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.uploadDate}</p>
                          </div>
                        </div>
                        {currentFile?.id === file.id && (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            Active
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">AI Summary</h3>
                {currentFile && (
                  <span className="text-sm text-gray-500">From: {currentFile.name}</span>
                )}
              </div>
              {summary ? (
                <div className="prose max-w-none bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{summary}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Upload a file to see the summary</p>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Ask Questions About Your Notes</h3>
              <div className="bg-gray-50 rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-16">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Ask me anything about your notes!</p>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xl px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={loading || !currentFile}
                />
                <button
                  onClick={handleChat}
                  disabled={loading || !currentFile || !chatInput.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">AI-Generated Flashcards</h3>
                <button
                  onClick={generateFlashcards}
                  disabled={loading || !currentFile}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
                >
                  {loading ? 'Generating...' : 'Generate Flashcards'}
                </button>
              </div>
              
              {flashcards.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {flashcards.map((card, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-purple-600 uppercase">Question</span>
                        <p className="font-medium text-gray-800 mt-1">{card.question}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-pink-600 uppercase">Answer</span>
                        <p className="text-gray-700 mt-1">{card.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-16">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Click "Generate Flashcards" to create study cards from your notes</p>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>Built with React & Claude AI | Created by Laurice Moretti</p>
        </footer>
      </div>
    </div>
  );
}
