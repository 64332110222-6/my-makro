require('dotenv').config()              //-- env บรรทัดแรกเสมอ

const express = require('express');    //-- import express (webserver)
// const multer = require('multer');
const cors = require('cors')
const errorHandler = require('./middlewares/error');
const notFoundHandler = require('./middlewares/notFound');
const createError = require('./utils/createError');
const authRoute = require('./routes/auth-route');
const productRoute = require('./routes/product-route');
const adminRoute = require("./routes/admin-route")
const authenticate = require('./middlewares/authenticate');
const app = express();
const port = process.env.PORT
const admin = require('./middlewares/admin');

//app.use(express());
app.use(express.json());
app.use(cors());                        //-- ข้าม port, domain
app.use('/product', productRoute);
app.use('/auth', authRoute);

//multer read file --> from date
//write file on project
//upload to cloud
//cloud --> link url
//get url in database
app.use('/admin', authenticate, admin, adminRoute);

app.use(errorHandler);
app.use('*', notFoundHandler);

app.listen(port, () => {    //-- รัน web server
    console.log(`Server is running on port ${port}`);
});
