
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const product = require('./product.js');
const cors = require('cors');

const connectionString = "mongodb+srv://rajvisadatiya:Rajvi%400410@cluster0.ueo7e.mongodb.net/product";
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected with cloud database');

        const app = express();
        app.use(cors());
        app.use(express.json())
 // Use express.json() to parse JSON bodies

        // Get all products
        app.get('/products', async (req, res) => {
            try {
                const ans = await product.find();
                res.status(200).send(ans);
            } catch (error) {
                res.status(500).send({ message: 'Error fetching products' });
            }
        });

        // Get product by ID (assuming you're using _id)
        app.get('/products/:id', async (req, res) => {
            try {
                const ans = await product.findById(req.params.id);
                if (!ans) {
                    return res.status(404).send({ message: 'Product not found' });
                }
                res.status(200).send(ans);
            } catch (error) {
                res.status(500).send({ message: 'Error fetching product' });
            }
        });

        // Create a new product
        app.post('/products', async (req, res) => {
            try {
                const pro = new product({ ...req.body });
                const ans = await pro.save();
                res.status(201).send(ans);
            } catch (error) {
                res.status(400).send({ message: 'Error creating product' });
            }
        });

        // Update product endpoint in your Express app
app.patch('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate against your schema
        });
        
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).send({ message: "Error updating product", error: error.message });
    }
});


        // Delete product by ID (assuming you're using _id)
        app.delete('/products/:id', async (req, res) => {
            try {
                const ans = await product.deleteOne({ _id: req.params.id });
                if (ans.deletedCount === 0) {
                    return res.status(404).send({ message: 'Product not found' });
                }
                res.status(200).send({ message: 'Product deleted' });
            } catch (error) {
                res.status(500).send({ message: 'Error deleting product' });
            }
        });

        // Start the server
        app.listen(3010, () => {
            console.log('Server started on port 3010');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });




