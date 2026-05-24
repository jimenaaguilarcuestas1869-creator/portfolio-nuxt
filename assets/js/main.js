gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    let swiper = null;
    let proyectosGlobal = [];

    function initMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.onclick = () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            };

            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.onclick = () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                };
            });
        }
    }

    // --- FUNCIÓN MAESTRA DE INICIALIZACIÓN ---
    function ejecutarTodo() {

        initMenu();
        initSwiperGustos();
        
        console.log("Re-iniciando scripts...");
        
        ScrollTrigger.getAll().forEach(t => t.kill());

        const heroLogo = document.querySelector('.hero-logo-main');
        if (heroLogo) {
            gsap.fromTo(heroLogo, 
                { opacity: 0, scale: 0.7 }, 
                { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
            );
        }
        animarCurvas();

        if (document.querySelector('.projects-grid')) {
            fetch('assets/data/proyectos.json')
                .then(res => res.json())
                .then(data => {
                    proyectosGlobal = data;
                    renderizarProyectos('todos');
                    prepararFiltros();
                })
                .catch(err => console.error("Error cargando JSON"));
        }

        configurarScrollReveal();
        gestionarBackToTop();
        
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    }

    // --- RENDERIZADO DE PROYECTOS ---
    function renderizarProyectos(filtro) {
        const grid = document.querySelector('.projects-grid');
        if (!grid || proyectosGlobal.length === 0) return;

        const filtrados = filtro === 'todos' 
            ? proyectosGlobal 
            : proyectosGlobal.filter(p => p.categoria.toLowerCase().includes(filtro.toLowerCase()));

        grid.innerHTML = filtrados.map(proyecto => `
            <div class="project-card" data-id="${proyecto.id}" style="opacity: 0; transform: translateY(30px);">
                <div class="project-img-container">
                    <img src="${proyecto.portada}" alt="${proyecto.titulo}">
                </div>
                <div class="project-info">
                    <span>${proyecto.categoria}</span>
                    <h3>${proyecto.titulo}</h3>
                </div>
            </div>
        `).join('');

        gsap.to(".project-card", {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: ".projects-grid", start: "top 85%" }
        });

        asignarEventosModal();
    }

    // --- ANIMACIONES LATERALES (SOBRE MÍ Y CONTACTO) ---
    function configurarScrollReveal() {
        
        // 1. Cerrar con la X
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                gsap.to("#project-modal", {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        document.getElementById('project-modal').style.display = "none";
                        if (swiper) swiper.destroy(true, true);
                    }
                });
            };
        }

        // 2. Cerrar haciendo clic fuera de la caja blanca (en el fondo oscuro)
        window.onclick = (event) => {
            const modal = document.getElementById('project-modal');
            if (event.target == modal) {
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        modal.style.display = "none";
                        if (swiper) swiper.destroy(true, true);
                    }
                });
            }
        };

        // Animación SOBRE MÍ (Izquierda)
        if (document.querySelector('.sobre-mi-section')) {
            gsap.fromTo(".sobre-mi-section", 
                { opacity: 0, x: -60 }, 
                { 
                    opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".sobre-mi-section",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
            gsap.from(".skill-item", {
                scrollTrigger: {
                    trigger: ".skills-container",
                    start: "top 90%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            });
        }

        // Animación CONTACTO (Derecha)
        if (document.querySelector('.contacto-section')) {
            gsap.fromTo(".contacto-section", 
                { opacity: 0, x: 60 }, 
                { 
                    opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".contacto-section",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    }

    // --- FUNCIONES DE APOYO ---
    function animarCurvas() {
        gsap.to(".shape", {
            y: "25px", rotation: 3, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
            stagger: { each: 1, from: "random" }
        });
    }

    function gestionarBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.onscroll = () => {
            if (window.scrollY > 500) btn.classList.add('visible');
            else btn.classList.remove('visible');
        };
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function prepararFiltros() {
        const botones = document.querySelectorAll('.filter-btn');
        botones.forEach(btn => {
            btn.onclick = () => {
                botones.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderizarProyectos(btn.getAttribute('data-filter'));
            };
        });
    }


    function asignarEventosModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = document.querySelector('.close-modal');

        if (!modal) return;

        // 1. FUNCIÓN PARA CERRAR 
        const cerrarModal = () => {
            const v = modal.querySelector('video');
            if (v) {
                v.pause();
                v.src = ""; 
            }
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    modal.style.display = "none";
                    if (swiper) {
                        swiper.destroy(true, true);
                        swiper = null;
                    }
                }
            });
        };

        if (closeBtn) {
            closeBtn.onclick = cerrarModal;
        }

        // Cerrar si hacen clic en el fondo oscuro
        window.onclick = (event) => {
            if (event.target == modal) {
                cerrarModal();
            }
        };

        // 2. ABRIR EL MODAL 
        document.querySelectorAll('.project-card').forEach(card => {
            card.onclick = () => {
                const proy = proyectosGlobal.find(p => p.id == card.dataset.id);
                if (!proy) return;

                document.getElementById('modal-title').innerText = proy.titulo;
                document.getElementById('modal-category').innerText = proy.categoria;
                document.getElementById('modal-description').innerText = proy.descripcion;
                document.getElementById('modal-gallery').innerHTML = proy.galeria.map(url => {
                    if (url.toLowerCase().endsWith('.mp4')) {
                        return `
                            <div class="swiper-slide">
                                <div class="video-container">
                                    <video autoplay muted loop playsinline preload="metadata" style="width:100%; max-height:70vh; background:#000;">
                                        <source src="${url}" type="video/mp4">
                                        Tu navegador no soporta el vídeo.
                                    </video>
                                </div>
                            </div>`;
                    } else {
                        return `<div class="swiper-slide"><img src="${url}"></div>`;
                    }
                }).join('');
                
                // Mostrar modal y animar
                modal.style.display = "block";
                
                const tl = gsap.timeline();
                tl.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4 });
                tl.fromTo([
                    "#modal-gallery", 
                    "#modal-title", 
                    "#modal-category", 
                    "#modal-description"
                ], 
                { opacity: 0, x: -60 }, 
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1.2, 
                    ease: "power2.out",
                    stagger: 0.15 
                }, "-=0.2");

                // Reiniciar Swiper con Autoplay
                setTimeout(() => {
                    if (swiper) swiper.destroy(true, true);
                    const tieneVideo = proy.galeria.some(url => url.toLowerCase().endsWith('.mp4'));
                    swiper = new Swiper('.swiper-container', {
                        loop: true,
                        autoplay: { delay: 3000, disableOnInteraction: false },
                        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                        pagination: { el: '.swiper-pagination', clickable: true }
                    });
                }, 300);
            };
        });
    }

    function initSwiperGustos() {
        const check = document.querySelector('.swiper-gustos');
        if (!check) return;

        new Swiper('.swiper-gustos', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 3000 },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }


    // Busca el enlace que tenga el mail
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = emailLink.innerText;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailLink.innerText;
                emailLink.innerText = "¡Copiado!";
                setTimeout(() => { emailLink.innerText = originalText; }, 2000);
            });
        });
    }

    // --- BARBA.JS ---
    barba.init({
        transitions: [{
            name: 'fade',
            once() { 
                ejecutarTodo(); 
            },
            afterEnter(data) {
                ejecutarTodo();
                window.scrollTo(0, 0);
            }
        }],

        views: [
            {
                namespace: 'home',
                beforeEnter() {
                    ejecutarTodo();
                }
            }
        ]
    });
});