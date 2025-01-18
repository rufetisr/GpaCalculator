const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs')
const app = express();
const jwt = require('jsonwebtoken')

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

const mongoose = require("mongoose");
const User = require("./models/User");

const logger = require('./logger');
const requestLogger = require('./middleware/loggerMiddleware');
const { hashPassword, comparePassword } = require('./utils/hashPass');
const usernameSchema = require('./validations/usernameSchema');

// public folder
app.use(express.static('public'));
app.use(['/get-userdata', '/create-account', '/verify-email'], limiter);

app.use(cors({
    origin: `${client_url}`,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


let db_username = process.env.DB_USERNAME;
let db_password = process.env.DB_PASSWORD;
let cluster_name = process.env.CLUSTER_NAME;

// to use save feature user needs to sign in first in order to get Token
app.use(['/save-data', '/get-datatable', '/get-userdata', '/delete', '/update-profile'], authMiddleware)
app.use(['/create-account', '/save-data', '/delete'], requestLogger);

const PORT = 3000;

app.listen(PORT, () => {
    console.log('server running on port: ', PORT);
})


//api requests
app.post('/create-account', async (req, res) => {
    let { email, password, username } = req.body;
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        logger.error('Validation Error', error.details[0].message);
        return res.status(400).json({
            message: 'Validation error!',
        })
    }


    try {
        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: 'This user already exists!' });
        }

        await hashPassword(password).then(hashed => {
            password = hashed
        })

        const newUser = new User({
            email,
            username,
            password, // Consider hashing passwords for security.
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, secret_key_verifying, { expiresIn: '1h' });
        sendVerificationEmail(email, token);
        return res.status(201).json({ message: 'Please verify your email by using the link in your email', statusCode: 201 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

app.post('/login-google-account', async (req, res) => {
    let { credential } = req.body;
    let googleUserInfo = jwt.decode(credential)


    let { email, sub, name, email_verified, picture } = googleUserInfo;
    console.log(googleUserInfo);

    if (email_verified) {
        const isExist = await User.findOne({ email });

        if (!isExist) {

            await hashPassword(sub).then(hashed => {
                sub = hashed
            })

            const newUser = new User({
                email,
                username: name,
                password: sub, // Consider hashing passwords for security.
                email_verified: true,
                profilePicture: picture
            });

            const savedUser = await newUser.save();

            const token = generateToken(savedUser);

            return res.status(200).json({ message: `${savedUser.username} account successfully created and logged in`, statusCode: 200, data: { username: savedUser.username, email: savedUser.email, profilePicture: savedUser.profilePicture }, token });

            // return res.status(400).json({ message: 'This user already exists!' });
        }
        else {
            const token = generateToken(isExist);

            return res.status(200).json({ message: `${isExist.username} successfully logged in`, statusCode: 200, data: { username: isExist.username, email: isExist.email, profilePicture: picture }, token });
        }

    }
    else {
        return res.status(403).json({ message: 'Please verify your email before login!', statusCode: 403 });
    }

});

app.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret_key_verifying);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.email_verified = true;
        await user.save();


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

    } catch (error) {
        logger.error('Verification error:', error.message);
        return res.status(400).send('Expired or invalid link!');
    }
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);

    const { error } = loginSchema.validate(req.body);

    if (error) {
        logger.error('Validation Error', error.details[0].message);
        return res.status(400).json({
            message: 'Validation error!',
        })
    }


    try {
        const user = await User.findOne({ email }); // Use hashing for passwords in production.
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!user || !isPasswordMatch) {
            return res.status(401).json({ message: 'Unauthorized user access!', statusCode: 401 });
        }

        if (!user.email_verified) {
            const token = jwt.sign({ id: user._id }, secret_key_verifying, { expiresIn: '1h' });
            sendVerificationEmail(user.email, token);
            return res.status(403).json({ message: 'Please verify your email before login!', statusCode: 403 });
        }

        const token = generateToken(user);
        return res.status(200).json({ message: `${user.username} successfully logged in`, statusCode: 200, data: { username: user.username, email: user.email }, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

app.put('/update-profile', async (req, res) => {
    const { newUsername } = req.body;

    const { error } = usernameSchema.validate({
        newUsername
    })

    if (error) {

        return res.status(400).json({ message: 'Validation error!' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username: newUsername }
        )

        if (!updatedUser) {

            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Username updated successfully', data: { username: updatedUser.username, email: updatedUser.email, profilePicture: updatedUser.profilePicture } });
    } catch (error) {
        return res.status(500).json({ message: 'Error while updating user profile' });
    }
})

app.post('/save-data', async (req, res) => {
    let { points, credits, subjects } = req.body


    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.data.push({ point: points, credit: credits, subject: subjects });
        await user.save();

        res.status(200).json({ message: 'Data saved successfully', statusCode: 200 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

app.get('/get-datatable', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ data: user.data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

app.get('/get-userdata', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ username: user.username, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

app.delete('/delete/:id', async (req, res) => {
    const dataId = parseInt(req.params.id);

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedItem = user.data.splice(dataId, 1);
        await user.save();

        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }


})


mongoose.connect(`mongodb+srv://${db_username}:${db_password}@${cluster_name}.aube3.mongodb.net/?retryWrites=true&w=majority&appName=${cluster_name}`)
    .then(() => {
        logger.info('Connected to MongoDb');
    })
    .catch((err) => {
        console.log(err);

        logger.error('Connection failed to MongoDb: ', err.message);
    });