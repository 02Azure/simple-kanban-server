const {User} = require("../models")
const jwt = require("jsonwebtoken")
const isPasswordCorrect = require("../helpers/password-checker")

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

	static async register(req, res, next) {
		let input = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
      status: "iseng"
		}
		
		try{
      console.log(input)
			let newUser = await User.create(input)
			console.log(newUser)
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