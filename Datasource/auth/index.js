const fs = require('fs');
const express = require('express');
const vali = require('validator');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500', methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
let data;
try {
    data = JSON.parse(fs.readFileSync(__dirname + '/authentication.json', 'utf-8'));
} catch (error) {
    console.error('Error reading authentication.json:', error);
    data = { admins: [], Customers: [], seller: [] };
}

app.post('/auth/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!vali.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    let user;

    if (role === 'admin') {
        user = data.admins.find(user => user.email === email);
    } else if (role === 'customer') {
        user = data.Customers.find(user => user.email === email);
    } else if (role === 'seller') {
        user = data.seller.find(user => user.email === email);
    }
    if (user && user.password === password) {
        return res.json({ message: 'Login successful!', user: { email: user.email, role } });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/auth/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!vali.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password || password.length < 8) {
        return res.status(400).json({ message: 'Password is weak' });
    }



    if (role === 'customer') {
        const existingCustomer = data.Customers.find(user => user.email === email);
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        data.Customers.push({ name, email, password, role });
    } else if (role === 'seller') {
        const existingSeller = data.seller.find(user => user.email === email);
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        data.seller.push({ email, password, role });
    }

    fs.writeFileSync(__dirname + '/authentication.json', JSON.stringify(data, null, 2));
    return res.json({ message: 'Signup successful! Please log in.' });
});

app.get('/auth', (req, res) => {
    data.admins.map(user => {
        return res.json({ message: 'Login successful!', user: { email: user.email, role: user.role } });
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
