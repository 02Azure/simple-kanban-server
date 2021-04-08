if(process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const index = require("./routes/index-route")
const errorHandler = require("./middlewares/error-handler")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/", index)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})