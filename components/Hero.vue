<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

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
    duration: 2.5,         // Tarda 2.5 segundos (descompasado para que quede más natural)
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
    </div>

    <img src="/img/fondo_forma1_home.png" class="shape shape-1" alt="">
    <img src="/img/fondo_forma2_home.png" class="shape shape-2" alt="">
  </section>
</template>