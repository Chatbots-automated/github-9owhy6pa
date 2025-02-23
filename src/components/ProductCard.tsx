import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Target, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showQuickView, setShowQuickView] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.variants) {
      if (!selectedSize || !selectedColor) {
        alert('Please select size and color');
        return;
      }
    }

    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-tactical-sand/20">
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick actions */}
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-lg shadow-md ${
              isWishlisted ? 'bg-tactical-brown text-tactical-sand' : 'bg-white/90 text-tactical-green'
            } hover:scale-110 transition-transform backdrop-blur-sm`}
          >
            <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setShowQuickView(true)}
            className="p-2 rounded-lg bg-white/90 text-tactical-green shadow-md hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* SKU Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-tactical-green/90 text-tactical-sand rounded-lg text-xs font-mono tracking-wider backdrop-blur-sm">
          {product.sku}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-tactical-green" />
            <h3 className="text-xl font-bold text-tactical-green leading-tight">{product.name}</h3>
          </div>
          <div className="text-sm font-medium text-tactical-brown">{product.category}</div>
        </div>

        <p className="text-olive-800 text-sm mb-6 line-clamp-2">{product.description}</p>

        {product.variants && (
          <div className="space-y-4 mb-6">
            {product.variants.colors && (
              <div>
                <label className="text-sm font-medium text-tactical-green block mb-2">Color Variants</label>
                <div className="flex gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-lg text-sm border ${
                        selectedColor === color
                          ? 'bg-tactical-green text-tactical-sand border-tactical-green'
                          : 'bg-olive-50 text-tactical-green border-olive-200 hover:bg-olive-100'
                      } transition-colors`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.variants.sizes && (
              <div>
                <label className="text-sm font-medium text-tactical-green block mb-2">Size Selection</label>
                <div className="flex gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm border ${
                        selectedSize === size
                          ? 'bg-tactical-green text-tactical-sand border-tactical-green'
                          : 'bg-olive-50 text-tactical-green border-olive-200 hover:bg-olive-100'
                      } transition-colors`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {product.features && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-tactical-green mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Features
            </h4>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm text-olive-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-tactical-green rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-olive-100">
          <span className="text-2xl font-bold text-tactical-green">€{product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-6 py-3 bg-tactical-green text-tactical-sand font-medium rounded-lg hover:bg-olive-800 focus:ring-4 focus:ring-olive-500 focus:ring-opacity-50 transition-colors duration-300 shadow-md"
          >
            <ShoppingCart className="h-5 w-5" />
            Deploy to Cart
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-tactical-sand/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-tactical-green" />
                  <h2 className="text-2xl font-bold text-tactical-green">{product.name}</h2>
                </div>
                <button
                  onClick={() => setShowQuickView(false)}
                  className="p-2 hover:bg-tactical-sand/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-tactical-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                
                <div>
                  <p className="text-lg text-olive-800 mb-6">{product.description}</p>
                  
                  {/* Product options and add to cart button */}
                  {/* ... (same as above) ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}