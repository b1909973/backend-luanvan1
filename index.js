const express = require('express')
const cor = require('cors')
const app = express()
const port = 3000
const userRouter = require('./app/router/user.router')
const videoRouter = require('./app/router/video.router')



app.use(cor())
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/user',userRouter)
// app.use('/video',videoRouter)



app.listen(port,()=>{
    console.log(`api server running in the port ${port} `)
})