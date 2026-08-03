<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTiendaStore } from '../stores/tienda'

const store = useTiendaStore()
const router = useRouter()

// Campos para personalización
const dedicatoria = ref('')
const saborRelleno = ref('Vainilla Tradicional')

// Estado para controlar el modal de compra exitosa
const mostrarModalExito = ref(false)
const numeroPedido = ref('')

const procesarCompra = () => {
  if (store.carrito.length === 0) return

  // Generamos un número de pedido enfocado en Oruro (ej: #ORU-8492)
  numeroPedido.value = `#ORU-${Math.floor(1000 + Math.random() * 9000)}`
  
  // Mostramos la ventana de confirmación
  mostrarModalExito.value = true
}

const cerrarModalYLimpiar = () => {
  mostrarModalExito.value = false
  // Procesa la compra en la tienda (reduce stock, incrementa vendidos y vacía el carrito)
  store.procesarCompra()
  router.push('/catalogo') // Redirige al catálogo tras comprar
}
</script>

<template>
  <div class="carrito-container">
    <!-- 🕒 1. AVISO DE PEDIDO ANTICIPADO -->
    <div class="alerta-anticipacion">
      🕒 <strong>Aviso importante:</strong> Todos nuestros pasteles se hornean bajo pedido en Oruro. Por favor realiza tu compra con al menos <strong>24 horas de anticipación</strong>.
    </div>

    <h2>Tu Carrito de Compras</h2>

    <!-- Carrito Vacío -->
    <div v-if="store.carrito.length === 0" class="carrito-vacio">
      <p>Aún no has agregado deliciosos postres a tu carrito.</p>
      <button @click="router.push('/catalogo')">Ir al Catálogo</button>
    </div>

    <!-- Lista de Productos y Formularios -->
    <div v-else class="carrito-contenido">
      <div class="columna-principal">
        <div class="items-lista">
          <div v-for="item in store.carrito" :key="item.id" class="item-card">
            <img :src="item.imagen" :alt="item.nombre" />
            <div class="item-info">
              <h3>{{ item.nombre }}</h3>
              <p class="precio">{{ item.precio }} Bs c/u</p>
            </div>
            <div class="controles-cantidad">
              <button @click="store.disminuirCantidad(item.id)">-</button>
              <span>{{ item.cantidad }}</span>
              <button @click="store.incrementarCantidad(item.id)">+</button>
            </div>
            <div class="subtotal">
              {{ item.precio * item.cantidad }} Bs
            </div>
            <button class="btn-eliminar" @click="store.eliminarDelCarrito(item.id)">✕</button>
          </div>
        </div>

        <!-- ✨ 2. SECCIÓN DE PERSONALIZACIÓN DEL PEDIDO -->
        <div class="personalizacion-card">
          <h3>✨ Personaliza tu Pedido</h3>
          
          <div class="campo">
            <label>Mensaje para la tarjeta o dedicatoria (Opcional):</label>
            <textarea 
              v-model="dedicatoria" 
              placeholder="Ej: ¡Feliz Cumpleaños Mamá! Con mucho amor de parte de la familia..."
              rows="3"
            ></textarea>
          </div>

          <div class="campo">
            <label>Sabor de relleno preferido:</label>
            <select v-model="saborRelleno">
              <option value="Vainilla Tradicional">Vainilla Tradicional</option>
              <option value="Dulce de Leche / Manjar">Dulce de Leche / Manjar</option>
              <option value="Chocolate Fudge">Chocolate Fudge</option>
              <option value="Crema Chantilly con Durazno">Crema Chantilly con Durazno</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Resumen de Pedido -->
      <div class="resumen-card">
        <h3>Resumen del Pedido</h3>
        <div class="linea-resumen">
          <span>Subtotal:</span>
          <span>{{ store.totalCarrito }} Bs</span>
        </div>
        <div class="linea-resumen">
          <span>Envío en Oruro:</span>
          <span class="gratis">¡Gratis!</span>
        </div>
        <hr />
        <div class="linea-resumen total">
          <span>Total a Pagar:</span>
          <span>{{ store.totalCarrito }} Bs</span>
        </div>

        <button class="btn-finalizar" @click="procesarCompra">
          Finalizar Compra ➔
        </button>
      </div>
    </div>

    <!-- 🌟 MODAL DE COMPRA EXITOSA 🌟 -->
    <div v-if="mostrarModalExito" class="modal-overlay">
      <div class="modal-card">
        <div class="check-icon">🎉</div>
        <h2>¡Gracias por tu compra!</h2>
        <p class="pedido-num">Número de pedido: <strong>{{ numeroPedido }}</strong></p>
        
        <p class="mensaje-exito">
          Hemos recibido tu orden con un total de <strong>{{ store.totalCarrito }} Bs</strong>. Estamos preparando tus postres con la mayor dedicación y frescura.
        </p>

        <!-- Detalles de la personalización recibida -->
        <div v-if="dedicatoria || saborRelleno" class="detalles-personalizados">
          <p v-if="saborRelleno">🍰 <strong>Relleno:</strong> {{ saborRelleno }}</p>
          <p v-if="dedicatoria">✍️ <strong>Dedicatoria:</strong> "{{ dedicatoria }}"</p>
        </div>

        <div class="detalles-envio">
          <p>📧 Te enviamos un correo con la nota de entrega.</p>
          <p>📲 Nos pondremos en contacto vía WhatsApp para coordinar la hora exacta de entrega en Oruro.</p>
        </div>

        <button class="btn-modal-aceptar" @click="cerrarModalYLimpiar">
          Entendido, volver a la tienda
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carrito-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ALERTA DE 24 HRS */
.alerta-anticipacion {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  padding: 0.9rem 1.2rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

h2 {
  color: #451a03;
  margin-bottom: 1.5rem;
}

.carrito-vacio {
  text-align: center;
  padding: 3rem;
  background: #fffaf7;
  border-radius: 1rem;
  border: 1px dashed #f3e8e0;
}

.carrito-vacio button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #e11d48;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.carrito-contenido {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
}

.columna-principal {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.items-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #f3e8e0;
}

.item-card img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 1rem;
  color: #451a03;
}

.precio {
  color: #78350f;
  font-size: 0.85rem;
}

.controles-cantidad {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controles-cantidad button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #fecdd3;
  background: white;
  cursor: pointer;
  font-weight: bold;
}

.subtotal {
  font-weight: bold;
  color: #e11d48;
  width: 80px;
  text-align: right;
}

.btn-eliminar {
  background: transparent;
  border: none;
  color: #991b1b;
  cursor: pointer;
  font-size: 1.1rem;
}

/* SECCIÓN DE PERSONALIZACIÓN */
.personalizacion-card {
  background: #fffaf7;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #f3e8e0;
}

.personalizacion-card h3 {
  color: #451a03;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #78350f;
}

.campo textarea, .campo select {
  padding: 0.61rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-family: inherit;
  font-size: 0.9rem;
}

/* RESUMEN DE PAGO */
.resumen-card {
  background: #fffaf7;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f3e8e0;
  height: fit-content;
}

.resumen-card h3 {
  color: #451a03;
  margin-bottom: 1rem;
}

.linea-resumen {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: #78350f;
}

.gratis {
  color: #16a34a;
  font-weight: bold;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #e11d48;
  margin-top: 0.5rem;
}

.btn-finalizar {
  width: 100%;
  padding: 0.85rem;
  background-color: #e11d48;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.25rem;
  transition: background-color 0.2s;
}

.btn-finalizar:hover {
  background-color: #be123c;
}

/* MODAL DE TIENDA REAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  max-width: 450px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.check-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.modal-card h2 {
  color: #451a03;
  margin-bottom: 0.5rem;
}

.pedido-num {
  background: #fff1f2;
  color: #e11d48;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.mensaje-exito {
  color: #78350f;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.detalles-personalizados {
  background: #fffaf7;
  border: 1px solid #f3e8e0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: left;
  font-size: 0.85rem;
  color: #451a03;
  margin-bottom: 1rem;
}

.detalles-envio {
  background: #fafaf9;
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
  color: #57534e;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn-modal-aceptar {
  width: 100%;
  padding: 0.85rem;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.btn-modal-aceptar:hover {
  background: #15803d;
}

@media (max-width: 768px) {
  .carrito-contenido {
    grid-template-columns: 1fr;
  }
}
</style>