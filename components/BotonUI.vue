<script setup>
import { ref } from 'vue'

defineProps({
  texto: {
    type: String,
    default: 'Botón'
  },
  color: {
    type: String,
    default: 'azul',
  },
  variante: {
    type: String,
    default: 'sin-icono'
  }
})

const activado = ref(false)

const tocarBoton = () => {
  activado.value = !activado.value
}
</script>

<template>
  <button 
    :class="['btn-ui', `btn-${color}`, `btn-${variante}`, { 'is-active': activado }]"
    @click="tocarBoton"
  >
    <span v-if="['icono-izq', 'dos-iconos', 'solo-icono'].includes(variante)" class="icon-left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icono-svg">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
      </svg>
    </span>
    
    <span v-if="variante !== 'solo-icono'" class="texto-btn">{{ texto }}</span>
    
    <span v-if="['icono-der', 'dos-iconos'].includes(variante)" class="icon-right">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icono-svg">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </span>
  </button>
</template>

<style scoped lang="scss">
$gris-oscuro: #1A1A1A;
$blanco: #FFFFFF;

$base-azul: #1A73C1;
$hover-azul: #135896;
$active-azul: #55A6EC;

$base-verde: #1EA849;
$hover-verde: #157F36;
$active-verde: #49E479;

$base-amarillo: #FFBC1A;
$hover-amarillo: #E5A200;
$active-amarillo: #FFDA80;

$base-rojo: #EE4B3C;
$hover-rojo: #E42311;
$active-rojo: #F89E96;

$base-rosa: #FC7DA8;
$hover-rosa: #FC4A86;
$active-rosa: #FFE0EB;

$base-gris: #8D8B8B;
$hover-gris: #686464;
$active-gris: #333333;

.btn-ui {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 7px 24px;
  border: none;
  border-radius: 8px;
  font-family: 'Yu Gothic', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: $blanco;

  &:active {
    transform: scale(0.95);
  }

  .icono-svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    display: block;
  }

  &.btn-solo-icono {
    padding: 12px;
    border-radius: 12px;
  }

  &.btn-azul {
    background-color: $base-azul;
    color: $blanco;
    &:hover { background-color: $hover-azul; }
    &.is-active {
      background-color: $active-azul;
      color: $blanco;
      &:hover { background-color: $hover-azul; }
    }
  }

  &.btn-verde {
    background-color: $base-verde;
    color: $blanco;
    &:hover { background-color: $hover-verde; }
    &.is-active {
      background-color: $active-verde;
      color: $blanco;
      &:hover { background-color: $hover-verde; }
    }
  }

  &.btn-amarillo {
    background-color: $base-amarillo;
    color: $gris-oscuro;
    &:hover { background-color: $hover-amarillo; }
    &.is-active {
      background-color: $active-amarillo;
      color: $gris-oscuro;
      &:hover { background-color: $hover-amarillo; }
    }
  }

  &.btn-rojo {
    background-color: $base-rojo;
    color: $blanco;
    &:hover { background-color: $hover-rojo; }
    &.is-active {
      background-color: $active-rojo;
      color: $blanco;
      &:hover { background-color: $hover-rojo; }
    }
  }

  &.btn-rosa {
    background-color: $base-rosa;
    color: $blanco;
    &:hover { background-color: $hover-rosa; }
    &.is-active {
      background-color: $active-rosa;
      color: $blanco;
      &:hover { background-color: $hover-rosa; }
    }
  }

  &.btn-gris {
    background-color: $base-gris;
    color: $blanco;
    &:hover { background-color: $hover-gris; }
    &.is-active {
      background-color: $active-gris;
      color: $blanco;
      &:hover { background-color: $hover-gris; }
    }
  }

}
</style>