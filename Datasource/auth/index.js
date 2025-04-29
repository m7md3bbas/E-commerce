const fs = require('fs');
const express = require('express');
const vali = require('validator');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

let data;
try {
    data = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
} catch (error) {
    console.error('Error reading user.json:', error);
    data = { admins: [], Customers: [], seller: [] };
}

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!vali.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const userTypes = ['admins', 'Customers', 'seller'];
    for (let type of userTypes) {
        const user = data[type]?.find(u => u.email === email);
        if (user && await bcrypt.compare(password, user.password)) {
            return res.json({ message: 'Login successful!', user: { email: user.email, role: user.role } });
        }
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/auth', (req, res) => {
    res.json({ message: 'Endpoint not available for security reasons' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
