const User = require('../models/login')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
    res.json({ error: "Unable get User" })
  }
}

const signUp = async (req, res) => {
  try {
    // Dapatkan semua schema dari body
    const { email, password, confirmPassword } = req.body;
    if (!email || !password) return res.status(400).send({ msg: "Email or Password are both required" })
    if (password !== confirmPassword) return res.status(400).send({ msg: "Password doesn't match" })
    const exist = await User.findOne({ email })
    if (exist) return res.status(400).send({ msg: "Email already use" })
    // HashPassword
    const pass = bcrypt.genSaltSync(8) // minimal 10char
    const HashPass = bcrypt.hashSync(password, pass);

    // Tunggu untuk password di hash
    const user = await User.create({
      email,
      password: HashPass,
    })
    res.json({ user })
  } catch (err) {
    res.sendStatus(404)
    console.log(err)
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ msg: "Email or Password are both required" })
    // Get the username and email by findOne
    const user = await User.findOne({ email })

    if (!user) return res.status(400).send({ msg: "Incorect email" })

    // Compare your pass when you sign up 
    const hashCompare = bcrypt.compareSync(password, user.password)
    if (!hashCompare) return res.status(400).send({ msg: "Incorect password" });

    // Try to get token with jwt.sign
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    })

    res.json({ email, accessToken })
  }
  catch (err) {
    res.sendStatus(404)
  }
}

const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ msg: "Email doesn't exist" })

    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    })
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'example@gmail.com', // Gunakan Email anda
        pass: '...' // App password jika 2FA aktif
      }
    });

    var mailOptions = {
      from: 'admin@gmail.com',
      to: email,
      subject: 'Reset your password',
      text: `http://localhost:3000/reset_password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Failed to send email' });
      } else {
        return res.status(200).json({ Status: 'Success' });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}

const resetPassword = (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.json({ Status: "Error with token" })
    } else {
      bcrypt.hash(password, 10)
        .then(hash => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(() => res.send({ Status: "Success" }))
            .catch(err => res.send({ Satus: "Error Updating Password", Error: err }))
        })
        .catch(err => res.send({ Status: "Error hashing password", Error: err }))
    }
  })
}



module.exports = {
  getUsers,
  signUp,
  Login,
  forgotPass,
  resetPassword
}