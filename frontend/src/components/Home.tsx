import { Link } from 'react-router-dom';
import { FileText, Globe, ArrowRight} from 'lucide-react';

const Home = () => {
  const cards = [
    {
      title: 'Chat with PDF',
      description: 'Upload and chat with your PDF documents. Extract insights, ask questions, and get instant answers.',
      icon: FileText,
      path: '/upload-pdf',
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-500/10 to-orange-600/10',
    },
    {
      title: 'Chat with Website',
      description: 'Provide a URL and chat with website content. Analyze web pages and get detailed information.',
      icon: Globe,
      path: '/upload-url',
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-500/10 to-orange-600/10',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={index}
              to={card.path}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 border border-gray-700 p-8 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-100">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300">
                  {card.description}
                </p>
                
                <div className="flex items-center text-orange-400 font-semibold group-hover:text-orange-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;