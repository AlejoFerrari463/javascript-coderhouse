/* CREANDO CARDS */
class producto {
   constructor(nombre,precio){
    this.nombre = nombre,
    this.precio = precio
   
   }

}

const producto1 = new producto("Zapatillas Nike",135000,)

const producto2 = new producto("Buzo Adidas",50000)

const producto3 = new producto("Pantalon Puma",15000)

const producto4 = new producto("Ojotas Reebok",5000)

const producto5 = new producto("Pelota Spalding",45000)

const producto6 = new producto("NBA Retro",300000)


const misProductos = [producto1,producto2,producto3,producto4,producto5,producto6]


const contenedorCards = document.querySelector(".contenedor-de-cards")



misProductos.forEach((element)=>{


    const cards = document.createElement("div")
    cards.classList.add("cards")

    
    
    
    const cardsBody = document.createElement("div")
    cardsBody.classList.add("cards-body")
    cardsBody.innerHTML = `
    
        <h4 class="cards-titulo" >${element.nombre}</h4>

        <span class="fs-4" >$<span class="cards-precio" >${element.precio}</span></span>

    `
    const cardsContenedorButton = document.createElement("div")
    cardsContenedorButton.classList.add("cards-contenedor-button")
    cardsContenedorButton.innerHTML = `
    
        
    <input class="card-input" placeholder="Cantidad">

    <button class="cards-button" >COMPRAR</button>

    
    `

    
    cards.appendChild(cardsBody)
    cards.appendChild(cardsContenedorButton)
    contenedorCards.appendChild(cards)

    

})



/* CARRITO */

const desplegar = document.querySelector(".carrito-desplegar")

let totalCarrito = 0

const tituloCarrito = document.createElement("h1")
tituloCarrito.classList.add("text-center","mt-3")
tituloCarrito.innerText = "CARRITO"

const agregandoTotalCarro = document.createElement("h5")
agregandoTotalCarro.classList.add("text-end","m-3","fs-2")
agregandoTotalCarro.innerText = `TOTAL: $${totalCarrito}`

const borrarCarro = document.createElement("button")
borrarCarro.classList.add("cards-delete");
borrarCarro.id = "borrarCarro"
borrarCarro.innerText="DELETE"

const comprarCarro = document.createElement("button")
comprarCarro.classList.add("cards-comprar-carro")
comprarCarro.id="comprarCarro"
comprarCarro.innerText="FINALIZAR COMPRA"

const infoTotalCarrito = document.createElement("div")
infoTotalCarrito.classList.add("info-total-carrito")
infoTotalCarrito.innerHTML=`
    <span> PRODUCTO </span>
    <span> CANTIDAD </span>
    <span> PRECIO </span>

`



desplegar.appendChild(tituloCarrito)
desplegar.appendChild(agregandoTotalCarro)
desplegar.appendChild(borrarCarro)
desplegar.appendChild(infoTotalCarrito)
desplegar.appendChild(comprarCarro)


const carrito = document.querySelector("#carrito")

const borrar = document.querySelector("#borrarCarro")

const compraDeCarro = document.querySelector("#comprarCarro")

const recuperarStorage = JSON.parse(localStorage.getItem("producto"))


if (recuperarStorage){
    

    let existentes = []
    const desplegar = document.querySelector(".carrito-desplegar")
    
    const carrito = document.querySelector("h5")
    let total = 0

    for(let i = 0;i<recuperarStorage.length;i++){
        existentes.push(recuperarStorage[i].obtenerProducto)
        
        const nuevo = document.createElement("div")
        nuevo.classList.add("infoCarrito")
    
        nuevo.innerHTML =   `
        <span class="producto" >${recuperarStorage[i].obtenerProducto}</span> 
        <span class="cantidad" >${recuperarStorage[i].cantidadStorage}</span>
        <span class="precio" >$${recuperarStorage[i].precioStorage}</span> 
    
        `
        desplegar.appendChild(nuevo)
        total+=(parseInt(recuperarStorage[i].precioStorage))
    }

   carrito.innerText=`TOTAL: $${total}`

   const cards = document.querySelectorAll(".cards")
   cards.forEach((element)=>{
    
    const button = element.querySelector(".cards-button")
    button.addEventListener("click",()=>{
        const ingresoCantidad = element.querySelector("input")
        if (ingresoCantidad.value){

            const producto = element.querySelector(".cards-titulo")
            const obtenerProducto = producto.innerText

            const yaEnCarrito = existentes.find((e)=>{
                return e==obtenerProducto
            })

        
                if (!yaEnCarrito){
                    existentes.push(obtenerProducto)
                    
        
                    const precio = element.querySelector(".cards-precio")
                    const obtenerPrecio = parseInt(precio.innerText)
        
        
                    const cantidad = element.querySelector("input")
                    const obtenerCantidad = parseInt(cantidad.value)
        
                    const mandarACarro = (obtenerPrecio*obtenerCantidad)
                    
                    const desplegar = document.querySelector(".carrito-desplegar")
                    const agregarADesplegar = document.createElement("div")
                    
                    
                    agregarADesplegar.classList.add("infoCarrito")
        
                    agregarADesplegar.innerHTML =   `
                    <span class="producto" >${obtenerProducto}</span> 
                    <span class="cantidad" >${cantidad.value}</span>
                    <span class="precio" >$${mandarACarro}</span> 
                        
                    `
                    desplegar.appendChild(agregarADesplegar)
        
        
                    totalCarrito+=mandarACarro
                    const h5 = desplegar.querySelector("h5")
                    h5.innerHTML = `TOTAL: $${totalCarrito+total}`

                    cantidadStorage=cantidad.value
                    precioStorage=mandarACarro
                    recuperarStorage.push({obtenerProducto,cantidadStorage,precioStorage})
        
    
                    
                    
                }


        
                if (yaEnCarrito){
                    const actualizar = document.querySelectorAll(".infoCarrito")
        
                    actualizar.forEach((e)=>{
        
                        const productoAAactulizar = e.querySelector(".producto")
        
                        if (productoAAactulizar.innerText==obtenerProducto){
        
                            const cantidadVieja = e.querySelector(".cantidad")
                            const cantidadNueva = element.querySelector("input")
        
                            const cantidadAcumulada = parseInt(cantidadVieja.innerText) + parseInt(cantidadNueva.value)
                            cantidadVieja.innerHTML = `${cantidadAcumulada}`
        
                            const precioCard = element.querySelector(".cards-precio")
                            const precioNuevo = parseInt(precioCard.innerText)*cantidadAcumulada
        
                            const precioAcumulado = e.querySelector(".precio")
                            precioAcumulado.innerText = `$${precioNuevo}`
        
                            const desplegar = document.querySelector(".carrito-desplegar")
                            totalCarrito+=(parseInt(cantidadNueva.value)*parseInt(precioCard.innerText))
                            const h5 = desplegar.querySelector("h5")
                            h5.innerHTML = `TOTAL: $${totalCarrito+total}`

                

                            recuperarStorage.forEach((e)=>{
                                if (e.obtenerProducto==obtenerProducto){
                                    e.cantidadStorage=cantidadAcumulada
                                    e.precioStorage=precioNuevo
                                   

                                }
                            })

                            localStorage.setItem("producto",JSON.stringify(recuperarStorage))

                    
        
                           
                         
                        }
                        
                       
                    })
        
                }

                


            }

        
        

        })

    })

}
   



let datosStorage = []
let existentes = []



carrito.addEventListener("click",()=>{

    const desplegar = document.querySelector(".carrito-desplegar")
  
    const active = document.querySelector(".active")


    if (active){
        desplegar.classList.remove("active")
    }
    else {
        desplegar.classList.add("active")
    
    }


    

})

compraDeCarro.addEventListener("click",()=>{

    if(localStorage.getItem("producto")){

        localStorage.removeItem("producto")
    

    const todosLosInfoCarrito = document.querySelectorAll(".infoCarrito")
    todosLosInfoCarrito.forEach((element)=>{
        existentes.pop(element.querySelector(".producto"))
        desplegar.removeChild(element)
        


    })
    totalCarrito=0
    const agregandoTotalCarro = desplegar.querySelector("h5")
    agregandoTotalCarro.innerText = `TOTAL: $${totalCarrito}`

    desplegar.innerHTML = ""

    const mensajeDeCompra = document.createElement("h3")
    mensajeDeCompra.classList.add("felicitaciones")
    mensajeDeCompra.innerText = "FELICITACIONES POR LA COMPRA"
    desplegar.appendChild(mensajeDeCompra)
    setTimeout(() => {
        location.reload()
      }, 2000);


    }


})




borrar.addEventListener("click",()=>{

    if(localStorage.getItem("producto")){

        localStorage.removeItem("producto")
        location.reload()
    
        const todosLosInfoCarrito = document.querySelectorAll(".infoCarrito")
        todosLosInfoCarrito.forEach((element)=>{
            existentes.pop(element.querySelector(".producto"))
            desplegar.removeChild(element)
            
    
    
        })
        totalCarrito=0
        const agregandoTotalCarro = desplegar.querySelector("h5")
        agregandoTotalCarro.innerText = `TOTAL: $${totalCarrito}`
       



    }


  

})




if(!recuperarStorage){

/* PASANDO A CARRITO */
const cards = document.querySelectorAll(".cards")

cards.forEach((element)=>{

    let cantidadStorage = 0
    let precioStorage = 0

    const button = element.querySelector(".cards-button")
    button.addEventListener("click",()=>{

        
        const ingresoCantidad = element.querySelector("input")
        
        if (ingresoCantidad.value){

            const producto = element.querySelector(".cards-titulo")
            const obtenerProducto = producto.innerText

   
            const yaEnCarrito = existentes.find((e)=>{
            return e==obtenerProducto
            })
         


        if (!yaEnCarrito){
            existentes.push(obtenerProducto)
            

            const precio = element.querySelector(".cards-precio")
            const obtenerPrecio = parseInt(precio.innerText)


            const cantidad = element.querySelector("input")
            const obtenerCantidad = parseInt(cantidad.value)

            const mandarACarro = (obtenerPrecio*obtenerCantidad)
            
            const desplegar = document.querySelector(".carrito-desplegar")
            const agregarADesplegar = document.createElement("div")
            
            
            agregarADesplegar.classList.add("infoCarrito")

            agregarADesplegar.innerHTML =   `
            <p class="producto" >${obtenerProducto}</p> 
            <p class="cantidad" >${cantidad.value}</p>
            <p class="precio" >$${mandarACarro}</p> 
                
            `
            desplegar.appendChild(agregarADesplegar)


            totalCarrito+=mandarACarro
            const h5 = desplegar.querySelector("h5")
            h5.innerHTML = `TOTAL: $${totalCarrito}`

            cantidadStorage=cantidad.value
            precioStorage=mandarACarro
            datosStorage.push({obtenerProducto,cantidadStorage,precioStorage})
            
        }

        if (yaEnCarrito){
            const actualizar = document.querySelectorAll(".infoCarrito")

            actualizar.forEach((e)=>{

                const productoAAactulizar = e.querySelector(".producto")

                if (productoAAactulizar.innerText==obtenerProducto){

                    const cantidadVieja = e.querySelector(".cantidad")
                    const cantidadNueva = element.querySelector("input")

                    const cantidadAcumulada = parseInt(cantidadVieja.innerText) + parseInt(cantidadNueva.value)
                    cantidadVieja.innerHTML = `${cantidadAcumulada}`

                    const precioCard = element.querySelector(".cards-precio")
                    const precioNuevo = parseInt(precioCard.innerText)*cantidadAcumulada

                    const precioAcumulado = e.querySelector(".precio")
                    precioAcumulado.innerText = `$${precioNuevo}`

                    const desplegar = document.querySelector(".carrito-desplegar")
                    totalCarrito+=(parseInt(cantidadNueva.value)*parseInt(precioCard.innerText))
                    const h5 = desplegar.querySelector("h5")
                    h5.innerHTML = `TOTAL: $${totalCarrito}`

                    datosStorage.forEach((e)=>{
                        if (e.obtenerProducto==obtenerProducto){
                            e.cantidadStorage=cantidadAcumulada
                            e.precioStorage=precioNuevo
                           
                        }
                    })
            
                 
                }
                
               
            })

        }

        localStorage.setItem("producto",JSON.stringify(datosStorage))
            
        }
 

        

    })

})




}

