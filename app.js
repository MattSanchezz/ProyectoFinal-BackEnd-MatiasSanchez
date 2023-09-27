import express from 'express';
import { productManager, CartManager } from './index.js';

const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductsById(productId);

  if (product === 'Not Found') {
    res.status(404).json({ message: 'El producto no se ha encontrado' });
  } else {
    res.json({ product });
  }
});

app.post('/products', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  productManager.addProducts(title, description, price, thumbnail, code, stock);

  res.status(201).json({ message: 'Producto agregado con éxito' });
});

app.put('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedData = req.body;

  const updatedProduct = productManager.updateProduct(productId, updatedData);

  if (updatedProduct === 'Producto no encontrado') {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json({ product: updatedProduct });
  }
});

app.delete('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  const result = productManager.deleteProduct(productId);

  if (result === 'Producto no encontrado') {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json({ message: 'Producto eliminado con éxito' });
  }
});

app.get('/carts', (req, res) => {
  const carts = CartManager.getAllCarts();
  res.json({ carts });
});

app.get('/carts/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = CartManager.getCartById(cartId);

  if (cart) {
    res.json({ cart });
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

app.post('/carts/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = 1;

  const result = CartManager.addToCart(cartId, productId, quantity);

  if (result === 'Carrito no encontrado') {
    res.status(404).json({ message: 'Carrito no encontrado' });
  } else if (result === 'Producto no encontrado') {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
})