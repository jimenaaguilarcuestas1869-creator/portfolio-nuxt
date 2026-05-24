<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// 1. Añadimos la lista de canciones (modifica los nombres si tus archivos se llaman diferente)
const playlist = [
  '/audio/musica1.m4a',
  '/audio/musica2.m4a',
  '/audio/musica3.m4a'
]

const indiceActual = ref(0)
const audioElement = ref(null)
const estaSonando = ref(false)

// Función para pausar o reproducir la música
const alternarMusica = () => {
  if (!audioElement.value) return

  if (estaSonando.value) {
    audioElement.value.pause()
    estaSonando.value = false
  } else {
    reproducirCancion()
  }
}

// Función auxiliar para forzar la reproducción de manera segura
const reproducirCancion = () => {
  audioElement.value.play()
    .then(() => {
      estaSonando.value = true
    })
    .catch((error) => {
      console.log("El navegador bloqueó la reproducción:", error)
    })
}

// 2. Función automática que se activa al terminar una canción
const siguienteCancion = () => {
  if (!audioElement.value) return

  // Avanza al siguiente índice. Si llega al final de la playlist, vuelve a empezar desde 0
  indiceActual.value = (indiceActual.value + 1) % playlist.length

  // Pequeña pausa de 100ms para asegurar que el navegador cargue el cambio de 'src' antes de reproducir
  setTimeout(() => {
    reproducirCancion()
  }, 100)
}

onMounted(() => {
  // Animación para el primer muñeco
  gsap.to('.shape-1', {
    y: -20,                // Sube 20 píxeles
    duration: 2,           // Tarda 2 segundos en subir
    yoyo: true,            // Cuando llega arriba, vuelve abajo
    repeat: -1,            // Se repite infinitamente
    ease: 'power1.inOut'   // Movimiento suave al arrancar y frenar
  })

  // Animación para el segundo muñeco (con tiempos ligeramente cambiados)
  gsap.to('.shape-2', {
    y: -15,                // Sube 15 píxeles
    duration: 2.5,         // Tarda 2.5 segundos
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
/* Estilos del contenedor central */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

/* Contenedor del botón justo debajo del logo */
.contenedor-reproductor {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Separación prudente bajo las letras gigantes */
  width: 100%;
}

/* Botón con la estética exacta de burbuja inflada y trazo negro */
.boton-burbuja-play {
  background-color: #1A73C1; /* Color Celeste vibrante */
  color: #EEE6D5;
  border: 3px solid #000000; /* Borde negro supergrueso idéntico al logo */
  width: 75px;
  height: 75px;
  border-radius: 50%; /* Esfera perfecta */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 0 #000000; /* Efecto de sombra 3D rígida abajo */
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease;
}

/* Efecto clic interactivo: El botón físicamente se hunde */
.boton-burbuja-play:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #000000;
}

/* Estilo del icono interno con contorno adaptado al estilo Pop */
.icono-estado {
  font-family: 'Arial Black', 'Impact', sans-serif; /* Tipografía ultra-gruesa */
  font-size: 2.3rem;
  line-height: 1;
  -webkit-text-stroke: 2px #000000; /* Contorno negro para el propio símbolo de play/pause */
  text-shadow: 2px 2px 0px #000000;
  user-select: none;
  /* Pequeño ajuste visual para centrar perfectamente el triángulo del Play */
  transform: v-bind(estaSonando ? 'none' : 'translateX(3px)'); 
}

/* Cambio dinámico a color Cyan eléctrico cuando esté sonando */
.boton-burbuja-play.reproduciendo {
  background-color: #1A73C1; 
}
</style>