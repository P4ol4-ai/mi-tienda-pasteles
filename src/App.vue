<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTiendaStore } from './stores/tienda'

const store = useTiendaStore()
const estaAnimando = ref(false)

// Cálculo reactivo optimizado para la cantidad total de productos
const totalProductos = computed(() => {
  return store.carrito.reduce((acc, item) => acc + item.cantidad, 0)
})

const animarPastel = () => {
  estaAnimando.value = true
  setTimeout(() => {
    estaAnimando.value = false
  }, 600)
}

// Dispara la animación automáticamente al agregar items desde cualquier vista
watch(totalProductos, (nuevoTotal, anteriorTotal) => {
  if (nuevoTotal > anteriorTotal) {
    animarPastel()
  }
})
</script>

<template>
  <div class="app-container">
    <!-- Navbar Premium -->
    <header class="navbar">
      <div class="nav-content">
        <!-- 🍰 LOGO CORREGIDO -->
        <RouterLink to="/" class="logo">
          <span class="logo-icon">🎂</span>
          <span class="brand-text">Dulce</span>
          <span class="brand-accent">Artesanal</span>
        </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/catalogo">Catálogo</RouterLink>
          <RouterLink to="/nosotros">Nosotros</RouterLink>
          <RouterLink to="/admin" class="admin-link">Admin</RouterLink>

          <!-- Botón de Carrito Animado -->
          <RouterLink to="/carrito" class="cart-btn" @click="animarPastel">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="cake-icon"
              :class="{ 'bounce-anim': estaAnimando }"
            >
              <path d="M12 2v3"></path>
              <path d="M12 2a1 1 0 0 1 1 1c0 .5-.5 1-1 1s-1-.5-1-1a1 1 0 0 1 1-1z" fill="#e11d48"></path>
              <path d="M4 11h16a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1z"></path>
              <path d="M3 15c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"></path>
            </svg>
            
            <span class="btn-text">Carrito</span>

            <span v-if="totalProductos > 0" class="badge">
              {{ totalProductos }}
            </span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Contenido Principal -->
    <main class="content">
      <RouterView />
    </main>

    <!-- Pie de Página -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>Dulce <span class="brand-accent">Artesanal</span></h3>
          <p>Repostería fina y postres horneados a pedido en Oruro con ingredientes seleccionados.</p>
        </div>
        <div class="footer-links">
          <h4>Navegación</h4>
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/catalogo">Catálogo Completo</RouterLink>
          <RouterLink to="/nosotros">Sobre Nosotros</RouterLink>
        </div>
        <div class="footer-social">
          <h4>Contacto en Oruro</h4>
          <p>✨ @dulceartesanal_oruro</p>
          <p>📞 +591 73839330</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Dulce Artesanal • Instituto Técnico Jesús María (Oruro, Bolivia)</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Reset & Variables */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  background-color: #fdf8f5;
  color: #451a03;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navbar con Glassmorphism */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f3e8e0;
  box-shadow: 0 4px 20px rgba(69, 26, 3, 0.04);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 2rem;
}

/* 🍰 ESTILO DEL LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  font-weight: 800;
  color: #451a03;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  font-size: 1.3rem;
}

.brand-accent {
  color: #e11d48;
}

/* 🔗 ENLACES Y TIPOGRAFÍA */
.nav-links {
  display: flex;
  gap: 1.6rem;
  align-items: center;
}

.nav-links a {
  color: #78350f;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
}

.nav-links a:hover,
.nav-links a.router-link-active:not(.cart-btn) {
  color: #e11d48;
  background-color: #fff1f2;
}

/* Botón Admin en el Nav */
.admin-link {
  color: #78350f !important;
}

/* 🛒 BOTÓN CARRITO ANIMADO */
.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background-color: #fff1f2 !important;
  color: #e11d48 !important;
  padding: 0.5rem 1.1rem !important;
  border-radius: 999px !important;
  border: 1px solid #fecdd3;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(225, 29, 72, 0.08);
}

.cart-btn:hover {
  background-color: #ffe4e6 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.15);
}

.cake-icon {
  width: 20px;
  height: 20px;
  stroke: #e11d48;
}

/* Animación de Rebote */
.bounce-anim {
  animation: cakeBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes cakeBounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.35) rotate(-12deg); }
  50% { transform: scale(0.85) rotate(8deg); }
  75% { transform: scale(1.15) rotate(-4deg); }
  100% { transform: scale(1); }
}

.badge {
  background-color: #e11d48;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  line-height: 1;
}

/* Layout Content */
.content {
  flex: 1;
  padding: 2.5rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Estilos del Footer */
.footer {
  background-color: #ffffff;
  border-top: 1.5px solid #f3e8e0;
  margin-top: auto;
  padding-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2.5rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
}

.footer-brand h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #451a03;
}

.footer-brand p {
  color: #78350f;
  font-size: 0.9rem;
  max-width: 320px;
  line-height: 1.5;
}

.footer-links, .footer-social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links h4, .footer-social h4 {
  color: #451a03;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #78350f;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #e11d48;
}

.footer-social p {
  color: #78350f;
  font-size: 0.9rem;
}

.footer-bottom {
  border-top: 1px solid #fdf8f5;
  background-color: #fffaf7;
  text-align: center;
  padding: 1rem;
  font-size: 0.85rem;
  color: #78350f;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>