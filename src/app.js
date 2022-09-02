const express = require('express');
const app = express();
require('./db/conn');
const Register = require('./models/registers')
const path = require('path')
const hbs = require('hbs')

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../template/views')
const partials_path = path.join(__dirname, '../template/partials')


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path)
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})

// create a new user in our database
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {

            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
            const registerd = await registerEmployee.save()
            res.status(201).render("index")

        }
        else {
            res.send('passowrd are not matching')
        }
    } catch (error) {
        res.status(400).send(error)
    }

})
// login check

app.post('/login', async (req, res) => {
    try {
     
        const email = req.body.email;
        const password = req.body.password;
       const useremail = await Register.findOne({email:email});
       res.send(useremail.password);
       console.log(useremail.password);

    } catch (error) {
        res.status(400).send('invalid Email')
    }
 
})





app.listen(port, () => {
    console.log(`The server is running port ${port}`)
});
