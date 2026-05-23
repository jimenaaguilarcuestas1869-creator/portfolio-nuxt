<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue' 
import { register } from 'swiper/element/bundle'
import gsap from 'gsap'
import listaProyectos from '~/data/proyectos.json'
import BotonUI from '~/components/BotonUI.vue'

register()

// --- ESTADOS REACTIVOS ---
const proyectos = ref(listaProyectos)
const filtroActivo = ref('concepto')
const modalAbierto = ref(false)
const proyectoSeleccionado = ref(null)
const slideActivo = ref(0)

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

// --- FILTRADO DINÁMICO LIMPIO Y FIABLE ---
const proyectosFiltrados = computed(() => {
  if (filtroActivo.value === null) return proyectos.value
  
  // Filtra de manera estricta comparando el campo 'categoria' del JSON con la pestaña activa
  return proyectos.value.filter(p => {
    if (!p.categoria) return false
    return p.categoria.toString().trim().toLowerCase() === filtroActivo.value.toString().trim().toLowerCase()
  })
})

// --- MODAL DE MULTIMEDIA ---
const abrirModal = async (proyecto) => {
  slideActivo.value = 0
  proyectoSeleccionado.value = proyecto
  modalAbierto.value = true

  await nextTick()
  const modalEl = document.getElementById('project-modal')
  gsap.fromTo(modalEl, { opacity: 0 }, { opacity: 1, duration: 0.3 })

  const swiperEl = document.querySelector('swiper-container')
  if (swiperEl) {
    swiperEl.addEventListener('swiperslidechange', (e) => {
      slideActivo.value = e.detail[0].activeIndex
    })
  }
}

const cerrarModal = () => {
  const modalEl = document.getElementById('project-modal')
  gsap.to(modalEl, {
    opacity: 0,
    duration: 0.25,
    onComplete: () => {
      modalAbierto.value = false
      proyectoSeleccionado.value = null
      slideActivo.value = 0
    }
  })
}

// Helper para desactivar clics en elementos estáticos (Concepto, Paletas y Fuentes en el Layout)
const esEstatico = (proyecto) => {
  const categoria = String(proyecto.categoria || '').toLowerCase()
  return (proyecto.colores && proyecto.colores.length > 0) ||
         (proyecto.fuentes && proyecto.fuentes.length > 0) ||
         categoria === 'concepto'
}

const esVideo = (url) => url ? String(url).toLowerCase().endsWith('.mp4') : false
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
            :class="[
              proyecto.aplicaciones ? 'aplicaciones-layout' : 'manual-layout', 
              { 'sin-click': esEstatico(proyecto) }
            ]" 
            @click="!esEstatico(proyecto) ? abrirModal(proyecto) : null"
          >
          
            <div class="manual-left">
              <h2 v-if="proyecto.titulo" class="manual-title">{{ proyecto.titulo }}</h2>
              <p class="manual-subtitle">{{ proyecto.subtitulo }}</p>

              <div v-if="proyecto.colores && proyecto.colores.length > 0" class="contenedor-paleta-manual" @click.stop>
                <div
                  v-for="(color, cIdx) in proyecto.colores"
                  :key="cIdx"
                  class="tarjeta-color-manual"
                >
                  <div class="bloque-muestra-color" :style="{ backgroundColor: color.hex }"></div>
                  <div class="detalles-color-manual">
                    <span class="txt-color-nombre">{{ color.nombre }}</span>
                    <span class="txt-color-hex">{{ color.hex }}</span>
                    <span class="txt-color-meta">RGB: {{ color.rgb }}</span>
                    <span class="txt-color-meta">CMYK: {{ color.cmyk }}</span>
                    <span v-if="color.pantone" class="txt-color-meta">PMS: {{ color.pantone }}</span>
                  </div>
                </div>
              </div>

              <div v-else-if="proyecto.fuentes && proyecto.fuentes.length > 0" class="contenedor-tipo-imagenes" @click.stop>
                <img
                  v-for="(rutaSvg, fIdx) in proyecto.fuentes"
                  :key="fIdx"
                  :src="rutaSvg"
                  :alt="`Muestra de fuente ${fIdx + 1}`"
                  class="img-tipo-muestra"
                />
              </div>

              <div v-else-if="proyecto.galeria && proyecto.galeria.length > 0 && !String(proyecto.titulo).toUpperCase().includes('SECUNDARIO') && filtroActivo !== 'web' && filtroActivo !== 'recursos'" class="contenedor-logos-marca" @click.stop>
                <div v-if="proyecto.galeria[0]" class="logo-box-placeholder">
                  <span class="tag-logo">Horizontal</span>
                  <img :src="proyecto.galeria[0]" alt="Logo horizontal" class="img-marca-preview" />
                </div>
                <div v-if="proyecto.galeria[1]" class="logo-box-placeholder">
                  <span class="tag-logo">En Vertical</span>
                  <img :src="proyecto.galeria[1]" alt="Logo vertical" class="img-marca-preview" />
                </div>
              </div>

              <div v-else-if="String(proyecto.titulo).toUpperCase().includes('INTERFAZ')" class="contenedor-botones-ui" @click.stop>
                <div class="fila-botones"><BotonUI color="azul" variante="sin-icono" texto="Botón" /><BotonUI color="azul" variante="icono-izq" texto="Botón" /><BotonUI color="azul" variante="icono-der" texto="Botón" /><BotonUI color="azul" variante="dos-iconos" texto="Botón" /><BotonUI color="azul" variante="solo-icono" /></div>
                <div class="fila-botones"><BotonUI color="verde" variante="sin-icono" texto="Botón" /><BotonUI color="verde" variante="icono-izq" texto="Botón" /><BotonUI color="verde" variante="icono-der" texto="Botón" /><BotonUI color="verde" variante="dos-iconos" texto="Botón" /><BotonUI color="verde" variante="solo-icono" /></div>
                <div class="fila-botones"><BotonUI color="amarillo" variante="sin-icono" texto="Botón" /><BotonUI color="amarillo" variante="icono-izq" texto="Botón" /><BotonUI color="amarillo" variante="icono-der" texto="Botón" /><BotonUI color="amarillo" variante="dos-iconos" texto="Botón" /><BotonUI color="amarillo" variante="solo-icono" /></div>
                <div class="fila-botones"><BotonUI color="rojo" variante="sin-icono" texto="Botón" /><BotonUI color="rojo" variante="icono-izq" texto="Botón" /><BotonUI color="rojo" variante="icono-der" texto="Botón" /><BotonUI color="rojo" variante="dos-iconos" texto="Botón" /><BotonUI color="rojo" variante="solo-icono" /></div>
                <div class="fila-botones"><BotonUI color="rosa" variante="sin-icono" texto="Botón" /><BotonUI color="rosa" variante="icono-izq" texto="Botón" /><BotonUI color="rosa" variante="icono-der" texto="Botón" /><BotonUI color="rosa" variante="dos-iconos" texto="Botón" /><BotonUI color="rosa" variante="solo-icono" /></div>
                <div class="fila-botones"><BotonUI color="gris" variante="sin-icono" texto="Botón" /><BotonUI color="gris" variante="icono-izq" texto="Botón" /><BotonUI color="gris" variante="icono-der" texto="Botón" /><BotonUI color="gris" variante="dos-iconos" texto="Botón" /><BotonUI color="gris" variante="solo-icono" /></div>
              </div>
              
              <img 
                v-else-if="proyecto.portada" 
                :src="proyecto.portada.startsWith('assets/') ? proyecto.portada.replace('assets/', '/') : proyecto.portada" 
                :alt="proyecto.titulo || 'Imagen del proyecto'" 
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
          <h2 v-if="proyectoSeleccionado.titulosDinamicos && proyectoSeleccionado.titulosDinamicos[slideActivo]">
            {{ proyectoSeleccionado.titulosDinamicos[slideActivo] }}
          </h2>
          <h2 v-else-if="proyectoSeleccionado.titulo">
            {{ proyectoSeleccionado.titulo }}
          </h2>
          
          <p class="category">{{ proyectoSeleccionado.categoria }}</p>
          
          <p class="modal-description" v-if="proyectoSeleccionado.descripciones && proyectoSeleccionado.descripciones[slideActivo]">
            {{ proyectoSeleccionado.descripciones[slideActivo] }}
          </p>
          <p class="modal-description" v-else-if="proyectoSeleccionado.descripcion">
            {{ proyectoSeleccionado.descripcion }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- CONTENEDORES DE CONTENIDO INTERNO --- */
.contenedor-tipo-imagenes {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
}
.img-tipo-muestra {
  width: 100%;
  max-width: 550px;
  height: auto;
  object-fit: contain;
  display: block;
}
.contenedor-paleta-manual {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
}
.tarjeta-color-manual {
  background: #f7f4ed;
  border: 1px solid #dcd7ca;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}
.bloque-muestra-color {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #dcd7ca;
}
.detalles-color-manual {
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.txt-color-nombre {
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
}
.txt-color-hex {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  font-family: monospace;
}
.txt-color-meta {
  font-size: 0.7rem;
  color: #777;
  font-family: monospace;
}
.contenedor-logos-marca {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
}
.logo-box-placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 20px 0;
  min-height: 180px;
}
.tag-logo {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #3b82f6;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}
.img-marca-preview {
  max-width: 100%;
  max-height: 180px;
  object-fit: contain;
}

/* --- INTERFAZ DE BOTONES UI --- */
.contenedor-botones-ui {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
}
.fila-botones {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

/* --- ESTRUCTURAS DE LAYOUT GLOBALES --- */
.manual-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 80px 0;
  color: #000000;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-bottom: 1px solid #e5e7eb;
}
.manual-layout:last-child {
  border-bottom: none;
}
.manual-layout:hover, .aplicaciones-layout:hover {
  transform: translateY(-2px);
}
.aplicaciones-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0;
  color: #000000;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-bottom: 1px solid #e5e7eb;
}
.manual-left {
  width: 100%;
}
.manual-right {
  align-self: center;  
  max-width: 500px;
  text-align: left;
}

/* --- ESTILOS DE ELEMENTOS INDIVIDUALES --- */
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

/* MODOS ESTÁTICOS */
.sin-click {
  cursor: default !important;
}
.sin-click:hover {
  transform: none !important;
}

/* --- MODAL Y CARRUSEL MULTIMEDIA --- */
.modal, .modal-content {
  background-color: #EEE6D5 !important;
}
.modal-description {
  white-space: pre-line;
}
.swiper-container-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 30px auto;
  overflow: hidden;
}
.swiper-container {
  max-height: 65vh;
  background-color: #EEE6D5;
  border-radius: 8px;
}
.swiper-container swiper-slide img {
  width: 100% !important;
  height: 65vh !important;
  object-fit: contain !important;
  margin: 0 auto;
  display: block;
}
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* --- MEDIA QUERIES DISPOSITIVOS GRANDES --- */
@media (min-width: 768px) {
  .manual-layout, .aplicaciones-layout {
    flex-direction: row;
    justify-content: space-between;
  }
  .manual-left {
    max-width: 50%;
  }
  .manual-right {
    margin-top: 140px;
    align-self: flex-start;
  }
}
</style>