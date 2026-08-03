<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTiendaStore } from '../stores/tienda'

const store = useTiendaStore()
const route = useRoute()

const categoriaSeleccionada = ref('Todas')
const porcionesFiltro = ref('todas')
const productoAgregadoId = ref(null)

onMounted(() => {
  if (route.query.categoria) {
    categoriaSeleccionada.value = route.query.categoria
  }
})

// Filtrado combinado por Categoría + Calculadora de Porciones
const productosFiltrados = computed(() => {
  return store.productos.filter(prod => {
    const coincideCat = categoriaSeleccionada.value === 'Todas' || prod.categoria === categoriaSeleccionada.value
    
    let coincidePorciones = true
    if (porcionesFiltro.value === '10') coincidePorciones = prod.porciones <= 10
    if (porcionesFiltro.value === '20') coincidePorciones = prod.porciones > 10 && prod.porciones <= 20
    if (porcionesFiltro.value === '30') coincidePorciones = prod.porciones > 20

    return coincideCat && coincidePorciones
  })
})

// Función para obtener cuántas unidades de este producto ya están en el carrito
const obtenerCantidadEnCarrito = (id) => {
  const item = store.carrito.find(i => i.id === id)
  return item ? item.cantidad : 0
}

// Agregar con feedback visual momentáneo
const agregarYNotificar = (prod) => {
  store.agregarAlCarrito(prod)
  productoAgregadoId.value = prod.id
  setTimeout(() => {
    productoAgregadoId.value = null
  }, 1200)
}
</script>

<template>
  <div class="catalogo-container">
    <h2>Catálogo de Postres</h2>

    <!-- 📊 CALCULADORA Y FILTROS -->
    <div class="panel-filtros">
      <div class="filtro-item">
        <label>🍰 Categoría:</label>
        <select v-model="categoriaSeleccionada">
          <option value="Todas">Todas las categorías</option>
          <option v-for="cat in store.categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="filtro-item calculadora">
        <label>👥 ¿Para cuántas personas es tu evento?:</label>
        <select v-model="porcionesFiltro">
          <option value="todas">Cualquier tamaño</option>
          <option value="10">Pequeño (1 a 10 personas)</option>
          <option value="20">Mediano (11 a 20 personas)</option>
          <option value="30">Grande (Más de 20 personas)</option>
        </select>
      </div>
    </div>

    <!-- Muestra mensaje si los filtros no devuelven nada -->
    <div v-if="productosFiltrados.length === 0" class="sin-resultados">
      <p>🔍 No encontramos ningún postre con esos criterios de búsqueda.</p>
      <button @click="categoriaSeleccionada = 'Todas'; porcionesFiltro = 'todas'">Restablecer Filtros</button>
    </div>

    <!-- REJILLA DE PRODUCTOS -->
    <div v-else class="productos-grid">
      <div v-for="prod in productosFiltrados" :key="prod.id" class="prod-card">
        <div class="img-container">
          <img :src="prod.imagen" :alt="prod.nombre" />
          <span v-if="prod.stock <= 3 && prod.stock > 0" class="badge-stock-bajo">
            ¡Quedan {{ prod.stock }}!
          </span>
        </div>
        
        <div class="prod-content">
          <h3>{{ prod.nombre }}</h3>
          
          <div class="detalles-tecnicos">
            <span class="badge-porciones">👥 ~{{ prod.porciones }} porciones</span>
            <span class="stock-info">Stock: {{ prod.stock }}</span>
          </div>

          <p class="precio">{{ prod.precio }} Bs</p>

          <button 
            class="btn-agregar" 
            :class="{ 'btn-agregado': productoAgregadoId === prod.id }"
            :disabled="prod.stock <= 0 || obtenerCantidadEnCarrito(prod.id) >= prod.stock"
            @click="agregarYNotificar(prod)"
          >
            <template v-if="productoAgregadoId === prod.id">
              ✓ ¡Agregado!
            </template>
            <template v-else-if="prod.stock <= 0 || obtenerCantidadEnCarrito(prod.id) >= prod.stock">
              Agotado
            </template>
            <template v-else>
              Agregar al Carrito
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalogo-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h2 {
  color: #451a03;
  margin-bottom: 1.5rem;
}

.panel-filtros {
  display: flex;
  gap: 1.5rem;
  background: #fffaf7;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #f3e8e0;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filtro-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filtro-item label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #78350f;
}

.filtro-item select {
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  background-color: white;
}

.sin-resultados {
  text-align: center;
  padding: 3rem;
  background: #fffaf7;
  border-radius: 1rem;
  border: 1px dashed #f3e8e0;
}

.sin-resultados button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #78350f;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.prod-card {
  background: white;
  border: 1px solid #f3e8e0;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.prod-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(69, 26, 3, 0.08);
}

.img-container {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-stock-bajo {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e11d48;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.prod-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.prod-content h3 {
  font-size: 1rem;
  color: #451a03;
  margin-bottom: 0.6rem;
}

.detalles-tecnicos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.badge-porciones {
  font-size: 0.8rem;
  background: #fef3c7;
  color: #92400e;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
}

.stock-info {
  font-size: 0.75rem;
  color: #78350f;
  opacity: 0.8;
}

.precio {
  font-size: 1.25rem;
  font-weight: bold;
  color: #e11d48;
  margin-top: auto;
  margin-bottom: 0.75rem;
}

.btn-agregar {
  background: #e11d48;
  color: white;
  border: none;
  padding: 0.65rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-agregar:hover:not(:disabled) {
  background: #be123c;
}

.btn-agregar:disabled {
  background: #d1d5db;
  color: #6b7280;
  cursor: not-allowed;
}

.btn-agregado {
  background: #16a34a !important;
}
</style>