import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Users, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://jp.lt/wp-content/uploads/2023/11/a36.jpg"
            alt="ÉLIDA Soliariumai"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 bg-elida-gold/20 backdrop-blur-sm text-elida-gold rounded-full text-sm font-medium mb-6">
              Premium Soliariumai Panevėžyje
            </span>
            <h1 className="font-playfair text-6xl md:text-8xl text-white mb-8 leading-tight">
              Atrask Tobulą
              <br />
              <span className="text-elida-gold">Įdegį</span>
            </h1>
            <p className="text-xl text-elida-beige mb-10 max-w-lg">
              Aukščiausios kokybės soliariumai su naujausiomis technologijomis ir profesionaliu aptarnavimu
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-elida-gold text-white rounded-full font-medium text-lg hover:bg-elida-accent transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Rezervuoti Laiką
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white backdrop-blur-sm rounded-full font-medium text-lg hover:bg-white/20 transition-all duration-300"
              >
                Mūsų Paslaugos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 mb-4">
              Kodėl Rinktis ÉLIDA?
            </h2>
            <div className="w-24 h-1 bg-elida-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sun className="h-8 w-8" />,
                title: "Premium Įranga",
                description: "Naujausi soliariumai su pažangiausiomis technologijomis"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Profesionalus Aptarnavimas",
                description: "Kvalifikuoti specialistai patars ir padės"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Patogus Laikas",
                description: "Lankstus darbo grafikas, pritaikytas jūsų poreikiams"
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Aukšta Kokybė",
                description: "Premium klasės kosmetika ir priežiūros priemonės"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-elida-cream p-8 rounded-2xl text-center group hover:bg-elida-gold transition-all duration-300"
              >
                <div className="inline-block p-4 bg-white rounded-xl shadow-md text-elida-gold group-hover:text-white group-hover:bg-elida-accent transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl mt-6 mb-3 text-gray-900 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-elida-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 flex items-center">
                <div>
                  <h2 className="font-playfair text-3xl text-gray-900 mb-6">
                    Pasiruošę Tobulam Įdegiui?
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Rezervuokite savo laiką dabar ir atraskite profesionalų aptarnavimą bei aukščiausios kokybės įrangą.
                  </p>
                  <Link
                    to="/booking"
                    className="inline-block px-8 py-4 bg-elida-gold text-white rounded-full font-medium hover:bg-elida-accent transition-colors duration-300"
                  >
                    Rezervuoti Vizitą
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://jp.lt/wp-content/uploads/2023/11/4T5A7204-1.jpg"
                  alt="ÉLIDA Soliariumo Interjeras"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}