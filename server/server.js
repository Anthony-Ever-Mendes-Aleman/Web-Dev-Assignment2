import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import productRoute from './routes/products.js'

env.config()

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api', productRoute )
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to DB and Listening to port", process.env.PORT)

    })
})
.catch((error) => {
    console.log(error)
})

process.env