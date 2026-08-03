<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTiendaStore } from '../stores/tienda'

const store = useTiendaStore()
const router = useRouter()

// Variable computada para definir el tope de escala al 100%
const maxVendido = computed(() => {
  return Math.max(...store.productos.map(p => p.vendidos), 1)
})

// Función para cerrar sesión administrativa
const cerrarSesion = () => {
  localStorage.removeItem('adminAutenticado')
  router.push('/login')
}
</script>

<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h2>Dashboard Administrativo</h2>
      <button @click="cerrarSesion" class="btn-logout">🔴 Cerrar Sesión</button>
    </div>

    <!-- Estadísticas KPI -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <h3>Total Productos</h3>
        <p class="kpi-value">{{ store.cantidadTotalProductos }}</p>
      </div>

      <div class="kpi-card">
        <h3>Producto Estrella</h3>
        <p class="kpi-value accent">
          {{ store.productoEstrella ? store.productoEstrella.nombre : 'N/A' }}
        </p>
      </div>

      <div class="kpi-card">
        <h3>Ingresos Totales</h3>
        <p class="kpi-value">{{ store.ingresosTotales }} Bs.</p>
      </div>
    </div>

    <!-- Gráfica de Barras Nativa -->
    <section class="chart-section">
      <h3>Comparativa de Unidades Vendidas</h3>
      <div class="chart-container">
        <div 
          v-for="producto in store.productos" 
          :key="producto.id" 
          class="bar-wrapper"
        >
          <div class="bar-info">
            <span class="prod-title">{{ producto.nombre }}</span>
            <span class="bar-count">{{ producto.vendidos }} unidades</span>
          </div>
          <div class="bar-track">
            <div 
              class="bar-fill" 
              :style="{ width: `${(producto.vendidos / maxVendido) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  border-left: 4px solid #e11d48;
  padding-left: 0.75rem;
  color: #451a03;
  margin: 0;
}

.btn-logout {
  background: #fbe2d5;
  color: #9a3412;
  border: 1px solid #f97316;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: #ffedd5;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.kpi-card {
  background-color: #ffffff;
  border: 1px solid #f3e8e0;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(69, 26, 3, 0.04);
}

.kpi-card h3 {
  font-size: 0.9rem;
  color: #78350f;
  margin-bottom: 0.5rem;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #451a03;
}

.kpi-value.accent {
  color: #e11d48;
}

.chart-section {
  background-color: #ffffff;
  border: 1px solid #f3e8e0;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(69, 26, 3, 0.04);
}

.chart-section h3 {
  margin-bottom: 1.5rem;
  color: #451a03;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bar-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.prod-title {
  color: #451a03;
  font-weight: 600;
}

.bar-count {
  color: #e11d48;
  font-weight: bold;
}

.bar-track {
  width: 100%;
  height: 14px;
  background-color: #f3e8e0;
  border-radius: 999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: #e11d48;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>