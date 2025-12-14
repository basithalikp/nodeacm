console.log('main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing scripts...');

    // --- Parallax Effect on Background ---
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const offset = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
        });
    }

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        console.log('Hamburger and nav-links found, setting up event listeners...');
        console.log('Hamburger element:', hamburger);
        console.log('Nav-links element:', navLinks);
        
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hamburger clicked');   
            navLinks.classList.toggle('active');
            console.log('Nav links active state:', navLinks.classList.contains('active'));
            console.log('Nav links classes:', navLinks.className);
        });

        // Close menu when clicking on nav links
        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                console.log('Menu closed after nav link click');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    } else {
        console.log('Hamburger or nav-links not found:', { hamburger, navLinks });
    }

    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Animations (Fade-in sections) ---
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        sections.forEach(section => sectionObserver.observe(section));
    }

    // --- Enhanced Card Hover Effects ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -y / 15;
            const rotateY = x / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    });

    // --- Add loading animation ---
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        if (typeof requestTick === "function") requestTick();
    });


    // --- Dynamic background ---
    const canvas = document.getElementById('dynamic-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationId;
        
        // Resize canvas to full screen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Track mouse position
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                // Use theme colors - purple and indigo
                const colors = [
                    'rgba(106, 27, 154, 0.8)',  // gradient-start
                    'rgba(48, 63, 159, 0.8)',   // gradient-end
                    'rgba(74, 20, 140, 0.8)',   // accent-color
                    'rgba(156, 39, 176, 0.6)',  // lighter purple
                    'rgba(63, 81, 181, 0.6)'    // lighter indigo
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            
            update() {
                // Mouse interaction - particles move away from cursor
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;
                    
                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Slowly return to base position with drift
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                } else {
                    // Gentle floating motion when no mouse interaction
                    this.baseX += this.speedX;
                    this.baseY += this.speedY;
                    
                    // Bounce off edges
                    if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
                    if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;
                    
                    // Move towards base position
                    this.x += (this.baseX - this.x) / 20;
                    this.y += (this.baseY - this.y) / 20;
                }
            }
        }
        
        // Initialize particles
        function initParticles() {
            particles = [];
            // Adjust particle count based on screen size for performance
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 12000, 120);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();
        
        // Reinitialize on resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        // Draw connections between nearby particles
        function connectParticles() {
            const maxDistance = 120;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        let opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(106, 27, 154, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Connect particles to mouse
            if (mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < particles.length; i++) {
                    let dx = particles[i].x - mouse.x;
                    let dy = particles[i].y - mouse.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        let opacity = 1 - (distance / mouse.radius);
                        ctx.strokeStyle = `rgba(156, 39, 176, ${opacity * 0.5})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connectParticles();
            
            animationId = requestAnimationFrame(animate);
        }
        animate();
        
        // Pause animation when tab is not visible for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }
    
});
