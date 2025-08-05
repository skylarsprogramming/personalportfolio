// 3D Background with Mathematical Shapes
class ThreeJSBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.shapes = [];
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.createShapes();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 1, 1000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 500;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('bg-canvas'),
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 1);
    }

    createShapes() {
        const shapeCount = 50;
        const silverMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xc0c0c0,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xc0c0c0, 1, 1000);
        pointLight.position.set(0, 0, 500);
        this.scene.add(pointLight);

        // Create different mathematical shapes
        for (let i = 0; i < shapeCount; i++) {
            let geometry;
            const shapeType = Math.floor(Math.random() * 6);

            switch (shapeType) {
                case 0: // Icosahedron
                    geometry = new THREE.IcosahedronGeometry(Math.random() * 20 + 5);
                    break;
                case 1: // Octahedron
                    geometry = new THREE.OctahedronGeometry(Math.random() * 15 + 5);
                    break;
                case 2: // Dodecahedron
                    geometry = new THREE.DodecahedronGeometry(Math.random() * 12 + 5);
                    break;
                case 3: // Tetrahedron
                    geometry = new THREE.TetrahedronGeometry(Math.random() * 18 + 5);
                    break;
                case 4: // Torus
                    geometry = new THREE.TorusGeometry(Math.random() * 15 + 5, Math.random() * 5 + 2, 8, 16);
                    break;
                case 5: // Cone
                    geometry = new THREE.ConeGeometry(Math.random() * 10 + 3, Math.random() * 20 + 10, 8);
                    break;
            }

            const mesh = new THREE.Mesh(geometry, silverMaterial.clone());
            
            // Random positioning
            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 2000 - 1000;

            // Random rotation
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.rotation.z = Math.random() * 2 * Math.PI;

            // Random scale
            const scale = Math.random() * 0.5 + 0.5;
            mesh.scale.set(scale, scale, scale);

            // Store animation properties
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatOffset: Math.random() * Math.PI * 2,
                originalY: mesh.position.y
            };

            this.shapes.push(mesh);
            this.scene.add(mesh);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update shapes
        this.shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Floating motion
            shape.position.y = shape.userData.originalY + 
                Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.floatOffset) * 30;

            // Slow drift
            shape.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.1;
            shape.position.z += Math.cos(Date.now() * 0.0003 + index) * 0.1;

            // Wrap around screen
            if (shape.position.x > 1000) shape.position.x = -1000;
            if (shape.position.x < -1000) shape.position.x = 1000;
            if (shape.position.z > 1000) shape.position.z = -1000;
            if (shape.position.z < -1000) shape.position.z = 1000;
        });

        // Camera movement based on mouse
        this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalf.x) * 0.1;
            this.mouse.y = (event.clientY - this.windowHalf.y) * 0.1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.section-title, .project-card, .about-text, .contact-item');
        animateElements.forEach(el => observer.observe(el));

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const name = this.form.querySelector('input[type="text"]').value;
        const email = this.form.querySelector('input[type="email"]').value;
        const message = this.form.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.form.reset();
    }

    showMessage(text, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = text;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
        `;

        document.body.appendChild(messageEl);

        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 3000);
    }
}

// Video placeholder functionality
class VideoSection {
    constructor() {
        this.videoPlaceholder = document.querySelector('.video-placeholder');
        this.init();
    }

    init() {
        if (this.videoPlaceholder) {
            this.videoPlaceholder.addEventListener('click', () => {
                this.showVideoUploadInfo();
            });
        }
    }

    showVideoUploadInfo() {
        const message = `
To add your introduction video:
1. Replace the video placeholder in the HTML
2. Upload your video file to the project folder
3. Update the video source in index.html

Example:
<video controls>
    <source src="your-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
        `;
        
        alert(message);
    }
}

// Typing animation for hero text
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.gradient-text');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid #c0c0c0';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing after a short delay
            setTimeout(typeWriter, 1000);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading message
    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading-3d';
    loadingEl.textContent = 'Loading 3D Environment';
    document.body.appendChild(loadingEl);

    // Initialize 3D background
    setTimeout(() => {
        new ThreeJSBackground();
        document.body.removeChild(loadingEl);
    }, 1000);

    // Initialize other components
    new Navigation();
    new ScrollAnimations();
    new ContactForm();
    new VideoSection();
    new TypingAnimation();

    // Add smooth reveal animation to hero section
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 1500);
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload any additional resources if needed
    console.log('Portfolio website loaded successfully!');
});

// Add CSS for hero content initial state
const style = document.createElement('style');
style.textContent = `
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
`;
document.head.appendChild(style);