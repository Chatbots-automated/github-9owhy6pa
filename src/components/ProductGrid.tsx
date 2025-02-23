import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';
import { Search, SlidersHorizontal, Target, Crosshair } from 'lucide-react';

const products: Product[] = [
  {
    id: 'TAC-JKT-001',
    name: 'Urban Tactical Softshell Jacket',
    category: 'Clothing',
    description: 'A windproof and waterproof softshell jacket with reinforced elbow pads and multiple pockets. Ideal for outdoor activities, law enforcement, and everyday wear.',
    price: 99.99,
    sku: 'TAC-JKT-001',
    image: 'https://images.unsplash.com/photo-1608236415053-3691791bbffe?auto=format&fit=crop&w=500&q=80',
    variants: {
      colors: ['Black', 'Olive Green', 'Coyote Brown', 'Ranger Green', 'Wolf Gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  },
  {
    id: 'MT-KNF-002',
    name: 'Survival Multi-Tool Knife',
    category: 'Tools & Equipment',
    description: 'A compact multi-tool designed for camping, hiking, and tactical use. Comes with a nylon sheath for easy carrying.',
    price: 39.99,
    sku: 'MT-KNF-002',
    image: 'https://images.unsplash.com/photo-1589236014604-c714677ee436?auto=format&fit=crop&w=500&q=80',
    features: [
      'Knife',
      'Screwdriver',
      'Bottle opener',
      'Pliers',
      'Saw'
    ]
  },
  {
    id: 'BAG-001',
    name: 'Tactical Assault Backpack',
    category: 'Bags',
    description: 'Military-grade tactical backpack with MOLLE system, multiple compartments, and hydration bladder compatibility.',
    price: 129.99,
    sku: 'BAG-001',
    image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=500&q=80',
    variants: {
      colors: ['Black', 'Coyote Brown', 'Ranger Green'],
    },
    features: [
      '40L Capacity',
      'Water-resistant',
      'Laptop compartment',
      'MOLLE system'
    ]
  },
  {
    id: 'BOOT-001',
    name: 'Tactical Combat Boots',
    category: 'Footwear',
    description: 'Durable combat boots with waterproof membrane, shock-absorbing soles, and reinforced toe protection.',
    price: 149.99,
    sku: 'BOOT-001',
    image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=500&q=80',
    variants: {
      colors: ['Black', 'Desert Tan', 'Olive'],
      sizes: ['40', '41', '42', '43', '44', '45', '46']
    },
    features: [
      'Waterproof',
      'Steel toe',
      'Anti-slip sole',
      'Quick-lace system'
    ]
  }
];

const categories = ['All', 'Clothing', 'Footwear', 'Bags', 'Tools & Equipment'];

export default function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tactical gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent shadow-inner"
              />
              <Crosshair className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tactical-green h-5 w-5" />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-tactical-green/90 backdrop-blur-sm text-tactical-sand rounded-lg hover:bg-tactical-green transition-colors shadow-md"
          >
            <Target className="h-5 w-5" />
            Mission Parameters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-tactical-sand/20 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-tactical-green">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm border ${
                        selectedCategory === category
                          ? 'bg-tactical-green text-tactical-sand border-tactical-green'
                          : 'bg-olive-50 text-tactical-green border-olive-200 hover:bg-olive-100'
                      } transition-colors shadow-sm`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3 text-tactical-green">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full accent-tactical-green"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-tactical-green"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-tactical-brown">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg border border-tactical-sand/20">
          <Target className="h-16 w-16 text-tactical-green/20 mx-auto mb-4" />
          <p className="text-tactical-brown text-lg">No tactical gear found matching your parameters.</p>
        </div>
      )}
    </div>
  );
}