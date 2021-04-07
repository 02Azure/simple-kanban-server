function errorHandler(err, req, res, next) {
  let code = 500
  let msgs = "Internal Server Error"
  
  if(err.name === "SequelizeValidationError") {
    code = 400
    msgs = err.errors.map(error => error.message)

  } else if(err.name === "SequelizeUniqueConstraintError") {
    code = 400
    msgs = "This username or email is already used"  

  } else if(err.name === "InvalidUserOrPassword") {
    code = 400
    msgs = "Incorrect Username or Password"

  } else if(err.name === "TaskNotFound") {
    code = 404
    msgs = "Task with this id is not found"

  } else if(err.name === "InvalidAccessToken" || err.name === "JsonWebTokenError") {
    code = 401
    msgs = "Unauthenticated: Invalid Access Token"

  } else if(err.name === "Unauthorized") {
    code = 401
    msgs = "You are not authorized for this action"
  } 

	// console.log(err)
  res.status(code).json({error: msgs})
}

module.exports = errorHandler