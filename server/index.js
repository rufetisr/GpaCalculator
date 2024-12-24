const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs')
const app = express();
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const registerSchema = require('./validations/register')
const loginSchema = require('./validations/login')
const generateToken = require('./utils/generateToken')

const authMiddleware = require('./middleware/authMiddleware');
const sendVerificationEmail = require('./utils/sendMail');
const limiter = require('./utils/limitApiRequest');
const Joi = require('joi');

const secret_key_verifying = process.env.SECRET_KEY_VERIFYING
// const sendVerificationEmail = require('./utils/sendMail');
const client_url = process.env.CLIENT_URL;


// public folder
app.use(express.static('public'));
app.use('/get-userdata', limiter);

app.use(cors({
    origin: `${client_url}`,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// to use save feature user needs to sign in first in order to get Token
app.use(['/save-data', '/get-datatable', '/get-userdata', '/delete'], authMiddleware)

const PORT = 3000;

app.listen(PORT, () => {
    console.log('server running on port: ', PORT);
})

// api requests

let all_users = []

fs.readFile('./json/users.json', (err, data) => {
    if (!err) {
        all_users = JSON.parse(data);
        console.log("all_users", all_users);

    }
})

//api requests
app.post('/create-account', (req, res) => {
    const { email, password, username } = req.body;
    const { error, value } = registerSchema.validate(req.body);
    console.log("value", value);

    if (error) {
        console.log('Validation Error', error.details[0].message);
        return res.status(400).json({
            message: 'Validation error!',
        })
    }

    let isExist = all_users.users.find((user) => {
        return user.email == email
    })
    if (isExist) {
        console.log('user already existst');

        return res.status(400).json({ message: 'This user already exists!' })
    }

    // Generate a unique ID
    const userId = uuidv4();


    all_users.users.push({
        id: userId,
        email: email,
        username: username,
        password: password,
    });

    const token = jwt.sign({ id: userId }, secret_key_verifying, { expiresIn: '1h' })
    console.log(token);

    fs.writeFile('./json/users.json', JSON.stringify(all_users), (err) => {
        if (!err) {
            sendVerificationEmail(email, token)
            return res.status(201).json({ message: "Please verify your email by using the link in your email", statusCode: 201 });
        }
    })
})


app.get('/verify-email', (req, res) => {
    console.log('query: ', req.query);
    const { token } = req.query;
    try {
        // Verify the token
        const decoded = jwt.verify(token, secret_key_verifying);
        const userId = decoded.id;

        // Update user status to "email_verified = true" in the database
        all_users = all_users.users.map((user) => {
            if (user.id == userId) {
                user.email_verified = true;
            }
            return user;
        })

        all_users = {
            users: all_users
        }

        fs.writeFile('./json/users.json', JSON.stringify(all_users), (err) => {
            if (!err) {
                const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verifying</title>

            <style> 
             *{
                 font-family: 'Poppins', sans-serif;
                 box-sizing: border-box;
                }    
              body{
                    text-align: center;
                 }
                a{
                 background: aquamarine;
                 padding: 10px 20px;
                 border: 1px solid;
                 text-decoration: none;
                }                 
            </style>
        </head>
        <body>
            <img src="/icon-verified.png" alt="Verified Image" style="max-width: 300px;">
            <p>Email verified successfully! Now you can login to your account from Login page.</p>
            <a href = ${client_url + '/login'}>Login</a>
        </body>
        </html>`;

                return res.status(200).send(htmlContent);
            }
        })
    } catch (error) {
        console.error('Verification error:', error.message);
        return res.status(400).send('Expired link!');
    }
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        console.log('Validation Error', error.details[0].message);
        return res.status(400).json({
            message: 'Validation error!',
        })
    }

    let userIsExist = all_users.users.find((user) => {
        return user.email == email && user.password == password
    })


    if (userIsExist) {

        if (userIsExist.email_verified) {
            let token = generateToken(userIsExist);
            console.log('send to user token: ', token);

            return res.status(200).json(
                {
                    message: `${userIsExist.username} successfully logged in `,
                    statusCode: 200,
                    token: token
                })
        }
        else {
            const token = jwt.sign({ id: userIsExist.id }, secret_key_verifying, { expiresIn: '1h' })
            sendVerificationEmail(email, token)

            return res.status(403).json({ message: "Please verify your email before login!", statusCode: 400 })
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized user access!", statusCode: 401, })
    }
})


app.post('/save-data', (req, res) => {
    let { points, credits } = req.body

    console.log(req.body);

    console.log(req.user);

    // let user = all_users.users.find((user) => {
    //     return user.username == req.user.username
    // })

    if (req.user) {
        all_users = all_users.users.map((user) => {
            if (user.id == req.user.id) {
                if (!user.data) {
                    user.data = []; // Ensure `data` is initialized
                }
                user.data.push({
                    point: points,  // points should be an array
                    credit: credits // credits should be an array
                });
            }
            return user;
        })

        all_users = {
            users: all_users
        }

        fs.writeFile('./json/users.json', JSON.stringify(all_users), (err) => {
            if (!err) {
                console.log('Data saved successfully');
                return res.status(200).json({ message: "Data saved successfully", statusCode: 200 });

            }
        })
    }
})

app.get('/get-datatable', (req, res) => {
    let getUser = all_users.users.find((user) => user.id == req.user.id)
    console.log('data: ', getUser.data);

    return res.status(200).json({ data: getUser.data });
})

app.get('/get-userdata', (req, res) => {
    let getUser = all_users.users.find((user) => user.id == req.user.id)
    console.log('data: ', getUser.username);

    return res.status(200).json({
        username: getUser.username,
        email: getUser.email,
    });
})

app.delete('/delete/:id', (req, res) => {
    const dataId = parseInt(req.params.id);
    console.log(dataId);

    const schema = Joi.object({
        id: Joi.number().integer().required(),
    })
    const { error } = schema.validate({ id: dataId });

    if (error) {
        return res.status(400).json({ message: 'Id is not in correct type' });
    }
    let deletedItem = {};

    all_users.users.map((user) => {
        if (user.id == req.user.id) {
            console.log('found');
            deletedItem = user?.data?.splice(dataId, 1);
        }
        return user;
    })

    fs.writeFile('./json/users.json', JSON.stringify(all_users), (err) => {
        if (!err) {
            console.log('Item deleted successfully');
            return res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
        }
        else {
            console.log('Something went wrong!');
            res.status(404).json({ message: 'Something went wrong!' });
        }
    })


})
