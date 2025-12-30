import { useCart } from '../App';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    return (
        <div className="glass" style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                }}>
                    ★ {product.rating}
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {product.category}
                </p>
                <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'hsl(var(--muted-foreground))',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}>
                    {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>${product.price}</span>
                    <button
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
