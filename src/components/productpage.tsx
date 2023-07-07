import React, { useEffect, useState } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './product.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number; 
}

const ProductPage: React.FC = () => {
  const [allProducts, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts([...data]);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('product');
    if (item) {
      const cartItems: Product[] = JSON.parse(item);
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }
  }, []);

  const handleAddToCart = (selectedProduct: Product) => {
    let listOfProducts: Product[] = JSON.parse(localStorage.getItem('product') || '[]');
    let found = false;
  
    listOfProducts.forEach((product, index) => {
      if (selectedProduct.id === product.id) {
        if (product.quantity >= 0) {
          product.quantity = product.quantity + 1;
        }
        listOfProducts[index] = { ...product };
        found = true;
      }
    });
  
    if (!found) {
      listOfProducts.push({ ...selectedProduct, quantity: 1 });
    }
  
    localStorage.setItem('product', JSON.stringify(listOfProducts));
    setCartCount((prevCount) => prevCount + 1);
  };
  

  return (
    <div className="container">
      <div className="heading">
        <h1 className='filter'>Filter</h1>
        <Link to="/cart">
          <div className="cart-icon">
            <GiShoppingCart className="icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </Link>
        <h1 className='filter'>Sort</h1>
      </div>
      <div className="product-container">
        {allProducts.map((product) => (
          <div key={`pod_${product.id}`} className="product" onClick={() => handleAddToCart(product)}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 40)}...</p>
            <p>{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
