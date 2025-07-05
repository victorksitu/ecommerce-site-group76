import React, { useState, useEffect, useMemo } from 'react';

// --- IMAGE IMPORTS ---
import tshirt from './imgs/tshirt.jpg';
import tshirt2 from './imgs/tshirt2.jpg';
import tshirt3 from './imgs/tshirt3.jpg';
import hoodie from './imgs/hoodie.jpg';
import hoodie2 from './imgs/hoodie2.jpg';
import hoodie3 from './imgs/hoodie3.jpg';
import hoodiezip from './imgs/hoodiezip.jpg';
import hoodiezip2 from './imgs/hoodiezip2.jpg';
import hoodiezip3 from './imgs/hoodiezip3.jpg';
import jeans from './imgs/jeans.jpg';
import jeans2 from './imgs/jeans2.jpg';
import jeanswomen from './imgs/jeanswomen.jpg';
import jeanswomen2 from './imgs/jeanswomen2.jpg';
import sweats from './imgs/sweats.jpg';
import sweats2 from './imgs/sweats2.jpg';
import sweatswomen from './imgs/sweatswomen.jpg';
import sweatswomen2 from './imgs/sweatswomen2.jpg';


// --- DATA -
const products = [
    // T-Shirts (Unisex)
    { id: 1, name: 'Vintage Wash T-Shirt', type: 'T-Shirt', gender: 'Unisex', price: 28.00, image: tshirt3, color: 'Olive', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 2, name: 'Classic T-Shirt', type: 'T-Shirt', gender: 'Unisex', price: 29.00, image: tshirt2, color: 'Cream', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Polyester Blend' },
    { id: 3, name: 'Essential T-Shirt', type: 'T-Shirt', gender: 'Unisex', price: 32.00, image: tshirt, color: 'Brown', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Organic Cotton' },

    // Hoodies (Unisex)
    { id: 4, name: 'Pullover Hoodie', type: 'Hoodie', gender: 'Unisex', price: 55.00, image: hoodie, color: 'Black', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 5, name: 'Pullover Hoodie', type: 'Hoodie', gender: 'Unisex', price: 60.00, image: hoodie2, color: 'Cream', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Polyester Blend' },
    { id: 6, name: 'Pullover Hoodie', type: 'Hoodie', gender: 'Unisex', price: 65.00, image: hoodie3, color: 'Charcoal', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Organic Cotton' },
    { id: 7, name: 'Zip-Up Hoodie', type: 'Hoodie', gender: 'Unisex', price: 60.00, image: hoodiezip, color: 'Black', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 8, name: 'Zip-Up Hoodie', type: 'Hoodie', gender: 'Unisex', price: 65.00, image: hoodiezip2, color: 'White', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Polyester Blend' },
    { id: 9, name: 'Zip-Up Hoodie', type: 'Hoodie', gender: 'Unisex', price: 70.00, image: hoodiezip3, color: 'Tan', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Organic Cotton' },

    // Pants (Gendered)
    { id: 10, name: 'Baggy Jeans', type: 'Jeans', gender: 'Men', price: 75.00, image: jeans, color: 'Light Wash', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Denim' },
    { id: 11, name: 'Skater Jeans', type: 'Jeans', gender: 'Men', price: 80.00, image: jeans2, color: 'Dark Wash', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Denim' },
    { id: 12, name: 'Cargo Jeans', type: 'Jeans', gender: 'Women', price: 85.00, image: jeanswomen, color: 'Dark Wash', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Denim' },
    { id: 13, name: 'Wide-Leg Jeans', type: 'Jeans', gender: 'Women', price: 78.00, image: jeanswomen2, color: 'Light Wash', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Denim' },
    { id: 14, name: 'Relaxed Sweatpants', type: 'Sweatpants', gender: 'Men', price: 50.00, image: sweats, color: 'Gray', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 15, name: 'Relaxed Sweatpants', type: 'Sweatpants', gender: 'Men', price: 50.00, image: sweats2, color: 'Black', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 16, name: 'Jogger Sweatpants', type: 'Sweatpants', gender: 'Women', price: 52.00, image: sweatswomen, color: 'Tan', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
    { id: 17, name: 'Cargo Sweatpants', type: 'Sweatpants', gender: 'Women', price: 55.00, image: sweatswomen2, color: 'Gray', size: ['XS', 'S', 'M', 'L', 'XL'], material: 'Cotton' },
];


// --- HELPER COMPONENTS ---

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out" onClick={onClose}>
            <div className="modal-content bg-white rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-transform duration-300 ease-in-out scale-95" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const QuantitySelector = ({ quantity, onDecrement, onIncrement }) => (
    <div className="flex items-center">
        <button onClick={onDecrement} className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-200">-</button>
        <span className="w-10 text-center font-semibold">{quantity}</span>
        <button onClick={onIncrement} className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-200">+</button>
    </div>
);


// --- UI COMPONENTS ---

const Header = ({ onCartClick, cartCount }) => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">Comfortablanks Co.</h1>
                <nav className="flex items-center space-x-6">
                    <a href="#products" className="text-gray-600 hover:text-gray-900">Shop</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                    <button onClick={onCartClick} className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
                    </button>
                </nav>
            </div>
        </div>
    </header>
);

const HeroSection = () => (
    <section className="text-center py-16 bg-white rounded-lg shadow-md mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Comfort made simple.</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover premium, minimalist essentials designed for everyday life. Simple, comfortable, and made to last.</p>
        <div className="mt-8 bg-indigo-100 text-indigo-800 p-4 rounded-lg inline-block">
            <p className="font-semibold">Summer Special: Get 15% off your entire order with code <span className="font-bold">COMFORT15</span>. Limited time only!</p>
        </div>
    </section>
);

const FilterSidebar = ({ filters, setFilters }) => {
    const filterOptions = {
        gender: ['Men', 'Women', 'Unisex'],
        type: ['T-Shirt', 'Hoodie', 'Jeans', 'Sweatpants'],
        material: ['Cotton', 'Polyester Blend', 'Organic Cotton', 'Denim']
    };

    const handleFilterChange = (type, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [type]: value }));
    };

    const FilterGroup = ({ title, type, options }) => (
        <div className="mb-6">
            <h4 className="font-semibold mb-3 text-gray-700">{title}</h4>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => handleFilterChange(type, 'all')} className={`px-3 py-1 border rounded-full text-sm ${filters[type] === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>All</button>
                {options.map(option => (
                    <button key={option} onClick={() => handleFilterChange(type, option)} className={`px-3 py-1 border rounded-full text-sm ${filters[type] === option ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>{option}</button>
                ))}
            </div>
        </div>
    );

    return (
        <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Filter Your Finds</h3>
                <FilterGroup title="Gender" type="gender" options={filterOptions.gender} />
                <FilterGroup title="Type" type="type" options={filterOptions.type} />
                <FilterGroup title="Material" type="material" options={filterOptions.material} />
            </div>
        </aside>
    );
};

const ProductCard = ({ product, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCartClick = () => {
        if (selectedSize) {
            onAddToCart(product, selectedSize, quantity);
            setSelectedSize(null);
            setQuantity(1);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <p className="text-gray-600 capitalize">{product.material} - {product.color}</p>
                <p className="font-bold text-xl text-gray-900 mt-2">${product.price.toFixed(2)}</p>
                
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Size:</h4>
                    <div className="flex flex-wrap gap-2">
                        {product.size.map(size => (
                            <button 
                                key={size} 
                                onClick={() => setSelectedSize(size)}
                                className={`w-10 h-10 border rounded-md text-sm flex items-center justify-center ${selectedSize === size ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Quantity:</h4>
                    <QuantitySelector 
                        quantity={quantity}
                        onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
                        onIncrement={() => setQuantity(q => q + 1)}
                    />
                </div>

                <div className="mt-auto pt-4">
                    <button 
                        onClick={handleAddToCartClick} 
                        disabled={!selectedSize}
                        className="w-full add-to-cart-btn bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {selectedSize ? `Add ${quantity} to Cart` : 'Select a size'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductGrid = ({ products, onAddToCart }) => (
    <section id="products" className="w-full lg:w-3/4">
        <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.length > 0 ? (
                products.map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)
            ) : (
                <p className="text-gray-600 col-span-full text-center py-10">No products match your filters. Try a different combination!</p>
            )}
        </div>
    </section>
);

const CartModal = ({ isOpen, onClose, cart, onRemoveFromCart, onCheckout, onUpdateCartQuantity }) => {
    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Your Cart</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.cartItemId} className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.material} - {item.color}</p>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <QuantitySelector 
                                    quantity={item.quantity}
                                    onDecrement={() => onUpdateCartQuantity(item.cartItemId, item.quantity - 1)}
                                    onIncrement={() => onUpdateCartQuantity(item.cartItemId, item.quantity + 1)}
                                />
                                <button onClick={() => onRemoveFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700 text-2xl ml-2">&times;</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Subtotal:</span>
                    <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <button onClick={onCheckout} disabled={cart.length === 0} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400">Proceed to Checkout</button>
            </div>
        </Modal>
    );
};

const CheckoutModal = ({ isOpen, onClose, onPurchaseComplete }) => {
    const [step, setStep] = useState(1);

    const handleNextStep = () => setStep(s => s + 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep(); // Move to confirmation
        setTimeout(() => {
            onPurchaseComplete();
            setStep(1); // Reset for next time
        }, 3000);
    };
    
    const handleClose = () => {
        setStep(1);
        onClose();
    }

    const StepIndicator = ({ num, label, currentStep }) => (
        <div className="step text-center">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep > num ? 'bg-green-500 text-white' : currentStep === num ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {currentStep > num ? '✓' : num}
            </div>
            <p className="text-sm mt-1">{label}</p>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Checkout</h3>
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center mb-6">
                    <StepIndicator num={1} label="Information" currentStep={step} />
                    <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
                    <StepIndicator num={2} label="Payment" currentStep={step} />
                    <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
                    <StepIndicator num={3} label="Confirmation" currentStep={step} />
                </div>

                {step === 1 && (
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Shipping Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="p-2 border rounded-md w-full" required />
                            <input type="text" placeholder="Last Name" className="p-2 border rounded-md w-full" required />
                            <input type="email" placeholder="Email Address" className="p-2 border rounded-md w-full sm:col-span-2" required />
                            <input type="text" placeholder="Address" className="p-2 border rounded-md w-full sm:col-span-2" required />
                            <input type="text" placeholder="City" className="p-2 border rounded-md w-full" required />
                            <input type="text" placeholder="Postal Code" className="p-2 border rounded-md w-full" required />
                        </div>
                        <button type="button" onClick={handleNextStep} className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Continue to Payment</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Payment Details</h4>
                        <p className="text-sm text-gray-500 mb-4">(Not actually required to continue with checkout)</p>
                        <input type="text" placeholder="Card Number" className="p-2 border rounded-md w-full mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="MM / YY" className="p-2 border rounded-md w-full" />
                            <input type="text" placeholder="CVC" className="p-2 border rounded-md w-full" />
                        </div>
                        <button type="submit" className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Pay Now</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-12">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h4 className="text-2xl font-bold text-gray-900">Thank You!</h4>
                        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
                        <p className="text-gray-600">A confirmation email has been sent.</p>
                    </div>
                )}
            </form>
        </Modal>
    );
};

const SurveyModal = ({ isOpen, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">We'd love your feedback!</h3>
                <p className="text-gray-600 mb-6">Your thoughts help us improve the comfort and quality we bring to you. Would you mind taking a quick 2-minute survey?</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label className="block text-gray-700 font-semibold mb-2">How was your shopping experience?</label>
                        <select className="p-2 border rounded-md w-full">
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Average</option>
                            <option>Poor</option>
                        </select>
                    </div>
                    <div className="mb-6 text-left">
                        <label className="block text-gray-700 font-semibold mb-2">What can we do to help your experience and what other products would you like to see?</label>
                        <textarea className="p-2 border rounded-md w-full" rows="3"></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900 font-semibold">Maybe later</button>
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700">Submit</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [cart, setCart] = useState([]);
    const [filters, setFilters] = useState({ 
        gender: 'all', 
        type: 'all', 
        material: 'all' 
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSurveyOpen, setIsSurveyOpen] = useState(false);

    const handleAddToCart = (product, size, quantity) => {
        const cartItemId = `${product.id}-${size}`;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.cartItemId === cartItemId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, size, quantity, cartItemId }];
        });
    };

    const handleUpdateCartQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(cartItemId);
        } else {
            setCart(prevCart => 
                prevCart.map(item => 
                    item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const handleRemoveFromCart = (cartItemId) => {
        setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };
    
    const handlePurchaseComplete = () => {
        setIsCheckoutOpen(false);
        setCart([]); // Clear the cart
        setIsSurveyOpen(true); // Open the survey
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const genderMatch = filters.gender === 'all' || p.gender === filters.gender;
            const typeMatch = filters.type === 'all' || p.type === filters.type;
            const materialMatch = filters.material === 'all' || p.material === filters.material;
            return genderMatch && typeMatch && materialMatch;
        });
    }, [filters]);
    
    const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <Header onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <HeroSection />
                <div className="flex flex-col lg:flex-row gap-8">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                    <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
                </div>
            </main>
            <footer className="bg-white mt-12 border-t">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
                    <p>&copy; 2025 Comfortablanks Co. All Rights Reserved.</p>
                </div>
            </footer>

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQuantity={handleUpdateCartQuantity}
                onCheckout={handleCheckout}
            />
            
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onPurchaseComplete={handlePurchaseComplete}
            />

            <SurveyModal
                isOpen={isSurveyOpen}
                onClose={() => setIsSurveyOpen(false)}
            />
        </div>
    );
}
