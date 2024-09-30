import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get('http://localhost:3004/categories').then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
      <Router>
        <div className="container">
          <h1 className="text-center my-4">Hệ thống quản lý sản phẩm - TIT Pharmacy</h1>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm categories={categories} />} />
            <Route path="/search" element={<ProductSearch categories={categories} />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
  );
}

export default App;
