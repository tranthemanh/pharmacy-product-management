import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ categories }) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        code: Yup.string()
            .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải có định dạng PROD-XXXX (với X là số)')
            .required('Mã sản phẩm là bắt buộc'),
        title: Yup.string()
            .max(100, 'Tên sản phẩm không được dài quá 100 ký tự')
            .required('Tên sản phẩm là bắt buộc'),
        category: Yup.string().required('Thể loại là bắt buộc'),
        date: Yup.date()
            .max(new Date(), 'Ngày nhập sản phẩm không được lớn hơn ngày hiện tại')
            .required('Ngày nhập sản phẩm là bắt buộc'),
        quantity: Yup.number()
            .integer('Số lượng sản phẩm phải là số nguyên')
            .positive('Số lượng sản phẩm phải lớn hơn 0')
            .required('Số lượng sản phẩm là bắt buộc'),
        price: Yup.number()
            .integer('Giá sản phẩm phải là số nguyên')
            .positive('Giá sản phẩm phải lớn hơn 0')
            .required('Giá sản phẩm là bắt buộc'),
    });

    const handleSubmit = (values, { resetForm }) => {
        try {
            const inputDate = new Date(values.date);

            if (!isNaN(inputDate)) {
                const formattedDate = inputDate.toLocaleDateString('vi-VN');

                axios.get('http://localhost:3004/products?code=' + values.code).then((response) => {
                    if (response.data.length > 0) {
                        toast.error("Mã sản phẩm đã tồn tại!");
                    } else {
                        const newProduct = {
                            code: values.code,
                            title: values.title,
                            category: values.category,
                            quantity: values.quantity,
                            price: values.price,
                            date: formattedDate,
                        };

                        axios.post('http://localhost:3004/products', newProduct)
                            .then(() => {
                                toast.success("Thêm sản phẩm thành công!");
                                resetForm();
                                navigate('/');
                            })
                            .catch((error) => {
                                toast.error("Lỗi khi thêm sản phẩm!");
                                console.error(error);
                            });
                    }
                }).catch((error) => {
                    toast.error("Lỗi khi kiểm tra mã sản phẩm!");
                    console.error(error);
                });

            } else {
                throw new Error("Ngày nhập không hợp lệ");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!");
            console.error("Error in handleSubmit:", error);
        }
    };

    return (
        <Formik
            initialValues={{
                code: '',
                title: '',
                category: '',
                quantity: 0,
                price: 0,
                date: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="form-container">
                    <div className="mb-3">
                        <label htmlFor="code">Mã sản phẩm</label>
                        <Field name="code" type="text" className="form-control"/>
                        <ErrorMessage name="code" component="div" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title">Tên sản phẩm</label>
                        <Field name="title" type="text" className="form-control"/>
                        <ErrorMessage name="title" component="div" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category">Thể loại</label>
                        <Field name="category" as="select" className="form-control">
                            <option value="">Chọn thể loại</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price">Giá</label>
                        <Field name="price" type="number" className="form-control"/>
                        <ErrorMessage name="price" component="div" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity">Số lượng</label>
                        <Field name="quantity" type="number" className="form-control"/>
                        <ErrorMessage name="quantity" component="div" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date">Ngày nhập sản phẩm</label>
                        <Field name="date" type="date" className="form-control"/>
                        <ErrorMessage name="date" component="div" className="text-danger"/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Thêm mới
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
