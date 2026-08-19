import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useOrders } from '../../hooks/useOrders';
import { ArrowLeft, Package, Check, Calendar } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders, loading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <Package size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-800">No Orders Found</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              You haven't placed any orders yet. Once you complete a purchase, your order history will appear here.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex h-12 px-8 bg-black text-white rounded-full items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all shadow-md"
          >
            Go Shop
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
          Order History
        </h1>

        <div className="space-y-6">
          {orders.map((order: any) => {
            return (
              <div 
                key={order._id} 
                className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs text-left"
              >
                {/* Order header row */}
                <div className="bg-neutral-50 border-b border-neutral-100 p-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="grid grid-cols-2 sm:flex sm:space-x-8 gap-3 text-xs">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Order Placed</div>
                      <div className="font-bold text-neutral-800 mt-0.5 flex items-center space-x-1">
                        <Calendar size={12} className="text-neutral-400" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Price</div>
                      <div className="font-extrabold text-black mt-0.5">{formatPrice(order.totalAmount)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Order ID</div>
                      <div className="font-mono text-neutral-500 mt-0.5 select-all truncate max-w-[120px] sm:max-w-xs">{order._id}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 uppercase tracking-widest space-x-1">
                      <Check size={10} />
                      <span>{order.status}</span>
                    </span>
                  </div>
                </div>

                {/* Order items list */}
                <div className="p-4 sm:p-6 divide-y divide-neutral-50">
                  {order.items.map((item: any) => (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                          {/* Fallback image */}
                          <img
                            src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                            alt={item.product?.name || 'Product'}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-neutral-900">
                            {item.product?.name || 'Deleted Product'}
                          </h3>
                          <div className="text-[10px] font-medium text-neutral-400 mt-0.5">
                            Quantity: {item.quantity} · Price: {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-left">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black"
          >
            <ArrowLeft size={14} />
            <span>Back to Shop</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
