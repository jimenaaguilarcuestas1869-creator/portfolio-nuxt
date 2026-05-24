<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const playlist = [
  '/audio/musica1.m4a',
  '/audio/musica2.m4a',
  '/audio/musica3.m4a'
]

const indiceActual = ref(0)
const audioElement = ref(null)
const estaSonando = ref(false)

const alternarMusica = () => {
  if (!audioElement.value) return

  if (estaSonando.value) {
    audioElement.value.pause()
    estaSonando.value = false
  } else {
    reproducirCancion()
  }
}


const reproducirCancion = () => {
  audioElement.value.play()
    .then(() => {
      estaSonando.value = true
    })
    .catch((error) => {
      console.log("El navegador bloqueó la reproducción:", error)
    })
}

 
const siguienteCancion = () => {
  if (!audioElement.value) return

  
  indiceActual.value = (indiceActual.value + 1) % playlist.length

  
  setTimeout(() => {
    reproducirCancion()
  }, 100)
}

onMounted(() => {
  // Animación para el primer muñeco
  gsap.to('.shape-1', {
    y: -20,                
    duration: 2,           
    yoyo: true,            
    repeat: -1,            
    ease: 'power1.inOut'   
  })

  
  gsap.to('.shape-2', {
    y: -15,                
    duration: 2.5,         
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  })
})
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <img src="/img/fondo_logo_home.png" alt="Sara Escribano" class="hero-logo-main">
      
      <div class="contenedor-reproductor">
        <audio 
          ref="audioElement" 
          :src="playlist[indiceActual]" 
          @ended="siguienteCancion"
        ></audio>

        <button @click="alternarMusica" class="boton-burbuja-play" :class="{ 'reproduciendo': estaSonando }">
          <span class="icono-estado">{{ estaSonando ? '⏸' : '▶' }}</span>
        </button>
      </div>
    </div>

    <img src="/img/fondo_forma1_home.png" class="shape shape-1" alt="">
    <img src="/img/fondo_forma2_home.png" class="shape shape-2" alt="">
  </section>
</template>

<style scoped>

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}


.contenedor-reproductor {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; 
  width: 100%;
}


.boton-burbuja-play {
  background-color: #1A73C1; 
  color: #EEE6D5;
  border: 3px solid #000000; 
  width: 75px;
  height: 75px;
  border-radius: 50%; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 0 #000000; 
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease;
}


.boton-burbuja-play:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #000000;
}


.icono-estado {
  font-family: 'Arial Black', 'Impact', sans-serif; 
  font-size: 2.3rem;
  line-height: 1;
  -webkit-text-stroke: 2px #000000; 
  text-shadow: 2px 2px 0px #000000;
  user-select: none;

  transform: v-bind(estaSonando ? 'none' : 'translateX(3px)'); 
}


.boton-burbuja-play.reproduciendo {
  background-color: #1A73C1; 
}
</style>