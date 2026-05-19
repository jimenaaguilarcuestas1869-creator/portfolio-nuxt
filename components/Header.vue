<script setup>
import { ref } from 'vue'

const menuAbierto = ref(false)
const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value
}
</script>

<template>
  <header class="main-header">
    <div class="header-container">
      <a href="/" class="logo">
        <img src="/img/logo_bandcamp_nav.png" alt="Sara Escribano Logo">
      </a>

      <button 
        class="menu-toggle" 
        :class="{ active: menuAbierto }"
        @click="toggleMenu" 
        aria-label="Abrir menú"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <nav class="nav-menu" :class="{ active: menuAbierto }">
        <ul>
          <li><a href="#proyectos" @click="menuAbierto = false">Proyectos</a></li>
          <li><a href="#sobre-mi" @click="menuAbierto = false">Sobre mí</a></li>
          <li><a href="#contacto" @click="menuAbierto = false">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>