import express from 'express';
import mysql from 'mysql';
import morgan from 'morgan'

const app = express();

const PORT = 8080;

// using morgan for logs
app.use(morgan('combined'))

// create connection to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'password',
    database: 'mydb'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// test my backend middleware
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// create user
app.get('/createuser', (req, res) => {
    let data = {name: 'Hesham El Masry', email: 'heshamelmasry@example.com', password: 'password'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User created...');
    });
});

// get all users
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.json(results);
    });
});

// update user
app.get('/updateuser', (req, res) => {
    let newEmail = 'newemail@example.com';
    let sql = `UPDATE users SET email = '${newEmail}' WHERE id = 1`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User updated...');
    });
});

// delete user
app.get('/deleteuser', (req, res) => {
    let sql = 'DELETE FROM users WHERE id = 1';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User deleted...');
    });
});

app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
});
