import React from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="py-3">
            <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/')}>
                    Danh sách sản phẩm
                </button>
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/add-product')}>
                    Thêm mới
                </button>
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/search')}>
                    Tìm kiếm sản phẩm
                </button>
            </div>
        </header>
    );
};

export default Header;
