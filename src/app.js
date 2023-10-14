const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');
const session = require('express-session');
const cookie = require('cookie-parser');
const cookieExist = require('./middlewares/cookieMiddleware');
const productApiRouter = require('./routes/api/productApiRoutes')
const userApiRouter = require('./routes/api/userApiRoutes')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookie())

app.use(session({
    secret: 'My secret o-o',
    resave: false,
    saveUninitialized: false
}))

app.use(userLoggedMiddleware)

app.use(cookieExist);

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/products' ,productRoutes);

app.use('/api/products', productApiRouter)
app.use('/api/users', userApiRouter)

app.get('/404', (req, res)=>{
    res.send('Error página no encontrada')
});

app.listen(3007, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3007!');
});