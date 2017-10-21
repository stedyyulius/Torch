let User = require('../models/user')
let helper = require('../helpers/login')

const login = (req,res) => {
  if (typeof req.body.email === 'undefined') res.send({err: 'Email must be filled'})
  else if (typeof req.body.password === 'undefined') res.send({err: 'Password must be filled'})
  else {
    let email = req.body.email
    let password = req.body.password
    let token = ''

    User.findOne({email: email},
      (err,user) => {
        if (err || user === null) res.send({err:'Invalid Email / Password'})
        else if (!helper.checkPassword(password,user.password)) res.send({err: 'Invalid Email / Password'})
        else {
          let userDt = {
            _id : user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            komsel: user.komsel
           }
          token = helper.createToken(userDt)
          res.send({token: token})
        }
      }
    )
  }
}

const register = (req,res) => {

  if (typeof req.body.name === 'undefined') res.send({err: 'Name must be filled'})
  else if (typeof req.body.email === 'undefined') res.send({err: 'Email must be filled'})
  else if (typeof req.body.password === 'undefined') res.send({err: 'Password must be filled'})
  else if (typeof req.body.phone === 'undefined') res.send({err: 'Phone must be filled'})
  else {
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone

    })

    user.save((err,n_user)=> {
      if (err){
        let err_msg = []
        if (typeof err.errors != 'undefined')
          for(let key in err.errors) err_msg.push(err.errors[key].message)
        res.send ({err: err_msg.length > 0 ? err_msg.join(',') : err})
      }
      else res.send(n_user)

    })
  }
}

module.exports = {
  login,
  register
}