const express = require("express")
const router = express.Router()
const TaskController = require("../controllers/task-controller")
const isAuthorized = require("../middlewares/authorization")

router.get("/", TaskController.showAll)

router.post("/", TaskController.add)

router.use("/:id", isAuthorized)

router.put("/:id", TaskController.edit)

router.patch("/:id", TaskController.switchCategory)

router.delete("/:id", TaskController.delete)

module.exports = router