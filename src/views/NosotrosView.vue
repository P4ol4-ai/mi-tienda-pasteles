<template>
  <div class="nosotros-container">
    <div class="card-nosotros">
      <div class="header-card">
        <span class="badge-academico">Proyecto Académico Final</span>
        <h2>Instituto Técnico Jesús María</h2>
        <span class="carrera">Materia: Diseño de Programación Web II</span>
      </div>

      <p class="descripcion">
        Este prototipo web ha sido desarrollado como proyecto de evaluación para
        demostrar las competencias en la construcción de aplicaciones de página única (SPA)
        modernas, interactivas y reactivas enfocado en la repostería artesanal.
      </p>

      <!-- 🛠️ TECNOLOGÍAS UTILIZADAS -->
      <div class="tecnologias">
        <h4>Tecnologías Implementadas:</h4>
        <div class="badges-grid">
          <span class="tag">Vue 3 (Composition API)</span>
          <span class="tag">Pinia (State Management)</span>
          <span class="tag">Vue Router</span>
          <span class="tag">Chart.js / vue-chartjs</span>
        </div>
      </div>

      <!-- 📌 INFORMACIÓN INSTITUCIONAL -->
      <div class="info-adicional">
        <div class="info-item">
          <span class="icono">📍</span>
          <div>
            <strong>Sede:</strong>
            <p>Oruro - Bolivia</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icono">🍰</span>
          <div>
            <strong>Especialidad:</strong>
            <p>Repostería Artesanal Digital</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nosotros-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.card-nosotros {
  background-color: #ffffff;
  border: 1px solid #f3e8e0;
  border-radius: 1.25rem;
  padding: 2.5rem;
  max-width: 650px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(69, 26, 3, 0.08);
}

.header-card {
  margin-bottom: 1.5rem;
}

.badge-academico {
  background-color: #fff1f2;
  color: #e11d48;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 0.75rem;
  border: 1px solid #fecdd3;
}

h2 {
  color: #451a03;
  margin: 0 0 0.25rem 0;
  font-size: 1.6rem;
}

.carrera {
  display: block;
  font-size: 0.95rem;
  color: #e11d48;
  font-weight: 600;
}

.descripcion {
  line-height: 1.6;
  color: #57534e;
  margin-bottom: 1.5rem;
  font-size: 0.98rem;
}

/* STYLES PARA BADGES DE TECNOLOGÍAS */
.tecnologias {
  margin-bottom: 1.75rem;
  background: #fffaf7;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #f3e8e0;
}

.tecnologias h4 {
  margin: 0 0 0.75rem 0;
  color: #78350f;
  font-size: 0.9rem;
}

.badges-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: white;
  color: #78350f;
  border: 1px solid #fde68a;
  font-size: 0.82rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 500;
}

/* INFORMACIÓN INSTITUCIONAL */
.info-adicional {
  border-top: 1px solid #f3e8e0;
  padding-top: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icono {
  font-size: 1.5rem;
}

.info-item strong {
  display: block;
  font-size: 0.85rem;
  color: #78350f;
}

.info-item p {
  margin: 0;
  font-size: 0.95rem;
  color: #451a03;
  font-weight: 600;
}

@media (max-width: 550px) {
  .info-adicional {
    grid-template-columns: 1fr;
  }
}
</style>