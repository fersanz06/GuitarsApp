import { db } from "./guitarras.js"

let  carrito = []

const divContainer = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')

const createCard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `<div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">${guitar.precio}</p>
                    <button 
                        data-id="${guitar.id}"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`

    div.innerHTML = html
    return div
}

const createCart = (carrito) => {
    const p = document.createElement('p')
    p.className = 'text-center'
    p.innerText = 'EL carrito está vacío'
    const div = document.createElement('div')
    let total = 0
    let html = `<table class="w-100 table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`
    carrito.forEach (g => {
        total += total += g.precio * g.cantidad
        html += `<tr data-id="${g.id}">
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
                                    >
-</button>
                                        ${g.cantidad}
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
    html += `</tbody>
                    </table>

                    <p class="text-end">Total pagar: <span class="fw-bold">$${total}</span></p>
                    <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
    div.innerHTML = html
    if(carrito.length === 0){
        carritoContainer.innerHTML = ''
        carritoContainer.appendChild(p)
    } else {
        carritoContainer.innerHTML = ''    
        carritoContainer.appendChild(div)
    }
}
const buttonClicked = (e) => {
    if(e.target.classList.contains('btn')){
        const dataId = e.target.getAttribute('data-id')
        // Verificar si existe guitar en carrito
        const idCarrito = carrito .findIndex(g => g.id === Number(dataId))
        //Si no, crea un objeto nuevo
        if(idCarrito === -1){
            carrito.push({
                ...db[Number(dataId) - 1],
                cantidad: 1
            })
        } else {
            //Si si incrementa cantidad
            carrito[idCarrito].cantidad++
        } 
        createCart(carrito)
    }
}
db.forEach((guitar) => {
    console.log(guitar.nombre)
    divContainer.appendChild(createCard(guitar))
})
createCart(carrito)

const carritoCliked = (e) => {
    if(e.target.classList.contains('btn')){
        const btn = e.target.innerText
        
        const idCarrito = e.target
        .parentElement
        .parentElement.getAttribute('data-id')
        const idxCarrito = carrito
                            .findIndex(g => g.id === Number(idCarrito))
        if(btn === '-'){
            if(carrito[idxCarrito].cantidad >1){
                carrito[idxCarrito].cantidad--
            }
            
        } else if (btn === '+'){
            if (carrito[idxCarrito].cantidad <10){
            carrito[idxCarrito].cantidad++  
            }
       
        
        } else if (btn === 'X'){
            carrito = carrito.filter(g => g.id !== Number(idCarrito))
        }else if(btn === 'Vaciar Carrito',toUpperCase()){
            carrito = []
        }
         
        createCart(carrito)
    }
}

divContainer.addEventListener('click', buttonClicked)
carritoContainer.addEventListener('click', carritoCliked)