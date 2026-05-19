<script setup>
import { register } from 'swiper/element/bundle'
register()
</script>

<template>
  <section id="sobre-mi" class="sobre-mi-section">
    <div class="container">
      <h2 class="section-title">Sobre mi</h2>
      <div class="about-wrapper">
        <div class="about-image">
          <div class="swiper-container-wrapper">
            <swiper-container
              loop="true"
              pagination="true"
              autoplay-delay="2500"
              class="swiper-gustos"
            >
              <swiper-slide class="gustos-card">
                <img src="/img/sobre-mi 1.jpg" alt="bolillos">
              </swiper-slide>
              <swiper-slide class="gustos-card">
                <img src="/img/sobre-mi 2.jpg" alt="fanzine">
              </swiper-slide>
              <swiper-slide class="gustos-card">
                <img src="/img/sobre-mi 3.jpg" alt="seri">
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
        
        <div class="about-content">
          <h3>Hola, soy <span class="highlight">Sara</span>, diseñadora gráfica.</h3>
          <p>Mi proceso creativo siempre empieza fuera de la pantalla, me apasiona todo lo relacionado con la <span class="highlight-alt">parte manual</span>.</p>
          <p>Mi enfoque profesional se centra en el <span class="highlight-alt">nucleo</span>, el <span class="highlight-alt">diseño editorial</span> y el <span class="highlight-alt">branding</span>. Me gusta crear marcas que no solo se vean bien en una pantalla, sino que transmitan una identidad sólida, limpia y coherente.</p>
          <p>Mi objetivo es unir esa delicadeza de los <span class="highlight-alt">soportes físicos</span> con la funcionalidad del mundo digital, cuidando cada detalle desde el primer boceto hasta la ejecución final.</p>
          
          <a href="/pdf/CV_Sara_Escribano.pdf" target="_blank" class="btn-cv">
            Ver Currículum
          </a>
          
          <div class="skills-container">
            <p class="skills-title">Programas</p>
            <div class="skills-grid">
              <div class="skill-item"><img src="/img/iconos/photoshop.png" alt="Photoshop"></div>
              <div class="skill-item"><img src="/img/iconos/illustrator.png" alt="Illustrator"></div>
              <div class="skill-item"><img src="/img/iconos/InDesign.png" alt="InDesign"></div>
              <div class="skill-item"><img src="/img/iconos/after_effects.png" alt="After Effects"></div>
              <div class="skill-item"><img src="/img/iconos/Visual_Studio_Code.png" alt="VS Code"></div>
              <div class="skill-item"><img src="/img/iconos/images.png" alt="Figma"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>