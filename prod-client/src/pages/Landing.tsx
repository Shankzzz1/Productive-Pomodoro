import { Clock,  CheckSquare, Heart, Github } from 'lucide-react';

const ProductivePalsLanding = () => {
  const features = [
    { icon: '⏲️', title: 'Shared Pomodoro', desc: 'Everyone in the room follows the same timer' },
    { icon: '✅', title: 'Task List', desc: 'Personal checklist to stay on track' },
    { icon: '😊', title: 'Emoji Reactions', desc: 'Send calm emoji to others, no chat needed' },
    { icon: '📈', title: 'Focus Stats', desc: 'Track time spent, tasks done, and productivity' },
    { icon: '🌐', title: 'Instant Rooms', desc: 'No login needed for basic use' }
  ];

  const testimonials = [
    {
      quote: "Finally, a study app that doesn't stress me out. Just focus and flow.",
      author: "Aayushi, CS Student"
    },
    {
      quote: "Cuckoo was great, but this feels more... peaceful.",
      author: "Pranav, Developer & ADHD Brain"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 animate-pulse"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mb-6 shadow-lg">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold  mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Study Together, Quietly.
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Real-time focus rooms for introverts. Timer-sync. Tasks. Emojis — no noisy chats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              🚀 Create a Room
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 bg-white text-gray-700 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
              🔍 Join a Room
            </button>
          </div>
          
          {/* Demo Mockup */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl font-bold text-blue-600">25:00</div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">👤</div>
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">👤</div>
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">👤</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-600">
                  <CheckSquare className="w-5 h-5 text-green-500" />
                  <span>Complete landing page design</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                  <span>Review project requirements</span>
                </div>
              </div>
              
              <div className="flex space-x-2 justify-center">
                <span className="text-2xl opacity-60">💚</span>
                <span className="text-2xl opacity-60">✨</span>
                <span className="text-2xl opacity-60">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Productive Pals */}
      <section className="px-6 py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">Why Productive Pals?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-6">🧘‍♂️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Built for Quiet Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">No pressure to speak or chat. Just join, focus, and share a vibe.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-6">⏱️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Real-Time Pomodoro Rooms</h3>
              <p className="text-gray-600 leading-relaxed">Study with others using a shared timer and structured breaks.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Track Your Progress</h3>
              <p className="text-gray-600 leading-relaxed">Visualize your sessions and stay motivated with stats that matter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">1</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Create or join a room</h3>
                <p className="text-gray-600 leading-relaxed">Get a link or code, no sign-up needed.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">2</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Work in real time</h3>
                <p className="text-gray-600 leading-relaxed">Timer, tasks, emoji reactions — all synced.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">3</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">See your stats</h3>
                <p className="text-gray-600 leading-relaxed">Focus history, session streaks, tasks completed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Snapshot */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">Features Snapshot</h2>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                      <td className="p-6 font-semibold text-gray-800">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{feature.icon}</span>
                          <span>{feature.title}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-600">{feature.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">What People Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                <p className="text-gray-500 font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to focus without the noise?</h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <button className="group px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              ✨ Create Study Room
            </button>
            
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              🎥 Watch a Demo
            </button>
            
            <button className="flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              <Github className="w-5 h-5" />
              <span>View GitHub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-50 text-center text-gray-500">
        <p>Made with 💜 for quiet collaborators everywhere</p>
      </footer>
    </div>
  );
};

export default ProductivePalsLanding;