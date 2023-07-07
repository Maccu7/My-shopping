import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './product.css';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [productCart, setProductCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductCart = () => {
      const item = localStorage.getItem('product');
      if (item) {
        setProductCart(JSON.parse(item));
      }
    };

    fetchProductCart();
  }, []);

  const removeItem = (itemId: number) => {
    const updatedProducts = productCart.filter((product) => product.id !== itemId);
    setProductCart(updatedProducts);
    localStorage.setItem('product', JSON.stringify(updatedProducts));
  };

  const addToCart = (productId: number) => {
    const updatedProducts = productCart.map((product) => {
      if (productId === product.id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setProductCart(updatedProducts);
    localStorage.setItem('product', JSON.stringify(updatedProducts));
  };

  const removeFromCart = (productId: number) => {
    let updatedProducts = productCart.map((product) => {
      if (productId === product.id && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updatedProducts = updatedProducts.filter((product) => product.quantity > 0);
    setProductCart(updatedProducts);
    localStorage.setItem('product', JSON.stringify(updatedProducts));
  };

  const calculateTotalPrice = () => {
    const totalPrice = productCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return totalPrice.toLocaleString();
  };

  return (
    <div>
      <div className='whole-container'>
        <div className='container1'>
          <div className='heading'>
            <h1 className='cart'>Cart</h1>
          </div>

          <div className='line'></div>
          <div className='products-container'>
            {productCart.map((product, index) => (
              <div key={product.id} className='products'>
                <div className='image'>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className='rest1'>
                  <h3>{product.title}</h3>
                  <div className='quantity'>
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                    <span className='quantity-value'>{product.quantity}</span>
                    <button onClick={() => addToCart(product.id)}>+</button>
                  </div>
                </div>
                <div className='rest2'>
                  <p style={{ fontWeight: 'bolder' }}>{product.price * product.quantity}$</p>
                  <button className='delete-button' onClick={() => removeItem(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='container2'>
          <h2>Total price: ${calculateTotalPrice()}</h2>
          <button className='filter' style={{backgroundColor:'#ff5252',color:'white'}}>Proceed to checkout </button>
          <Link to="/" style={{cursor:"pointer"}}><button className='filter'>continue shopping</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
