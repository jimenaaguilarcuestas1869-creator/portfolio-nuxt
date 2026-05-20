<script setup>
import { ref } from 'vue'

const scrollArriba = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Array con los datos de los 4 integrantes del equipo

const equipo = ref([
  {
    id: 1,
    nombre: "Sara Escribano",
    foto: "/img/tu-foto.jpg", // Usa tu foto actual
    email: "escribano.sara@gmail.com",
    ig_design: "@sara.escribano_design",
    url_design: "https://www.instagram.com/sara.escribano_design/?hl=es",
    ig_personal: "@misstipquill",
    url_personal: "https://www.instagram.com/misstipquill/?hl=es",
    linkedin: "Sara Escribano",
    url_linkedin: "https://www.linkedin.com/in/sara-escribano-alba-3a16b1233/?skipRedirect=true"
  },
  {
    id: 2,
    nombre: "Compañero 2",
    foto: "/img/tu-foto.jpg", // Rutas provisionales para que las cambien ellos
    email: "correo.companero2@gmail.com",
    ig_design: "@instagram_diseno_2",
    url_design: "#",
    ig_personal: "@instagram_personal_2",
    url_personal: "#",
    linkedin: "Nombre Compañero 2",
    url_linkedin: "#"
  },
  {
    id: 3,
    nombre: "Compañero 3",
    foto: "/img/tu-foto.jpg",
    email: "correo.companero3@gmail.com",
    ig_design: "@instagram_diseno_3",
    url_design: "#",
    ig_personal: "@instagram_personal_3",
    url_personal: "#",
    linkedin: "Nombre Compañero 3",
    url_linkedin: "#"
  },
  {
    id: 4,
    nombre: "Compañero 4",
    foto: "/img/tu-foto.jpg",
    email: "correo.companero4@gmail.com",
    ig_design: "@instagram_diseno_4",
    url_design: "#",
    ig_personal: "@instagram_personal_4",
    url_personal: "#",
    linkedin: "Nombre Compañero 4",
    url_linkedin: "#"
  }
])
</script>

<template>
  <section id="contacto" class="contacto-section">
    <div class="container">
      <h2 class="section-title">Sobre nosotros</h2> 
      
      <div class="equipo-wrapper-list">
        
        <div v-for="miembro in equipo" :key="miembro.id" class="about-wrapper">
          
          <div class="about-image">
            <img :src="miembro.foto" :alt="miembro.nombre">
            <div class="about-shape"></div> 
          </div>
          
          <div class="contact-links">
            <h3 class="miembro-nombre-titulo">{{ miembro.nombre }}</h3>

            <div class="contact-item">
              <img src="/img/iconos/icono-mail.svg" alt="Email" class="contact-icon">
              <a :href="'mailto:' + miembro.email">{{ miembro.email }}</a>
            </div>
            
            <div class="contact-item">
              <img src="/img/iconos/icono-ig.svg" alt="Instagram" class="contact-icon">
              <a :href="miembro.url_design" target="_blank">{{ miembro.ig_design }}</a>
            </div>
            
            <div class="contact-item">
              <img src="/img/iconos/icono-ig.svg" alt="Instagram Personal" class="contact-icon">
              <a :href="miembro.url_personal" target="_blank">{{ miembro.ig_personal }}</a>
            </div>
            
            <div class="contact-item">
              <img src="/img/iconos/icono-linkedin.svg" alt="LinkedIn" class="contact-icon">
              <a :href="miembro.url_linkedin" target="_blank">{{ miembro.linkedin }}</a>
            </div>
          </div>

        </div>

      </div>
    </div>

    <button @click="scrollArriba" id="back-to-top" class="back-to-top" aria-label="Volver arriba">
      <img src="/img/iconos/icono-flecha.svg" alt="Subir">
    </button>

    <footer class="main-footer">
      <div class="footer-content">
        <p>&copy; 2026 Bandcamp — Diseñadores Gráficos</p>
      </div>
    </footer>
  </section>
</template>

<style scoped>



.equipo-wrapper-list {
  display: flex;
  flex-direction: column;
  gap: 100px; 
  width: 100%;
  margin-top: 50px;
}


.about-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 80px; 
  width: 100%;
}


.miembro-nombre-titulo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
  font-family: sans-serif;
}

/* Responsive para pantallas pequeñas o móviles */
@media (max-width: 768px) {
  .about-wrapper {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }
  .contact-links {
    align-items: center;
  }
}
</style>