import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios

export default function ProductList() {
    const [products, setProducts] = useState([]);

    // Function to get products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3010/products');
            setProducts(response.data);  // Set the response data to products state
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Call fetchProducts when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to delete a product by id
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3010/products/${id}`);
            fetchProducts();  // Refresh the products list after deletion
        } catch (error) {
            alert('Unable to delete the product');
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">
                        Create Product
                    </Link>
                    <button type="button" className="btn btn-outline-primary" onClick={fetchProducts}>
                        Refresh
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product._id}</td> {/* Assuming MongoDB's _id field */}
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                <Link className="btn btn-sm btn-primary me-1" to={`/admin/products/edit/${product._id}`}>
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
