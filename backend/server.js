const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/Users.route');
const clocking = require('./routes/Clocking.route');
const dashboard = require('./routes/Dashboard.route');
const news = require('./routes/News.route');
const payslip = require('./routes/Payslip.route');
const schedule = require('./routes/Schedule.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${ err.message }`);
    });

// User Routes
app.use('/users', users);
app.use('/clocking', clocking);
app.use('/dashboard', dashboard);
app.use('/news', news);
app.use('/payslip', payslip);
app.use('/schedule', schedule);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));