import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { createProduct } from '../../api/product.api';
import { User, Mail, Lock, LogIn, UserPlus, AlertCircle, ShoppingBag, Eye, EyeOff, PlusCircle, X } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error, login, register, logout } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'SNEAKERS',
    stock: '',
    imageUrl: '',
  });
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.category) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmittingProduct(true);
    try {
      const response = await createProduct({
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        category: productForm.category,
        stock: Number(productForm.stock || 0),
        imageUrl: productForm.imageUrl || 'https://via.placeholder.com/600',
      });

      if (response.success) {
        alert('Product created successfully!');
        setIsAdminModalOpen(false);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category: 'SNEAKERS',
          stock: '',
          imageUrl: '',
        });
      } else {
        alert(response.message || 'Failed to create product.');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to create product.');
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!form.name || !form.email || !form.password) {
        alert('Please fill out all fields.');
        return;
      }
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res.success) {
        navigate('/');
      }
    } else {
      if (!form.email || !form.password) {
        alert('Please fill out all fields.');
        return;
      }
      const res = await login({
        email: form.email,
        password: form.password,
      });
      if (res.success) {
        navigate('/');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-50/50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-neutral-100 p-6 sm:p-8 rounded-3xl shadow-lg shadow-neutral-100/50">
          
          {isAuthenticated ? (
            /* Logged In View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-800">
                <User size={28} />
              </div>
              
              <div className="space-y-1">
                <h1 className="text-xl font-black uppercase tracking-wider text-neutral-900">Welcome Back</h1>
                <p className="text-xs text-neutral-500 font-medium">Your profile information is shown below.</p>
              </div>

              <div className="border border-neutral-100 rounded-2xl p-4 text-left space-y-3 bg-neutral-50">
                <div className="text-xs font-semibold">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-0.5">Name</span>
                  <span className="text-neutral-800 text-sm">{user?.name}</span>
                </div>
                <div className="text-xs font-semibold">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-0.5">Email Address</span>
                  <span className="text-neutral-800 text-sm">{user?.email}</span>
                </div>
                <div className="text-xs font-semibold">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-0.5">Role</span>
                  <span className="text-neutral-800 text-sm uppercase tracking-widest text-[10px] bg-neutral-200 px-2 py-0.5 rounded font-bold">{user?.role}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/orders"
                  className="h-12 bg-black text-white rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all shadow-md"
                >
                  <ShoppingBag size={14} />
                  <span>View Orders</span>
                </Link>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
                  >
                    <PlusCircle size={14} />
                    <span>Add New Product</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="h-12 border border-neutral-200 text-neutral-700 rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-50 hover:text-black transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Auth Form View (Login/Register) */
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-black">
                  {isRegister ? 'Create Account' : 'Welcome Back'}
                </h1>
                <p className="text-xs text-neutral-400 font-medium">
                  {isRegister ? 'Join Kapde Wala for premium fashion.' : 'Please sign in to access your account.'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3.5 rounded-xl flex items-center space-x-2 text-xs font-medium">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs sm:text-sm font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-black"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-black text-white rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 shadow-md transition-all cursor-pointer mt-6"
                >
                  {isRegister ? <UserPlus size={16} /> : <LogIn size={16} />}
                  <span>{loading ? 'Processing...' : isRegister ? 'Register' : 'Sign In'}</span>
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setForm({ name: '', email: '', password: '' });
                  }}
                  className="text-xs font-bold text-neutral-500 hover:text-black hover:underline cursor-pointer"
                >
                  {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />

      {/* Admin Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="space-y-4 text-left">
              <h2 className="text-xl font-black uppercase tracking-wider text-black">Create Product</h2>
              <form onSubmit={handleProductSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                    placeholder="e.g. Kapde Wala Sneaker V2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium min-h-[60px]"
                    placeholder="Product description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                      placeholder="8999"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Stock Qty</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                  >
                    <option value="SNEAKERS">SNEAKERS</option>
                    <option value="CLOTHING">CLOTHING</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="WATCHES">WATCHES</option>
                    <option value="BAGS">BAGS</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Image URL</label>
                  <input
                    type="url"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingProduct}
                  className="w-full h-11 bg-black text-white rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all cursor-pointer mt-4"
                >
                  {isSubmittingProduct ? 'Creating...' : 'Create Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
