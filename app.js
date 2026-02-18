const express = require('express');
const app = express();
const port = 3000;

let products = [
    {id: 1, name: 'Ноутбук', price: 50000},
    {id: 2, name: 'Мышь', price: 1000},
    {id: 3, name: 'Клавиатура', price: 3000},
];

app.use(express.json());

app.get('/', (req, res) => { res.send('API товаров готово'); });

app.get('/products', (req, res) => { res.json(products); });

app.get('/products/:id', (req, res) => { 
    let product = products.find(p => p.id == req.params.id); 
    if (!product) return res.status(404).send('Товар не найден'); 
    res.json(product); 
});

app.post('/products', (req, res) => { 
    const { name, price } = req.body; 
    if (!name || !price) return res.status(400).send('Нужны name и price'); 
    const newProduct = { id: Date.now(), name, price }; 
    products.push(newProduct); 
    res.status(201).json(newProduct); 
});

app.patch('/products/:id', (req, res) => { 
    let product = products.find(p => p.id == req.params.id); 
    if (!product) return res.status(404).send('Товар не найден'); 
    const { name, price } = req.body; 
    if (name !== undefined) product.name = name; 
    if (price !== undefined) product.price = price; 
    res.json(product); 
});

app.delete('/products/:id', (req, res) => { 
    const initialLength = products.length; 
    products = products.filter(p => p.id != req.params.id); 
    if (products.length === initialLength) return res.status(404).send('Товар не найден'); 
    res.send('Ok'); 
});

app.listen(port, () => { console.log(`Сервер запущен на http://localhost:${port}`); });
