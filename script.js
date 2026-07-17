document.addEventListener('DOMContentLoaded', () => {
    
    const toggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        rootElement.setAttribute('data-theme', savedTheme);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            rootElement.setAttribute('data-theme', newTheme);
            
            localStorage.setItem('theme', newTheme);
            
            if(window.canvasEngine) window.canvasEngine.updateColors();
        });
    }
    
    const allNavTriggers = document.querySelectorAll('a[data-target]');
    const menuItems = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    const experiencePhoto = document.querySelector('.experience-photo');
    const canvas = document.getElementById('background-canvas');
    let hasNavigated = false;

    const navigateTo = (targetId, updateHistory = true) => {
        // Reset scroll to top
        const mainContainer = document.querySelector('main');
        if(mainContainer) mainContainer.scrollTop = 0;

        if (experiencePhoto) {
            if (targetId === 'experience') {
                experiencePhoto.classList.remove('instant-hide');
            } else {
                experiencePhoto.classList.add('instant-hide');
            }
        }

        // Toggle fullscreen mode (memento & contact)
        if (targetId === 'memento' || targetId === 'contact') {
            document.body.classList.add('memento-mode');
        } else {
            document.body.classList.remove('memento-mode');
        }

        menuItems.forEach(l => l.classList.remove('active'));
        const linkToHighlight = document.querySelector(`nav a[data-target="${targetId}"]`);
        if(linkToHighlight) linkToHighlight.classList.add('active');

        sections.forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(targetId);

        if(targetSection) {
            targetSection.classList.add('active');
        } else {
            if(targetId !== 'home') navigateTo('home', false);
            return;
        }

        if(window.canvasEngine) window.canvasEngine.setMode(targetId);

        if(updateHistory) {
            history.pushState({ id: targetId }, "", `#${targetId}`);
        }

        // Handle memento sound
        if(window.mementoSound) {
            if(targetId === 'memento') {
                window.mementoSound.play();
            } else {
                window.mementoSound.stop();
            }
        }
    };

    allNavTriggers.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Mark that user has navigated (no longer needed for opacity control)
            hasNavigated = true;

            const target = link.getAttribute('data-target');
            if (target) navigateTo(target);
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.id) {
            navigateTo(event.state.id, false);
        } else {
            navigateTo('home', false);
        }
    });

    const initialHash = window.location.hash.replace('#', '');
    if(initialHash) {
        navigateTo(initialHash, false);
    } else {
        // Initial load on home - ensure shapes are hidden
        if(window.canvasEngine) {
            window.canvasEngine.setMode('home');
        }
    }

    class StringArtEngine {
        constructor() {
            this.canvas = document.getElementById('background-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.mouse = { x: 0, y: 0 };
            this.scrollOffset = 0;

            this.params = {
                speed: 0.0008,
                scale: 1.0,
            };

            this.shapes = [];

            // Fade effect: hidden until first navigation
            this.opacity = 0;
            this.targetOpacity = 0;
            this.startOpacity = 0; // Track starting opacity for smooth transitions
            this.maxOpacity = 0.05;
            this.fadeDuration = 4000;
            this.fadeStartTime = null;
            this.hasAnimatedIn = false;

            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', () => this.resize());
            
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            
            const main = document.querySelector('main');
            if(main) {
                main.addEventListener('scroll', () => {
                    this.scrollOffset = main.scrollTop;
                });
            }

            this.createShapes();
            this.animate();
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            
            if(this.shapes.length > 0) {
                this.shapes[0].baseX = this.width * 0.2;
                this.shapes[0].baseY = this.height * 0.3;
                
                this.shapes[1].baseX = this.width * 0.8;
                this.shapes[1].baseY = this.height * 0.8;

                this.shapes[2].baseX = this.width * 0.5;
                this.shapes[2].baseY = this.height * 0.5;
            }
        }

        setMode(sectionId) {
            // Save current opacity as starting point for animation
            this.startOpacity = this.opacity;

            // Hide shapes on home, show on other pages
            if (sectionId === 'home') {
                this.targetOpacity = 0;
            } else {
                this.targetOpacity = this.maxOpacity;
            }

            // Start fade animation
            this.fadeStartTime = Date.now();
            this.hasAnimatedIn = false;
        }

        updateColors() {
        }

        createShapes() {
            this.shapes = [];
            this.shapes.push(new StringShape(this.width * 0.2, this.height * 0.3, 1, false));
            
            this.shapes.push(new StringShape(this.width * 0.8, this.height * 0.8, 2, false));
            
            this.shapes.push(new StringShape(this.width * 0.5, this.height * 0.5, 3, true));
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            // Handle fade animation (both in and out)
            if (!this.hasAnimatedIn && this.fadeStartTime !== null) {
                const elapsed = Date.now() - this.fadeStartTime;
                const progress = Math.min(elapsed / this.fadeDuration, 1);
                // Easing function for smooth fade
                const eased = 1 - Math.pow(1 - progress, 3);
                // Animate from startOpacity to targetOpacity
                this.opacity = this.startOpacity + (this.targetOpacity - this.startOpacity) * eased;

                if (progress >= 1) {
                    this.hasAnimatedIn = true;
                    this.opacity = this.targetOpacity;
                }
            } else if (this.hasAnimatedIn) {
                this.opacity = this.targetOpacity;
            }

            if (this.opacity > 0) {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const color = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`;

                this.shapes.forEach(shape => {
                    shape.update(this.params, this.mouse, this.scrollOffset);
                    shape.draw(this.ctx, color);
                });
            }

            requestAnimationFrame(() => this.animate());
        }
    }

    class StringShape {
        constructor(x, y, id, isRoaming) {
            this.baseX = x;
            this.baseY = y;
            this.x = x;
            this.y = y;
            this.id = id;
            this.isRoaming = isRoaming;
            
            this.angle = Math.random() * Math.PI * 2;
            this.sizeBase = 130;
        }

        update(params, mouse, scroll) {
            const time = Date.now();

            this.angle += params.speed * (this.id % 2 === 0 ? 1 : -1);

            const breathing = Math.sin(time * 0.0005 + this.id) * 10;
            this.currentSize = (this.sizeBase + breathing) * params.scale;

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const force = Math.max(0, (500 - dist) / 500); 

            if (this.isRoaming) {
                const roamX = Math.sin(time * 0.00005) * (window.innerWidth * 0.25); 
                const roamY = Math.cos(time * 0.00008) * (window.innerHeight * 0.15);
                
                this.x = this.baseX + roamX + (dx * force * 0.05);
                this.y = this.baseY + roamY + (dy * force * 0.05);
                
            } else {
                const driftX = Math.sin(time * 0.0003 + this.id) * 30;
                const driftY = Math.cos(time * 0.0004 + this.id) * 30;
                
                this.x = this.baseX + driftX + (dx * force * 0.05);
                this.y = this.baseY + driftY + (dy * force * 0.05);
            }

            this.y -= scroll * 0.1; 
        }

        draw(ctx, color) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            const numLines = 25;

            const numBranches = 4;
            const points = [];
            for(let i=0; i<numBranches; i++) {
                const theta = this.angle + (i * (2 * Math.PI) / numBranches);
                points.push({
                    x: this.x + Math.cos(theta) * this.currentSize,
                    y: this.y + Math.sin(theta) * this.currentSize
                });
            }

            // Draw quadrants between consecutive points
            for(let i=0; i<numBranches; i++) {
                this.drawQuadrant(ctx, points[i], points[(i+1) % numBranches], numLines);
            }

            // Draw lines from center to each point
            ctx.beginPath();
            for(let i=0; i<numBranches; i++) {
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }

        drawQuadrant(ctx, p1, p2, segments) {
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x1 = this.x + (p1.x - this.x) * (1 - t);
                const y1 = this.y + (p1.y - this.y) * (1 - t);
                const x2 = this.x + (p2.x - this.x) * t;
                const y2 = this.y + (p2.y - this.y) * t;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.stroke();
        }
    }

    window.canvasEngine = new StringArtEngine();
    const artData = [
        {
            src: 'img/P1.JPG',
            title: 'Error - Processus 1',
            desc: '1st piece in the series. As many good ideas, it came from an error.'
        },
        {
            src: 'img/P2.JPG',
            title: 'Mango Passion Fuel - Processus 2',
            desc: 'I wanted to create a painting that captures the essence of passion.'
        },
        {
            src: 'img/P3.JPG',
            title: 'Ground - Processus 3',
            desc: 'This one is sold !'
        },
        {
            src: 'img/P4.JPG',
            title: 'Void - Processus 4',
            desc: 'The piece is a mathematical representation of emptiness.'
        }
    ];

    let currentArtIndex = 0;
    
    const artImg = document.getElementById('art-display');
    const artTitle = document.getElementById('art-title');
    const artDesc = document.getElementById('art-desc');
    const artCounter = document.getElementById('art-counter');
    const btnPrev = document.getElementById('art-prev');
    const btnNext = document.getElementById('art-next');

    const updateGallery = (index) => {
        if(!artImg) return;

        artImg.classList.add('fade-out');

        setTimeout(() => {
            const item = artData[index];
            
            artImg.src = item.src;
            artTitle.textContent = item.title;
            artDesc.textContent = item.desc;
            
            artCounter.textContent = `0${index + 1} / 0${artData.length}`;

            artImg.onload = () => {
                artImg.classList.remove('fade-out');
            };
            
            if(artImg.complete) {
                 artImg.classList.remove('fade-out');
            }
        }, 400); 
    };

    if(btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            currentArtIndex = (currentArtIndex + 1) % artData.length; 
            updateGallery(currentArtIndex);
        });

        btnPrev.addEventListener('click', () => {
            currentArtIndex = (currentArtIndex - 1 + artData.length) % artData.length;
            updateGallery(currentArtIndex);
        });
    }

    const blogList = document.getElementById('blog-list-view');
    const blogArticle = document.getElementById('blog-article-view');
    const typstViewer = document.getElementById('typst-viewer');
    const backBtn = document.getElementById('back-to-blog');
    const blogLinks = document.querySelectorAll('.blog-link');
    const pdfDownloadBtn = document.getElementById('pdf-download-btn');

    if(blogList && blogArticle) {
        blogLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Navigate to target section if specified
                const target = link.getAttribute('data-target');
                if (target) navigateTo(target);

                const svgFile = link.getAttribute('data-src');
                const pdfFile = svgFile.replace('.svg', '.pdf');

                typstViewer.setAttribute('data', svgFile);
                pdfDownloadBtn.setAttribute('href', pdfFile);

                blogList.classList.add('hidden');
                blogArticle.classList.remove('hidden');
            });
        });

        backBtn.addEventListener('click', () => {
            blogArticle.classList.add('hidden');
            blogList.classList.remove('hidden');
            setTimeout(() => typstViewer.setAttribute('data', ''), 300);
        });
    }    

    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const mainContainer = document.querySelector('main');

    if(scrollTopBtn && mainContainer) {

        mainContainer.addEventListener('scroll', () => {
            if (mainContainer.scrollTop > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            mainContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Timer functionality for memento section
    class MementoTimer {
        constructor() {
            this.totalSeconds = 15 * 60; // 15 minutes
            this.remainingSeconds = this.totalSeconds;
            this.isRunning = false;
            this.timerInterval = null;

            this.displayElement = document.getElementById('timer-display');
            this.startBtn = document.getElementById('timer-start');
            this.resetBtn = document.getElementById('timer-reset');
            this.addBtns = document.querySelectorAll('.timer-add-btn');

            this.init();
        }

        init() {
            if(this.startBtn) {
                this.startBtn.addEventListener('click', () => this.toggle());
            }

            if(this.resetBtn) {
                this.resetBtn.addEventListener('click', () => this.reset());
            }

            this.addBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const secondsToAdd = parseInt(e.target.getAttribute('data-add'));
                    this.addTime(secondsToAdd);
                });
            });

            this.updateDisplay();
        }

        toggle() {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        }

        start() {
            if (this.remainingSeconds <= 0) return;

            this.isRunning = true;
            this.startBtn.textContent = 'Pause';
            this.startBtn.classList.remove('paused');

            this.timerInterval = setInterval(() => {
                this.remainingSeconds--;
                this.updateDisplay();

                if (this.remainingSeconds <= 0) {
                    this.end();
                }
            }, 1000);
        }

        pause() {
            this.isRunning = false;
            this.startBtn.textContent = 'Resume';
            this.startBtn.classList.add('paused');
            clearInterval(this.timerInterval);
        }

        reset() {
            this.isRunning = false;
            this.startBtn.textContent = 'Start';
            this.startBtn.classList.remove('paused');
            clearInterval(this.timerInterval);
            this.remainingSeconds = this.totalSeconds;
            this.updateDisplay();
        }

        end() {
            this.isRunning = false;
            this.startBtn.textContent = 'Start';
            this.startBtn.classList.remove('paused');
            clearInterval(this.timerInterval);
            // Optional: You could add an alert or visual feedback here
        }

        addTime(seconds) {
            if (!this.isRunning) {
                this.remainingSeconds += seconds;
                this.updateDisplay();
            }
        }

        updateDisplay() {
            const minutes = Math.floor(this.remainingSeconds / 60);
            const seconds = this.remainingSeconds % 60;

            const minuteStr = minutes.toString().padStart(2, '0');
            const secondStr = seconds.toString().padStart(2, '0');

            this.displayElement.textContent = `${minuteStr}:${secondStr}`;
        }
    }

    // Initialize timer when memento section is visible
    const mementoSection = document.getElementById('memento');
    if(mementoSection) {
        window.mementoTimer = new MementoTimer();
    }

    // Sound management for memento page
    class MementoSound {
        constructor() {
            this.audio = document.getElementById('memento-audio');
            this.toggleBtn = document.getElementById('sound-toggle');
            this.isEnabled = true;

            // Load saved preference
            const savedPref = localStorage.getItem('memento-sound-enabled');
            if(savedPref !== null) {
                this.isEnabled = savedPref === 'true';
            }

            this.init();
        }

        init() {
            if(!this.toggleBtn || !this.audio) return;

            this.updateButtonState();

            this.toggleBtn.addEventListener('click', () => {
                this.toggle();
            });

            // Ensure audio loops
            this.audio.addEventListener('ended', () => {
                this.audio.currentTime = 0;
                this.audio.play();
            });
        }

        toggle() {
            this.isEnabled = !this.isEnabled;
            localStorage.setItem('memento-sound-enabled', this.isEnabled);

            if(this.isEnabled) {
                this.play();
            } else {
                this.stop();
            }

            this.updateButtonState();
        }

        play() {
            if(this.audio && this.isEnabled) {
                this.audio.currentTime = 0;
                this.audio.play().catch(() => {
                    // Autoplay might be blocked by browser
                });
            }
        }

        stop() {
            if(this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        }

        updateButtonState() {
            if(this.toggleBtn) {
                if(this.isEnabled) {
                    this.toggleBtn.classList.remove('muted');
                    this.toggleBtn.textContent = 'Sound On';
                } else {
                    this.toggleBtn.classList.add('muted');
                    this.toggleBtn.textContent = 'Sound Off';
                }
            }
        }
    }

    window.mementoSound = new MementoSound();

});