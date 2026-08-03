<script setup>
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../stores/tienda'

const store = useTiendaStore()
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge-frescura">🍰 Horneado Hoy • 100% Artesanal</span>
        <h1>Pasteles Especiales para Momentos Inolvidables</h1>
        <p>Elaborados con ingredientes seleccionados y entregados frescos el mismo día. Haz tu pedido en línea fácilmente.</p>
        <div class="cta-group">
          <RouterLink to="/catalogo" class="btn-primary">Explorar Catálogo y Pedir ➔</RouterLink>
          <RouterLink to="/nosotros" class="btn-secondary">Nuestra Historia</RouterLink>
        </div>
      </div>
    </section>

    <!-- Características Destacadas -->
    <section class="features-section">
      <div class="feature-card">
        <span class="icon">✨</span>
        <h3>100% Frescura</h3>
        <p>Preparamos tus postres el mismo día de la entrega para garantizar el mejor sabor.</p>
      </div>
      <div class="feature-card">
        <span class="icon">🎨</span>
        <h3>Diseños Únicos</h3>
        <p>Modelos temáticos, infantiles y elegantes adaptados a tu celebración.</p>
      </div>
      <div class="feature-card">
        <span class="icon">🛵</span>
        <h3>Entrega en Oruro</h3>
        <p>Recibe tu pastel directo en la puerta de tu evento con empaque protegido.</p>
      </div>
    </section>

    <!-- Banner de Productos Populares -->
    <section class="destacados-section">
      <h2>Productos Más Pedidos</h2>
      <div class="grid-destacados">
        <div 
          v-for="prod in store.productos.slice(0, 3)" 
          :key="prod.id" 
          class="card-destacado"
        >
          <img :src="prod.imagen" :alt="prod.nombre" />
          <div class="card-info">
            <h3>{{ prod.nombre }}</h3>
            <p>{{ prod.precio }} Bs.</p>
            <RouterLink to="/catalogo" class="btn-ver">Ver en Catálogo</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('/public/pasteles/portada.jpg') center/cover no-repeat;
  text-align: center;
  color: white;
  padding: 3rem 1.5rem;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 700px;
}

.badge-frescura {
  background: #e11d48;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

p {
  font-size: 1.15rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: #e11d48;
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
}

.btn-primary:hover {
  background: #be123c;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

/* Features */
.features-section {
  max-width: 1100px;
  margin: -3rem auto 3rem auto;
  position: relative;
  z-index: 20;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0 1.5rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid #f3e8e0;
}

.feature-card .icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.feature-card h3 {
  color: #451a03;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
}

/* Destacados */
.destacados-section {
  max-width: 1100px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  text-align: center;
}

.destacados-section h2 {
  color: #451a03;
  margin-bottom: 2rem;
}

.grid-destacados {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.card-destacado {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #f3e8e0;
}

.card-destacado img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-info {
  padding: 1.2rem;
}

.card-info h3 {
  font-size: 1.1rem;
  color: #451a03;
}

.card-info p {
  color: #e11d48;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.5rem 0 1rem 0;
}

.btn-ver {
  display: inline-block;
  background: #78350f;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}
</style>