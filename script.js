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

// Image Lightbox Modal
const modal = document.getElementById('imageModal');
const closeBtn = document.querySelector('.close-btn');
const clickableImages = document.querySelectorAll('.clickable-image');
const modalImage = document.querySelector('.modal-image');

// Open modal when image is clicked
clickableImages.forEach(img => {
  img.addEventListener('click', function() {
    modal.classList.add('show');
    modalImage.src = this.src;
    modalImage.alt = this.alt;
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
});

// Tab Navigation and Image Loading for Results
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Model data configuration
const modelData = {
  ctgan: {
    name: 'CTGAN',
    folder: 'images_ctgan',
    images: [
      'roi38068_0000.png',
      'roi393625_0001.png',
      'roi782676_0002.png'
    ]
  },
  multitemporal: {
    name: 'Multi-Temporal L2',
    folder: 'MultiTemporalL2',
    images: [
      'roi14579_0074.png', 'roi159513_0083.png', 'roi16115_0062.png',
      'roi171977_0026.png', 'roi181417_0059.png', 'roi228063_0027.png',
      'roi23822_0084.png', 'roi25954_0054.png', 'roi263079_0077.png',
      'roi265823_0049.png', 'roi271513_0017.png', 'roi274931_0080.png'
    ]
  },
  nosar: {
    name: 'NoSAR',
    folder: 'noSAR_1',
    images: [
      'roi14579_0074.png', 'roi159513_0083.png', 'roi16115_0062.png',
      'roi171977_0026.png', 'roi181417_0059.png', 'roi228063_0027.png',
      'roi23822_0084.png', 'roi25954_0054.png', 'roi263079_0077.png',
      'roi265823_0049.png', 'roi271513_0017.png', 'roi274931_0080.png'
    ]
  },
  utae: {
    name: 'U-TAE',
    folder: 'utae',
    images: [
      'roi352167_0082.png', 'roi340154_0038.png', 'roi332366_0008.png',
      'roi33091_0075.png', 'roi321568_0005.png', 'roi317784_0078.png',
      'roi314544_0013.png', 'roi31226_0087.png', 'roi308917_0011.png',
      'roi306554_0092.png', 'roi304330_0056.png', 'roi303617_0071.png'
    ]
  }
};

// Function to load images into a grid
function loadImages(tabId, images, folder) {
  const grid = document.getElementById(`${tabId}-grid`);
  grid.innerHTML = '';

  images.forEach(imageName => {
    const card = document.createElement('div');
    card.className = 'image-card clickable-image';
    
    // Use relative path from images folder (one level up from website folder)
    const imagePath = `../images/${folder}/${imageName}`;
    
    card.innerHTML = `
      <img src="${imagePath}" alt="${imageName}" class="image-card-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23223344%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23aaa%22%3EImage not found%3C/text%3E%3C/svg%3E'">
      <div class="image-card-label">${imageName}</div>
    `;
    
    // Add click handler for modal
    card.addEventListener('click', function(e) {
      const img = this.querySelector('.image-card-img');
      modal.classList.add('show');
      modalImage.src = img.src;
      modalImage.alt = imageName;
      document.body.style.overflow = 'hidden';
    });
    
    grid.appendChild(card);
  });
}

// Tab switching functionality
tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const tabId = this.dataset.tab;

    // Remove active class from all buttons and contents
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    this.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    // Load images for the selected tab
    if (modelData[tabId]) {
      const model = modelData[tabId];
      loadImages(tabId, model.images, model.folder);
    }
  });
});

// Load images for the first tab on page load
window.addEventListener('load', function() {
  const firstModel = modelData['ctgan'];
  loadImages('ctgan', firstModel.images, firstModel.folder);
});

