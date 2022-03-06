import express from "express";
import { Contenedor } from "./Contenedor.js"

const app = express()
const prods = new Contenedor('productos')
app.use(express.json())

app.get('/productos', async (req,res) => {
    const content = await prods.getAll()
    res.json(content)
})

app.get('/productoRandom', async (req,res) => {
    let content = await prods.getAll()
    content = content[Math.floor(Math.random()*content.length)]
    res.send(content)
})

const PORT = 8080

const server = app.listen(PORT,() => {
    console.log(`Servidor conectado y escuchando puerto ${PORT}`)
})

server.on('error', err => {
    console.log(`error en servidor: ${err}`)
})