import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: <Truck size={24} className="text-black" />,
    title: "Free Shipping",
    desc: "On all orders above ₹999"
  },
  {
    icon: <ShieldCheck size={24} className="text-black" />,
    title: "2 Year Warranty",
    desc: "100% guarantee on all products"
  },
  {
    icon: <RefreshCw size={24} className="text-black" />,
    title: "Easy Returns",
    desc: "Hassle-free 14 days exchange"
  },
  {
    icon: <Headphones size={24} className="text-black" />,
    title: "Support 24/7",
    desc: "Contact us anytime, anywhere"
  }
];

export const BenefitsBar: React.FC = () => {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {benefits.map((benefit, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center text-center p-3 sm:p-4 hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Circular icon container */}
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mb-3 sm:mb-4 border border-neutral-100/60">
              {benefit.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
              {benefit.title}
            </h3>
            
            {/* Description */}
            <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
