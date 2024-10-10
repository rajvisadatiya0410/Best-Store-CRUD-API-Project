import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
    const params = useParams();
    const [initialData, setInitialData] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    // Fetch product details based on the ID in URL
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3010/products/${params.id}`);
            setInitialData(response.data);
        } catch (error) {
            alert("Unable to read the product details");
        }
    };

    // Fetch product data when the component mounts
    useEffect(() => {
        getProduct();
    }, [params.id]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());

        // Validate form fields
        if (!product.name || !product.brand || !product.category || !product.price || !product.description) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:3010/products/${params.id}`, product);
            if (response.status === 200) {
                navigate("/admin/products");
            } else if (response.status === 400) {
                setValidationErrors(response.data); // Assuming your backend sends validation errors this way
            } else {
                alert("Unable to update the product");
            }
        } catch (error) {
            console.error("Error updating product:", error); // Log error for debugging
            alert("Unable to connect to the server!");
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input
                                readOnly
                                className="form-control-plaintext"
                                defaultValue={params.id} // Display product ID
                            />
                        </div>
                    </div>

                    {initialData && (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Name</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="name"
                                        defaultValue={initialData.name}
                                    />
                                    <span className="text-danger">{validationErrors.name}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Brand</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="brand"
                                        defaultValue={initialData.brand}
                                    />
                                    <span className="text-danger">{validationErrors.brand}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Category</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-select"
                                        name="category"
                                        defaultValue={initialData.category}
                                    >
                                        <option value="other">Other</option>
                                        <option value="phones">Phones</option>
                                        <option value="computers">Computers</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="printers">Printers</option>
                                        <option value="cameras">Cameras</option>
                                    </select>
                                    <span className="text-danger">{validationErrors.category}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Price</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="1"
                                        defaultValue={initialData.price}
                                    />
                                    <span className="text-danger">{validationErrors.price}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Description</label>
                                <div className="col-sm-8">
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="3"
                                        defaultValue={initialData.description}
                                    ></textarea>
                                    <span className="text-danger">{validationErrors.description}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="offset-sm-4 col-sm-4 d-grid">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                                <div className="col-sm-4 d-grid">
                                    <Link className="btn btn-secondary" to="/admin/products" role="button">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
