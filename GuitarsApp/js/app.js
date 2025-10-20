import { db } from './guitarras.js'

/*console.log(db[0].id)
console.log(db[10].nombre)
console.log(db[5].imagen) */

// for(let i = 0; i < db.length; i++){
//     console.log(db[i].nombre)
// }

/*
const saluda = (name) => {
    console.log('hello' + name)
}
saluda('mundo') */ 

//metodos de Arrays para Iterar
db.forEach(
    function(guitar){
        console.log(guitar)
    }
)

const carrito = []


const creaCard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `
                <div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
                    <button 
                        data-id="${guitar.id}"
                        type="button"
                        class="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>`
    div.innerHTML = html
    return div
}

const createCart = (carrito) => {
    const p = document.createElement('p')
    p.className = 'text-center'
    p.innerText = 'El carrito está vacio'
    const div = document.createElement('div')
    let total = 0
    let html = `<table class="w-100 table">
                    <tbody>`
    carrito.forEach(g => {
        total += g.precio * g.cantidad
        html += `<tr>
                    <td>
                        <img class="img-fluid" src="./img/${g.imagen}.jpg" alt="imagen guitarra">
                    </td>
                    <td>${g.nombre}</td>
                    <td class="fw-bold">
                            $${g.precio}
                    </td>
                    <td class="flex align-items-start gap-4">
                        <button
                            type="button"
                            class="btn btn-dark"
                        >-</button>
                            ${g.cantidad ?? 1}
                        <button
                            type="button"
                            class="btn btn-dark"
                        >+</button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            type="button"
                        >X</button>
                    </td>
                </tr>`
    })
    total = carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad ?? 1)), 0)
    html += `</tbody>
                </table>

                <p class="text-end">Total pagar: <span class="fw-bold">$${total}</span></p>
                <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
    div.innerHTML = html
    if(carrito.length === 0){
        carritoContainer.innerHTML = ''
        carritoContainer.appendChild(p)

    }else{
        carritoContainer.innerHTML = ''
        carritoContainer.appendChild(div)
    }
}

const container = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')

const carritoClicked = (e) => {
    if (e.target.classList.contains('btn')) {
        const btn = e.target.innerText
        console.log(btn)
    }
}

const buttonClicked = (e) => {

    if (e.target.classList.contains('btn')) {
        const dataId = e.target.getAttribute('data-id')
        // si el botón no tiene data-id (p. ej. botones del carrito), no hacemos nada aquí
        if (!dataId) return

        //verificar si existe "guitar" en carrito
        const idCarrito = carrito.findIndex(g => g.id === Number(dataId)) 
        //si no crear un objeto nuevo (buscamos en db por id)
        if(idCarrito === -1){
            const guitarFromDb = db.find(g => g.id === Number(dataId))
            if (guitarFromDb) {
                carrito.push({
                    ...guitarFromDb,
                    cantidad : 1
                })
            }
        }else {
            //si si incrementa cantidad
            carrito[idCarrito].cantidad = (carrito[idCarrito].cantidad ?? 0) + 1
        }
        
        createCart(carrito)
    }
}

db.forEach((guitar) => {
    console.log(guitar.nombre)
    container.appendChild(creaCard(guitar))
}
)
createCart(carrito)

container
    .addEventListener('click',buttonClicked)
carritoContainer
    .addEventListener('click',carritoClicked)