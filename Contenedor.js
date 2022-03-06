import fs from 'fs'

export class Contenedor {
    constructor(nombre){
        this.nombre = nombre
        try{
            fs.readFileSync(`${this.nombre}.txt`)
            console.log(`archivo ${this.nombre}.txt ya existe`)
        }catch{
            fs.writeFileSync(`./${this.nombre}.txt`, JSON.stringify([]))
        }
    }
    getAll = async () => {
        try{
            const content = await fs.promises.readFile(`${this.nombre}.txt`, 'utf-8')
            return JSON.parse(content)
        }catch(error){
            console.log(error)
        }
    }
    getById = async (id) => {
        try{
            const content = await this.getAll()
            const searchedCont = content.filter(p => id == p.id)
            return searchedCont
        }catch(err){
            console.log(err)
        }
    }
    save = async (obj) => {
        const content = await this.getAll()
        const i = content.length
        obj.id = i + 1
        content.push(obj)
        try {
            await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(content))
            console.log(`Elemento guardado con id: ${obj.id}`)
        }catch(err){
            console.log('No se pudo guardar' + err)
        }
    }
    deleteAll = async () => {
        await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([]))
        console.log('Todos los elementos han sido elminados')
    }
    
    deleteById = async (id) => {
        try{
            const content = await this.getAll()
            let deletedCont =  content.filter(p => p.id != id)
            deletedCont = deletedCont.map(p => {
                if(p.id > id){
                    p.id = p.id - 1
                }
                return p
            })
            await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(deletedCont))
            console.log(`Se eliminó el elemento de id: ${id}`)
        }catch(err){
            console.log(err)
        }
    } 
}

