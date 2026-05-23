<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue' 
import { register } from 'swiper/element/bundle'
import gsap from 'gsap'
import listaProyectos from '~/data/proyectos.json'

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

// --- CONTROL DE SCROLL INTEGRADO ---
const isSidebarVisible = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // Controla cuándo aparece la barra flotante estilo libreta
  isSidebarVisible.value = scrollY >= windowHeight - 150
}

// --- FUNCIÓN DE FILTRADO ---
const cambiarFila = async (idFase) => {
  filtroActivo.value = idFase
  
  await nextTick()
  
  const seccionProyectos = document.getElementById('proyectos')
  if (seccionProyectos) {
    const posicionSeccion = seccionProyectos.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: posicionSeccion - 40,
      behavior: 'auto'
    })
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

// --- MODAL DE MULTIMEDIA ---
const abrirModal = async (proyecto) => {
  proyectoSeleccionado.value = proyecto
  modalAbierto.value = true

  await nextTick()
  const modalEl = document.getElementById('project-modal')
  gsap.fromTo(modalEl, { opacity: 0 }, { opacity: 1, duration: 0.3 })
}

const cerrarModal = () => {
  const modalEl = document.getElementById('project-modal')
  gsap.to(modalEl, {
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      modalAbierto.value = false
      proyectoSeleccionado.value = null
    }
  })
}

const esVideo = (url) => url ? url.toLowerCase().endsWith('.mp4') : false
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
            @click="cambiarFila(fase.id)"
          >
            <span v-if="filtroActivo === fase.id">{{ fase.nombre }}</span>
          </button>
        </div>
      </div>
      
      <div class="libreta-cuerpo">
        <h1 class="titulo-seccion" v-if="filtroActivo">
          {{ opcionesMenu.find(fase => fase.id === filtroActivo)?.nombre }}
        </h1>

        <div class="manual-content-display">
          <div v-if="proyectosFiltrados.length === 0" class="no-proyectos">
            <p>Contenido en desarrollo para la sección {{ filtroActivo }}.</p>
          </div>

          <div 
            v-for="proyecto in proyectosFiltrados" 
            :key="proyecto.id" 
            class="manual-layout" 
            @click="abrirModal(proyecto)"
          >
            <div class="manual-left">
              <h2 class="manual-title">{{ proyecto.titulo }}</h2>
              <p class="manual-subtitle">{{ proyecto.subtitulo }}</p>
              
              <img 
                v-if="proyecto.portada" 
                :src="proyecto.portada.startsWith('assets/') ? proyecto.portada.replace('assets/', '/') : proyecto.portada" 
                :alt="proyecto.titulo" 
                class="manual-img"
              >
            </div>
            
            <div class="manual-right">
              <p class="manual-text" v-if="proyecto.descripcion">{{ proyecto.descripcion }}</p>
              <p class="manual-text-secundario" v-if="proyecto.textoSecundario">{{ proyecto.textoSecundario }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="modalAbierto && proyectoSeleccionado" id="project-modal" class="modal" style="display: block;" @click.self="cerrarModal">
      <div class="modal-content">
        <span class="close-modal" @click="cerrarModal">&times;</span>
        
        <div class="swiper-container-wrapper" v-if="proyectoSeleccionado.galeria && proyectoSeleccionado.galeria.length > 0">
          <swiper-container loop="true" navigation="true" pagination="true" class="swiper-container">
            <swiper-slide v-for="(media, index) in proyectoSeleccionado.galeria" :key="index">
              <div v-if="esVideo(media)" class="video-container">
                <video autoplay muted loop playsinline style="width:100%; max-height:70vh; background:#000;">
                  <source :src="media.startsWith('assets/') ? media.replace('assets/', '/') : media" type="video/mp4">
                </video>
              </div>
              <img v-else :src="media.startsWith('assets/') ? media.replace('assets/', '/') : media" alt="Galería del proyecto">
            </swiper-slide>
          </swiper-container>
        </div>

        <div class="modal-text">
          <h2>{{ proyectoSeleccionado.titulo }}</h2>
          <p class="category">{{ proyectoSeleccionado.categoria }}</p>
          <p class="modal-description" v-if="proyectoSeleccionado.descripcion">{{ proyectoSeleccionado.descripcion }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proyectos-section {
  min-height: 80vh;
  position: relative;
}
.no-proyectos {
  padding: 60px 0;
  font-size: 1.5rem;
  color: #666;
}
.titulo-seccion {
  font-size: 3rem;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-bottom: 4px solid #3b82f6;
  padding-bottom: 10px;
  display: inline-block;
}
.modal-description {
  white-space: pre-line;
}
.manual-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 80px 0;
  color: #000000;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-bottom: 1px solid #e5e7eb; /* Línea que separa los bloques que van hacia abajo */
}
.manual-layout:last-child {
  border-bottom: none; /* Quita la línea divisoria en el último elemento */
}
.manual-layout:hover {
  transform: translateY(-2px);
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
  margin-bottom: 20px;
}
.manual-right {
  align-self: flex-end;
  max-width: 500px;
  text-align: left;
}
.manual-text {
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-line;
}
.manual-text-secundario {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-top: 20px;
  color: #333;
}
.manual-img {
  width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
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