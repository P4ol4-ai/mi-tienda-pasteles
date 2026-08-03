<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../stores/tienda'

const store = useTiendaStore()

// Estado para controlar el menú en celulares
const menuAbierto = ref(false)

const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value
}

const cerrarMenu = () => {
  menuAbierto.value = false
}
</script>

<template>
  <header class="navbar-header">
    <div class="brand">
      <RouterLink to="/" class="logo" @click="cerrarMenu">
        <span class="logo-icon">✨</span>
        <span class="logo-texto">Dulce <span>Artesanal</span></span>
      </RouterLink>
    </div>

    <!-- Botón Hamburguesa para Móviles -->
    <button 
      class="hamburger" 
      @click="toggleMenu" 
      :aria-expanded="menuAbierto"
      aria-label="Toggle navigation"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <!-- Navegación de Enlaces -->
    <nav class="nav-links" :class="{ 'is-active': menuAbierto }">
      <RouterLink to="/" @click="cerrarMenu">Inicio</RouterLink>
      <RouterLink to="/catalogo" @click="cerrarMenu">Catálogo</RouterLink>
      <RouterLink to="/nosotros" @click="cerrarMenu">Nosotros</RouterLink>

      <!-- Carrito con Badge Dinámico -->
      <RouterLink to="/carrito" class="cart-btn" @click="cerrarMenu">
        🛒 Carrito
        <span v-if="store.carrito.length > 0" class="badge">
          {{ store.carrito.reduce((acc, item) => acc + item.cantidad, 0) }}
        </span>
      </RouterLink>

      <!-- Botón Panel Admin -->
      <RouterLink to="/admin" class="admin-btn" @click="cerrarMenu">
        Panel Admin
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #f3e8e0;
  box-shadow: 0 2px 12px rgba(69, 26, 3, 0.04);
  font-family: system-ui, -apple-system, sans-serif;
}

/* 🍰 LOGO RENOVADO */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  font-size: 1.3rem;
}

.logo-texto {
  font-size: 1.35rem;
  font-weight: 800;
  color: #451a03;
  letter-spacing: -0.5px;
}

.logo-texto span {
  color: #e11d48;
}

/* 🔗 ENLACES DE NAVEGACIÓN */
.nav-links {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #78350f;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
}

.nav-links a:hover {
  color: #e11d48;
  background-color: #fffaf7;
}

/* MARCA DE RUTA ACTIVA */
.nav-links a.router-link-active:not(.admin-btn):not(.cart-btn) {
  color: #e11d48;
  font-weight: 700;
  background-color: #fff1f2;
}

/* 🛒 BOTÓN CARRITO */
.cart-btn {
  background: #fffaf7;
  border: 1px solid #fde68a;
  padding: 0.45rem 0.95rem !important;
  border-radius: 20px !important;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #92400e !important;
}

.cart-btn:hover {
  background: #fef3c7 !important;
}

.badge {
  background: #e11d48;
  color: white;
  border-radius: 50%;
  padding: 0.15rem 0.55rem;
  font-size: 0.75rem;
  font-weight: bold;
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 🔒 BOTÓN ADMIN */
.admin-btn {
  background: #e11d48;
  color: white !important;
  padding: 0.5rem 1.1rem !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
  box-shadow: 0 2px 6px rgba(225, 29, 72, 0.2);
}

.admin-btn:hover {
  background: #be123c !important;
}

/* 🍔 MENÚ HAMBURGUESA */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger .bar {
  height: 3px;
  width: 100%;
  background-color: #78350f;
  border-radius: 2px;
}

/* Animación del badge al agregar items */
@keyframes pop {
  0% { transform: scale(0.6); }
  100% { transform: scale(1); }
}

/* RESPONSIVE PARA MÓVILES */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 2px solid #f3e8e0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: none;
  }

  .nav-links.is-active {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    text-align: center;
  }
}
</style>