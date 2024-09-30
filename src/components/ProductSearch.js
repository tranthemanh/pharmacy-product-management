import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductSearch = ({ categories }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        axios.get('http://localhost:3004/products').then((response) => {
            const filteredProducts = response.data.filter(
                (product) =>
                    (!searchTitle ||
                        product.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
                    (!searchCategory ||
                        product.category.toLowerCase() === searchCategory.toLowerCase())
            );
            setResults(filteredProducts);
        });
    };

    useEffect(() => {
        handleSearch();
    }, [searchTitle, searchCategory]);

    return (
        <div>
            <h3>Tìm kiếm sản phẩm</h3>
            <div className="mb-3">
                <label htmlFor="title">Tên sản phẩm</label>
                <input
                    type="text"
                    className="form-control"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="category">Thể loại</label>
                <select
                    className="form-control"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Tìm kiếm
            </button>

            {results.length === 0 ? (
                <p>Không có kết quả</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thể loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Ngày nhập sản phẩm</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((product) => (
                        <tr key={product.id}>
                            <td>{product.code}</td>
                            <td>{product.title}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
                            <td>{product.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductSearch;

