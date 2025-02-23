import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Shield, Truck, MapPin, Phone, Mail, User, CreditCard, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

export default function Checkout() {
  const { state } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log('Checkout form submitted:', form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-olive-50 bg-camo-pattern pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-tactical-green hover:text-tactical-brown transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Return to Base
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-tactical-sand/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-tactical-green/10 rounded-lg">
                <Package className="h-6 w-6 text-tactical-green" />
              </div>
              <h2 className="text-2xl font-bold text-tactical-green">Deployment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-tactical-brown flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </h3>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-tactical-green mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-tactical-brown flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-tactical-green mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-tactical-green mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-tactical-brown flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Deployment Location
                </h3>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-tactical-green mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-tactical-green mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-tactical-green mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={form.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-tactical-green mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-tactical-brown flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Number
                </h3>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-tactical-green mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-tactical-sand/20 focus:ring-2 focus:ring-tactical-green focus:border-transparent bg-white/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-tactical-green text-tactical-sand py-4 rounded-lg hover:bg-olive-800 transition-colors mt-8 flex items-center justify-center gap-2 font-semibold shadow-md"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-tactical-sand/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-tactical-green/10 rounded-lg">
                  <Shield className="h-6 w-6 text-tactical-green" />
                </div>
                <h2 className="text-2xl font-bold text-tactical-green">Mission Summary</h2>
              </div>

              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-olive-50/50 rounded-lg border border-tactical-sand/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-tactical-green">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="text-sm text-tactical-brown">Size: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-tactical-brown">Color: {item.selectedColor}</p>
                      )}
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-tactical-brown">Qty: {item.quantity}</p>
                        <p className="font-medium text-tactical-green">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-tactical-sand/20">
                <div className="space-y-2">
                  <div className="flex justify-between text-tactical-brown">
                    <span>Subtotal</span>
                    <span>€{state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-tactical-brown">
                    <span>Shipping</span>
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-tactical-green pt-2">
                    <span>Total</span>
                    <span>€{state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-olive-100/50 backdrop-blur-sm rounded-lg p-4 border border-tactical-sand/20">
              <div className="flex items-center gap-3 text-tactical-brown">
                <Truck className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">Free shipping on all orders. Estimated delivery time: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}