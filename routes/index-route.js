const express = require("express")
const router = express.Router()
const IndexController = require("../controllers/index-controller")
const tasks = require("./tasks-route")
const isAuthenticated = require("../middlewares/authentication")

router.post("/login", IndexController.login)
router.post("/register", IndexController.register)

router.use(isAuthenticated)

router.use("/tasks", tasks)

module.exports = router