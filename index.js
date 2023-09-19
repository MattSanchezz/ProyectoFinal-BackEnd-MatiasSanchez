import fs from 'fs';

class ProductManager {
  constructor(filename) {
    this.products = [];
    this.filename = filename;
    if (fs.existsSync(filename)) {
      this.loadFromFile(filename);
    } else {
      this.saveToFile(filename);
    }
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    const checkItems = title && description && price && code && thumbnail && stock;
    if (!checkItems) {
      console.log('Faltan ítems');
      return;
    }

    const codeProduct = this.products.find((product) => product.code === code);
    if (codeProduct) {
      console.log(`El código ${code} ya existe`);
      return;
    }

    const product = {
      id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    console.log(product);
  }

  getProducts() {
    return this.products;
  }

  getProductsById(idProduct) {
    const product = this.products.find((e) => e.id === idProduct);
    if (!product) {
      return 'Not Found';
    }
    return product;
  }

  updateProduct(idProduct, updatedData) {
    const productIndex = this.products.findIndex((product) => product.id === idProduct);
    if (productIndex === -1) {
      return 'Producto no encontrado';
    }
    const updatedProduct = { ...this.products[productIndex], ...updatedData };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(idProduct) {
    const productIndex = this.products.findIndex((product) => product.id === idProduct);
    if (productIndex === -1) {
      return 'Producto no encontrado';
    }
    this.products.splice(productIndex, 1);
    return 'Producto eliminado';
  }

  saveToFile(filename) {
    const data = JSON.stringify(this.products, null, 2);
    try {
      fs.writeFileSync(filename, data);
      console.log(`Los productos se han guardado en ${filename}`);
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  loadFromFile(filename) {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      this.products = JSON.parse(data);
      console.log(`Los productos se han cargado desde ${filename}`);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }
}

const productManager = new ProductManager('productos.json');
export default productManager;