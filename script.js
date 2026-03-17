/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===== CANVAS SPACE BACKGROUND ===== */
(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    /* --- Stars --- */
    const STAR_COUNT = 280;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * 1,
        y: Math.random() * 1,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2
    }));

    /* --- Shooting stars --- */
    const shooters = [];
    function spawnShooter() {
        shooters.push({
            x: Math.random() * W,
            y: Math.random() * H * 0.5,
            len: Math.random() * 120 + 60,
            speed: Math.random() * 6 + 4,
            angle: Math.PI / 5,
            alpha: 1,
            life: 0
        });
    }
    setInterval(spawnShooter, 3200);

    /* --- Satellites --- */
    function makeSatellite(cx, cy, orbitA, orbitB, speed, angleDeg, tiltDeg) {
        return {
            cx, cy,
            orbitA, orbitB,
            speed,
            angle: (angleDeg * Math.PI) / 180,
            tilt:  (tiltDeg  * Math.PI) / 180
        };
    }

    const satellites = [
        makeSatellite(0.38, 0.42, 0.28, 0.14, 0.0004, 0,    15),
        makeSatellite(0.68, 0.60, 0.18, 0.10, 0.0007, 90,  -10),
        makeSatellite(0.20, 0.72, 0.14, 0.07, 0.0010, 200,  25),
        makeSatellite(0.80, 0.25, 0.12, 0.06, 0.0013, 310, -20),
    ];

    /* Draw a satellite at canvas coords (sx, sy), rotated by heading angle */
    function drawSatellite(sx, sy, heading, scale) {
        const s = scale || 1;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(heading);
        ctx.scale(s, s);

        /* Body */
        ctx.fillStyle = '#c8d6f0';
        ctx.fillRect(-10, -6, 20, 12);

        /* Centre stripe */
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(-3, -6, 6, 12);

        /* Solar panels left */
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(-36, -4, 22, 8);
        /* Panel frame left */
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-36, -4, 22, 8);
        /* Panel grid left */
        for (let gi = 1; gi < 4; gi++) {
            ctx.beginPath();
            ctx.moveTo(-36 + gi * (22 / 4), -4);
            ctx.lineTo(-36 + gi * (22 / 4),  4);
            ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(-36, 0); ctx.lineTo(-14, 0); ctx.stroke();

        /* Solar panels right */
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(14, -4, 22, 8);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(14, -4, 22, 8);
        for (let gi = 1; gi < 4; gi++) {
            ctx.beginPath();
            ctx.moveTo(14 + gi * (22 / 4), -4);
            ctx.lineTo(14 + gi * (22 / 4),  4);
            ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(36, 0); ctx.stroke();

        /* Antenna dish */
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, -11, 5, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(0, -11);
        ctx.stroke();

        /* Signal beam */
        ctx.strokeStyle = 'rgba(96,165,250,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(-10, -30);
        ctx.moveTo(0, -16);
        ctx.lineTo(0,  -32);
        ctx.moveTo(0, -16);
        ctx.lineTo(10, -30);
        ctx.stroke();

        ctx.restore();
    }

    /* Draw an elliptical orbit path */
    function drawOrbit(cx, cy, a, b, tilt, alpha) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tilt);
        ctx.scale(1, b / a);
        ctx.beginPath();
        ctx.arc(0, 0, a, 0, Math.PI * 2);
        ctx.restore();
        ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([6, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    let t = 0;

    function draw() {
        t++;

        /* Deep space gradient background */
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0,   '#060d1f');
        grad.addColorStop(0.5, '#0a1628');
        grad.addColorStop(1,   '#060d1f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        /* Nebula glow blobs */
        const nebulaData = [
            { x: 0.15, y: 0.2,  r: 0.22, c1: 'rgba(37,99,235,0.06)',  c2: 'rgba(0,0,0,0)' },
            { x: 0.75, y: 0.65, r: 0.20, c1: 'rgba(79,70,229,0.05)',  c2: 'rgba(0,0,0,0)' },
            { x: 0.50, y: 0.85, r: 0.18, c1: 'rgba(14,165,233,0.05)', c2: 'rgba(0,0,0,0)' },
        ];
        nebulaData.forEach(n => {
            const rg = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * W);
            rg.addColorStop(0, n.c1);
            rg.addColorStop(1, n.c2);
            ctx.fillStyle = rg;
            ctx.fillRect(0, 0, W, H);
        });

        /* Stars */
        stars.forEach(s => {
            const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
            ctx.beginPath();
            ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.alpha * twinkle})`;
            ctx.fill();
        });

        /* Shooting stars */
        for (let i = shooters.length - 1; i >= 0; i--) {
            const sh = shooters[i];
            sh.x += Math.cos(sh.angle) * sh.speed;
            sh.y += Math.sin(sh.angle) * sh.speed;
            sh.life++;
            sh.alpha = Math.max(0, 1 - sh.life / 40);

            const tailX = sh.x - Math.cos(sh.angle) * sh.len;
            const tailY = sh.y - Math.sin(sh.angle) * sh.len;
            const sg = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
            sg.addColorStop(0, 'rgba(255,255,255,0)');
            sg.addColorStop(1, `rgba(255,255,255,${sh.alpha})`);
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(sh.x, sh.y);
            ctx.strokeStyle = sg;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            if (sh.alpha <= 0) shooters.splice(i, 1);
        }

        /* Orbit paths and satellites */
        satellites.forEach(sat => {
            sat.angle += sat.speed;

            const cx = sat.cx * W;
            const cy = sat.cy * H;
            const a  = sat.orbitA * Math.min(W, H);
            const b  = sat.orbitB * Math.min(W, H);

            drawOrbit(cx, cy, a, b, sat.tilt, 0.12);

            /* Position on tilted ellipse */
            const localX = a * Math.cos(sat.angle);
            const localY = b * Math.sin(sat.angle);
            const sx = cx + localX * Math.cos(sat.tilt) - localY * Math.sin(sat.tilt);
            const sy = cy + localX * Math.sin(sat.tilt) + localY * Math.cos(sat.tilt);

            /* Heading tangent */
            const nextAngle = sat.angle + 0.01;
            const nx2 = cx + a * Math.cos(nextAngle) * Math.cos(sat.tilt) - b * Math.sin(nextAngle) * Math.sin(sat.tilt);
            const ny2 = cy + a * Math.cos(nextAngle) * Math.sin(sat.tilt) + b * Math.sin(nextAngle) * Math.cos(sat.tilt);
            const heading = Math.atan2(ny2 - sy, nx2 - sx);

            /* Glow under satellite */
            const glowR = ctx.createRadialGradient(sx, sy, 0, sx, sy, 24);
            glowR.addColorStop(0, 'rgba(96,165,250,0.18)');
            glowR.addColorStop(1, 'rgba(96,165,250,0)');
            ctx.fillStyle = glowR;
            ctx.beginPath();
            ctx.arc(sx, sy, 24, 0, Math.PI * 2);
            ctx.fill();

            drawSatellite(sx, sy, heading, 0.85);
        });

        requestAnimationFrame(draw);
    }

    draw();
})();
