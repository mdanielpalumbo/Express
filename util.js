import { Contenedor } from "./Contenedor.js";

const prods = new Contenedor("productos")

await prods.save({name:"Escuadra",price:"20",thumb:"##"})
await prods.save({name:"Regla",price:"20",thumb:"##"})
await prods.save({name:"Calculadora", price:"200", thumb:"##"})