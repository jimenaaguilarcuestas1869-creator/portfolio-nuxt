<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue' 
import { register } from 'swiper/element/bundle'
import gsap from 'gsap'
import listaProyectos from '~/data/proyectos.json'

// Registrar los componentes interactivos de Swiper
register()

// --- ESTADOS REACTIVOS ---
const proyectos = ref(listaProyectos)
const filtroActivo = ref('concepto')
const modalAbierto = ref(false)
const proyectoSeleccionado = ref(null)

const opcionesMenu = [
  { id: 'concepto', nombre: 'Concepto' },
  { id: 'nucleo', nombre: 'Núcleo' },
  { id: 'sistema', nombre: 'Sistema' },
  { id: 'recursos', nombre: 'Recursos' },
  { id: 'aplicaciones', nombre: 'Aplicaciones' },
  { id: 'web', nombre: 'Web' }
]

// --- SCROLL EN EL HOME ---
const isSidebarVisible = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // 1. Controlar la visibilidad de la barra lateral (aparece tras pasar el Hero)
  isSidebarVisible.value = scrollY >= windowHeight - 150

  // 2. Controlar si llegamos a la sección de abajo (Contacto) mediante coordenadas reales 🎯
  const seccionContacto = document.getElementById('contacto') || document.querySelector('.proyectos-section')
  
  if (seccionContacto) {
    const rect = seccionContacto.getBoundingClientRect()
    
    // Si la sección de abajo ya ha entrado o está muy cerca de entrar
    if (rect.top <= 450) {
      if (filtroActivo.value !== null) {
        filtroActivo.value = null
      }
      return 
    }
  }

  // 3. Si volvemos arriba, se restaura la primera pestaña automáticamente
  if (filtroActivo.value === null) {
    filtroActivo.value = 'concepto'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- FILTRADO DINÁMICO ---
const proyectosFiltrados = computed(() => {
  if (filtroActivo.value === null) return proyectos.value
  return proyectos.value.filter(p => 
    p.categoria.toLowerCase() === filtroActivo.value.toLowerCase()
  )
})

// --- FUNCIONES DEL MODAL ---
const abrirModal = async (proyecto) => {
  proyectoSeleccionado.value = proyecto
  modalAbierto.value = true

  await nextTick()

  const modalEl = document.getElementById('project-modal')
  gsap.fromTo(modalEl, { opacity: 0 }, { opacity: 1, duration: 0.4 })
  
  gsap.fromTo('.modal-anim', 
    { opacity: 0, x: -60 }, 
    { opacity: 1, x: 0, duration: 1, ease: 'power2.out', stagger: 0.15 }
  )
}

const cerrarModal = () => {
  const modalEl = document.getElementById('project-modal')
  
  gsap.to(modalEl, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      modalAbierto.value = false
      proyectoSeleccionado.value = null
    }
  })
}

const esVideo = (url) => url.toLowerCase().endsWith('.mp4')
</script>

<template>
  <section id="proyectos" class="proyectos-section">
    <div class="container-manual-global">
      
      <div :class="['libreta-sidebar', { 'is-visible': isSidebarVisible }]">
        <div class="libreta-pestanas">
          <button 
            v-for="fase in opcionesMenu" 
            :key="fase.id"
            :class="['pestana-btn', { active: filtroActivo === fase.id }]"
            @click="filtroActivo = fase.id"
          >
            <span v-if="filtroActivo === fase.id">{{ fase.nombre }}</span>
          </button>
        </div>
      </div>
      
      <div class="libreta-cuerpo">

        <div v-if="filtroActivo === 'concepto' || filtroActivo === 'nucleo' || filtroActivo === 'sistema'|| filtroActivo === 'recursos'|| filtroActivo === 'aplicaciones'|| filtroActivo === 'web'|| filtroActivo === null" class="manual-content-display">
          <div v-for="proyecto in proyectosFiltrados" :key="proyecto.id" class="manual-layout">
            <div class="manual-left">
              <h2 class="manual-title">{{ proyecto.titulo }}</h2>
              <p class="manual-subtitle">{{ proyecto.subtitulo }}</p>
              <img v-if="proyecto.portada" :src="proyecto.portada" :alt="proyecto.titulo" class="manual-img">
            </div>
            <div class="manual-right">
              <p class="manual-text">{{ proyecto.descripcion }}</p>
            </div>
          </div>
        </div>

        <div v-else id="grid-proyectos" class="projects-grid">
          <div 
            v-for="proyecto in proyectosFiltrados" 
            :key="proyecto.id"
            class="project-card"
            @click="abrirModal(proyecto)"
          >
            <div class="project-img-container">
              <img :src="proyecto.portada.replace('assets/', '/')" :alt="proyecto.titulo">
            </div>
            <div class="project-info">
              <span>{{ proyecto.categoria }}</span>
              <h3>{{ proyecto.titulo }}</h3>
            </div>
          </div>
        </div>    
      </div>
    </div>

    <div 
      v-if="modalAbierto && proyectoSeleccionado" 
      id="project-modal" 
      class="modal"
      style="display: block;"
      @click.self="cerrarModal"
    >
      <div class="modal-content">
        <span class="close-modal" @click="cerrarModal">&times;</span>
        
        <div class="swiper-container-wrapper modal-anim">
          <swiper-container
            loop="true"
            autoplay-delay="3000"
            autoplay-disable-on-interaction="false"
            navigation="true"
            pagination="true"
            class="swiper-container"
          >
            <swiper-slide 
              v-for="(media, index) in proyectoSeleccionado.galeria" 
              :key="index"
            >
              <div v-if="esVideo(media)" class="video-container">
                <video 
                  autoplay 
                  muted 
                  loop 
                  playsinline 
                  preload="metadata" 
                  style="width:100%; max-height:70vh; background:#000;"
                >
                  <source :src="media.replace('assets/', '/')" type="video/mp4">
                  Tu navegador no soporta el vídeo.
                </video>
              </div>
              <img v-else :src="media.replace('assets/', '/')" alt="Galería">
            </swiper-slide>
          </swiper-container>
        </div>

        <div class="modal-text">
          <h2 id="modal-title" class="modal-anim">{{ proyectoSeleccionado.titulo }}</h2>
          <p id="modal-category" class="category modal-anim">{{ proyectoSeleccionado.categoria }}</p>
          <p id="modal-description" class="modal-description modal-anim">
            {{ proyectoSeleccionado.descripcion }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modal-description {
  white-space: pre-line;
}
.manual-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 60px 0;
  color: #000000;
}

.manual-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
}

.manual-subtitle {
  font-size: 1.8rem;
  color: #3b82f6;
}

.manual-right {
  align-self: flex-end;
  max-width: 500px;
  text-align: left;
}

.manual-text {
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .manual-layout {
    flex-direction: row;
    justify-content: space-between;
  }
  .manual-left {
    max-width: 50%;
  }
}
</style>