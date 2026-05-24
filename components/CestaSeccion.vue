<template>
  <section class="cesta-section">
    <div class="cesta-container">
      <h2 class="cesta-titulo">APLICACIÓN</h2>
      <p class="cesta-subtitulo">Cesta de la compra</p>

      <div class="escena-interactiva">
        <div class="objetos-cesta">
          <div 
            v-for="(item, index) in itemsFiltrados" 
            :key="item.id" 
            :class="['objeto-item', `pos-${index}`]"
            @mouseenter="animarEntrada"
            @mouseleave="animarSalida"
          >
            <img 
              :src="item.portada || '/img/quienessomos_concepto.png'" 
              :alt="item.titulo"
              class="imagen-producto"
            />
            <span class="tooltip-info">{{ item.titulo }}</span>
          </div>
        </div>

        <svg class="cesta-svg" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50H750V350H50V50Z" stroke="#1EA849" stroke-width="4" stroke-dasharray="2 2" opacity="0.4"/>
          
          <path d="M50 50L150 180H650L750 50" stroke="#1EA849" stroke-width="4"/>
          <path d="M50 350L150 450H650L750 350" stroke="#1EA849" stroke-width="4"/>
          <path d="M150 180V450" stroke="#1EA849" stroke-width="4"/>
          <path d="M650 180V450" stroke="#1EA849" stroke-width="4"/>

          <path d="M150 234H650M150 288H650M150 342H650M150 396H650" stroke="#1EA849" stroke-width="2" opacity="0.7"/>
          <path d="M212.5 180V450M275 180V450M337.5 180V450M400 180V450M462.5 180V450M525 180V450M587.5 180V450" stroke="#1EA849" stroke-width="2" opacity="0.7"/>

          <rect x="150" y="180" width="500" height="270" stroke="#1EA849" stroke-width="8" rx="4"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { gsap } from 'gsap'

// El JSON que me has pasado con todos los datos
const itemsData = [
  { "id": "bandcamp-concepto", "titulo": "¿Quiénes somos?", "categoria": "concepto", "portada": "/img/quienessomos_concepto.png" },
  { "id": "bandcamp-valores", "titulo": "VALORES", "categoria": "concepto", "portada": "/img/valores_concepto.png" },
  { "id": "bandcamp-idea-principal", "titulo": "IDEA PRINCIPAL", "categoria": "concepto", "portada": "/img/ideaprincipal_concepto.png" },
  { "id": "bandcamp-base-estrategica", "titulo": "BASE ESTRATÉGICA", "categoria": "concepto", "portada": "/img/baseestrategica_concepto.png" },
  { "id": "bandcamp-logos-secundarios", "titulo": "LOGOS SECUNDARIOS", "categoria": "nucleo", "portada": "/img/nucleo/secundario1.svg" }
]

// Filtramos los primeros elementos con portada válida para que no colapsen la cesta
const itemsFiltrados = computed(() => {
  return itemsData.filter(item => item.portada).slice(0, 4)
})

onMounted(() => {
  // 1. Efecto Flotante Continuo (Idle Animation) de fondo con GSAP para cada elemento
  itemsFiltrados.value.forEach((_, index) => {
    gsap.to(`.pos-${index}`, {
      y: '=-12',
      rotation: index % 2 === 0 ? 3 : -3,
      duration: 2 + index * 0.4,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: index * 0.2
    })
  })
})

// 2. Animación al pasar el ratón (Hover) -> Efecto Pop Elástico y rotación dinámica
const animarEntrada = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1.15,
    zindex: 50,
    rotation: event.currentTarget.classList.contains('pos-0') || event.currentTarget.classList.contains('pos-2') ? 8 : -8,
    duration: 0.4,
    ease: 'back.out(1.7)'
  })
  gsap.to(event.currentTarget.querySelector('.imagen-producto'), {
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    duration: 0.3
  })
}

// 3. Restauración al sacar el ratón -> Regresa a su estado base controlado por el loop de onMounted
const animarSalida = (event) => {
  gsap.to(event.currentTarget, {
    scale: 1,
    rotation: event.currentTarget.classList.contains('pos-0') || event.currentTarget.classList.contains('pos-2') ? 3 : -3,
    duration: 0.4,
    ease: 'power2.out'
  })
  gsap.to(event.currentTarget.querySelector('.imagen-producto'), {
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    duration: 0.3
  })
}
</script>

<style lang="scss" scoped>
.cesta-section {
  width: 100%;
  padding: 80px 0;
  background-color: #EEE6D5; // El color de fondo beige del portfolio
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .cesta-container {
    width: 100%;
    max-width: 1000px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
  }

  .cesta-titulo {
    font-family: 'Kelsi', sans-serif;
    font-size: 3.5rem;
    color: #1A73C1; // Azul de marca para el título
    letter-spacing: 2px;
    margin: 0;
  }

  .cesta-subtitulo {
    font-family: 'Satoshi', sans-serif;
    font-size: 1.5rem;
    color: #1A73C1;
    margin-top: 5px;
    margin-bottom: 40px;
    opacity: 0.8;
  }

  .escena-interactiva {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cesta-svg {
    width: 100%;
    height: auto;
    z-index: 10;
    pointer-events: none; // Permite pasar el ratón a través del SVG para tocar los productos
  }

  /* POSICIONAMIENTO DE LAS PORTADAS EN PERSPECTIVA (Dentro del cubo de la cesta) */
  .objetos-cesta {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5; // Quedan dentro de la cesta (detrás de la rejilla frontal)
  }

  .objeto-item {
    position: absolute;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: z-index 0.3s;

    .imagen-producto {
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 3px solid #000000; // Estilo cartoon con borde negro
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      background-color: #fff;
    }

    /* Tooltip retro con info */
    .tooltip-info {
      position: absolute;
      bottom: -35px;
      background: #000;
      color: #EEE6D5;
      font-family: 'Satoshi', sans-serif;
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(-5px);
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;
    }

    &:hover {
      .tooltip-info {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Coordenadas tridimensionales simuladas para cada elemento del JSON */
    &.pos-0 {
      width: 180px;
      left: 20%;
      top: 38%;
      transform: rotate(-4deg);
    }

    &.pos-1 {
      width: 150px;
      left: 45%;
      top: 32%;
      transform: rotate(6deg);
    }

    &.pos-2 {
      width: 190px;
      right: 18%;
      top: 42%;
      transform: rotate(-3deg);
    }

    &.pos-3 {
      width: 140px;
      left: 35%;
      top: 50%;
      transform: rotate(12deg);
    }
  }
}
</style>