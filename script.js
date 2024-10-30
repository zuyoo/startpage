// ================================================ search bar
// Event listener for the form submission
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const query = document.getElementById("searchQuery").value;
    
    // Regular expression to check if the query looks like a URL
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?/;
    
    // Check if the query matches the URL pattern
    if (urlPattern.test(query)) {
        // If it's a URL, add "https://" if not present, then navigate to it directly
        const url = query.startsWith("http") ? query : `https://${query}`;
        window.location.href = url;
    } else {
        // Otherwise, perform a Google search
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

// === search bar shortcut
// Event listener for keyboard shortcut
document.addEventListener("keydown", function(event) {
    // Check if ',' is pressed and prevent the default behavior
    if (event.key === ",") {
        event.preventDefault();
        document.getElementById("searchQuery").focus(); // Focus on the search bar
    }
});

//================================================= tab bar page
// Function to show specific pages based on the selected tab
function showPage(tabContainer, pageIndex) {
    // Menyembunyikan semua halaman
    const pages = tabContainer.querySelectorAll('.page-1, .page-2, .page-3, .page-4, .page-5'); // Include all pages
    pages.forEach((page) => {
        page.style.display = 'none'; // Sembunyikan semua halaman
    });

    // Menampilkan halaman yang dipilih
    if (pages[pageIndex - 1]) {
        pages[pageIndex - 1].style.display = 'block'; // Tampilkan halaman yang dipilih
    }

    // Mengelola status aktif untuk tombol navigasi
    const navButtons = tabContainer.parentNode.querySelectorAll('.nav-button');
    navButtons.forEach((button, index) => {
        if (index === (pageIndex - 1)) {
            button.classList.add('active'); // Tambahkan kelas aktif untuk tombol yang sesuai
        } else {
            button.classList.remove('active'); // Hapus kelas aktif dari tombol lain
        }
    });
}

// Initialize and show the first page on load
document.querySelectorAll('.tab').forEach(tab => showPage(tab, 1));



// =================================== container drag
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
        // Calculate new position
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        // Ensure the container stays within viewport boundaries
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
    e.preventDefault(); // Prevents text/image selection
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
});
