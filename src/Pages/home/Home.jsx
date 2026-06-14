import api from '../../api.js';
import { useEffect, useState } from 'react';
import Header from '../../Components/Header.jsx';
import { ProductsGrid } from './ProductsGrid.jsx';
import { useSearchParams } from 'react-router';
import '../CSS Pages/Home-index.css';
function HomePage({ cart, loadCart }) {
  const [products, setProduct] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  useEffect(() => {
    const getProducts = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await api.get(urlPath); 
      setProduct(response.data);
    }
    getProducts();
  }, [search])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>);
}

export default HomePage;