import { defineStore } from 'pinia'

export const useTiendaStore = defineStore('tienda', {
  state: () => ({
    categorias: [
      'Pasteles de Cumpleaños',
      'Bodas & Eventos',
      'Postres Clásicos',
      'Temáticos & Infantiles'
    ],
    productos: [
      // --- CUMPLEAÑOS ---
      { id: 1, nombre: 'Pastel Clásico de Cumpleaños', precio: 150, stock: 10, vendidos: 25, porciones: 12, categoria: 'Pasteles de Cumpleaños', imagen: '/pasteles/cumple1.jpg' },
      { id: 2, nombre: 'Pastel Fiesta Rosada', precio: 140, stock: 8, vendidos: 18, porciones: 10, categoria: 'Pasteles de Cumpleaños', imagen: '/pasteles/cumple2.jpg' },
      { id: 3, nombre: 'Pastel Elegante Rosas & Macarons', precio: 130, stock: 12, vendidos: 15, porciones: 10, categoria: 'Pasteles de Cumpleaños', imagen: '/pasteles/cumple3.jpg' },
      { id: 4, nombre: 'Pastel Caramelo & Frutos Rojos', precio: 160, stock: 5, vendidos: 30, porciones: 15, categoria: 'Pasteles de Cumpleaños', imagen: '/pasteles/cumple4.jpg' },
      { id: 5, nombre: 'Pastel Jardín Imperial', precio: 155, stock: 7, vendidos: 12, porciones: 15, categoria: 'Pasteles de Cumpleaños', imagen: '/pasteles/cumple5.jpg' },

      // --- BODAS & EVENTOS ---
      { id: 6, nombre: 'Pastel Imperial Rosas Blancas & Verde', precio: 450, stock: 3, vendidos: 8, porciones: 50, categoria: 'Bodas & Eventos', imagen: '/pasteles/boda1.jpg' },
      { id: 7, nombre: 'Naked Cake de Frutos Rojos', precio: 380, stock: 4, vendidos: 10, porciones: 35, categoria: 'Bodas & Eventos', imagen: '/pasteles/boda2.jpg' },
      { id: 8, nombre: 'Pastel Monograma Gold & Nube', precio: 420, stock: 2, vendidos: 5, porciones: 40, categoria: 'Bodas & Eventos', imagen: '/pasteles/boda3.jpg' },
      { id: 9, nombre: 'Pastel Romántico Perlas & Rosas', precio: 350, stock: 6, vendidos: 14, porciones: 30, categoria: 'Bodas & Eventos', imagen: '/pasteles/boda4.jpg' },
      { id: 10, nombre: 'Pastel Rústico Eucalipto & Rosas', precio: 390, stock: 5, vendidos: 7, porciones: 35, categoria: 'Bodas & Eventos', imagen: '/pasteles/boda5.jpg' },

      // --- POSTRES CLÁSICOS ---
      { id: 11, nombre: 'Flan Casero Tradicional', precio: 90, stock: 15, vendidos: 40, porciones: 8, categoria: 'Postres Clásicos', imagen: '/pasteles/postre1.jpg' },
      { id: 12, nombre: 'Tiramisú Tradicional Italiano', precio: 110, stock: 10, vendidos: 35, porciones: 10, categoria: 'Postres Clásicos', imagen: '/pasteles/postre2.jpg' },
      { id: 13, nombre: 'Volcán de Chocolate & Fresas', precio: 85, stock: 12, vendidos: 22, porciones: 6, categoria: 'Postres Clásicos', imagen: '/pasteles/postre3.jpg' },
      { id: 14, nombre: 'Brazo de Reina Artesanal', precio: 95, stock: 8, vendidos: 19, porciones: 8, categoria: 'Postres Clásicos', imagen: '/pasteles/postre4.jpg' },
      { id: 15, nombre: 'Cheesecake de Arándanos', precio: 100, stock: 14, vendidos: 28, porciones: 10, categoria: 'Postres Clásicos', imagen: '/pasteles/postre5.jpg' },

      // --- TEMÁTICOS & INFANTILES ---
      { id: 16, nombre: 'Monstruitos Divertidos de Galleta', precio: 180, stock: 6, vendidos: 16, porciones: 12, categoria: 'Temáticos & Infantiles', imagen: '/pasteles/infantil1.jpg' },
      { id: 17, nombre: 'Shots Encantados Sirena Gold', precio: 190, stock: 5, vendidos: 11, porciones: 12, categoria: 'Temáticos & Infantiles', imagen: '/pasteles/infantil2.jpg' },
      { id: 18, nombre: 'Set Dulce Elegante & Corazones', precio: 185, stock: 7, vendidos: 13, porciones: 10, categoria: 'Temáticos & Infantiles', imagen: '/pasteles/infantil3.jpg' },
      { id: 19, nombre: 'Mousse Gourmet de Frutos Rojos', precio: 200, stock: 4, vendidos: 9, porciones: 15, categoria: 'Temáticos & Infantiles', imagen: '/pasteles/infantil4.jpg' },
      { id: 20, nombre: 'Cupcakes Navideños Festivos', precio: 195, stock: 8, vendidos: 21, porciones: 12, categoria: 'Temáticos & Infantiles', imagen: '/pasteles/infantil5.jpg' }
    ],
    carrito: []
  }),

  getters: {
    totalCarrito: (state) => {
      return state.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    },
    
    totalUnidadesCarrito: (state) => {
      return state.carrito.reduce((acc, item) => acc + item.cantidad, 0)
    },

    cantidadTotalProductos: (state) => state.productos.length,

    productoEstrella: (state) => {
      if (state.productos.length === 0) return null
      return [...state.productos].sort((a, b) => b.vendidos - a.vendidos)[0]
    },

    ingresosTotales: (state) => {
      return state.productos.reduce((acc, p) => acc + (p.precio * p.vendidos), 0)
    }
  },

  actions: {
    agregarAlCarrito(producto) {
      const existe = this.carrito.find(item => item.id === producto.id)
      if (existe) {
        if (existe.cantidad < producto.stock) {
          existe.cantidad++
        }
      } else {
        this.carrito.push({ ...producto, cantidad: 1 })
      }
    },

    incrementarCantidad(id) {
      const item = this.carrito.find(i => i.id === id)
      const prod = this.productos.find(p => p.id === id)
      if (item && prod && item.cantidad < prod.stock) {
        item.cantidad++
      }
    },

    disminuirCantidad(id) {
      const item = this.carrito.find(i => i.id === id)
      if (item) {
        if (item.cantidad > 1) {
          item.cantidad--
        } else {
          this.eliminarDelCarrito(id)
        }
      }
    },

    eliminarDelCarrito(id) {
      this.carrito = this.carrito.filter(i => i.id !== id)
    },

    vaciarCarrito() {
      this.carrito = []
    },

    // Acción clave para simular la compra y actualizar el Dashboard dinámicamente
    procesarCompra() {
      this.carrito.forEach(item => {
        const prod = this.productos.find(p => p.id === item.id)
        if (prod) {
          prod.vendidos += item.cantidad
          prod.stock -= item.cantidad
        }
      })
      this.vaciarCarrito()
    }
  }
})