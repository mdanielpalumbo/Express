import express from 'express'
import prodsRouter from './routers/prodsRouter.js'

const app = express()

app.use(
    express.json(),
    express.urlencoded({extended:true})
)
app.use('/api/productos', express.static('./public'))
app.use('/api/productos', prodsRouter)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor conectado y escuchando el puerto ${PORT}`)
})

