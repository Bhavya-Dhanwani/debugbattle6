import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../../hooks/useCart';
import { useOrders } from '../../hooks/useOrders';
import { ArrowLeft, CreditCard, Landmark, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, fetchCart, clearCart } = useCart();
  const { createOrder, loading, error } = useOrders();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'COD'>('COD');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.postalCode) {
      alert('Please fill out all shipping details.');
      return;
    }

    const res = await createOrder();
    if (res.success && res.order) {
      setSuccessOrderId(res.order._id);
      setIsSuccess(true);
      clearCart();
    } else {
      alert(res.error || 'Failed to place order.');
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const shippingCost = subtotal > 999 ? 0 : 99;
  const totalAmount = subtotal + shippingCost;

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-neutral-50/50 max-w-xl mx-auto w-full px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-neutral-800">Order Placed Successfully!</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
              Thank you for shopping with KAPDE WALA. Your order has been placed. Reference ID:
            </p>
            <code className="block text-xs bg-neutral-100 p-2 rounded text-neutral-800 break-all select-all font-mono font-semibold max-w-xs mx-auto">
              {successOrderId}
            </code>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/orders"
              className="flex-1 h-12 bg-black text-white rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all shadow-md"
            >
              View Order History
            </Link>
            <Link
              to="/shop"
              className="flex-1 h-12 border border-black text-black rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-50 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 py-16 text-center space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-800">No Items to Checkout</h2>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Your cart is empty. Add products before checking out.
          </p>
          <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-1 hover:opacity-75">
            <ArrowLeft size={14} />
            <span>Go to Shop</span>
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
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wider text-black pb-4 border-b border-neutral-100 mb-8">
          Checkout Securely
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Shipping Form & Payment Details - 2 Cols Desktop */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping details */}
            <div className="bg-white border border-neutral-100 p-6 rounded-2xl space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900 pb-2 border-b border-neutral-100">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="400001"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="Flat/House No, Building, Street Name"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">City / State</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                    placeholder="Mumbai, Maharashtra"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method details */}
            <div className="bg-white border border-neutral-100 p-6 rounded-2xl space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900 pb-2 border-b border-neutral-100">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <Truck size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Cash On Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <Landmark size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">UPI / Net Banking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all ${
                    paymentMethod === 'CARD'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Credit / Debit Card</span>
                </button>
              </div>
            </div>

          </div>

          {/* Checkout Review Sidebar - 1 Col Desktop */}
          <div className="bg-white border border-neutral-100 p-6 rounded-2xl space-y-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900 pb-2 border-b border-neutral-100">
              Review Items ({itemCount})
            </h2>

            {/* Micro items summary */}
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-8 h-8 object-cover rounded-lg flex-shrink-0"
                    />
                    <span className="truncate text-neutral-800 font-semibold">{item.product.name}</span>
                  </div>
                  <span className="text-neutral-400 font-medium whitespace-nowrap pl-2">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total pricing */}
            <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-medium">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="text-neutral-900 font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                ) : (
                  <span className="text-neutral-900 font-bold">{formatPrice(shippingCost)}</span>
                )}
              </div>
              <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm sm:text-base font-black text-neutral-950">
                <span>Total Amount</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center space-x-2 text-xs font-medium">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span className="line-clamp-2">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black text-white rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-900 shadow-md transition-all cursor-pointer"
            >
              {loading ? 'Processing Order...' : 'Place Secure Order'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
