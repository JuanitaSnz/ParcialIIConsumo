const express = require('express')
const app= express()
const PORT=3001
const path= require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname,"./public")))

app.use("/",require('./routes/index'))
app.listen(PORT,()=>console.log(`Server ready at port: ${PORT}`))