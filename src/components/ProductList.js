import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [books, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3004/products').then((response) => {
            // Sắp xếp các sản phẩm tăng dần theo title bằng localeCompare
            setProducts(response.data.sort((a, b) => a.title.localeCompare(b.title)));
        });
    }, []);

    return (
        <div>
            <h3>Danh sách sản phẩm</h3>
            <table className="table table-bordered">
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
                {books.map((product) => (
                    <tr key={product.id}>
                        <td>{product.code}</td>
                        <td>{product.title}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
