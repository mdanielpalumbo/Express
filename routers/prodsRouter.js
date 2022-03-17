import { captureRejections } from 'events'
import express from 'express'
import {Contenedor} from '../files/Contenedor.js'

const prods = new Contenedor('productos')

const prodsRouter = express.Router()

prodsRouter.get('/', async (req,res) => {
    try{
        const pContent = await prods.getAll()
        res.json(pContent)
    }catch(err){
        res.json({error: err})
    }
    
})

prodsRouter.get('/:id', async (req,res) => {
    const id = req.params.id
    const len = (await prods.getAll()).length
    if(len==0){
        res.json({error: 'no hay productos en la lista'})
    }
    else if(id>=1 && id<=len){
        res.json(await prods.getById(id))
    }else{
        res.json({error:'producto no encontrado'})
    }
})

prodsRouter.post('/', async (req,res) => {
    const prod = {...req.body}
    prods.save(prod)
    res.json(prod)
})

prodsRouter.put('/:id', async (req,res) => {
    const id = req.params.id
    const len = (await prods.getAll()).length
    const prod = {...req.body}
    if(len==0){
        res.json({error: 'no hay productos en la lista'})
    }else if(id>=1 && id <= len){
        await prods.actById(id, prod)
        console.log(`producto de id ${id}, actualizado correctamente`)
        res.json(prod)
    }else{
        res.json({error:'producto no encontrado'})
    }
})

prodsRouter.delete('/:id', async (req,res) => {
    const id = req.params.id
    const len = (await prods.getAll()).length
    if(len==0){
        res.json({error:'no hay productos en la lista'})
    }
    else if(id>=1 && id<=len){
        await prods.deleteById(id)
        res.json({borrado:`producto de id ${id} borrado`})
    }else{
        res.json({error:'producto no encontrado'})
    }
})

export default prodsRouter

