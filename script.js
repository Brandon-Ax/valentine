/**
 * San Valentín 2026 - Revista Interactiva
 * JavaScript: animaciones, transiciones, corazones flotantes
 * Versión final - Totalmente funcional
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    
    // ----- ELEMENTOS DEL DOM -----
    const pantalla1 = document.getElementById('pantalla1');
    const pantalla2 = document.getElementById('pantalla2');
    const pantalla3 = document.getElementById('pantalla3');
    const pantalla4 = document.getElementById('pantalla4');
    
    const corazonClick = document.getElementById('corazonClick');
    const cartaDiseno = document.querySelector('.carta-diseno'); // nuevo selector
    
    const btnPaginaAnterior = document.getElementById('btnPaginaAnterior');
    const btnPaginaSiguiente = document.getElementById('btnPaginaSiguiente');
    
    const btnRespuesta1 = document.getElementById('btnRespuesta1');
    const btnRespuesta2 = document.getElementById('btnRespuesta2');
    // ----- LLUVIA DE CORAZONES (solo en pantalla 1) -----
function iniciarLluviaCorazones() {
    const contenedor = document.getElementById('lluvia-corazones');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const corazon = document.createElement('span');
        corazon.classList.add('corazon-lluvia');
        corazon.innerHTML = '❤️';
        corazon.style.left = Math.random() * 100 + '%';
        corazon.style.animationDelay = Math.random() * 5 + 's';
        corazon.style.animationDuration = Math.random() * 4 + 3 + 's';
        corazon.style.fontSize = Math.random() * 20 + 15 + 'px';
        corazon.style.opacity = Math.random() * 0.5 + 0.4;
        contenedor.appendChild(corazon);
    }
}

// Iniciar lluvia si la pantalla 1 está activa al cargar
if (pantalla1.classList.contains('activa')) {
    iniciarLluviaCorazones();
}

// Reiniciar lluvia cada vez que se active la pantalla 1 (por si vuelves con "PAG. ANTERIOR")
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target === pantalla1 && mutation.target.classList.contains('activa')) {
            iniciarLluviaCorazones();
        }
    });
});
observer.observe(pantalla1, { attributes: true, attributeFilter: ['class'] });

    // ----- FUNCIÓN PARA CAMBIAR DE PANTALLA CON FADE -----
    function cambiarPantalla(pantallaActual, pantallaSiguiente) {
        pantallaActual.classList.remove('activa');
        pantallaActual.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            pantallaSiguiente.classList.add('activa');
            pantallaSiguiente.setAttribute('aria-hidden', 'false');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Accesibilidad: mover foco al primer botón de la nueva pantalla
            const focusable = pantallaSiguiente.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) {
                focusable.focus();
            } else {
                pantallaSiguiente.setAttribute('tabindex', '-1');
                pantallaSiguiente.focus();
            }
        }, 100);
    }
    
    // ----- 1. ANIMACIÓN DEL SOBRE Y PASO A PANTALLA 2 -----
    if (corazonClick) {
        corazonClick.addEventListener('click', function(e) {
            e.preventDefault();
            // Activar animación de la carta
            if (cartaDiseno) {
                cartaDiseno.classList.add('abierto');
            }
            
            // Cambiar a pantalla 2 después de la animación
            setTimeout(() => {
                cambiarPantalla(pantalla1, pantalla2);
                // Quitar clase de animación para resetear
                setTimeout(() => {
                    if (cartaDiseno) {
                        cartaDiseno.classList.remove('abierto');
                    }
                }, 500);
            }, 600);
        });
    }
    
    // ----- 2. BOTÓN "PAG. ANTERIOR" (vuelve a la carta) -----
    if (btnPaginaAnterior) {
        btnPaginaAnterior.addEventListener('click', function() {
            cambiarPantalla(pantalla2, pantalla1);
        });
    }
    
    // ----- 3. BOTÓN "PAG. SIGUIENTE" (va a la gran pregunta) -----
    if (btnPaginaSiguiente) {
        btnPaginaSiguiente.addEventListener('click', function() {
            cambiarPantalla(pantalla2, pantalla3);
        });
    }
    
    // ----- 4. BOTONES DE RESPUESTA "SÍ" (PANTALLA 3 -> PANTALLA 4) -----
    function irAPantallaFinal() {
        cambiarPantalla(pantalla3, pantalla4);
        generarCorazonesFlotantes();
    }
    
    if (btnRespuesta1) {
        btnRespuesta1.addEventListener('click', irAPantallaFinal);
    }
    
    if (btnRespuesta2) {
        btnRespuesta2.addEventListener('click', irAPantallaFinal);
    }
    
    // ----- 5. CORAZONES FLOTANTES EN PANTALLA FINAL -----
    function generarCorazonesFlotantes() {
        const contenedor = document.getElementById('corazones-flotantes');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            const corazon = document.createElement('span');
            corazon.classList.add('corazon-flotante');
            corazon.innerHTML = '❤️';
            
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duracion = Math.random() * 4 + 4;
            const tamanio = Math.random() * 20 + 10;
            
            corazon.style.left = left + '%';
            corazon.style.animationDelay = delay + 's';
            corazon.style.animationDuration = duracion + 's';
            corazon.style.fontSize = tamanio + 'px';
            corazon.style.opacity = Math.random() * 0.5 + 0.3;
            
            contenedor.appendChild(corazon);
        }
    }
    
    // Generar corazones si la pantalla 4 está activa al cargar
    if (pantalla4 && pantalla4.classList.contains('activa')) {
        generarCorazonesFlotantes();
    }
    
    // ----- 6. SCROLL SUAVE PARA ANCLAS (opcional) -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    console.log('❤️ Feliz San Valentín 2026 - Edición Revista ❤️');
});