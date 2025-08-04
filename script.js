// ===================================
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value;
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?/;
    if (urlPattern.test(query)) {
        const url = query.startsWith("http") ? query : `https://${query}`;
        window.location.href = url;
    } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

// ===================================
document.addEventListener("keydown", function(event) {
    if (event.key === ",") {
        event.preventDefault();
        document.getElementById("searchQuery").focus();
    }
});

// ===================================
function showPage(tabContainer, pageIndex) {
    const pages = tabContainer.querySelectorAll('.page-1, .page-2, .page-3, .page-4, .page-5');
    pages.forEach((page) => {
        page.style.display = 'none';
    });

    if (pages[pageIndex - 1]) {
        pages[pageIndex - 1].style.display = 'block';
    }

    const navButtons = tabContainer.parentNode.querySelectorAll('.nav-button');
    navButtons.forEach((button, index) => {
        if (index === (pageIndex - 1)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ===================================
document.querySelectorAll('.tab').forEach(tab => showPage(tab, 1));

// ===================================
const container = document.querySelector('.container');
const imageContainer = document.querySelector('.image-container');

let isDragging = false;
let offsetX, offsetY;

imageContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        const maxLeft = window.innerWidth - container.offsetWidth;
        const maxTop = window.innerHeight - container.offsetHeight;
        container.style.left = `${Math.max(0, Math.min(newX, maxLeft))}px`;
        container.style.top = `${Math.max(0, Math.min(newY, maxTop))}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});


imageContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
});
