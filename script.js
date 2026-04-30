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
const datasetTabBtns = document.querySelectorAll('.dataset-tab');
const datasetContainers = document.querySelectorAll('.dataset-container');
const tabContents = document.querySelectorAll('.tab-content');

// Model data configuration organized by dataset
const modelData = {
  allclear: {
    multitemporal: {
      name: 'MultiTemporal',
      folder: 'MultiTemporal',
      images: [
        "roi14579_0074.png", "roi159513_0083.png", "roi16115_0062.png", "roi171977_0026.png", "roi181417_0059.png",
        "roi228063_0027.png", "roi23822_0084.png", "roi25954_0054.png", "roi263079_0077.png", "roi265823_0049.png",
        "roi271513_0017.png", "roi274931_0080.png", "roi287390_0073.png", "roi29166_0035.png", "roi293079_0099.png",
        "roi29938_0055.png", "roi303575_0036.png", "roi303617_0071.png", "roi304330_0056.png", "roi306554_0092.png",
        "roi308917_0011.png", "roi31226_0087.png", "roi314544_0013.png", "roi317784_0078.png", "roi321568_0005.png",
        "roi33091_0075.png", "roi332366_0008.png", "roi340154_0038.png", "roi352167_0082.png", "roi361622_0068.png",
        "roi375035_0069.png", "roi376558_0053.png", "roi38068_0000.png", "roi393625_0001.png", "roi411613_0003.png",
        "roi415633_0096.png", "roi420094_0006.png", "roi421095_0098.png", "roi421641_0085.png", "roi424046_0057.png",
        "roi431107_0024.png", "roi43484_0044.png", "roi434901_0004.png", "roi43998_0052.png", "roi445244_0019.png",
        "roi448180_0016.png", "roi448747_0050.png", "roi457074_0076.png", "roi45801_0097.png", "roi470554_0046.png",
        "roi479025_0022.png", "roi48473_0079.png", "roi497417_0031.png", "roi49821_0051.png", "roi50489_0041.png",
        "roi506669_0030.png", "roi520997_0040.png", "roi521002_0012.png", "roi576631_0070.png", "roi587322_0063.png",
        "roi594151_0095.png", "roi597758_0037.png", "roi598586_0029.png", "roi60050_0060.png", "roi606257_0089.png",
        "roi615757_0020.png", "roi616495_0086.png", "roi621640_0009.png", "roi622589_0034.png", "roi625794_0023.png",
        "roi63176_0025.png", "roi637523_0091.png", "roi6519_0066.png", "roi65380_0018.png", "roi673805_0021.png",
        "roi748188_0064.png", "roi750972_0058.png", "roi754608_0094.png", "roi76058_0061.png", "roi765556_0067.png",
        "roi769577_0045.png", "roi771949_0039.png", "roi782676_0002.png", "roi799736_0072.png", "roi800420_0088.png",
        "roi81500_0032.png", "roi816645_0007.png", "roi825188_0043.png", "roi825868_0081.png", "roi83340_0047.png",
        "roi835585_0028.png", "roi848883_0065.png", "roi863673_0093.png", "roi885236_0090.png", "roi934339_0010.png",
        "roi93800_0014.png", "roi977658_0015.png", "roi979641_0042.png", "roi991685_0033.png", "roi997131_0048.png"
      ]
    },
    nosar: {
      name: 'noSAR',
      folder: 'noSAR',
      images: [
        "roi14579_0074.png", "roi159513_0083.png", "roi16115_0062.png", "roi171977_0026.png", "roi181417_0059.png",
        "roi228063_0027.png", "roi23822_0084.png", "roi25954_0054.png", "roi263079_0077.png", "roi265823_0049.png",
        "roi271513_0017.png", "roi274931_0080.png", "roi287390_0073.png", "roi29166_0035.png", "roi293079_0099.png",
        "roi29938_0055.png", "roi303575_0036.png", "roi303617_0071.png", "roi304330_0056.png", "roi306554_0092.png",
        "roi308917_0011.png", "roi31226_0087.png", "roi314544_0013.png", "roi317784_0078.png", "roi321568_0005.png",
        "roi33091_0075.png", "roi332366_0008.png", "roi340154_0038.png", "roi352167_0082.png", "roi361622_0068.png",
        "roi375035_0069.png", "roi376558_0053.png", "roi38068_0000.png", "roi393625_0001.png", "roi411613_0003.png",
        "roi415633_0096.png", "roi420094_0006.png", "roi421095_0098.png", "roi421641_0085.png", "roi424046_0057.png",
        "roi431107_0024.png", "roi43484_0044.png", "roi434901_0004.png", "roi43998_0052.png", "roi445244_0019.png",
        "roi448180_0016.png", "roi448747_0050.png", "roi457074_0076.png", "roi45801_0097.png", "roi470554_0046.png",
        "roi479025_0022.png", "roi48473_0079.png", "roi497417_0031.png", "roi49821_0051.png", "roi50489_0041.png",
        "roi506669_0030.png", "roi520997_0040.png", "roi521002_0012.png", "roi576631_0070.png", "roi587322_0063.png",
        "roi594151_0095.png", "roi597758_0037.png", "roi598586_0029.png", "roi60050_0060.png", "roi606257_0089.png",
        "roi615757_0020.png", "roi616495_0086.png", "roi621640_0009.png", "roi622589_0034.png", "roi625794_0023.png",
        "roi63176_0025.png", "roi637523_0091.png", "roi6519_0066.png", "roi65380_0018.png", "roi673805_0021.png",
        "roi748188_0064.png", "roi750972_0058.png", "roi754608_0094.png", "roi76058_0061.png", "roi765556_0067.png",
        "roi769577_0045.png", "roi771949_0039.png", "roi782676_0002.png", "roi799736_0072.png", "roi800420_0088.png",
        "roi81500_0032.png", "roi816645_0007.png", "roi825188_0043.png", "roi825868_0081.png", "roi83340_0047.png",
        "roi835585_0028.png", "roi848883_0065.png", "roi863673_0093.png", "roi885236_0090.png", "roi934339_0010.png",
        "roi93800_0014.png", "roi977658_0015.png", "roi979641_0042.png", "roi991685_0033.png", "roi997131_0048.png"
      ]
    },
    utae: {
      name: 'UTAE',
      folder: 'UTAE',
      images: [
        "roi14579_0074.png", "roi159513_0083.png", "roi16115_0062.png", "roi171977_0026.png", "roi181417_0059.png",
        "roi228063_0027.png", "roi23822_0084.png", "roi25954_0054.png", "roi263079_0077.png", "roi265823_0049.png",
        "roi271513_0017.png", "roi274931_0080.png", "roi287390_0073.png", "roi29166_0035.png", "roi293079_0099.png",
        "roi29938_0055.png", "roi303575_0036.png", "roi303617_0071.png", "roi304330_0056.png", "roi306554_0092.png",
        "roi308917_0011.png", "roi31226_0087.png", "roi314544_0013.png", "roi317784_0078.png", "roi321568_0005.png",
        "roi33091_0075.png", "roi332366_0008.png", "roi340154_0038.png", "roi352167_0082.png", "roi361622_0068.png",
        "roi375035_0069.png", "roi376558_0053.png", "roi38068_0000.png", "roi393625_0001.png", "roi411613_0003.png",
        "roi415633_0096.png", "roi420094_0006.png", "roi421095_0098.png", "roi421641_0085.png", "roi424046_0057.png",
        "roi431107_0024.png", "roi43484_0044.png", "roi434901_0004.png", "roi43998_0052.png", "roi445244_0019.png",
        "roi448180_0016.png", "roi448747_0050.png", "roi457074_0076.png", "roi45801_0097.png", "roi470554_0046.png",
        "roi479025_0022.png", "roi48473_0079.png", "roi497417_0031.png", "roi49821_0051.png", "roi50489_0041.png",
        "roi506669_0030.png", "roi520997_0040.png", "roi521002_0012.png", "roi576631_0070.png", "roi587322_0063.png",
        "roi594151_0095.png", "roi597758_0037.png", "roi598586_0029.png", "roi60050_0060.png", "roi606257_0089.png",
        "roi615757_0020.png", "roi616495_0086.png", "roi621640_0009.png", "roi622589_0034.png", "roi625794_0023.png",
        "roi63176_0025.png", "roi637523_0091.png", "roi6519_0066.png", "roi65380_0018.png", "roi673805_0021.png",
        "roi748188_0064.png", "roi750972_0058.png", "roi754608_0094.png", "roi76058_0061.png", "roi765556_0067.png",
        "roi769577_0045.png", "roi771949_0039.png", "roi782676_0002.png", "roi799736_0072.png", "roi800420_0088.png",
        "roi81500_0032.png", "roi816645_0007.png", "roi825188_0043.png", "roi825868_0081.png", "roi83340_0047.png",
        "roi835585_0028.png", "roi848883_0065.png", "roi863673_0093.png", "roi885236_0090.png", "roi934339_0010.png",
        "roi93800_0014.png", "roi977658_0015.png", "roi979641_0042.png", "roi991685_0033.png", "roi997131_0048.png"
      ]
    }
  },
  probav: {
    rams: {
      name: 'RAMS',
      folder: 'RAMS',
      images: [
        "imgset0000.png", "imgset0001.png", "imgset0002.png", "imgset0003.png", "imgset0004.png",
        "imgset0005.png", "imgset0006.png", "imgset0007.png", "imgset0008.png", "imgset0009.png",
        "imgset0010.png", "imgset0011.png", "imgset0012.png", "imgset0013.png", "imgset0014.png",
        "imgset0015.png", "imgset0016.png", "imgset0017.png", "imgset0018.png", "imgset0019.png",
        "imgset0020.png", "imgset0021.png", "imgset0022.png", "imgset0023.png", "imgset0024.png",
        "imgset0025.png", "imgset0026.png", "imgset0027.png", "imgset0028.png", "imgset0029.png",
        "imgset0030.png", "imgset0031.png", "imgset0032.png", "imgset0033.png", "imgset0034.png",
        "imgset0035.png", "imgset0036.png", "imgset0037.png", "imgset0038.png", "imgset0039.png",
        "imgset0040.png", "imgset0041.png", "imgset0042.png", "imgset0043.png", "imgset0044.png",
        "imgset0045.png", "imgset0046.png", "imgset0047.png", "imgset0048.png", "imgset0049.png",
        "imgset0050.png", "imgset0051.png", "imgset0052.png", "imgset0053.png", "imgset0054.png",
        "imgset0055.png", "imgset0056.png", "imgset0057.png", "imgset0058.png", "imgset0059.png",
        "imgset0060.png", "imgset0061.png", "imgset0062.png", "imgset0063.png", "imgset0064.png",
        "imgset0065.png", "imgset0066.png", "imgset0067.png", "imgset0068.png", "imgset0069.png",
        "imgset0070.png", "imgset0071.png", "imgset0072.png", "imgset0073.png", "imgset0074.png",
        "imgset0075.png", "imgset0076.png", "imgset0077.png", "imgset0078.png", "imgset0079.png",
        "imgset0080.png", "imgset0081.png", "imgset0082.png", "imgset0083.png", "imgset0084.png",
        "imgset0085.png", "imgset0086.png", "imgset0087.png", "imgset0088.png", "imgset0089.png",
        "imgset0090.png", "imgset0091.png", "imgset0092.png", "imgset0093.png", "imgset0094.png",
        "imgset0095.png", "imgset0096.png", "imgset0097.png", "imgset0098.png", "imgset0099.png",
        "imgset0100.png", "imgset0101.png", "imgset0102.png", "imgset0103.png", "imgset0104.png",
        "imgset0105.png", "imgset0106.png", "imgset0107.png", "imgset0108.png", "imgset0109.png",
        "imgset0110.png", "imgset0111.png", "imgset0112.png", "imgset0113.png", "imgset0114.png",
        "imgset0115.png", "imgset0116.png", "imgset0117.png", "imgset0118.png", "imgset0119.png",
        "imgset0120.png", "imgset0121.png", "imgset0122.png", "imgset0123.png", "imgset0124.png",
        "imgset0125.png", "imgset0126.png", "imgset0127.png", "imgset0128.png", "imgset0129.png",
        "imgset0130.png", "imgset0131.png", "imgset0132.png", "imgset0133.png", "imgset0134.png",
        "imgset0135.png", "imgset0136.png", "imgset0137.png", "imgset0138.png", "imgset0139.png",
        "imgset0140.png", "imgset0141.png", "imgset0142.png", "imgset0143.png"
      ]
    }
  }
};

// Track loaded images per model
const loadedCount = {};

// Initialize loadedCount for all models
Object.keys(modelData).forEach(dataset => {
  Object.keys(modelData[dataset]).forEach(model => {
    loadedCount[`${dataset}-${model}`] = 0;
  });
});

const IMAGES_PER_LOAD = 9;

// Function to load images into a grid with pagination
function loadImages(fullTabId, images, folder, startIndex = 0) {
  const grid = document.getElementById(`${fullTabId}-grid`);
  
  // Only clear on first load
  if (startIndex === 0) {
    grid.innerHTML = '';
  }

  const endIndex = Math.min(startIndex + IMAGES_PER_LOAD, images.length);
  
  for (let i = startIndex; i < endIndex; i++) {
    const imageName = images[i];
    const card = document.createElement('div');
    card.className = 'image-card clickable-image';
    
    // Use relative path from website root
    const imagePath = `images/${folder}/${imageName}`;
    
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
  }

  loadedCount[fullTabId] = endIndex;
  updateButtons(fullTabId, images);
}

// Function to update button visibility
function updateButtons(fullTabId, images) {
  const tabContent = document.getElementById(fullTabId);
  const currentCount = loadedCount[fullTabId];
  
  // Get or create button container inside tab content
  let buttonContainer = tabContent.querySelector('.button-container');
  if (!buttonContainer) {
    buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    tabContent.appendChild(buttonContainer);
  }
  
  let loadMoreBtn = buttonContainer.querySelector(`#${fullTabId}-load-more`);
  let showLessBtn = buttonContainer.querySelector(`#${fullTabId}-show-less`);
  
  // Handle Load More button
  if (currentCount < images.length) {
    if (!loadMoreBtn) {
      loadMoreBtn = document.createElement('button');
      loadMoreBtn.id = `${fullTabId}-load-more`;
      loadMoreBtn.className = 'load-more-btn';
      loadMoreBtn.addEventListener('click', function() {
        const [dataset, model] = fullTabId.split('-');
        const modelInfo = modelData[dataset][model];
        loadImages(fullTabId, modelInfo.images, modelInfo.folder, loadedCount[fullTabId]);
      });
      buttonContainer.appendChild(loadMoreBtn);
    }
    loadMoreBtn.textContent = `Load More (${currentCount}/${images.length})`;
  } else {
    if (loadMoreBtn) loadMoreBtn.remove();
  }
  
  // Handle Show Less button
  if (currentCount > IMAGES_PER_LOAD) {
    if (!showLessBtn) {
      showLessBtn = document.createElement('button');
      showLessBtn.id = `${fullTabId}-show-less`;
      showLessBtn.className = 'show-less-btn';
      showLessBtn.addEventListener('click', function() {
        const newCount = Math.max(IMAGES_PER_LOAD, loadedCount[fullTabId] - IMAGES_PER_LOAD);
        // Re-render with fewer images
        const grid = document.getElementById(`${fullTabId}-grid`);
        grid.innerHTML = '';
        const [dataset, model] = fullTabId.split('-');
        const modelInfo = modelData[dataset][model];
        const images = modelInfo.images;
        for (let i = 0; i < newCount; i++) {
          const imageName = images[i];
          const card = document.createElement('div');
          card.className = 'image-card clickable-image';
          const imagePath = `images/${modelInfo.folder}/${imageName}`;
          
          card.innerHTML = `
            <img src="${imagePath}" alt="${imageName}" class="image-card-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23223344%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23aaa%22%3EImage not found%3C/text%3E%3C/svg%3E'">
            <div class="image-card-label">${imageName}</div>
          `;
          
          card.addEventListener('click', function(e) {
            const img = this.querySelector('.image-card-img');
            modal.classList.add('show');
            modalImage.src = img.src;
            modalImage.alt = imageName;
            document.body.style.overflow = 'hidden';
          });
          
          grid.appendChild(card);
        }
        loadedCount[fullTabId] = newCount;
        updateButtons(fullTabId, images);
        // Scroll to grid
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      buttonContainer.appendChild(showLessBtn);
    }
    showLessBtn.textContent = `Show Less (${currentCount}/${images.length})`;
  } else {
    if (showLessBtn) showLessBtn.remove();
  }
}

// Dataset tab switching
datasetTabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const dataset = this.dataset.dataset;

    // Remove active class from all dataset buttons and containers
    datasetTabBtns.forEach(b => b.classList.remove('active'));
    datasetContainers.forEach(container => container.classList.remove('active'));

    // Add active class to clicked button and corresponding container
    this.classList.add('active');
    document.getElementById(dataset).classList.add('active');
  });
});

// Model tab switching within each dataset
tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const fullTabId = this.dataset.tab;
    const datasetContainer = this.closest('.results-container').parentElement;
    const tabsInContainer = datasetContainer.querySelectorAll('.tab-btn');
    const contentsInContainer = datasetContainer.querySelectorAll('.tab-content');

    // Remove active class from all buttons and contents in this dataset
    tabsInContainer.forEach(b => b.classList.remove('active'));
    contentsInContainer.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    this.classList.add('active');
    document.getElementById(fullTabId).classList.add('active');

    // Load images if not already loaded
    if (loadedCount[fullTabId] === 0) {
      const [dataset, model] = fullTabId.split('-');
      const modelInfo = modelData[dataset][model];
      loadImages(fullTabId, modelInfo.images, modelInfo.folder);
    }
  });
});

// Load images for the first model of first dataset on page load
window.addEventListener('load', function() {
  const firstDataset = 'allclear';
  const firstModel = 'multitemporal';
  const fullTabId = `${firstDataset}-${firstModel}`;
  const modelInfo = modelData[firstDataset][firstModel];
  loadImages(fullTabId, modelInfo.images, modelInfo.folder);

  // Also initialize PROBA-V RAMS so images are ready when user switches to it
  const probaDataset = 'probav';
  const probaModel = 'rams';
  const probaTabId = `${probaDataset}-${probaModel}`;
  const probaModelInfo = modelData[probaDataset][probaModel];
  loadImages(probaTabId, probaModelInfo.images, probaModelInfo.folder);
});

