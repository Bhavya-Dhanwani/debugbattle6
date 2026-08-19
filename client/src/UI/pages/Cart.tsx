import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../../hooks/useCart';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, fetchCart, updateQuantity, removeItem, subtotal, itemCount, loading } = useCart();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const shippingCost = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const totalAmount = subtotal + shippingCost;

  if (items.length === 0 && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-800">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Discover our premium collections and elevate your style.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex h-12 px-8 bg-black text-white rounded-full items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all shadow-md"
          >
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wider text-black pb-4 border-b border-neutral-100 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List - 2 Cols Desktop */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.product._id} 
                className="bg-white border border-neutral-100 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.imageUrl || 'https://via.placeholder.com/150'}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mb-0.5">
                      {item.product.category}
                    </div>
                    <Link to={`/product/${item.product._id}`} className="text-xs sm:text-sm font-bold text-neutral-900 hover:underline line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-neutral-400 font-medium mt-0.5">
                      Price: {formatPrice(item.product.price)}
                    </div>
                  </div>
                </div>

                {/* Adjuster controls & Remove action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t border-neutral-50 sm:border-0">
                  {/* Quantity Adjuster */}
                  <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black font-bold text-base cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-neutral-950">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black font-bold text-base cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Row Total */}
                  <span className="text-xs sm:text-sm font-black text-neutral-950 min-w-[70px] text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="w-11 h-11 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-neutral-50 rounded-full transition-colors cursor-pointer"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black pt-2"
            >
              <ArrowLeft size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Cart Summary Panel - 1 Col Desktop */}
          <div className="bg-white border border-neutral-100 p-6 rounded-2xl space-y-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900 pb-2 border-b border-neutral-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm font-medium">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal ({itemCount} items)</span>
                <span className="text-neutral-900 font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Free</span>
                ) : (
                  <span className="text-neutral-900 font-bold">{formatPrice(shippingCost)}</span>
                )}
              </div>
              {shippingCost > 0 && (
                <div className="text-[10px] text-neutral-400 font-normal leading-normal">
                  Add <span className="font-bold text-neutral-700">{formatPrice(999 - subtotal)}</span> more for FREE shipping.
                </div>
              )}
              <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm sm:text-base font-black text-neutral-950">
                <span>Total Amount</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full h-12 bg-black text-white rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-900 shadow-md transition-all cursor-pointer"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
