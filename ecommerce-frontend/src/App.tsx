import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import type { Product } from './components/ProductCard'
import Cart from './pages/Cart'
import './index.css'

// Simple Cart Context
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err)
        setLoading(false)
      })
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <section style={{
                  padding: '6rem 2rem',
                  textAlign: 'center',
                  background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent 40%)',
                }}>
                  <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                    Elevate Your <span className="gradient-text">Lifestyle</span>
                  </h1>
                  <p style={{
                    fontSize: '1.25rem',
                    color: 'hsl(var(--muted-foreground))',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.6
                  }}>
                    Discover a curated collection of premium products designed to enhance your daily rituals and inspire your creativity.
                  </p>
                  <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                    Explore Collection
                  </button>
                </section>

                <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 0' }}>
                  <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Featured Products</h2>
                    <div style={{ width: '60px', height: '4px', background: 'hsl(var(--primary))', marginTop: '1rem', borderRadius: '2px' }}></div>
                  </div>

                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                      <p className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Loading excellence...</p>
                    </div>
                  ) : (
                    <div className="product-grid">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </section>
              </>
            } />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <footer className="glass" style={{
          padding: '2rem',
          textAlign: 'center',
          marginTop: '4rem',
          borderRadius: 'var(--radius) var(--radius) 0 0'
        }}>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            © 2025 LUXE Ecommerce. Elevated Shopping Experience.
          </p>
        </footer>
      </div>
    </CartContext.Provider>
  )
}

export default App
