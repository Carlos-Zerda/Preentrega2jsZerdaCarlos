class Cliente {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Pedido {
  constructor(cliente) {
    this.cliente = cliente;
    this.productos = [];
    this.total = 0;
    this.formaDePago = null;
  }

  agregarProducto(producto) {
    this.productos.push(producto);
    this.total += producto.precio;
  }

  eliminarProducto(producto) {
    const index = this.productos.findIndex((p) => p.nombre === producto.nombre);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.total -= producto.precio;
    }
  }

  mostrarResumen() {
    let resumen = `Cliente: ${this.cliente.nombre} (${this.cliente.email})\n\n`;
    resumen += "Productos:\n";
    this.productos.forEach((producto) => {
      resumen += `- ${producto.nombre} - $${producto.precio}\n`;
    });
    resumen += `\nTotal: $${this.total.toFixed(2)}\n`;
    resumen += `Forma de pago: ${this.formaDePago}\n`;
    return resumen;
  }
}

const productosDisponibles = {
  bebidas: [
    new Producto("Café americano", 250),
    new Producto("Cappuccino", 300),
    new Producto("Té negro", 200),
    new Producto("Chocolate caliente", 290),
    new Producto("Frappé de vainilla", 400),
  ],
  postres: [
    new Producto("Cheesecake (porción)", 450),
    new Producto("Tarta de manzana (porción)", 320),
    new Producto("Brownie (porción)", 380),
    new Producto("Galletas de chocolate", 250),
    new Producto("Torta de zanahoria (porción)", 400),
  ],
};

const pedido = new Pedido();

// Función para mostrar los productos en el menú
function mostrarProductos() {
  const ordenar = prompt("¿Cómo desea ordenar los productos?\n1. Menor precio a mayor precio\n2. Mayor precio a menor precio");
  let opciones = "Productos Disponibles:\n";
  
  for (let categoria in productosDisponibles) {
    opciones += `${categoria.toUpperCase()}:\n`;
    let productosCategoria = productosDisponibles[categoria].slice(); // Crear una copia del array
    if (ordenar === "1") {
      productosCategoria.sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor precio
    } else if (ordenar === "2") {
      productosCategoria.sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor precio
    }
    
    productosCategoria.forEach((producto, index) => {
      opciones += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
  }
  alert(opciones);
}

// Función para agregar un producto al pedido
function agregarProducto() {
  const categoriaElegida = prompt("Ingrese el número de la categoría del producto:\n1. Bebidas\n2. Postres");
  const categoriaIndex = parseInt(categoriaElegida) - 1;
  const categorias = Object.keys(productosDisponibles);
  
  if (categoriaIndex < 0 || categoriaIndex >= categorias.length) {
    alert("Categoría no válida");
    return;
  }

  const categoriaSeleccionada = categorias[categoriaIndex];
  const productosCategoria = productosDisponibles[categoriaSeleccionada];
  
  let opcionesProductos = "Elija un producto:\n";
  productosCategoria.forEach((producto, index) => {
    opcionesProductos += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
  });

  const productoElegidoIndex = parseInt(prompt(opcionesProductos)) - 1;
  
  if (isNaN(productoElegidoIndex) || productoElegidoIndex < 0 || productoElegidoIndex >= productosCategoria.length) {
    alert("Producto no válido");
    return;
  }

  const productoElegido = productosCategoria[productoElegidoIndex];
  pedido.agregarProducto(productoElegido);
  alert("Producto agregado al pedido.");
}

// Función para eliminar un producto del pedido
function eliminarProducto() {
  if (pedido.productos.length === 0) {
    alert("No hay productos en el pedido para eliminar.");
    return;
  }
  
  let opcionesProductos = "Productos en el pedido:\n";
  pedido.productos.forEach((producto, index) => {
    opcionesProductos += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
  });

  const productoAEliminarIndex = parseInt(prompt(opcionesProductos)) - 1;

  if (isNaN(productoAEliminarIndex) || productoAEliminarIndex < 0 || productoAEliminarIndex >= pedido.productos.length) {
    alert("Producto no válido");
    return;
  }

  const productoAEliminar = pedido.productos[productoAEliminarIndex];
  pedido.eliminarProducto(productoAEliminar);
  alert("Producto eliminado del pedido.");
}

// Función para seleccionar la forma de pago
function seleccionarFormaDePago() {
  const formaDePago = prompt("Seleccione la forma de pago:\n1. Tarjeta de crédito\n2. Efectivo\n3. Transferencia bancaria");
  
  switch (formaDePago) {
    case "1":
      return "Tarjeta de crédito";
    case "2":
      return "Efectivo";
    case "3":
      return "Transferencia bancaria";
    default:
      return "Forma de pago no válida";
  }
}

// Función para finalizar el pedido y mostrar el resumen
function finalizarPedido() {
  const nombreCliente = prompt("Ingresa tu nombre:");
  const emailCliente = prompt("Ingresa tu correo electrónico:");
  const formaDePago = seleccionarFormaDePago();

  const cliente = new Cliente(nombreCliente, emailCliente);
  pedido.cliente = cliente;
  pedido.formaDePago = formaDePago;

  const resumenPedido = pedido.mostrarResumen();
  alert(resumenPedido);
}

// Menú principal
let opcion;
do {
  opcion = parseInt(prompt(
    "Bienvenido a cakebar\n" +
    "1. Mostrar productos disponibles\n" +
    "2. Agregar producto al pedido\n" +
    "3. Eliminar producto del pedido\n" +
    "4. Finalizar pedido\n" +
    "5. Salir"
  ));

  switch (opcion) {
    case 1:
      mostrarProductos();
      break;
    case 2:
      agregarProducto();
      break;
    case 3:
      eliminarProducto();
      break;
    case 4:
      finalizarPedido();
      break;
    case 5:
      alert("¡Gracias por su visita! Vuelva pronto");
      break;
    default:
      alert("Opción no válida.");
  }
} while (opcion !== 5);