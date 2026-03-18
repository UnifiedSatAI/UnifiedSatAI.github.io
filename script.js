document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId.startsWith("#")) {
                event.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    const canvas = document.getElementById("space-background");

    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const stars = [];
    const satellites = [];
    let width = 0;
    let height = 0;
    let animationFrameId = 0;

    function createStars(count) {
        stars.length = 0;

        for (let index = 0; index < count; index += 1) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.6 + 0.4,
                alpha: Math.random() * 0.7 + 0.15,
                twinkle: Math.random() * 0.015 + 0.004
            });
        }
    }

    function createSatellites() {
        satellites.length = 0;

        satellites.push({
            centerX: width * 0.2,
            centerY: height * 0.22,
            radius: Math.min(width, height) * 0.14,
            angle: Math.PI * 0.2,
            speed: 0.0028,
            size: 1
        });

        satellites.push({
            centerX: width * 0.82,
            centerY: height * 0.3,
            radius: Math.min(width, height) * 0.18,
            angle: Math.PI * 1.2,
            speed: -0.002,
            size: 0.9
        });

        satellites.push({
            centerX: width * 0.68,
            centerY: height * 0.72,
            radius: Math.min(width, height) * 0.12,
            angle: Math.PI * 1.75,
            speed: 0.0032,
            size: 0.78
        });
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * DPR;
        canvas.height = height * DPR;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.setTransform(DPR, 0, 0, DPR, 0, 0);
        createStars(Math.max(120, Math.floor((width * height) / 14000)));
        createSatellites();
    }

    function drawGradient() {
        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#030a14");
        gradient.addColorStop(0.4, "#0d1d35");
        gradient.addColorStop(0.72, "#17365f");
        gradient.addColorStop(1, "#eef4ff");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
    }

    function drawStars() {
        stars.forEach(function (star) {
            star.alpha += (Math.random() - 0.5) * star.twinkle;
            star.alpha = Math.max(0.12, Math.min(0.88, star.alpha));
            context.beginPath();
            context.fillStyle = "rgba(255,255,255," + star.alpha + ")";
            context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            context.fill();
        });
    }

    function drawOrbit(centerX, centerY, radius) {
        context.beginPath();
        context.strokeStyle = "rgba(141, 190, 255, 0.12)";
        context.lineWidth = 1;
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.stroke();
    }

    function drawSignal(x, y, scale) {
        for (let ring = 1; ring <= 3; ring += 1) {
            context.beginPath();
            context.strokeStyle = "rgba(102, 180, 255," + (0.16 - ring * 0.03) + ")";
            context.lineWidth = 1;
            context.arc(x, y, ring * 18 * scale, -Math.PI / 3, Math.PI / 3);
            context.stroke();
        }
    }

    function drawSatellite(x, y, angle, scale) {
        context.save();
        context.translate(x, y);
        context.rotate(angle + Math.PI / 2);
        context.scale(scale, scale);

        context.fillStyle = "rgba(222, 234, 255, 0.95)";
        context.fillRect(-18, -5, 36, 10);

        context.fillStyle = "rgba(103, 169, 255, 0.9)";
        context.fillRect(-40, -11, 18, 22);
        context.fillRect(22, -11, 18, 22);

        context.strokeStyle = "rgba(162, 214, 255, 0.9)";
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(18, 0);
        context.lineTo(34, 0);
        context.stroke();

        drawSignal(38, 0, scale);
        context.restore();
    }

    function drawSatellites() {
        satellites.forEach(function (satellite) {
            satellite.angle += satellite.speed;
            drawOrbit(satellite.centerX, satellite.centerY, satellite.radius);

            const x = satellite.centerX + Math.cos(satellite.angle) * satellite.radius;
            const y = satellite.centerY + Math.sin(satellite.angle) * satellite.radius;
            drawSatellite(x, y, satellite.angle, satellite.size);
        });
    }

    function render() {
        context.clearRect(0, 0, width, height);
        drawGradient();
        drawStars();
        drawSatellites();
        animationFrameId = window.requestAnimationFrame(render);
    }

    resizeCanvas();
    render();

    window.addEventListener("resize", function () {
        window.cancelAnimationFrame(animationFrameId);
        resizeCanvas();
        render();
    });
});

