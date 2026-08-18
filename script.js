document.addEventListener('DOMContentLoaded', () => {
  inicializarMenu();
  cargarClientes();
  actualizarCarritoUI();
});

let carrito = [];

/* --- 1. Lógica Menú Responsivo --- */
function inicializarMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarritoUI();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  cartItemsList.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    cartItemsList.innerHTML = '<li class="empty-msg">Tu carrito está vacío.</li>';
  } else {
    carrito.forEach(item => {
      total += item.precio;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `<span>${item.nombre}</span> <strong>Q ${item.precio.toFixed(2)}</strong>`;
      cartItemsList.appendChild(li);
    });
  }

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = carrito.length;
}

/* --- 3. Lógica Grabación de Clientes --- */
const clientForm = document.getElementById('clientForm');
const clientTableBody = document.getElementById('clientTableBody');

clientForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;

  const nuevoCliente = { nombre, email, telefono };

  guardarCliente(nuevoCliente);
  clientForm.reset();
  cargarClientes();
});

function obtenerClientes() {
  const clientes = localStorage.getItem('clientes_tienda');
  return clientes ? JSON.parse(clientes) : [];
}

function guardarCliente(cliente) {
  const clientes = obtenerClientes();
  clientes.push(cliente);
  localStorage.setItem('clientes_tienda', JSON.stringify(clientes));
}

function eliminarCliente(index) {
  const clientes = obtenerClientes();
  clientes.splice(index, 1);
  localStorage.setItem('clientes_tienda', JSON.stringify(clientes));
  cargarClientes();
}

function cargarClientes() {
  const clientes = obtenerClientes();
  clientTableBody.innerHTML = '';

  if (clientes.length === 0) {
    clientTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay clientes registrados aún.</td></tr>';
    return;
  }

  clientes.forEach((cliente, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefono}</td>
      <td><button class="btn-delete" onclick="eliminarCliente(${index})">Eliminar</button></td>
    `;
    clientTableBody.appendChild(row);
  });
}