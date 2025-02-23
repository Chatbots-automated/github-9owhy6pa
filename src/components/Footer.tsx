import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/elida-logo.svg" 
                alt="ÉLIDA" 
                className="h-12 brightness-0 invert"
              />
            </div>
            <p className="text-gray-400">
              Aukščiausios kokybės soliariumai ir profesionalus aptarnavimas Panevėžyje.
            </p>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Kontaktai</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://maps.app.goo.gl/YQZgXZsKZYn7RKZP6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-gray-400 hover:text-elida-gold transition-colors group"
                >
                  <MapPin className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  <span className="group-hover:underline">Vilniaus g. 23A, Panevėžys</span>
                </a>
              </li>
              <li>
                <a href="tel:+37064440596" className="flex items-center text-gray-400 hover:text-elida-gold transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  (8-644) 40596
                </a>
              </li>
              <li>
                <a href="mailto:info@elida.lt" className="flex items-center text-gray-400 hover:text-elida-gold transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  info@elida.lt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Nuorodos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-elida-gold transition-colors">
                  Paslaugos
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-elida-gold transition-colors">
                  Galerija
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-elida-gold transition-colors">
                  Rezervacijos
                </Link>
              </li>
              <li>
                <a 
                  href="https://jp.lt/panevezyje-pristatyta-nauja-soliariumu-studija-elida-svara-estetika-bronzinis-idegis1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-elida-gold transition-colors"
                >
                  Apie mus
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Sekite Mus</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/elidasoliariumai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-elida-gold transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/p/%C3%89LIDA-Soliariumai-61550964922132/?locale=lt_LT"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-elida-gold transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-800 mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.739796652015!2d24.368656577698104!3d55.727241893958706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e6321421e889d5%3A0x5e966abcd248574d!2zVmlsbmlhdXMgZy4gMjNBLCBQYW5ldsSXxb95cywgMzUyMDMgUGFuZXbEl8W-aW8gbS4gc2F2Lg!5e1!3m2!1sen!2slt!4v1740256043556!5m2!1sen!2slt"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ÉLIDA. Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>
  );
}