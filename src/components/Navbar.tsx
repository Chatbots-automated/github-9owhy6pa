import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Paslaugos', path: '/services' },
    { name: 'Galerija', path: '/gallery' },
    { name: 'Rezervuoti', path: '/booking' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/elida-logo.svg" 
              alt="ÉLIDA" 
              className={`h-12 transition-all duration-300 ${
                isScrolled ? 'brightness-100' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-lato text-sm tracking-wide transition-all duration-300 ${
                  location.pathname === link.path
                    ? isScrolled ? 'text-elida-gold' : 'text-white'
                    : isScrolled ? 'text-gray-600 hover:text-elida-gold' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isScrolled ? 'bg-elida-gold' : 'bg-white'
                    }`}
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <a
              href="https://jp.lt/panevezyje-pristatyta-nauja-soliariumu-studija-elida-svara-estetika-bronzinis-idegis1/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 font-lato text-sm tracking-wide transition-all duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-elida-gold' : 'text-gray-200 hover:text-white'
              }`}
            >
              Apie mus
              <ExternalLink className="h-3 w-3" />
            </a>
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-elida-gold/10 text-elida-gold hover:bg-elida-gold hover:text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Atsijungti</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-elida-gold text-white hover:bg-elida-accent shadow-md hover:shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Prisijungti</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled 
                ? 'text-gray-600 hover:text-elida-gold hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'text-elida-gold bg-elida-gold/10'
                  : 'text-gray-600 hover:text-elida-gold hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://jp.lt/panevezyje-pristatyta-nauja-soliariumu-studija-elida-svara-estetika-bronzinis-idegis1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-elida-gold hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Apie mus
            <ExternalLink className="h-4 w-4" />
          </a>
          {user ? (
            <>
              <div className="px-3 py-2 text-sm text-gray-600">{user.email}</div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-elida-gold hover:bg-elida-gold/10 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Atsijungti</span>
                </div>
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-6 py-3 bg-elida-gold text-white rounded-full font-medium hover:bg-elida-accent transition-colors duration-300 shadow-md"
            >
              Prisijungti
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
}