import React, { useState, useEffect } from 'react';
import { Cart } from './components/Cart';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { Product, CartItem, User } from './types';
import { supabase } from './lib/supabase';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'about'>('home');

  useEffect(() => {
    fetchProducts();
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAdmin(session.user.app_metadata?.is_admin ?? false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setIsAdmin(user.app_metadata?.is_admin ?? false);
    }
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setCartItems([]);
    setShowAdminDashboard(false);
  };

  const addToCart = (product: Product) => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }

    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderMainContent = () => {
    if (showAdminDashboard && isAdmin) {
      return <AdminDashboard />;
    }

    return activeSection === 'about' 
      ? <AboutPage /> 
      : <HomePage 
          products={products} 
          loading={loading} 
          onAddToCart={addToCart} 
        />;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        isAdmin={isAdmin}
        showAdminDashboard={showAdminDashboard}
        totalItems={totalItems}
        isSideMenuOpen={isSideMenuOpen}
        onToggleSideMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
        onLogoClick={() => {
          setShowAdminDashboard(false);
          setActiveSection('home');
        }}
        onToggleAdminDashboard={() => setShowAdminDashboard(!showAdminDashboard)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      <SideMenu
        isOpen={isSideMenuOpen}
        activeSection={activeSection}
        onSectionChange={section => {
          setActiveSection(section);
          setShowAdminDashboard(false);
        }}
        onClose={() => setIsSideMenuOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderMainContent()}
      </main>

      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {isAuthModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => setIsAuthModalOpen(false)}
          onToggleMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
        />
      )}
    </div>
  );
}

export default App;