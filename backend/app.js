import express from 'express';
import bodyParser from 'body-parser';
import fs from 'node:fs/promises';
import { log } from 'node:console';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// available meals
app.get('/available-meals', async (req, res) => {
  const fileContent = await fs.readFile('./data/available-meals.json');
  const availableMeals = JSON.parse(fileContent);
  res.status(200).json({ availableMeals: availableMeals });
});

// cart
app.get('/cart', async (req, res) => {
  const fileContent = await fs.readFile('./data/cart.json');
  const cartData = JSON.parse(fileContent);
  res.status(200).json({ cartMeals: cartData });
});

app.put('/cart', async (req, res) => {
  const cartMeals = req.body.cartMeals;
  await fs.writeFile('./data/cart.json', JSON.stringify(cartMeals));
  res.status(200).json({ message: 'cart was updated' });
});

// orders

app.put('/orders', async (req, res) => {
  const orderInfo = req.body.orderInfo;
  try {
    const existingOrders = await fs.readFile('./data/orders.json');
    const orders = JSON.parse(existingOrders);
    orders.push(orderInfo);
    await fs.writeFile('./data/orders.json', JSON.stringify(orders));
    res.status(200).json({ message: 'Orders were updated' });
  } catch (error) {
    console.error('Error updating orders:', error);
    res.status(500).json({ error: 'Failed to update orders' });
  }
});

//other
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - not found' });
});

app.listen(PORT, () => {
  console.log('server is up and running on port', PORT);
});
