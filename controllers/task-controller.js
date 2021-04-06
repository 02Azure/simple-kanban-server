const {Task} = require("../models")

class TaskController {
	static async showAll(req, res, next) {
    
    try {
      let tasks = await Task.findAll() 
      res.status(200).json(tasks)
    }

    catch(err) {
      next(err)
    }
	}
	
	static async add(req, res, next) {
		let {title, category, due} = req.body

 		let input = {
			title,
			category,
			due,
      UserId: +req.user.id
		}

    try{
      let task = await Task.create(input) 

			res.status(201).json(task)
    }

    catch(err) {
      next(err)
    }		
	}
	
	static async edit(req, res, next) {
		let {title, due} = req.body

 		let input = {
			title,
			due
		}
		
    try{
      let updatedTask = await Task.update(input, {
        where: {
          id: +req.params.id
        },
        returning: true
      }) 

      if(!updatedTask[0]) throw {name:"TaskNotFound"}
      res.status(200).json(...updatedTask[1])
    }
		
    catch(err) {
      next(err)
    }
	}

	static async switchCategory(req, res, next) {
    try{
      let newCategory = req.body.category
      let updatedTask = await Task.update({category: newCategory}, {
        where: {
          id: +req.params.id
        },
        returning: true
      }) 

      if(!updatedTask[0]) throw {name:"TaskNotFound"}
      res.status(200).json(...updateddTask[1])
    }
		
    catch(err) {
      next(err)
    }
	}
	
	static async delete(req, res, next) {
    try{
      let result = await Task.destroy({where: {
        id: +req.params.id
      }}) 

      if(!result) throw {name: "TaskNotFound"}
      res.status(200).json({message: `Task with id ${req.params.id} is successfully deleted`})	
    }

    catch(err) {
      next(err)
    }		
	}
}

module.exports = TaskController