const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
const User = require('./models/user')

const productRoutes = require('./routes/products')
const authRoutes = require('./routes/auth');

// Database Config
mongoose.connect('mongodb+srv://userC01:Website123@comeds0.iglnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`MongoDB Connected`)
    })
    .catch(err => {
        console.log(`Database Error!!!`);
        console.log(err);
    })


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'));
const sessionConfig = ({
    secret: 'thiscouldbeabetteersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user', authRoutes);
app.use('/', productRoutes);

app.get('/', (req, res) => {
    res.send("Hi there!!!")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})