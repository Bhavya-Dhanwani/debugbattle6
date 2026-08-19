import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Lock, LogIn, UserPlus, AlertCircle, ShoppingBag, Eye, EyeOff } from 'lucide-react';

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
    </div>
  );
};
