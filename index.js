"use strict";

// Mobile scroll speed limiter (iOS & Android)
(function () {
    const SPEED_MULTIPLIER = 0.4; // Lower = slower scrolling (0.1 to 1.0)
    const MOMENTUM_DECAY = 0.92; // Lower = momentum dies faster
    const MIN_VELOCITY = 0.5;

    let lastTouchY = 0;
    let velocity = 0;
    let isTouching = false;
    let momentumId = null;

    // Only apply on touch devices
    if (!('ontouchstart' in window)) return;

    document.body.style.touchAction = 'none';
    document.body.style.overscrollBehavior = 'none';

    window.addEventListener('touchstart', function (e) {
        isTouching = true;
        lastTouchY = e.touches[0].clientY;
        velocity = 0;

        if (momentumId) {
            cancelAnimationFrame(momentumId);
            momentumId = null;
        }
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
        if (!isTouching) return;
        e.preventDefault();

        const touchY = e.touches[0].clientY;
        const delta = (lastTouchY - touchY) * SPEED_MULTIPLIER;
        velocity = delta;
        lastTouchY = touchY;

        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const newScroll = Math.max(0, Math.min(maxScroll, window.scrollY + delta));
        window.scrollTo(0, newScroll);
    }, { passive: false });

    window.addEventListener('touchend', function () {
        isTouching = false;
        applyMomentum();
    }, { passive: true });

    function applyMomentum() {
        if (Math.abs(velocity) < MIN_VELOCITY) {
            momentumId = null;
            return;
        }

        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const newScroll = Math.max(0, Math.min(maxScroll, window.scrollY + velocity));
        window.scrollTo(0, newScroll);

        velocity *= MOMENTUM_DECAY;
        momentumId = requestAnimationFrame(applyMomentum);
    }
})();

// Hide progress hint when near bottom
window.addEventListener('scroll', function () {
    const hint = document.querySelector('.progress-hint');
    const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    hint.style.opacity = scrollPercent > 0.9 ? '0' : '0.5';
}, { passive: true });

// Scroll track indicators
(function () {
    const tracks = document.querySelectorAll('.scroll-track-inner');
    const tickSpacing = 100; // pixels between ticks

    function generateTicks() {
        const pageHeight = document.body.scrollHeight;
        const numTicks = Math.ceil((pageHeight + window.innerHeight) / tickSpacing);

        tracks.forEach(function (track) {
            track.innerHTML = '';
            for (let i = 0; i < numTicks; i++) {
                const tick = document.createElement('div');
                tick.className = 'tick';
                track.appendChild(tick);
            }
        });
    }

    function updateTrackPosition() {
        const scrollY = window.scrollY;
        tracks.forEach(function (track) {
            track.style.transform = 'translateX(-50%) translateY(' + (-scrollY) + 'px)';
        });
    }

    // Generate ticks on load
    generateTicks();
    updateTrackPosition();

    // Update on scroll
    window.addEventListener('scroll', updateTrackPosition, { passive: true });

    // Regenerate on resize (page height may change)
    window.addEventListener('resize', function () {
        generateTicks();
        updateTrackPosition();
    }, { passive: true });
})();

// Fireworks animation
(function () {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const sparkles = [];
    const rockets = [];
    let isActive = false;
    let animationId = null;
    let launchInterval = null;

    // Limits to prevent slowdown
    const MAX_PARTICLES = 800;
    const MAX_SPARKLES = 150;
    const MAX_ROCKETS = 8;

    // Brighter, more vivid colors
    const colors = [
        '#ff1744', '#ffea00', '#00e5ff', '#ff4081', '#536dfe',
        '#e040fb', '#00e676', '#ff9100', '#ff3d00', '#ffffff'
    ];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Main explosion particle
    function Particle(x, y, color, speed) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = random(0, Math.PI * 2);
        const velocity = random(2, speed || 12);
        this.velocity = {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity
        };
        this.alpha = 1;
        this.decay = random(0.01, 0.02);
        this.size = random(3, 6);
        this.gravity = 0.08;
        this.flickerSpeed = random(0.05, 0.15);
        this.flickerPhase = random(0, Math.PI * 2);
    }

    Particle.prototype.update = function () {
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
        this.flickerPhase += this.flickerSpeed;
    };

    Particle.prototype.draw = function () {
        const flicker = 0.7 + Math.sin(this.flickerPhase) * 0.3;
        const alpha = this.alpha * flicker;
        if (alpha < 0.05) return; // Skip nearly invisible particles

        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    // Lingering sparkle
    function Sparkle(x, y, color) {
        this.x = x + random(-50, 50);
        this.y = y + random(-50, 50);
        this.color = color;
        this.alpha = random(0.5, 1);
        this.decay = random(0.02, 0.04); // Faster decay
        this.size = random(1, 3);
        this.twinkle = random(0.1, 0.3);
        this.phase = random(0, Math.PI * 2);
    }

    Sparkle.prototype.update = function () {
        this.alpha -= this.decay;
        this.phase += this.twinkle;
        this.y += 0.3;
    };

    Sparkle.prototype.draw = function () {
        const twinkle = 0.5 + Math.sin(this.phase) * 0.5;
        const alpha = this.alpha * twinkle;
        if (alpha < 0.05) return;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function Rocket(x, targetY) {
        this.x = x;
        this.y = canvas.height + 20;
        this.targetY = targetY;
        this.velocity = random(-16, -22);
        this.color = colors[Math.floor(random(0, colors.length))];
        this.trail = [];
        this.exploded = false;
    }

    Rocket.prototype.update = function () {
        // Add trail
        this.trail.push({ x: this.x, y: this.y, alpha: 1, size: random(2, 4) });
        if (this.trail.length > 15) {
            this.trail.shift();
        }

        // Fade trail
        for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].alpha -= 0.07;
        }

        this.y += this.velocity;
        this.velocity += 0.35;

        // Explode when reaching target or velocity reverses
        if (this.y <= this.targetY || this.velocity >= 0) {
            this.explode();
        }
    };

    Rocket.prototype.draw = function () {
        ctx.fillStyle = this.color;

        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i];
            if (t.alpha > 0.1) {
                ctx.globalAlpha = t.alpha * 0.7;
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw rocket head
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
    };

    Rocket.prototype.explode = function () {
        this.exploded = true;

        // Check limits before adding particles
        const canAddParticles = particles.length < MAX_PARTICLES;
        const canAddSparkles = sparkles.length < MAX_SPARKLES;

        if (canAddParticles) {
            // Main burst
            const particleCount = Math.floor(random(60, 80));
            for (let i = 0; i < particleCount && particles.length < MAX_PARTICLES; i++) {
                particles.push(new Particle(this.x, this.y, this.color, 12));
            }

            // Inner bright core
            const coreCount = Math.floor(random(15, 25));
            for (let j = 0; j < coreCount && particles.length < MAX_PARTICLES; j++) {
                particles.push(new Particle(this.x, this.y, '#ffffff', 5));
            }
        }

        // Lingering sparkles
        if (canAddSparkles) {
            const sparkleCount = Math.floor(random(10, 20));
            for (let k = 0; k < sparkleCount && sparkles.length < MAX_SPARKLES; k++) {
                sparkles.push(new Sparkle(this.x, this.y, this.color));
            }
        }
    };

    function launchRocket() {
        if (rockets.length >= MAX_ROCKETS) return;

        const x = random(canvas.width * 0.1, canvas.width * 0.9);
        const targetY = random(canvas.height * 0.1, canvas.height * 0.45);
        rockets.push(new Rocket(x, targetY));
    }

    function animate() {
        // Clear canvas to keep it transparent
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw rockets
        for (let i = rockets.length - 1; i >= 0; i--) {
            rockets[i].update();
            if (!rockets[i].exploded) {
                rockets[i].draw();
            } else {
                rockets.splice(i, 1);
            }
        }

        // Update and draw particles
        for (let j = particles.length - 1; j >= 0; j--) {
            particles[j].update();
            if (particles[j].alpha > 0.01) {
                particles[j].draw();
            } else {
                particles.splice(j, 1);
            }
        }

        // Update and draw sparkles
        for (let k = sparkles.length - 1; k >= 0; k--) {
            sparkles[k].update();
            if (sparkles[k].alpha > 0.01) {
                sparkles[k].draw();
            } else {
                sparkles.splice(k, 1);
            }
        }

        // Reset alpha
        ctx.globalAlpha = 1;

        if (isActive || rockets.length > 0 || particles.length > 0 || sparkles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            animationId = null;
        }
    }

    function startFireworks() {
        if (isActive) return;
        isActive = true;

        // Launch initial barrage
        for (let i = 0; i < 5; i++) {
            setTimeout(launchRocket, i * 150);
        }

        // Continue launching rockets
        launchInterval = setInterval(function () {
            if (isActive) {
                launchRocket();
                // Sometimes launch a second
                if (Math.random() > 0.6) {
                    setTimeout(launchRocket, 150);
                }
            }
        }, 600);

        if (!animationId) {
            animate();
        }
    }

    function stopFireworks() {
        isActive = false;
        if (launchInterval) {
            clearInterval(launchInterval);
            launchInterval = null;
        }
    }

    // Check if at bottom
    function checkScroll() {
        // Check if user is at the very bottom (within 50px)
        const distanceFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight;
        if (distanceFromBottom < 50) {
            startFireworks();
        } else {
            stopFireworks();
        }
    }

    // Initialize
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', checkScroll, { passive: true });

    // Check initial position (in case page loads at bottom)
    checkScroll();
})();
