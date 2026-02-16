// Sample Products Data (image = URL for realistic photos)
const productsData = [
    { id: 1, title: "Wireless Headphones", price: 79.99, originalPrice: 99.99, category: "electronics", rating: 4.5, reviews: 120, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", description: "High-quality wireless headphones with noise cancellation and long battery life." },
    { id: 2, title: "Smart Watch", price: 199.99, originalPrice: 249.99, category: "electronics", rating: 4.8, reviews: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", description: "Feature-rich smartwatch with fitness tracking and notifications." },
    { id: 3, title: "Cotton T-Shirt", price: 24.99, originalPrice: 34.99, category: "fashion", rating: 4.2, reviews: 256, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", description: "Comfortable cotton t-shirt available in multiple colors." },
    { id: 4, title: "Running Shoes", price: 89.99, originalPrice: 119.99, category: "sports", rating: 4.6, reviews: 178, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Lightweight running shoes with excellent cushioning." },
    { id: 5, title: "Coffee Maker", price: 129.99, originalPrice: 159.99, category: "home", rating: 4.4, reviews: 92, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400", description: "Programmable coffee maker with thermal carafe." },
    { id: 6, title: "Novel Book", price: 14.99, originalPrice: 19.99, category: "books", rating: 4.7, reviews: 345, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", description: "Bestselling novel by acclaimed author." },
    { id: 7, title: "Smartphone", price: 599.99, originalPrice: 699.99, category: "mobile", rating: 4.9, reviews: 567, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", description: "Latest smartphone with advanced camera and processor." },
    { id: 8, title: "Yoga Mat", price: 29.99, originalPrice: 39.99, category: "sports", rating: 4.3, reviews: 134, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", description: "Non-slip yoga mat with carrying strap." },
    { id: 9, title: "Designer Jeans", price: 79.99, originalPrice: 99.99, category: "fashion", rating: 4.5, reviews: 201, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", description: "Premium denim jeans with perfect fit." },
    { id: 10, title: "Laptop Stand", price: 39.99, originalPrice: 49.99, category: "electronics", rating: 4.1, reviews: 78, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", description: "Adjustable laptop stand for ergonomic workspace." },
    { id: 11, title: "Throw Pillow", price: 19.99, originalPrice: 24.99, category: "home", rating: 4.0, reviews: 156, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400", description: "Decorative throw pillow for your living room." },
    { id: 12, title: "Cookbook", price: 24.99, originalPrice: 29.99, category: "books", rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", description: "Comprehensive cookbook with 200+ recipes." }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize on page load
$(document).ready(function() {
    initializePage();
    updateCartCount();
    
    // Mobile menu toggle
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });
    // Close menu when clicking a nav link (responsive)
    $('.nav-menu a').on('click', function() {
        $('.hamburger').removeClass('active');
        $('.nav-menu').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollToTop').addClass('visible');
        } else {
            $('#scrollToTop').removeClass('visible');
        }
    });

    $('#scrollToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});

// Get current page name (works with file:// and http(s)://)
function getCurrentPage() {
    const path = window.location.pathname || '';
    const href = window.location.href || '';
    let page = path.split('/').filter(Boolean).pop();
    if (!page && href) {
        const match = href.match(/\/([^\/?#]+)(\?|#|$)/);
        page = (match && match[1]) || (href.indexOf('index.html') >= 0 ? 'index.html' : '');
    }
    return page || 'index.html';
}

// Initialize page based on current page
function initializePage() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'products.html':
            initProductsPage();
            break;
        case 'product-view.html':
            initProductViewPage();
            break;
        case 'category.html':
            initCategoryPage();
            break;
        case 'cart.html':
            initCartPage();
            break;
        case 'checkout.html':
            initCheckoutPage();
            break;
        case 'order-confirmation.html':
            initOrderConfirmationPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'search.html':
            initSearchPage();
            break;
    }
}

// Home Page Functions
function initHomePage() {
    initSlider();
    loadFeaturedProducts();
    loadLatestProducts();
}

function loadFeaturedProducts() {
    const featured = productsData.slice(0, 4);
    const container = '#featuredProducts';
    if ($(container).length) renderProducts(featured, container);
}

function loadLatestProducts() {
    const latest = productsData.slice(0, 8);
    const container = '#latestProducts';
    if ($(container).length) renderProducts(latest, container);
}

function initSlider() {
    let currentSlide = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        slides.eq(index).addClass('active');
        dots.eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    $('.next-btn').on('click', nextSlide);
    $('.prev-btn').on('click', prevSlide);

    dots.on('click', function() {
        currentSlide = $(this).data('slide');
        showSlide(currentSlide);
    });

    // Auto slide
    setInterval(nextSlide, 5000);
}


// Products Page Functions
function initProductsPage() {
    renderProducts(productsData, '#productsGrid');
    
    // Price range filter
    $('#priceMin, #priceMax').on('input', function() {
        $('#minPrice').text($('#priceMin').val());
        $('#maxPrice').text($('#priceMax').val());
    });

    // Apply filters
    $('#applyFilters').on('click', function() {
        applyFilters();
    });

    // Clear filters
    $('#clearFilters').on('click', function() {
        $('.category-filter').prop('checked', false);
        $('#priceMin').val(0);
        $('#priceMax').val(1000);
        $('#minPrice').text(0);
        $('#maxPrice').text(1000);
        renderProducts(productsData, '#productsGrid');
    });
}

function applyFilters() {
    const selectedCategories = [];
    $('.category-filter:checked').each(function() {
        selectedCategories.push($(this).val());
    });

    const minPrice = parseFloat($('#priceMin').val());
    const maxPrice = parseFloat($('#priceMax').val());

    let filteredProducts = productsData;

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }

    filteredProducts = filteredProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    renderProducts(filteredProducts, '#productsGrid');
}

// Product View Page Functions
function initProductViewPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = productsData.find(p => p.id === productId) || productsData[0];
    
    displayProductDetails(product);
    loadRelatedProducts(product.category, product.id);
    
    // Quantity controls
    $('#increaseQty').on('click', function() {
        const currentQty = parseInt($('#productQuantity').val());
        $('#productQuantity').val(currentQty + 1);
    });

    $('#decreaseQty').on('click', function() {
        const currentQty = parseInt($('#productQuantity').val());
        if (currentQty > 1) {
            $('#productQuantity').val(currentQty - 1);
        }
    });

    // Add to cart
    $('#addToCart').on('click', function() {
        const quantity = parseInt($('#productQuantity').val());
        addToCart(product.id, quantity);
        alert('Product added to cart!');
    });

    // Thumbnail click
    $(document).on('click', '.thumbnail', function() {
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
        const img = $(this).data('img');
        const emoji = $(this).data('emoji') || $(this).find('.thumb-inner').text();
        if (img) {
            $('#mainProductImage').attr('src', img).show();
            $('#mainProductImageEmoji').hide();
        } else {
            $('#mainProductImageEmoji').text(emoji).show();
            $('#mainProductImage').hide();
        }
    });
    // Load and render reviews
    loadProductReviews(product.id);
    initReviewForm(product.id);
}

function displayProductDetails(product) {
    $('#productTitle').text(product.title);
    $('#productPrice').text('$' + product.price.toFixed(2));
    if (product.originalPrice) {
        $('#originalPrice').text('$' + product.originalPrice.toFixed(2));
    }
    $('#productDescription p').text(product.description);
    
    // Rating
    const ratingHtml = generateStars(product.rating);
    $('#productRating').html(ratingHtml);
    $('#ratingText').text(`(${product.reviews} reviews)`);
    
    // Main image (photo or emoji fallback)
    if (product.image && product.image.startsWith('http')) {
        $('#mainProductImage').attr('src', product.image).attr('alt', product.title).show();
        $('#mainProductImageEmoji').hide();
        $('#thumbnailImages').html(`
            <div class="thumbnail active" data-img="${product.image}">
                <img src="${product.image}" alt="${product.title}">
            </div>
        `);
    } else {
        $('#mainProductImageEmoji').text(product.image || '📦').show();
        $('#mainProductImage').hide();
        $('#thumbnailImages').html(`
            <div class="thumbnail active" data-emoji="${product.image}">
                <div class="thumb-inner">${product.image || '📦'}</div>
            </div>
        `);
    }
}

function loadRelatedProducts(category, currentProductId) {
    const relatedProducts = productsData
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4);
    renderProducts(relatedProducts, '#relatedProducts');
}

// Product Reviews
const REVIEWS_STORAGE_KEY = 'avora_product_reviews';

function getProductReviews(productId) {
    try {
        const all = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || {};
        return all[productId] || [];
    } catch (e) {
        return [];
    }
}

function saveProductReview(productId, review) {
    const all = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || {};
    if (!all[productId]) all[productId] = [];
    all[productId].push({ ...review, id: Date.now(), date: new Date().toISOString().slice(0, 10) });
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(all));
}

function loadProductReviews(productId) {
    const reviews = getProductReviews(productId);
    const container = $('#reviewsList');
    if (!reviews.length) {
        container.html('<p class="no-reviews">No reviews yet. Be the first to review!</p>');
        return;
    }
    let html = '';
    reviews.forEach(r => {
        const stars = generateStars(r.rating);
        html += `
            <div class="review-card">
                <div class="review-header">
                    <strong class="review-author">${escapeHtml(r.userName)}</strong>
                    <div class="review-meta">
                        <span class="review-stars">${stars}</span>
                        <span class="review-date">${r.date || ''}</span>
                    </div>
                </div>
                <p class="review-comment">${escapeHtml(r.comment)}</p>
            </div>
        `;
    });
    container.html(html);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function initReviewForm(productId) {
    let selectedRating = 0;
    const $stars = $('#starRatingInput .star');
    $stars.off('click').on('click', function() {
        selectedRating = parseInt($(this).data('rating'), 10);
        $('#reviewRating').val(selectedRating);
        $stars.each(function(i) {
            const $icon = $(this).find('i');
            $icon.removeClass('fas fa-star').addClass('far fa-star');
            if (i < selectedRating) $icon.removeClass('far').addClass('fas fa-star');
        });
    });
    $('#reviewForm').off('submit').on('submit', function(e) {
        e.preventDefault();
        const rating = parseInt($('#reviewRating').val(), 10);
        const name = $('#reviewName').val().trim();
        const comment = $('#reviewComment').val().trim();
        if (!rating || rating < 1) {
            alert('Please select a star rating.');
            return;
        }
        if (!name || !comment) {
            alert('Please fill in your name and review.');
            return;
        }
        saveProductReview(productId, { userName: name, rating, comment });
        loadProductReviews(productId);
        $('#reviewForm')[0].reset();
        $('#reviewRating').val(0);
        $stars.find('i').removeClass('fas').addClass('far fa-star');
        selectedRating = 0;
    });
}

// Category Page Functions
function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('cat');
    
    if (categoryParam) {
        displayCategoryProducts(categoryParam);
    } else {
        displayAllCategories();
    }
}

function displayAllCategories() {
    const categories = [
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', description: 'Latest fashion trends and styles', cat: 'fashion' },
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', description: 'Latest gadgets and electronics', cat: 'electronics' },
        { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', description: 'Everything for your home', cat: 'home' },
        { name: 'Sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', description: 'Sports equipment and gear', cat: 'sports' },
        { name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', description: 'Books for all interests', cat: 'books' },
        { name: 'Mobile', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', description: 'Smartphones and accessories', cat: 'mobile' }
    ];

    let html = '';
    categories.forEach(category => {
        const imgHtml = category.image
            ? `<img src="${category.image}" alt="${category.name}">`
            : `<span>${category.icon || '📦'}</span>`;
        html += `
            <div class="category-item" onclick="window.location.href='category.html?cat=${category.cat}'">
                <div class="category-item-image">${imgHtml}</div>
                <div class="category-item-info">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                </div>
            </div>
        `;
    });
    
    $('#categoryList').removeClass('products-grid').addClass('category-list');
    $('#categoryList').html(html);
}

function displayCategoryProducts(category) {
    const categoryProducts = productsData.filter(p => p.category === category);
    const categoryNames = {
        'fashion': 'Fashion',
        'electronics': 'Electronics',
        'home': 'Home & Living',
        'sports': 'Sports',
        'books': 'Books',
        'mobile': 'Mobile'
    };
    
    $('#categoryTitle').text(categoryNames[category] || 'Category');
    $('#categoryList').addClass('products-grid').removeClass('category-list');
    renderProducts(categoryProducts, '#categoryList');
}

// Cart Page Functions
function initCartPage() {
    renderCart();
}

function renderCart() {
    if (cart.length === 0) {
        $('.empty-cart').show();
        $('#checkoutBtn').prop('disabled', true);
        return;
    }

    $('.empty-cart').hide();
    $('#checkoutBtn').prop('disabled', false);

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            const cartImg = product.image && product.image.startsWith('http')
                ? `<img src="${product.image}" alt="${product.title}">`
                : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem;">${product.image || '📦'}</div>`;
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${cartImg}
                    </div>
                    <div class="cart-item-info">
                        <h3>${product.title}</h3>
                        <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="qty-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.productId}, parseInt(this.value))">
                                <button class="qty-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                            </div>
                            <button class="remove-item" onclick="removeFromCart(${item.productId})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    $('#cartItems').html(html);
    
    const shipping = 10.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    $('#cartSubtotal').text('$' + subtotal.toFixed(2));
    $('#cartShipping').text('$' + shipping.toFixed(2));
    $('#cartTax').text('$' + tax.toFixed(2));
    $('#cartTotal').text('$' + total.toFixed(2));

    $('#checkoutBtn').on('click', function() {
        window.location.href = 'checkout.html';
    });
}

function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

// Checkout Page Functions
function initCheckoutPage() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'cart.html';
        return;
    }

    renderOrderSummary();
    
    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        if (validateCheckoutForm()) {
            // Save order details
            const orderData = {
                orderNumber: 'ORD-' + Date.now(),
                items: cart,
                total: calculateTotal(),
                shipping: getFormData()
            };
            localStorage.setItem('lastOrder', JSON.stringify(orderData));
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartCount();
            
            // Redirect to confirmation
            window.location.href = 'order-confirmation.html?order=' + orderData.orderNumber;
        }
    });
}

function renderOrderSummary() {
    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <div class="order-item">
                    <div>
                        <strong>${product.title}</strong>
                        <div>Qty: ${item.quantity}</div>
                    </div>
                    <div>$${itemTotal.toFixed(2)}</div>
                </div>
            `;
        }
    });

    $('#orderItems').html(html);
    
    const shipping = 10.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    $('#orderSubtotal').text('$' + subtotal.toFixed(2));
    $('#orderShipping').text('$' + shipping.toFixed(2));
    $('#orderTax').text('$' + tax.toFixed(2));
    $('#orderTotal').text('$' + total.toFixed(2));
}

function validateCheckoutForm() {
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country', 'paymentMethod'];
    
    requiredFields.forEach(field => {
        const value = $('#' + field).val().trim();
        if (!value) {
            isValid = false;
            $('#' + field).css('border-color', '#f5576c');
        } else {
            $('#' + field).css('border-color', '#e0e0e0');
        }
    });

    // Email validation
    const email = $('#email').val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        $('#email').css('border-color', '#f5576c');
    }

    return isValid;
}

function getFormData() {
    return {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        zipCode: $('#zipCode').val(),
        country: $('#country').val(),
        paymentMethod: $('#paymentMethod').val()
    };
}

function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });
    return subtotal + 10 + (subtotal * 0.1);
}

// Order Confirmation Page Functions
function initOrderConfirmationPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order') || 'ORD-2024-0001';
    
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    
    if (lastOrder) {
        $('#orderNumber').text(lastOrder.orderNumber);
        $('#orderAmount').text('$' + lastOrder.total.toFixed(2));
    } else {
        $('#orderNumber').text(orderNumber);
        $('#orderAmount').text('$0.00');
    }
}

// Contact Page Functions
function initContactPage() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        if (validateContactForm()) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            $('.error-message').text('');
        }
    });

    // Real-time validation
    $('#contactName, #contactEmail, #contactSubject, #contactMessage').on('blur', function() {
        validateField($(this));
    });

    $('#contactEmail').on('blur', function() {
        validateEmail($(this));
    });
}

function validateContactForm() {
    let isValid = true;
    
    isValid = validateField($('#contactName')) && isValid;
    isValid = validateEmail($('#contactEmail')) && isValid;
    isValid = validateField($('#contactSubject')) && isValid;
    isValid = validateField($('#contactMessage')) && isValid;

    // Phone validation (optional)
    const phone = $('#contactPhone').val();
    if (phone && !/^\d{10,}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        $('#phoneError').text('Please enter a valid phone number');
        isValid = false;
    } else {
        $('#phoneError').text('');
    }

    return isValid;
}

function validateField(field) {
    const value = field.val().trim();
    const fieldName = field.attr('id');
    const errorId = fieldName.replace('contact', '') + 'Error';
    
    if (!value) {
        $('#' + errorId).text('This field is required');
        field.css('border-color', '#f5576c');
        return false;
    } else {
        $('#' + errorId).text('');
        field.css('border-color', '#e0e0e0');
        return true;
    }
}

function validateEmail(field) {
    const email = field.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        $('#emailError').text('Email is required');
        field.css('border-color', '#f5576c');
        return false;
    } else if (!emailRegex.test(email)) {
        $('#emailError').text('Please enter a valid email address');
        field.css('border-color', '#f5576c');
        return false;
    } else {
        $('#emailError').text('');
        field.css('border-color', '#e0e0e0');
        return true;
    }
}

// Search Page Functions
function initSearchPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        $('#searchInput').val(query);
        performSearch(query);
    }

    $('#searchBtn').on('click', function() {
        const query = $('#searchInput').val().trim();
        if (query) {
            performSearch(query);
            window.history.pushState({}, '', `search.html?q=${encodeURIComponent(query)}`);
        }
    });

    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) {
            $('#searchBtn').click();
        }
    });
}

function performSearch(query) {
    const searchResults = productsData.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    $('#searchResultsInfo').text(`Found ${searchResults.length} product(s) for "${query}"`);
    
    if (searchResults.length > 0) {
        renderProducts(searchResults, '#searchResultsGrid');
    } else {
        $('#searchResultsGrid').html('<p>No products found. Try a different search term.</p>');
    }
}

// Utility Functions
function renderProducts(products, container) {
    if (products.length === 0) {
        $(container).html('<p>No products found.</p>');
        return;
    }

    let html = '';
    products.forEach(product => {
        const stars = generateStars(product.rating);
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const imgHtml = product.image && product.image.startsWith('http')
            ? `<img src="${product.image}" alt="${product.title}" loading="lazy">`
            : `<span class="product-emoji">${product.image || '📦'}</span>`;
        html += `
            <div class="product-card" onclick="window.location.href='product-view.html?id=${product.id}'">
                <div class="product-image">${imgHtml}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="btn-primary" onclick="event.stopPropagation(); addToCart(${product.id}, 1);">Add to Cart</button>
                </div>
            </div>
        `;
    });

    $(container).html(html);
}

function generateStars(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html;
}

function addToCart(productId, quantity = 1) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cart-count').text(totalItems);
}

// Make functions available globally
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
