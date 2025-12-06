import React, { useState } from 'react';
import { Heart, Sparkles, Cake, Music, Camera } from 'lucide-react';
import momPhoto from './mom2.jpeg';

export default function MomTribute() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const blowCandles = () => {
    setCandlesBlown(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const funFacts = [
    { icon: "🎂", label: "Years of Awesomeness", value: "60 (but looks 36!)" },
    { icon: "🍈", label: "Favorite Food", value: "Seethafalam" },
    { icon: "☎️", label: "Favorite Hobby", value: "Talking with sisters" },
    { icon: "😊", label: "Secret Hobby", value: "Scolding me (which is fun)" },
    { icon: "💪", label: "Superpower", value: "Making me smile while scolding" },
    { icon: "✨", label: "Age Mystery", value: "60 yet 36!" }
  ];

  const reasons = [
    { emoji: "🤗", text: "Your warm hugs that fix everything" },
    { emoji: "🍳", text: "The delicious food you make with love" },
    { emoji: "💝", text: "Your endless patience and understanding" },
    { emoji: "😂", text: "The way you scold me but still make me smile" },
    { emoji: "🌟", text: "Your strength that inspires us every day" },
    { emoji: "❤️", text: "Your unconditional love for our family" },
    { emoji: "🎵", text: "Your cheerful voice in the morning" },
    { emoji: "🙏", text: "Your wisdom and life lessons" },
    { emoji: "✨", text: "The magic you bring to every moment" },
    { emoji: "🏡", text: "Making our house feel like home" },
    { emoji: "📞", text: "Long calls with mausinamma that make you happy" },
    { emoji: "🌺", text: "Your beautiful smile that lights up the room" }
  ];

  const memories = [
  { title: "Family Moment", src: "/mom3.jpeg" },
  { title: "Happy Times", src: "./mom6.jpeg" },
  { title: "Special Day", src: "./mom5.jpeg" },
  { title: "With Sisters", src: "./mom4.jpeg" },
  { title: "Celebration", src: "./mom7.jpeg" },
  { title: "Sweet Memory", src: "./mom8.jpeg" }
];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: '24px'
              }}
            >
              {['🎉', '🎊', '✨', '🎈', '💝'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
              size={30}
            />
          ))}
        </div>
        
        <div className="text-center z-10 animate-fade-in">
          <div className="mb-8">
            <Sparkles className="inline-block text-yellow-500 animate-spin-slow" size={48} />
          </div>
          
          {/* Photo Placeholder */}
          {/* Photo Placeholder */}
<div className="mb-8 mx-auto w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
  <img src={momPhoto} alt="Mom" className="w-56 h-56 rounded-full object-cover" />
</div>

          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 animate-bounce-slow">
            Happy Birthday, Amma! 🎂
          </h1>
          <p className="text-2xl md:text-3xl text-purple-700 font-semibold mb-8">
            The Queen of Our Hearts ❤️
          </p>
          <div className="animate-bounce mt-12">
            <p className="text-gray-600">Scroll to explore ↓</p>
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-all">
          <Heart className="mx-auto mb-6 text-pink-500" size={48} />
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center font-medium">
            Dear Amma, today we gonna celebrate ur birthday virtually at first... and its an honest attempt. 
            Happy birthday amma! ❤️
          </p>
        </div>
      </section>

      {/* Fun Facts About Mom */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-purple-800">
            ✨ Things That Make Amma Special ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{fact.icon}</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{fact.label}</h3>
                <p className="text-2xl font-bold text-purple-700">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-purple-800">
            📸 Moments We Treasure 📸
          </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {memories.map((memory, index) => (
    <div
      key={index}
      className="group relative bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all h-64"
    >
      <img 
        src={memory.src} 
        alt={memory.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-white font-bold text-lg text-center">{memory.title}</p>
      </div>
    </div>
  ))}
</div>
          <p className="text-center text-gray-600 mt-12 text-lg">
            💡 Tip: Replace these placeholders with your actual photos in the code!
          </p>
        </div>
      </section>

      {/* Why We Love You */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-purple-800">
            ❤️ Reasons Why You're the Best ❤️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-3">{reason.emoji}</div>
                <p className="text-lg text-gray-700">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Birthday Cake */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-purple-800">
            🎂 Make a Wish! 🎂
          </h2>
          <div className="relative">
            <div className="text-9xl mb-8 animate-bounce-slow">
              {candlesBlown ? '🎂' : '🕯️🎂🕯️'}
            </div>
            {!candlesBlown ? (
              <button
                onClick={blowCandles}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
              >
                Blow the Candles! 💨
              </button>
            ) : (
              <div className="animate-fade-in">
                <p className="text-3xl font-bold text-purple-700 mb-4">
                  🎉 Happy Birthday, Amma! 🎉
                </p>
                <p className="text-xl text-gray-600">
                  May all your wishes come true! ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="mx-auto mb-8 text-pink-600 animate-pulse" size={64} />
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-8">
            Thank you for everything, Amma 💝
          </h2>
          <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
            We love you more than words can say.
          </p>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
            Here's to many more amazing years together! 🎉
          </p>
          <p className="text-xl text-purple-600 font-semibold">
            With all our love ❤️
          </p>
          <p className="text-lg text-gray-600 mt-4">
            December 6, 2025
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-purple-900 text-white">
        <p className="text-lg">
          Made with ❤️ for the best amma in the world
        </p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}