// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Actualizar el año en el footer
    const anioActual = document.getElementById('anio-actual');
    anioActual.textContent = new Date().getFullYear();
    
    // Manejo del formulario de contacto
    const formularioContacto = document.getElementById('formulario-contacto');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar envío real del formulario
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (nombre && email && mensaje) {
                // Simular envío del formulario
                console.log('Formulario enviado:');
                console.log('Nombre:', nombre);
                console.log('Email:', email);
                console.log('Mensaje:', mensaje);
                
                // Mostrar mensaje de éxito
                alert(`Gracias ${nombre}, tu mensaje ha sido enviado. Te contactaremos en ${email} pronto.`);
                
                // Limpiar formulario
                formularioContacto.reset();
            } else {
                alert('Por favor, completa todos los campos del formulario.');
            }
        });
    }
    
    // Navegación suave para enlaces internos
    const enlacesMenu = document.querySelectorAll('.menu a[href^="#"]');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            
            const objetivoId = this.getAttribute('href');
            if (objetivoId === '#') return;
            
            const objetivoElemento = document.querySelector(objetivoId);
            if (objetivoElemento) {
                // Desplazamiento suave
                window.scrollTo({
                    top: objetivoElemento.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(34, 34, 77, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = '#22224d';
        }
    });
    
    // Efecto de aparición para las tarjetas de servicios
    const observarServicios = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    const tarjetasServicios = document.querySelectorAll('.service-card');
    tarjetasServicios.forEach(tarjeta => {
        // Añadir clase inicial para la animación
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';
        tarjeta.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observarServicios.observe(tarjeta);
        
        // Añadir clase cuando sea visible
        const callback = (entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                    observador.unobserve(entrada.target);
                }
            });
        };
        
        const observador = new IntersectionObserver(callback, { threshold: 0.1 });
        observador.observe(tarjeta);
    });

    // Carrusel automático de imágenes
    const imagenesCarrusel = document.querySelectorAll('.carousel img');
    let indiceActual = 0;

    if (imagenesCarrusel.length > 0) {
        setInterval(() => {
            imagenesCarrusel[indiceActual].classList.remove('active');
            indiceActual = (indiceActual + 1) % imagenesCarrusel.length;
            imagenesCarrusel[indiceActual].classList.add('active');
        }, 10000); // 10 segundos
    }

    
    // Mensaje en consola
    console.log('Página web cargada correctamente. ¡Bienvenido!');

});


