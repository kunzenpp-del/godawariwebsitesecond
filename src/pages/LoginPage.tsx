import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.error('Please fill all fields');
        return;
      }
      const success = login(formData.email, formData.password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/account');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all fields');
        return;
      }
      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        toast.success('Account created successfully!');
        navigate('/account');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-xl font-[Poppins]">GP</span>
          </div>
          <h1 className="text-2xl font-[Poppins] font-bold text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-text-secondary text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Join Godawari Printing Solution'}</p>
        </div>

        <div className="bg-secondary rounded-2xl border border-white/5 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-text-secondary text-xs mb-1 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-primary border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                    placeholder="Your full name"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-text-secondary text-xs mb-1 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-primary border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-text-secondary text-xs mb-1 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-primary border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-accent w-3.5 h-3.5" />
                  <span className="text-text-secondary text-xs">Remember me</span>
                </label>
                <button type="button" className="text-accent text-xs hover:underline">Forgot password?</button>
              </div>
            )}
            <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-colors">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-text-muted text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)} className="text-accent ml-1 hover:underline font-medium">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Admin hint */}
          <div className="mt-4 bg-primary/50 border border-white/5 rounded-lg p-3">
            <p className="text-text-muted text-xs text-center">
              💡 Demo: Use <span className="text-accent">admin@godawari.com</span> for admin access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
