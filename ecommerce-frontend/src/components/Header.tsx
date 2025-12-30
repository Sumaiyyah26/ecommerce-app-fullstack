import { Link } from 'react-router-dom';
import { useCart } from '../App';

const Header = () => {
    const { totalItems } = useCart();

    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1rem',
            borderRadius: 'var(--radius)',
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, textDecoration: 'none', color: 'inherit' }}>
                <span className="gradient-text">LUXE</span>
            </Link>

            <nav style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
                <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                    Cart
                    <span style={{
                        background: 'hsl(var(--primary))',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem'
                    }}>{totalItems}</span>
                </Link>
            </nav>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Login</button>
            </div>
        </header>
    );
};

export default Header;
