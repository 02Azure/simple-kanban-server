const {User} = require("../models")
const jwt = require("jsonwebtoken")
const isPasswordCorrect = require("../helpers/password-checker")
const {OAuth2Client} = require('google-auth-library');

class IndexController {
	static async login(req, res, next) {
		let input = {
			username: req.body.username,
			password: req.body.password
		}	

		try{
			let user = await User.findOne({
				where: {
					username: input.username
				}
			})
			
			if(user && isPasswordCorrect(input.password, user.password)) {
				let token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_CODE || "secret")
				
				res.status(200).json({access_token: token, username: input.username})
				
			} else {
				throw {name: "InvalidUserOrPassword"}
			}
		}
		
		catch(err) {
      next(err)
		}
	}

  static async googleLogin(req, res, next) {
		let token = req.body.id_token
    let email
    let username

    const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID
    })
    .then(ticket => {
      let payload = ticket.getPayload()
      email = payload.email
      username = email

      return User.findOne({
        where: {
          email: email
        }
      })
    })

    .then(user => {
      if(user) {
        return user

      } else {
        let input = {
          username: username,
          email: email,
          password: "googleUser" + Math.random() * 54321 
        }

        return User.create(input, {skip: ["username"]})
      }
    })

    .then(user => {
      let token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_CODE || "secret")
				
      res.status(200).json({access_token: token, username: user.username})
    })

    .catch(err => {
      next(err)
    })
	}

	static async register(req, res, next) {
		let input = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
      status: "iseng"
		}
		
		try{
			let newUser = await User.create(input)
			res.status(201).json({
				id: newUser.id,
				username: newUser.username,
				email: newUser.email
			})	
		}
		
		catch(err) {
      next(err)
		}	
	}
}

module.exports = IndexController