import { useCart } from '../App';

const Cart = () => {
    const { cart, removeFromCart, addToCart } = useCart();

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Your Bag</h2>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }} className="glass">
                    <p style={{ fontSize: '1.25rem', color: 'hsl(var(--muted-foreground))' }}>Your cart is empty.</p>
                    <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>Start Shopping</a>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                    {/* Cart Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {cart.map(item => (
                            <div key={item.id} className="glass" style={{ display: 'flex', padding: '1.5rem', gap: '1.5rem', borderRadius: 'var(--radius)' }}>
                                <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.category}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'hsl(var(--secondary))', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} style={{ border: 'none', background: 'hsl(var(--secondary))', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', border: 'none', background: 'none', fontSize: '0.8rem', cursor: 'pointer', marginTop: '1rem' }}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#10b981' }}>Free</span>
                        </div>
                        <hr style={{ border: '0', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Checkout Now</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
