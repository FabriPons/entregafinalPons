const pedirUrl = async () => {
  const response = await fetch (url);
  const data = await response.json;

  return data
;
}
const url = "./data.json"; 
fetch(url)
.then(res => res.json())
.then(data => mostrarProductos(data));

const shopContent = document.getElementById("shopContent");
const verCompras= document.getElementById("verCompras");
const modalContainer = document.getElementById("modalContainer");
const cantidadProductos = document.getElementById("cantidadProductos");


let carrito = JSON.parse(localStorage.getItem("compras")) || [];

function mostrarProductos(productos){
productos.forEach((productos) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
          <img src="${productos.img}">
          <h3>${productos.nombre}</h3>
          <p class="valor">${productos.precio} $</p>
        `;
    
    shopContent.append(content); 

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some ((repeatProductos) => repeatProductos.id === productos.id);

      if (repeat) {
        carrito.map((prod)=> {
          if (prod.id === productos.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
            id:productos.id,
            img: productos.img,
            nombre: productos.nombre,
            precio: productos.precio,
            cantidad: productos.cantidad,
        });
      }
      carritoCompras();
      guardarcarrito();
    });
});
};
//usando JSON para que me queden los productos guardados
const guardarcarrito = () => {
localStorage.setItem("compras", JSON.stringify (carrito));
};

//Si salen y entra vuelve a quedar el carrito elegido

JSON.parse(localStorage.getItem("compras"));
