// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
    
    // Start periodic heart creation
    setInterval(createHeart, 300);

    const loveMessages = [
        "You're my sunshine, my only sunshine ☀️",
        "Every moment with you is pure magic ✨",
        "Forever and always, my heart beats for you 💫",
        "You make my world complete 💝",
        "You're the missing piece to my puzzle 🌟",
        "My love grows stronger with each passing day 💓",
        "You're the dream I never want to wake up from 🌈",
        "Life is beautiful because you're in it 🌺",
        "You're my perfect match, my soulmate 💑",
        "With you, every day feels like Valentine's Day 🌹"
    ];

    const heartsContainer = document.getElementById('hearts-container');
    const modal = document.getElementById('message-modal');
    const loveMessage = document.getElementById('love-message');
    const closeBtn = document.querySelector('.close-btn');

    // Enhanced sparkles effect
    function createSparkles(x, y) {
        const colors = ['#ff69b4', '#ff1493', '#ffffff', '#ffd700'];
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 3 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            sparkle.style.animation = 'sparkleAnim 1.2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle movement with physics
            let position = { x, y };
            let time = 0;
            const gravity = 0.1;
            
            const animate = () => {
                time += 0.016;
                position.x += vx;
                position.y += vy + (gravity * time * 30);
                sparkle.style.left = position.x + 'px';
                sparkle.style.top = position.y + 'px';
                
                if (sparkle.style.opacity !== '0') {
                    requestAnimationFrame(animate);
                } else {
                    sparkle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // Enhanced heart click handler
    function heartClick(heart) {
        const modal = document.getElementById('message-modal');
        const modalContent = modal.querySelector('.modal-content');
        const loveMessage = document.getElementById('love-message');
        
        // Get heart position
        const heartRect = heart.getBoundingClientRect();
        
        // Random message
        const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        loveMessage.textContent = message;
        
        // Show modal
        modal.style.display = 'block';
        
        // Position modal content
        let x = heartRect.left + (heartRect.width / 2) - (modalContent.offsetWidth / 2);
        let y = heartRect.top - modalContent.offsetHeight - 10;
        
        // Keep modal content within viewport
        if (x < 10) x = 10;
        if (x + modalContent.offsetWidth > window.innerWidth - 10) {
            x = window.innerWidth - modalContent.offsetWidth - 10;
        }
        if (y < 10) {
            y = heartRect.bottom + 10; // Show below if not enough space above
        }
        
        modalContent.style.left = x + 'px';
        modalContent.style.top = y + 'px';
        
        // Add sparkles
        createSparkles(heartRect.left + heartRect.width / 2, heartRect.top + heartRect.height / 2);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.opacity = Math.random();
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);

        heart.addEventListener('click', () => heartClick(heart));
    }

    // Close modal when clicking close button or outside
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Message box functionality
    const revealBtn = document.getElementById('reveal-btn');
    const specialMessage = document.getElementById('special-message');
    const revealMumBtn = document.getElementById('reveal-mum-btn');
    const mumMessage = document.getElementById('mum-message');
    const backgroundMusic = document.getElementById('background-music');

    function setupMessageBox(button, messageElement, hasMusic = false) {
        if (button && messageElement) {
            button.addEventListener('click', function() {
                if (messageElement.style.display === 'none') {
                    messageElement.style.display = 'grid';
                    button.innerHTML = '<span>Hide Message</span><i class="fas fa-heart-broken"></i>';
                    
                    if (hasMusic && backgroundMusic) {
                        backgroundMusic.play();
                    }

                    // Reveal text lines one by one
                    const textLines = messageElement.querySelectorAll('.text-line');
                    textLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, index * 1000);
                    });
                } else {
                    messageElement.style.display = 'none';
                    button.innerHTML = '<span>Reveal Message</span><i class="fas fa-heart"></i>';
                    
                    if (hasMusic && backgroundMusic) {
                        backgroundMusic.pause();
                        backgroundMusic.currentTime = 0;
                    }

                    // Reset text lines
                    const textLines = messageElement.querySelectorAll('.text-line');
                    textLines.forEach(line => {
                        line.classList.remove('visible');
                    });
                }
            });
        }
    }

    // Setup both message boxes
    setupMessageBox(revealBtn, specialMessage, true);
    setupMessageBox(revealMumBtn, mumMessage, false);

    // Create floating music notes
    function createMusicNote() {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = Math.random() > 0.5 ? '♪' : '♫';
        
        const startX = Math.random() * window.innerWidth;
        note.style.left = startX + 'px';
        note.style.top = window.innerHeight + 'px';
        
        document.querySelector('.floating-elements').appendChild(note);
        
        const duration = 5 + Math.random() * 3;
        note.style.animation = `float ${duration}s linear`;
        
        setTimeout(() => note.remove(), duration * 1000);
    }

    setInterval(createMusicNote, 2000);
});
