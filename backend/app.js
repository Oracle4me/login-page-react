const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const database = require('./connection/connectDb')
const { signUp, Login, getUsers, forgotPass, resetPassword } = require('./controller/authControlLogin')
const requireAuth = require('./middleware/requireAuth');
const app = express();
const port = 3001

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "CREATE", "DELETE"]
  }
))
app.use(bodyParser.urlencoded({ extended: true }))

// Connect Database
database()

// Login Page Routing
app.get('/api/users', requireAuth, getUsers)
app.post('/api/register', signUp)
app.post('/api/login', Login)
app.post('/api/forgot-pass', forgotPass)
app.post('/api/reset_password/:id/:token', resetPassword)

// Listen port url
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})