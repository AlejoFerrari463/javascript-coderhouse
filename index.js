const main = document.querySelector("#main")

moment.locale('es') 
const fecha = moment().add(23, 'days').calendar(); 

Toastify({
  text: `New products: ${fecha}`,
  duration: 2000,
  close: false,
  gravity: "bottom", 
  position: "center", 
  stopOnFocus: true, 
  style: {
    background: "#FF5733",
    color:"white",
  },
  onClick: function(){} 

}).showToast();

const toogler = document.querySelector("#toogler")

if (localStorage.getItem("color")=="white"){


  document.body.classList.replace("dark","light")
  document.body.style.background = "white"
  const active = document.querySelector(".toogler-punto")
  active.classList.add("activar")
  active.style.transition = "0.4s left";
  active.style.background = "white"

  const tooglerFondo = document.querySelector(".toogler-contenedor")
  tooglerFondo.style.background = "black"

  const carrito = document.querySelector(".carrito-chango")
  carrito.style.color = "black"

 

}


toogler.addEventListener("click",()=>{

    const body = document.querySelector(".dark")
    
    if (body){

      localStorage.setItem("color","white")

      document.body.classList.replace("dark","light")
      document.body.style.background = "white"
      const active = document.querySelector(".toogler-punto")
      active.classList.add("activar")
      active.style.transition = "0.4s left";
      active.style.background = "white"

      const tooglerFondo = document.querySelector(".toogler-contenedor")
      tooglerFondo.style.background = "black"

      const carrito = document.querySelector(".carrito-chango")
      carrito.style.color = "black"

    }
    else {

      localStorage.setItem("color","black")
     
      document.body.classList.replace("light","dark")
      document.body.style.background = "black"
      const active = document.querySelector(".toogler-punto")
      active.classList.remove("activar")
      active.style.transition = "0.4s left";
      active.style.background = "black"

      const tooglerFondo = document.querySelector(".toogler-contenedor")
      tooglerFondo.style.background = "white"

      const carrito = document.querySelector(".carrito-chango")
      carrito.style.color = "white"

    }

})


const api = "https://fakestoreapi.com/products";

const contenedorCards = document.querySelector(".contenedor-de-cards");

fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((info) => {
    info.forEach((element) => {
    
      const {title: nombre,image: imagen,price: precio} = element

      const cards = document.createElement("div");
      cards.classList.add("cards");

      const cardsContenedorImagen = document.createElement("div");
      cardsContenedorImagen.classList.add("cards-contenedor-imagen");
      cardsContenedorImagen.innerHTML = `
            
            <img class="cards-imagen" src="${imagen}" alt="">


            `;

      const cardsBody = document.createElement("div");
      cardsBody.classList.add("cards-body");
      cardsBody.innerHTML = `
            
                <h4 class="cards-titulo" >${nombre}</h4>

                <span class="fs-4" >$<span class="cards-precio" >${precio}</span></span>

            `;
      const cardsContenedorButton = document.createElement("div");
      cardsContenedorButton.classList.add("cards-contenedor-button");
      cardsContenedorButton.innerHTML = `
            
                
            <input class="card-input" placeholder="Cantidad">

            <button class="cards-button" >COMPRAR</button>

            
            `;

      cards.appendChild(cardsContenedorImagen);
      cards.appendChild(cardsBody);
      cards.appendChild(cardsContenedorButton);
      contenedorCards.appendChild(cards);
    });

    /* CARRITO */

    const desplegar = document.querySelector(".carrito-desplegar");

    let totalCarrito = 0;

    const tituloCarrito = document.createElement("h1");
    tituloCarrito.classList.add("text-center", "mt-3");
    tituloCarrito.innerText = "CARRITO";

    const agregandoTotalCarro = document.createElement("h5");
    agregandoTotalCarro.classList.add("text-end", "m-3", "fs-2");
    agregandoTotalCarro.innerText = `TOTAL: $${totalCarrito.toFixed(2)}`;

    const borrarCarro = document.createElement("button");
    borrarCarro.classList.add("cards-delete");
    borrarCarro.id = "borrarCarro";
    borrarCarro.innerText = "DELETE";

    const comprarCarro = document.createElement("button");
    comprarCarro.classList.add("cards-comprar-carro");
    comprarCarro.id = "comprarCarro";
    comprarCarro.innerText = "FINALIZAR COMPRA";

    const infoTotalCarrito = document.createElement("div");
    infoTotalCarrito.classList.add("info-total-carrito");
    infoTotalCarrito.innerHTML = `
    <span> PRODUCTO </span>
    <span> CANTIDAD </span>
    <span> PRECIO </span>

`;

    desplegar.appendChild(tituloCarrito);
    desplegar.appendChild(agregandoTotalCarro);
    desplegar.appendChild(borrarCarro);
    desplegar.appendChild(infoTotalCarrito);
    desplegar.appendChild(comprarCarro);

    const carrito = document.querySelector("#carrito");

    const borrar = document.querySelector("#borrarCarro");

    const compraDeCarro = document.querySelector("#comprarCarro");

    const recuperarStorage = JSON.parse(localStorage.getItem("producto"));


    if (recuperarStorage) {
      let existentes = [];
      const desplegar = document.querySelector(".carrito-desplegar");

      const carrito = document.querySelector("h5");
      let total = 0;

      for (let i = 0; i < recuperarStorage.length; i++) {
        existentes.push(recuperarStorage[i].obtenerProducto);

        const nuevo = document.createElement("div");
        nuevo.classList.add("infoCarrito");

        nuevo.innerHTML = `
        <span class="producto" >${recuperarStorage[i].obtenerProducto}</span> 
        <span class="cantidad" >${recuperarStorage[i].cantidadStorage}</span>
        <span class="precio" >$${recuperarStorage[i].precioStorage.toFixed(2)}</span> 
    
        `;
        desplegar.appendChild(nuevo);
        total += parseFloat(recuperarStorage[i].precioStorage.toFixed(2));
      }

      carrito.innerText = `TOTAL: $${total.toFixed(2)}`;

      const cards = document.querySelectorAll(".cards");
      cards.forEach((element) => {
        const button = element.querySelector(".cards-button");
        button.addEventListener("click", () => {
          const ingresoCantidad = element.querySelector("input");
          if (ingresoCantidad.value) {
            const producto = element.querySelector(".cards-titulo");
            const obtenerProducto = producto.innerText;

            const yaEnCarrito = existentes.find((e) => {
              return e == obtenerProducto;
            });

            if (!yaEnCarrito) {
              existentes.push(obtenerProducto);

              const precio = element.querySelector(".cards-precio");
              const obtenerPrecio = parseFloat(precio.innerText);

              const cantidad = element.querySelector("input");
              const obtenerCantidad = parseFloat(cantidad.value);

              const mandarACarro = obtenerPrecio * obtenerCantidad;

              const desplegar = document.querySelector(".carrito-desplegar");
              const agregarADesplegar = document.createElement("div");

              agregarADesplegar.classList.add("infoCarrito");

              agregarADesplegar.innerHTML = `
                    <span class="producto" >${obtenerProducto}</span> 
                    <span class="cantidad" >${cantidad.value}</span>
                    <span class="precio" >$${mandarACarro.toFixed(2)}</span> 
                        
                    `;
              desplegar.appendChild(agregarADesplegar);

              totalCarrito += mandarACarro;
              const h5 = desplegar.querySelector("h5");
              h5.innerHTML = `TOTAL: $${(totalCarrito + total).toFixed(2)}`;

              cantidadStorage = cantidad.value;
              precioStorage = mandarACarro;
              recuperarStorage.push({
                obtenerProducto,
                cantidadStorage,
                precioStorage,
              });
            }

            if (yaEnCarrito) {
              const actualizar = document.querySelectorAll(".infoCarrito");

              actualizar.forEach((e) => {
                const productoAAactulizar = e.querySelector(".producto");

                if (productoAAactulizar.innerText == obtenerProducto) {
                  const cantidadVieja = e.querySelector(".cantidad");
                  const cantidadNueva = element.querySelector("input");

                  const cantidadAcumulada =
                    parseFloat(cantidadVieja.innerText) +
                    parseFloat(cantidadNueva.value);
                  cantidadVieja.innerHTML = `${cantidadAcumulada}`;

                  const precioCard = element.querySelector(".cards-precio");
                  const precioNuevo =
                    parseFloat(precioCard.innerText) * cantidadAcumulada;

                  const precioAcumulado = e.querySelector(".precio");
                  precioAcumulado.innerText = `$${precioNuevo.toFixed(2)}`;

                  const desplegar =
                    document.querySelector(".carrito-desplegar");
                  totalCarrito +=
                    parseFloat(cantidadNueva.value) *
                    parseFloat(precioCard.innerText);
                  const h5 = desplegar.querySelector("h5");
                  h5.innerHTML = `TOTAL: $${(totalCarrito + total).toFixed(2)}`;

                  recuperarStorage.forEach((e) => {
                    if (e.obtenerProducto == obtenerProducto) {
                      e.cantidadStorage = cantidadAcumulada;
                      e.precioStorage = precioNuevo;
                    }
                  });

                  localStorage.setItem(
                    "producto",
                    JSON.stringify(recuperarStorage)
                  );
                }
              });
            }
          }
        });
      });
    }

    let datosStorage = [];
    let existentes = [];

    carrito.addEventListener("click", () => {
      const desplegar = document.querySelector(".carrito-desplegar");

      const active = document.querySelector(".active");

      if (active) {
        desplegar.classList.remove("active");
      } else {
        desplegar.classList.add("active");
      }
    });

    compraDeCarro.addEventListener("click", () => {
      if (localStorage.getItem("producto")) {
        localStorage.removeItem("producto");

    

        let timerInterval;
        Swal.fire({
          title: "FELICITACIONES POR TU COMPRA!",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
       
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    });

    borrar.addEventListener("click", () => {
      if (localStorage.getItem("producto")) {
       

        Swal.fire({
          title: "Estas seguro?",
          text: "No podras recuperar el contenido del carro",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Borrar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado con exito!",
              text: "Redirigiendo...",
              icon: "success",
              showConfirmButton: false,
            });
           const todosLosInfoCarrito = document.querySelectorAll(".infoCarrito");
          todosLosInfoCarrito.forEach((element) => {
             existentes.pop(element.querySelector(".producto"));
            desplegar.removeChild(element);
           });
           totalCarrito = 0;
           const agregandoTotalCarro = desplegar.querySelector("h5");
           agregandoTotalCarro.innerText = `TOTAL: $${totalCarrito.toFixed(2)}`;
            localStorage.removeItem("producto");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        });

       
      }
    });

    if (!recuperarStorage) {
      /* PASANDO A CARRITO */
      const cards = document.querySelectorAll(".cards");

      cards.forEach((element) => {
        let cantidadStorage = 0;
        let precioStorage = 0;

        const button = element.querySelector(".cards-button");
        button.addEventListener("click", () => {
          const ingresoCantidad = element.querySelector("input");

          if (ingresoCantidad.value) {
            const producto = element.querySelector(".cards-titulo");
            const obtenerProducto = producto.innerText;

            const yaEnCarrito = existentes.find((e) => {
              return e == obtenerProducto;
            });

            if (!yaEnCarrito) {
              existentes.push(obtenerProducto);

              const precio = element.querySelector(".cards-precio");
              const obtenerPrecio = parseFloat(precio.innerText);

              const cantidad = element.querySelector("input");
              const obtenerCantidad = parseFloat(cantidad.value);

              const mandarACarro = obtenerPrecio * obtenerCantidad;

              const desplegar = document.querySelector(".carrito-desplegar");
              const agregarADesplegar = document.createElement("div");

              agregarADesplegar.classList.add("infoCarrito");

              agregarADesplegar.innerHTML = `
            <p class="producto" >${obtenerProducto}</p> 
            <p class="cantidad" >${cantidad.value}</p>
            <p class="precio" >$${mandarACarro.toFixed(2)}</p> 
                
            `;
              desplegar.appendChild(agregarADesplegar);

              totalCarrito += mandarACarro;
              const h5 = desplegar.querySelector("h5");
              h5.innerHTML = `TOTAL: $${totalCarrito.toFixed(2)}`;

              cantidadStorage = cantidad.value;
              precioStorage = mandarACarro;
              datosStorage.push({
                obtenerProducto,
                cantidadStorage,
                precioStorage,
              });
            }

            if (yaEnCarrito) {
              const actualizar = document.querySelectorAll(".infoCarrito");

              actualizar.forEach((e) => {
                const productoAAactulizar = e.querySelector(".producto");

                if (productoAAactulizar.innerText == obtenerProducto) {
                  const cantidadVieja = e.querySelector(".cantidad");
                  const cantidadNueva = element.querySelector("input");

                  const cantidadAcumulada =
                    parseFloat(cantidadVieja.innerText) +
                    parseFloat(cantidadNueva.value);
                  cantidadVieja.innerHTML = `${cantidadAcumulada}`;

                  const precioCard = element.querySelector(".cards-precio");
                  const precioNuevo =
                    parseFloat(precioCard.innerText) * cantidadAcumulada;

                  const precioAcumulado = e.querySelector(".precio");
                  precioAcumulado.innerText = `$${precioNuevo.toFixed(2)}`;

                  const desplegar =
                    document.querySelector(".carrito-desplegar");
                  totalCarrito +=
                    parseFloat(cantidadNueva.value) *
                    parseFloat(precioCard.innerText);
                  const h5 = desplegar.querySelector("h5");
                  h5.innerHTML = `TOTAL: $${totalCarrito.toFixed(2)}`;

                  datosStorage.forEach((e) => {
                    if (e.obtenerProducto == obtenerProducto) {
                      e.cantidadStorage = cantidadAcumulada;
                      e.precioStorage = precioNuevo;
                    }
                  });
                }
              });
            }

            localStorage.setItem("producto", JSON.stringify(datosStorage));
          }
        });
      });
    }
  });
