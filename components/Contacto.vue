<script setup>
const scrollArriba = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section id="contacto" class="contacto-section">
    <div class="container">
      <h2 class="section-title">Contacto</h2> 
      
      <div class="about-wrapper">
        <div class="about-image">
          <img src="/img/tu-foto.jpg" alt="Sara Escribano">
          <div class="about-shape"></div> 
        </div>
        
        <div class="contact-links">
          <div class="contact-item">
            <img src="/img/iconos/icono-mail.svg" alt="Email" class="contact-icon">
            <a href="mailto:escribano.sara@gmail.com">escribano.sara@gmail.com</a>
          </div>
          <div class="contact-item">
            <img src="/img/iconos/icono-ig.svg" alt="Instagram" class="contact-icon">
            <a href="https://www.instagram.com/sara.escribano_design/?hl=es" target="_blank">@sara.escribano_design</a>
          </div>
          <div class="contact-item">
            <img src="/img/iconos/icono-ig.svg" alt="Instagram Personal" class="contact-icon">
            <a href="https://www.instagram.com/misstipquill/?hl=es" target="_blank">@misstipquill</a>
          </div>
          <div class="contact-item">
            <img src="/img/iconos/icono-linkedin.svg" alt="LinkedIn" class="contact-icon">
            <a href="https://www.linkedin.com/in/sara-escribano-alba-3a16b1233/?skipRedirect=true" target="_blank">Sara Escribano</a>
          </div>
        </div>
      </div>
    </div>

    <button @click="scrollArriba" id="back-to-top" class="back-to-top" aria-label="Volver arriba">
      <img src="/img/iconos/icono-flecha.svg" alt="Subir">
    </button>

    <footer class="main-footer">
      <div class="footer-content">
        <p>&copy; 2026 Sara Escribano — Diseñadora Gráfica</p>
      </div>
    </footer>
  </section>
</template>