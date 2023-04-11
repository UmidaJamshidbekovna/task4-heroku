const express = require('express')
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connection = require('./connection')

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');

});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('client'))

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    let id = 0;
    connection.query( `select count(*) from users;`,(err, res)=>{
        id = res[0]['count(*)'];
        const sql = `INSERT INTO users (id,name, email, password) VALUES ('${res[0]['count(*)']+1}', '${name}', '${email}', '${password}')`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.error(err);
            }
        });
    })
    res.json({ success: true });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging in user');
        } else {
            if (results.length === 0) {
                res.status(401).send('Incorrect email or password');
            } else {
                const id = results[0].id;
                const token = 'some_token'; // Generate a JWT or session token here
                res.json({ id, token });
            }
        }
    });
});
app.get('/check-user', (req, res) => {
    const { email } = req.query;
    const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error checking user');
        } else {
            const count = results[0].count;
            const exists = count > 0;
            res.json({ exists });
        }
    });
});

//TABLE DATA
app.get('/table', (req, res)=>{
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        // console.log( results);
        res.send(results);

    });
})
app.delete("/table/:id", (req, res) => {
    const { id } = req.params;

    connection.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error deleting data");
            } else {
                res.send("Data deleted successfully");
            }
        }
    );
});

//Status Active
app.put('/status/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const query = `UPDATE users SET status=${status} WHERE id=${id}`;

    try {
        const results = await connection.query(query);
        res.send(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});




app.listen(3000, ()=>{
    console.log('Server started working');
})
