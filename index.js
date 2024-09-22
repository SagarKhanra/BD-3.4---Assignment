const express = require('express');
const app = express();
const port = 3010;
const cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToCart(productId, name, price, quantity) {
  let newProduct = {
    productId,
    name,
    price,
    quantity,
  };
  cart.push(newProduct);
  return cart;
}

app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseInt(req.query.price);
  const quantity = parseInt(req.query.quantity);

  const result = addToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

function updateQuantity(productId, quantity) {
  const product = cart.find((item) => item.productId === productId);
  if (product) {
    product.quantity = quantity;
    return cart;
  } else {
    return cart;
  }
}

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);

  const result = updateQuantity(productId, quantity);
  res.json({ cartItems: result });
});

function cartRemove(productId) {
  return cart.filter((item) => item.productId !== productId);
}

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  const result = cartRemove(productId);
  cart = result;
  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  const result = calculateQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  const result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
