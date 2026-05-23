<template>
  <div :class="['card-ui-live', `card-${variante}`]">
    
    <div :class="['card-media-wrapper', { 'grid-pattern': variante === 'verde', 'media-azul': variante === 'azul' }]">
      
      <div v-if="variante === 'azul'" class="disco-vinyl-album">
        <img src="/img/disco.jpg" alt="Album Art" class="img-album-circular" />
        <div class="disco-centro-vacio"></div>
      </div>

      <img v-else src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500" alt="Live Event" class="img-evento" />
    </div>

    <div class="card-info-content">
      
      <div class="text-block">
        <h3 class="card-title">{{ titulo }}</h3>
        <p class="card-author">de {{ autor }}</p>
        <p v-if="descripcion && variante === 'verde'" class="card-description">{{ descripcion }}</p>
      </div>

      <div v-if="variante === 'azul'" class="card-actions-azul">
        <button class="btn-play" @click="togglePlay">
          <svg v-if="isPlaying" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        
        <button class="btn-discover">
          Descubrir artista <span class="arrow">›</span>
        </button>
      </div>

      <div v-if="variante === 'verde'" class="meta-block-verde">
        <button class="btn-vermas">Ver más</button>
        <div class="meta-data">
          <div class="meta-item">
            <img src="/img/icono3.svg" alt="Fecha" class="card-meta-icon" />
            <span class="meta-text">{{ fecha }}</span>
          </div>
          <div class="meta-item">
            <img src="/img/icono2.svg" alt="Hora" class="card-meta-icon" />
            <span class="meta-text">{{ hora }}</span>
          </div>
          <div class="meta-item">
            <img src="/img/icono1.svg" alt="Precio" class="card-meta-icon" />
            <span class="meta-text">{{ precio }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  variante: { type: String, default: 'azul' }, 
  titulo: String,
  autor: String,
  descripcion: String,
  fecha: String,
  hora: String,
  precio: String
})

const isPlaying = ref(false)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
/* Importación de la fuente Satoshi */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap');

/* --- ESTILO GLOBAL INTERFAZ FIGMA --- */
.card-ui-live {
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
}

/* --- TARJETA AZUL (Diseño Final Plano) --- */
.card-azul {
  background-color: #1e73be;
  width: 320px;
  gap: 24px;
}

.card-azul .media-azul {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
}

/* Círculo exterior con borde plano negro */
.disco-vinyl-album {
  width: 220px;
  height: 220px;
  border: 3px solid #000000;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-album-circular {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Centro vacío del mismo color azul que la tarjeta */
.disco-centro-vacio {
  position: absolute;
  width: 65px;
  height: 65px;
  background-color: #1e73be;
  border: 3px solid #000000;
  border-radius: 50%;
  z-index: 2;
}

/* --- TARJETA VERDE --- */
.card-verde {
  background-color: #1cb253;
  width: 440px;
  gap: 16px;
}

.card-verde .card-media-wrapper {
  border: 2px solid #000000;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1.75 / 1;
  background: #ffffff;
}

.img-evento {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.grid-pattern {
  background-image: linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* --- TEXTOS --- */
.card-info-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.card-author {
  font-size: 0.95rem;
  font-style: italic;
  margin: 6px 0 0 0;
  opacity: 0.85;
}

.card-description {
  font-size: 0.9rem;
  margin: 14px 0 0 0;
  line-height: 1.4;
  opacity: 0.9;
}

/* --- ACCIONES INTERACTIVAS (Línea y Texto cambian a Negro en Hover) --- */
.card-actions-azul {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.btn-play {
  width: 38px;
  height: 38px;
  border: 2px solid #ffffff;
  background: transparent;
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.btn-play:hover {
  border-color: #000000;
  color: #000000; /* El icono de línea cambia a negro */
}

.btn-discover {
  flex: 1;
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.btn-discover:hover {
  border-color: #000000;
  color: #000000; /* El texto interior cambia a negro */
}

/* --- METADATOS VERDE --- */
.meta-block-verde {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
}

.btn-vermas {
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.btn-vermas:hover {
  border-color: #000000;
  color: #000000;
}

.meta-data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-meta-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: block;
}

.meta-text {
  min-width: 65px;
  text-align: left;
}
</style>