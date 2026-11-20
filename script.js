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
        });
    }
    
    const allNavTriggers = document.querySelectorAll('a[data-target]');
    const menuItems = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    const navigateTo = (targetId, updateHistory = true) => {
        // Reset scroll to top
        const mainContainer = document.querySelector('main');
        if(mainContainer) mainContainer.scrollTop = 0;

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
    }

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
        btnNext.addEventListener('mouseenter', () => {
            currentArtIndex = (currentArtIndex + 1) % artData.length;
            updateGallery(currentArtIndex);
        });

        btnPrev.addEventListener('mouseenter', () => {
            currentArtIndex = (currentArtIndex - 1 + artData.length) % artData.length;
            updateGallery(currentArtIndex);
        });
    }

    const photoData = {
        people: [
            { src: 'img/people/IMG_0695.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0018.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0678.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0681.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0682.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0683.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0685.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0688.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0690.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0691.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0693.JPG', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0694.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0697.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0702.JPG', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0703.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0706.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_0711.jpg', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' },
            { src: 'img/people/IMG_1093.JPG', title: 'People', desc: 'I love capturing the present moment with people. Photographers like Annie Leibovitz and Helmut Newton inspire me.' }
        ],
        urbex: [
            { src: 'img/urbex/IMG_9856.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8072.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8078.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8083.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8119.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8150.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8163.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8171.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8180.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_8182.jpg', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9866.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9867.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9871.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9895.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9897.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9905.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9906.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9918.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' },
            { src: 'img/urbex/IMG_9919.JPG', title: 'Urbex', desc: 'I\'ve always loved exploring abandoned places - there\'s something surreal about them.' }
        ],
        places: [
            { src: 'img/places/IMG_5397.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0041.JPG', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_7012.jpg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0437.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0512.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_6109.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_9995.JPG', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_7028.jpg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0606.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_5600.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0785.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_0010.jpg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/image000002.JPG', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_7997.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' },
            { src: 'img/places/IMG_9666.jpeg', title: 'Places', desc: 'Places I\'d love to visit again.' }
        ],
        dreams: [
            { src: 'img/dreams/IMG_1202.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1109.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1110.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1117.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1122.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1125.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1129.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1136.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1137.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1141.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1148.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1169.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1175.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1181.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1188.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1190.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1201.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1205.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1207.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1208.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1212.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1217.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1089.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1220.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1223.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_1227.JPG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_6002.PNG', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' },
            { src: 'img/dreams/IMG_7004.jpg', title: 'Dreams', desc: 'This series is made of photos that feel like time stopped in a dream.' }
        ]
    };

    const albumGrid = document.getElementById('album-grid');
    const albumViewer = document.getElementById('album-viewer');
    const albumDisplay = document.getElementById('album-display');
    const albumTitle = document.getElementById('album-title');
    const albumDesc = document.getElementById('album-desc');
    const albumCounter = document.getElementById('album-counter');
    const albumPrevBtn = document.getElementById('album-prev');
    const albumNextBtn = document.getElementById('album-next');
    const albumCloseBtn = document.getElementById('album-close');

    let currentSeriesKey = null;
    let currentPhotoIndex = 0;

    const updateAlbumPhoto = () => {
        if(!currentSeriesKey || !albumDisplay) return;
        const series = photoData[currentSeriesKey];
        const item = series[currentPhotoIndex];

        albumDisplay.classList.add('fade-out');

        setTimeout(() => {
            albumDisplay.src = item.src;
            albumTitle.textContent = item.title;
            albumDesc.textContent = item.desc;
            albumCounter.textContent = `${String(currentPhotoIndex + 1).padStart(2, '0')} / ${String(series.length).padStart(2, '0')}`;

            albumDisplay.onload = () => albumDisplay.classList.remove('fade-out');
            if(albumDisplay.complete) albumDisplay.classList.remove('fade-out');
        }, 400);
    };

    const openAlbum = (seriesKey) => {
        if(!photoData[seriesKey] || !albumViewer) return;
        currentSeriesKey = seriesKey;
        currentPhotoIndex = 0;
        updateAlbumPhoto();
        albumViewer.classList.remove('hidden');
        albumViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if(albumGrid) {
        albumGrid.querySelectorAll('.album-open-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openAlbum(btn.dataset.series);
            });
        });

        albumGrid.querySelectorAll('.album-card').forEach(card => {
            card.addEventListener('click', () => openAlbum(card.dataset.series));
        });
    }

    if(albumNextBtn) {
        albumNextBtn.addEventListener('click', () => {
            const series = photoData[currentSeriesKey];
            currentPhotoIndex = (currentPhotoIndex + 1) % series.length;
            updateAlbumPhoto();
        });
    }

    if(albumPrevBtn) {
        albumPrevBtn.addEventListener('click', () => {
            const series = photoData[currentSeriesKey];
            currentPhotoIndex = (currentPhotoIndex - 1 + series.length) % series.length;
            updateAlbumPhoto();
        });
    }

    if(albumCloseBtn) {
        albumCloseBtn.addEventListener('click', () => {
            albumViewer.classList.add('hidden');
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