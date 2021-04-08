const {Task} = require("../models")

async function isAuthorized(req, res, next) {
	try {
    let task = await Task.findByPk(+req.params.id)

    //cek kalau user yg request itu admin
    if(req.user.privilege === "admin") {
      next()

    } else { //kalau bukan admin, cek apakah userid task tersebut sesuai
      if(task && req.user.id !== task.UserId ) throw {name: "Unauthorized"} 

      next()
    }
	} 
  
	catch(err) {
    next(err)
	}	
}

module.exports = isAuthorized