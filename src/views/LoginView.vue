<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos del formulario
const usuario = ref('')
const password = ref('')
const mensajeError = ref('')

// Credenciales válidas para la demostración
const USUARIO_CORRECTO = 'admin'
const PASSWORD_CORRECTA = '1234'

const iniciarSesion = () => {
  mensajeError.value = ''

  if (!usuario.value || !password.value) {
    mensajeError.value = 'Por favor ingresa usuario y contraseña.'
    return
  }

  if (usuario.value === USUARIO_CORRECTO && password.value === PASSWORD_CORRECTA) {
    // Guardamos la sesión en localStorage para que la Navigation Guard lo detecte
    localStorage.setItem('adminAutenticado', 'true')
    router.push('/admin')
  } else {
    mensajeError.value = 'Usuario o contraseña incorrectos. Intenta con admin / 1234'
  }
}

// Botón de acceso rápido para la presentación
const autoRellenar = () => {
  usuario.value = 'admin'
  password.value = '1234'
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="header-login">
        <span class="badge-admin">🔒 Panel Administrativo</span>
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para gestionar el catálogo y ventas.</p>
      </div>

      <!-- Alerta de Error -->
      <div v-if="mensajeError" class="alerta-error">
        ⚠️ {{ mensajeError }}
      </div>

      <form @submit.prevent="iniciarSesion" class="form-login">
        <div class="campo">
          <label>Usuario:</label>
          <input 
            v-model="usuario" 
            type="text" 
            placeholder="Ej: admin"
            required
          />
        </div>

        <div class="campo">
          <label>Contraseña:</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-login">
          Ingresar al Dashboard ➔
        </button>
      </form>

      <!-- Ayuda/Demo para el Video -->
      <div class="demo-box">
        <p class="demo-title">💡 Credenciales para la demostración:</p>
        <p><strong>Usuario:</strong> admin | <strong>Clave:</strong> 1234</p>
        <button type="button" @click="autoRellenar" class="btn-demo">
          ⚡ Auto-completar Datos
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  padding: 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.login-card {
  background: white;
  border: 1px solid #f3e8e0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(69, 26, 3, 0.08);
}

.header-login {
  text-align: center;
  margin-bottom: 1.5rem;
}

.badge-admin {
  background-color: #fff1f2;
  color: #e11d48;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 0.75rem;
  border: 1px solid #fecdd3;
}

.header-login h2 {
  color: #451a03;
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
}

.header-login p {
  color: #78350f;
  font-size: 0.88rem;
}

.alerta-error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  text-align: center;
}

.form-login {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.campo label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #451a03;
}

.campo input {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.campo input:focus {
  border-color: #e11d48;
}

.btn-login {
  background: #e11d48;
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-login:hover {
  background: #be123c;
}

/* DEMO ASSISTANT */
.demo-box {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px dashed #f3e8e0;
  text-align: center;
  font-size: 0.82rem;
  color: #78350f;
}

.demo-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.btn-demo {
  margin-top: 0.75rem;
  background: #fffaf7;
  border: 1px solid #fde68a;
  color: #92400e;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-demo:hover {
  background: #fef3c7;
}
</style>