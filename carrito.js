const armarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
    
    carrito.forEach((productos) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML =`
        <img src="${productos.img}">
        <h3> ${productos.nombre}</h3>
        <p> $ ${productos.precio}</p>
        <p> 
          <span class="menos"> ➖ </span> 
          Cantidad ${productos.cantidad}
          <span class="mas"> ➕ </span> 
          <span class="trash"> 🗑 </span>
         </p>
        <p> Total por Item: $ ${productos.cantidad * productos.precio} </p>
        `;
    modalContainer.append(carritoContent);
      //Restar productos
    let menos = carritoContent.querySelector(".menos");
    menos.addEventListener("click", () => {
      if (productos.cantidad !== 1){
       productos.cantidad--;
      }
      guardarcarrito();
      armarCarrito();
    })

      //Sumar productos
    let mas = carritoContent.querySelector(".mas");
      mas.addEventListener("click", () => {
      productos.cantidad++;
      guardarcarrito();
      armarCarrito();
   })
      //Sacar productos
    let trash = carritoContent.querySelector(".trash");
        trash.addEventListener("click", () => {
        borrarProducto(productos.id);
        guardarcarrito();
        armarCarrito();
     })
    });

    
    const total =carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `
    Total a pagar $ ${total}
    <h6> FINALIZAR COMPRA </h6>
    <button class"finalizar" onClick="borrar()">🛒💳</button>
    `; 
  modalContainer.append(totalCompra);    
};

function borrar(){
      Swal.fire({
        title: 'Tu pedido va en camino 🚚 ',
        text: 'Gracias por confiar en 💞Munay',
        imageWidth: 400,
        imageHeight: 200,
      })
    };


verCompras.addEventListener("click", armarCarrito);

 //Borrar producto y que se guarde

  const borrarProducto = (id) => {
    const encontrarId = carrito.find((element)=> element.id === id);

    carrito = carrito.filter((carritoId) => {
    return carritoId !== encontrarId; 
    });

    carritoCompras();
    //⬇️ esto es para que el numero se ajuste si borro productos.
    guardarcarrito();

    armarCarrito();
};

const carritoCompras = () => {
cantidadProductos.style.display = "block";

//acá hago que el carrito siempre visualice los productos.

const carritoVisible = carrito.length;
localStorage.setItem("carritoVisible", JSON.stringify(carritoVisible));
carritoVisible 
cantidadProductos.innerText= JSON.parse(localStorage.getItem("carritoVisible"));
};
carritoCompras();
