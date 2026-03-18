// Dynamic subtle particle behavior for the background context
const background = document.querySelector('.satellite-grid');
const starCount = 40;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');
  const size = Math.random() * 3 + 0.8;
  star.style.position = 'absolute';
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.borderRadius = '50%';
  star.style.background = 'rgba(255, 255, 255, 0.65)';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.filter = `blur(${Math.random() * 1.2}px)`;
  star.style.opacity = Math.random() * 0.85;
  star.style.animation = `twinkle ${Math.random() * 8 + 6}s infinite ease-in-out`;
  background.appendChild(star);
}

const style = document.createElement('style');
style.textContent = `@keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.95; } }`;
document.head.appendChild(style);
