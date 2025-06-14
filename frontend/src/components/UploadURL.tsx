import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Link as LinkIcon} from 'lucide-react';
import axios from 'axios';

const UploadURL = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post('http://localhost:3000/url', {url: url})
    setLoading(false)
    navigate(`/chat/${response.data.collectionName}`)
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Chat with Website
        </h1>
        <p className="text-lg text-gray-400">
          Enter a URL to start chatting with website content
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Website URL
            </label>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com"
                className="w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-lg text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-3 flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-orange-400" />
              Supported Websites
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                News articles & blogs
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Documentation sites
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Product pages
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Wikipedia pages
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing....</span>
                </div>
              ) : (
                'Start Chatting'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadURL;