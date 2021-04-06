const {Task} = require("../models")
const jwt = require("jsonwebtoken")

async function isAuthorized(req, res, next) {
	try {
		let result = jwt.verify(req.headers.access_token, process.env.SECRET_CODE || "secret")
    let task = await Task.findByPk(+req.params.id)

    //cek kalau user yg request itu admin
    if(req.user.privilege === "admin") {
      next()

    } else { //kalau bukan admin, cek apakah userid task tersebut sesuai
      if(task && result.id !== task.UserId ) throw {name: "Unauthorized"} 

      next()
    }
	} 
  
	catch(err) {
    next(err)
	}	
}

module.exports = isAuthorized