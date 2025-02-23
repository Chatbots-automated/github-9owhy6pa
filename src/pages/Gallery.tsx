import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    {
      url: "https://jp.lt/wp-content/uploads/2023/11/4T5A7204-1.jpg",
      title: "Soliariumo Interjeras",
      size: "lg"
    },
    {
      url: "https://jp.lt/wp-content/uploads/2023/11/4T5A8741.jpg",
      title: "Moderni Įranga",
      size: "sm"
    },
    {
      url: "https://jp.lt/wp-content/uploads/2023/11/a36.jpg",
      title: "Studijos Aplinka",
      size: "md"
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-elida-lavender py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-6">
              Mūsų Galerija
            </h1>
            <p className="text-lg text-gray-600">
              Pažvelkite į mūsų modernią studiją ir aukščiausios kokybės įrangą
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl shadow-lg ${
                  image.size === 'lg' ? 'md:col-span-2 md:row-span-2' :
                  image.size === 'md' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-playfair text-xl">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}