/* ==========================================================================
   BEK MEN'S STORE — Vanilla JavaScript E-Commerce Logic
   Andijon shahri erkaklar kiyim-kechak internet-do‘koni
   ========================================================================== */

"use strict";

// Fallback rasm (agar tashqi rasm yuklanmasa avtomatik ishlatiladi)
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80";

// Kategoriyalar ro'yxati
const CATEGORIES = [
  "Barchasi",
  "Erkaklar futbolkalari",
  "Ko‘ylaklar",
  "Shimlar",
  "Jinsilar",
  "Kurtkalar",
  "Klassik kostyumlar",
  "Sport kiyimlari",
  "Oyoq kiyimlari",
  "Aksessuarlar"
];

// Rang palitrasi (tanlash uchun)
const COLOR_PALETTE = [
  { name: "Qora", hex: "#18181b" },
  { name: "Oltin jigarrang", hex: "#9c6a3e" },
  { name: "To‘q ko‘k", hex: "#1e3a5f" },
  { name: "Kulrang", hex: "#6b7280" },
  { name: "Oq / Krem", hex: "#e7e5e4" }
];

// 24 ta erkaklar kiyimi va aksessuar mahsuloti (har biri o'ziga mos alohida rasm URL bilan)
const PRODUCTS = [
  {
    id: "bek-01",
    name: "Premium Paxta Klassik Futbolka — Qora",
    category: "Erkaklar futbolkalari",
    price: 165000,
    oldPrice: 210000,
    rating: 4.9,
    reviews: 48,
    isNew: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description: "100% tabiiy uzun tolali paxtadan tikilgan, shaklini saqlovchi va kundalik kiyishga juda qulay erkaklar futbolkasi.",
    colors: ["Qora", "Oq / Krem", "Kulrang"]
  },
  {
    id: "bek-02",
    name: "Minimalist Oversize Futbolka — Krem",
    category: "Erkaklar futbolkalari",
    price: 175000,
    oldPrice: null,
    rating: 4.7,
    reviews: 31,
    isNew: true,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    description: "Zamonaviy erkin bichimdagi, havo o‘tkazuvchan va yumshoq matoli futbolka. Jinsi va chino shimlar bilan ajoyib moslashadi.",
    colors: ["Oq / Krem", "Qora", "Oltin jigarrang"]
  },
  {
    id: "bek-03",
    name: "Polo Yoqali Trikotaj Futbolka",
    category: "Erkaklar futbolkalari",
    price: 235000,
    oldPrice: 280000,
    rating: 4.8,
    reviews: 27,
    isNew: false,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=80",
    description: "Smart-casual uslubidagi nafis polo futbolka. Ofis, sayr va kechki uchrashuvlar uchun universal tanlov.",
    colors: ["To‘q ko‘k", "Qora", "Kulrang"]
  },
  {
    id: "bek-04",
    name: "Oq Klassik Biznes Ko‘ylak (Slim Fit)",
    category: "Ko‘ylaklar",
    price: 295000,
    oldPrice: 350000,
    rating: 4.9,
    reviews: 64,
    isNew: false,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    description: "G‘ijimlanishga chidamli yuqori sifatli matodan tikilgan klassik erkaklar ko‘ylagi. Kostyum va rasmiy shimlar bilan uyg‘un.",
    colors: ["Oq / Krem", "To‘q ko‘k", "Kulrang"]
  },
  {
    id: "bek-05",
    name: "Zig‘ir Aralash Kundalik Ko‘ylak",
    category: "Ko‘ylaklar",
    price: 310000,
    oldPrice: null,
    rating: 4.8,
    reviews: 22,
    isNew: true,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    description: "Yengil va nafas oluvchi matoga ega kundalik ko‘ylak. Yenglari qayirilgan holda ham zamonaviy ko‘rinadi.",
    colors: ["Oq / Krem", "Oltin jigarrang", "To‘q ko‘k"]
  },
  {
    id: "bek-06",
    name: "Katakli Flanel Erkaklar Ko‘ylagi",
    category: "Ko‘ylaklar",
    price: 285000,
    oldPrice: 340000,
    rating: 4.7,
    reviews: 39,
    isNew: false,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
    description: "Bahor va kuz mavsumlari uchun yoqimli flanel matoli ko‘ylak. Futbolka ustidan yengil ustki qatlam sifatida ham kiyiladi.",
    colors: ["Oltin jigarrang", "Qora", "Kulrang"]
  },
  {
    id: "bek-07",
    name: "Klassik Chino Shim — Qumrang / Jigarrang",
    category: "Shimlar",
    price: 320000,
    oldPrice: 380000,
    rating: 4.8,
    reviews: 41,
    isNew: false,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    description: "Yengil elastan qo‘shilgan paxta chino shim. Harakat erkinligini ta’minlaydi va qomatga chiroyli o‘tiradi.",
    colors: ["Oltin jigarrang", "Qora", "To‘q ko‘k"]
  },
  {
    id: "bek-08",
    name: "Rasmiy Klassik Shim — To‘q Kulrang",
    category: "Shimlar",
    price: 345000,
    oldPrice: null,
    rating: 4.9,
    reviews: 29,
    isNew: true,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    description: "Puxta dazmol chiziqli, ishbilarmon uslubdagi klassik shim. Kostyum va klassik poyabzal bilan mukammal juftlik.",
    colors: ["Kulrang", "Qora", "To‘q ko‘k"]
  },
  {
    id: "bek-09",
    name: "Zamonaviy Slim Fit Jinsi Shim — Ko‘k",
    category: "Jinsilar",
    price: 360000,
    oldPrice: 430000,
    rating: 4.8,
    reviews: 57,
    isNew: false,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    description: "Mustahkam denim matodan tayyorlangan zamonaviy jinsi shim. Kundalik faol kiyishga bardoshli choklar bilan.",
    colors: ["To‘q ko‘k", "Qora", "Kulrang"]
  },
  {
    id: "bek-10",
    name: "Qora Klassik Denim Jinsi Shim",
    category: "Jinsilar",
    price: 375000,
    oldPrice: null,
    rating: 4.9,
    reviews: 44,
    isNew: true,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    description: "Chuqur qora rangdagi denim shim. Ham kundalik, ham biroz rasmiy ko‘rinish yaratish uchun qulay.",
    colors: ["Qora", "Kulrang"]
  },
  {
    id: "bek-11",
    name: "Biker Uslubidagi Charim Kurtka — Qora",
    category: "Kurtkalar",
    price: 790000,
    oldPrice: 950000,
    rating: 4.9,
    reviews: 36,
    isNew: false,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    description: "Ifodali va zamonaviy kurtka. Metall furnitura va puxta astar bilan salqin ob-havoda uslubingizni boyitadi.",
    colors: ["Qora", "Oltin jigarrang"]
  },
  {
    id: "bek-12",
    name: "Mavsumiy Bomber / Shamoldan Himoya Kurtka",
    category: "Kurtkalar",
    price: 540000,
    oldPrice: 620000,
    rating: 4.7,
    reviews: 28,
    isNew: true,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
    description: "Yengil va ixcham mavsumiy kurtka. Bahor va kuzning shamolli kunlarida yuqori qulaylik beradi.",
    colors: ["To‘q ko‘k", "Qora", "Oltin jigarrang"]
  },
  {
    id: "bek-13",
    name: "Klassik Palto / Uzaytirilgan Ustki Kiyim",
    category: "Kurtkalar",
    price: 890000,
    oldPrice: null,
    rating: 4.9,
    reviews: 19,
    isNew: true,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
    description: "Nafis siluetli erkaklar ustki kiyimi. Kostyum ustidan ham, sviter ustidan ham juda chiroyli ko‘rinadi.",
    colors: ["Oltin jigarrang", "Qora", "Kulrang"]
  },
  {
    id: "bek-14",
    name: "Ikki Qismli Klassik Kostyum — To‘q Ko‘k",
    category: "Klassik kostyumlar",
    price: 1250000,
    oldPrice: 1490000,
    rating: 5.0,
    reviews: 33,
    isNew: false,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
    description: "Muhim uchrashuvlar, tantanalar va ishbilarmon muhit uchun tikilgan klassik ikki qismli kostyum (pidjak + shim).",
    colors: ["To‘q ko‘k", "Qora", "Kulrang"]
  },
  {
    id: "bek-15",
    name: "Zamonaviy Biznes Kostyum — Kulrang",
    category: "Klassik kostyumlar",
    price: 1180000,
    oldPrice: null,
    rating: 4.8,
    reviews: 21,
    isNew: true,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    description: "Yelkalar va bel qismi aniq uyg‘unlashtirilgan zamonaviy kostyum. Oq ko‘ylak va klassik tufli bilan mukammal.",
    colors: ["Kulrang", "To‘q ko‘k", "Qora"]
  },
  {
    id: "bek-16",
    name: "Kundalik Sport Hoodie / Sviter",
    category: "Sport kiyimlari",
    price: 275000,
    oldPrice: 325000,
    rating: 4.8,
    reviews: 46,
    isNew: false,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    description: "Yumshoq ichki qatlamli kapyushonli sport sviter. Mashg‘ulotdan keyin va kundalik sayrlarda qulay.",
    colors: ["Qora", "Kulrang", "Oltin jigarrang"]
  },
  {
    id: "bek-17",
    name: "Sport Komplekti — Faol Harakat Uchun",
    category: "Sport kiyimlari",
    price: 390000,
    oldPrice: 460000,
    rating: 4.7,
    reviews: 25,
    isNew: true,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
    description: "Erkin harakatlanish uchun moslashuvchan matodan ishlab chiqilgan sport kiyimi. Yengil va tez quriydigan.",
    colors: ["Qora", "To‘q ko‘k", "Kulrang"]
  },
  {
    id: "bek-18",
    name: "Klassik Charm Tufli — Jigarrang / Konyak",
    category: "Oyoq kiyimlari",
    price: 580000,
    oldPrice: 690000,
    rating: 4.9,
    reviews: 38,
    isNew: false,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    description: "Kostyum va klassik shimlar bilan kiyishga mo‘ljallangan nafis erkaklar tuflisi. Qulay taglikka ega.",
    colors: ["Oltin jigarrang", "Qora"]
  },
  {
    id: "bek-19",
    name: "Zamonaviy Kundalik Krossovka — Oq/Kulrang",
    category: "Oyoq kiyimlari",
    price: 465000,
    oldPrice: null,
    rating: 4.8,
    reviews: 52,
    isNew: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Kun bo‘yi yurish uchun yumshoq amortizatsiyali zamonaviy krossovka. Jinsi va sport kiyimlariga mos.",
    colors: ["Oq / Krem", "Qora", "Kulrang"]
  },
  {
    id: "bek-20",
    name: "Kundalik Sport Poyabzal — Qora",
    category: "Oyoq kiyimlari",
    price: 440000,
    oldPrice: 510000,
    rating: 4.7,
    reviews: 30,
    isNew: false,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
    description: "Yengil va mustahkam kundalik poyabzal. Shahar ko‘chalarida qulay va barqaror qadam bosish uchun.",
    colors: ["Qora", "Kulrang"]
  },
  {
    id: "bek-21",
    name: "Klassik Charm Kamar — Jigarrang",
    category: "Aksessuarlar",
    price: 145000,
    oldPrice: 180000,
    rating: 4.8,
    reviews: 43,
    isNew: false,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
    description: "Metall to‘qali klassik kamar. Shim va kostyumlarga yakuniy bezak beradi.",
    colors: ["Oltin jigarrang", "Qora"]
  },
  {
    id: "bek-22",
    name: "Klassik Erkaklar Qo‘l Soati",
    category: "Aksessuarlar",
    price: 490000,
    oldPrice: 575000,
    rating: 4.9,
    reviews: 26,
    isNew: true,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    description: "Sodda va nafis siferblatga ega erkaklar soati. Ishbilarmon va kundalik uslubni boyitadi.",
    colors: ["Qora", "Oltin jigarrang"]
  },
  {
    id: "bek-23",
    name: "Quyoshdan Himoya Ko‘zoynagi",
    category: "Aksessuarlar",
    price: 185000,
    oldPrice: null,
    rating: 4.6,
    reviews: 18,
    isNew: true,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    description: "Yengil ramkali va quyosh nurlaridan himoyalovchi zamonaviy aksessuar.",
    colors: ["Qora", "Oltin jigarrang"]
  },
  {
    id: "bek-24",
    name: "Kundalik Erkaklar Sumkasi / Ryukzak",
    category: "Aksessuarlar",
    price: 350000,
    oldPrice: 410000,
    rating: 4.8,
    reviews: 34,
    isNew: false,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description: "Noutbuk, hujjat va kundalik buyumlar uchun qulay bo‘linmalarga ega ixcham sumka.",
    colors: ["Qora", "Kulrang", "Oltin jigarrang"]
  }
];

// LocalStorage kalitlari
const STORAGE_KEYS = {
  CART: "bek_mens_store_cart_v1",
  WISHLIST: "bek_mens_store_wishlist_v1",
  THEME: "bek_mens_store_theme_v1"
};

// Holat (State)
const state = {
  category: "Barchasi",
  filterMode: "all", // all | new | sale | favorites
  sortBy: "default", // default | price-asc | price-desc | newest | discount
  searchQuery: "",
  cart: [],
  wishlist: [],
  activeModalProductId: null,
  selectedSize: "L",
  selectedColor: "Qora",
  modalQty: 1
};

// DOM elementlar
const dom = {};

function cacheDomElements() {
  dom.preloader = document.getElementById("preloader");
  dom.mainHeader = document.getElementById("mainHeader");
  dom.hamburgerBtn = document.getElementById("hamburgerBtn");
  dom.mobileDrawer = document.getElementById("mobileDrawer");
  dom.mobileDrawerBackdrop = document.getElementById("mobileDrawerBackdrop");
  dom.closeMobileDrawer = document.getElementById("closeMobileDrawer");

  dom.searchToggleBtn = document.getElementById("searchToggleBtn");
  dom.searchBarPanel = document.getElementById("searchBarPanel");
  dom.searchInput = document.getElementById("searchInput");
  dom.clearSearchBtn = document.getElementById("clearSearchBtn");
  dom.closeSearchBtn = document.getElementById("closeSearchBtn");

  dom.themeToggleBtn = document.getElementById("themeToggleBtn");
  dom.themeIcon = document.getElementById("themeIcon");

  dom.wishlistOpenBtn = document.getElementById("wishlistOpenBtn");
  dom.wishlistCount = document.getElementById("wishlistCount");
  dom.wishlistDrawer = document.getElementById("wishlistDrawer");
  dom.wishlistDrawerBackdrop = document.getElementById("wishlistDrawerBackdrop");
  dom.closeWishlistDrawer = document.getElementById("closeWishlistDrawer");
  dom.wishlistDrawerCount = document.getElementById("wishlistDrawerCount");
  dom.wishlistItemsContainer = document.getElementById("wishlistItemsContainer");

  dom.cartOpenBtn = document.getElementById("cartOpenBtn");
  dom.cartCount = document.getElementById("cartCount");
  dom.cartDrawer = document.getElementById("cartDrawer");
  dom.cartDrawerBackdrop = document.getElementById("cartDrawerBackdrop");
  dom.closeCartDrawer = document.getElementById("closeCartDrawer");
  dom.cartDrawerCount = document.getElementById("cartDrawerCount");
  dom.cartItemsContainer = document.getElementById("cartItemsContainer");
  dom.cartSummaryQty = document.getElementById("cartSummaryQty");
  dom.cartTotalPrice = document.getElementById("cartTotalPrice");
  dom.openCheckoutBtn = document.getElementById("openCheckoutBtn");
  dom.clearCartBtn = document.getElementById("clearCartBtn");

  dom.heroShopBtn = document.getElementById("heroShopBtn");
  dom.heroNewBtn = document.getElementById("heroNewBtn");
  dom.categoryTabs = document.getElementById("categoryTabs");
  dom.sortSelect = document.getElementById("sortSelect");
  dom.productsGrid = document.getElementById("productsGrid");
  dom.productsCountLabel = document.getElementById("productsCountLabel");
  dom.emptyCatalogState = document.getElementById("emptyCatalogState");
  dom.resetFiltersBtn = document.getElementById("resetFiltersBtn");

  // Product modal
  dom.productModal = document.getElementById("productModal");
  dom.closeProductModal = document.getElementById("closeProductModal");
  dom.modalBadges = document.getElementById("modalBadges");
  dom.modalImg = document.getElementById("modalImg");
  dom.modalCategory = document.getElementById("modalCategory");
  dom.modalTitle = document.getElementById("modalTitle");
  dom.modalRating = document.getElementById("modalRating");
  dom.modalPrice = document.getElementById("modalPrice");
  dom.modalOldPrice = document.getElementById("modalOldPrice");
  dom.modalDiscountBadge = document.getElementById("modalDiscountBadge");
  dom.modalDescription = document.getElementById("modalDescription");
  dom.selectedSizeText = document.getElementById("selectedSizeText");
  dom.sizeOptions = document.getElementById("sizeOptions");
  dom.selectedColorText = document.getElementById("selectedColorText");
  dom.colorOptions = document.getElementById("colorOptions");
  dom.modalQtyMinus = document.getElementById("modalQtyMinus");
  dom.modalQtyPlus = document.getElementById("modalQtyPlus");
  dom.modalQtyValue = document.getElementById("modalQtyValue");
  dom.modalAddToCartBtn = document.getElementById("modalAddToCartBtn");
  dom.modalWishlistBtn = document.getElementById("modalWishlistBtn");

  // Checkout modal
  dom.checkoutModal = document.getElementById("checkoutModal");
  dom.closeCheckoutModal = document.getElementById("closeCheckoutModal");
  dom.checkoutForm = document.getElementById("checkoutForm");
  dom.checkoutItemsCount = document.getElementById("checkoutItemsCount");
  dom.checkoutTotalAmount = document.getElementById("checkoutTotalAmount");
  dom.orderConfirmationBox = document.getElementById("orderConfirmationBox");
  dom.orderReceiptDetails = document.getElementById("orderReceiptDetails");
  dom.doneOrderBtn = document.getElementById("doneOrderBtn");

  dom.scrollTopBtn = document.getElementById("scrollTopBtn");
  dom.toastContainer = document.getElementById("toastContainer");
  dom.currentYear = document.getElementById("currentYear");
}

/* ==========================================================================
   Yordamchi funksiyalar
   ========================================================================== */
function formatPrice(amount) {
  return `${Number(amount).toLocaleString("ru-RU").replace(/,/g, " ")} so‘m`;
}

function getDiscountPercentage(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

function renderStarsHtml(rating) {
  const fullStars = Math.round(rating);
  let html = '<span class="stars-row" aria-label="Reyting">';
  for (let i = 1; i <= 5; i++) {
    const fill = i <= fullStars ? "currentColor" : "none";
    html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }
  html += "</span>";
  return html;
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function showToast(message, type = "info") {
  if (!dom.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast-item";
  const iconName = type === "success" ? "check-circle" : type === "error" ? "alert-circle" : "info";
  toast.innerHTML = `<i data-lucide="${iconName}" style="width:18px;height:18px;color:#cf9c4c;flex-shrink:0;"></i><span>${message}</span>`;
  dom.toastContainer.appendChild(toast);
  refreshIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 260);
  }, 2800);
}

/* ==========================================================================
   LocalStorage (Savatcha, Sevimlilar, Theme)
   ========================================================================== */
function loadSavedState() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || "[]");
    if (Array.isArray(savedCart)) {
      state.cart = savedCart;
    }
  } catch (_) {
    state.cart = [];
  }

  try {
    const savedWishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || "[]");
    if (Array.isArray(savedWishlist)) {
      state.wishlist = savedWishlist;
    }
  } catch (_) {
    state.wishlist = [];
  }

  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme, false);
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
  } catch (_) {
    // Storage limit or disabled
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist));
  } catch (_) {
    // Storage limit or disabled
  }
}

function applyTheme(theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if (dom.themeIcon) {
    dom.themeIcon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    refreshIcons();
  }
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (_) {}
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next, true);
  showToast(next === "dark" ? "Tungi rejim yoqildi" : "Kunduzgi rejim yoqildi");
}

/* ==========================================================================
   Kategoriya Tablari va Filtrlash / Saralash / Qidiruv
   ========================================================================== */
function renderCategoryTabs() {
  if (!dom.categoryTabs) return;
  dom.categoryTabs.innerHTML = CATEGORIES.map((cat) => {
    const activeClass = state.category === cat ? "active" : "";
    return `<button type="button" class="cat-tab-btn ${activeClass}" data-category="${cat}" role="tab">${cat}</button>`;
  }).join("");
}

function syncQuickFilterChips() {
  document.querySelectorAll(".chip-btn").forEach((btn) => {
    const mode = btn.getAttribute("data-filter-mode");
    btn.classList.toggle("active", state.filterMode === mode);
  });
}

function getFilteredAndSortedProducts() {
  let list = PRODUCTS.slice();

  // 1. Kategoriya filtri
  if (state.category && state.category !== "Barchasi") {
    list = list.filter((p) => p.category === state.category);
  }

  // 2. Tezkor rejim filtri
  if (state.filterMode === "new") {
    list = list.filter((p) => Boolean(p.isNew));
  } else if (state.filterMode === "sale") {
    list = list.filter((p) => getDiscountPercentage(p) > 0);
  } else if (state.filterMode === "favorites") {
    list = list.filter((p) => state.wishlist.includes(p.id));
  }

  // 3. Qidiruv so'zi bo'yicha filtrlash
  const query = state.searchQuery.trim().toLowerCase();
  if (query) {
    list = list.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // 4. Saralash
  if (state.sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "newest") {
    list.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
  } else if (state.sortBy === "discount") {
    list.sort((a, b) => getDiscountPercentage(b) - getDiscountPercentage(a));
  }

  return list;
}

function renderProductsGrid() {
  if (!dom.productsGrid) return;
  const items = getFilteredAndSortedProducts();

  if (dom.productsCountLabel) {
    dom.productsCountLabel.textContent = `${items.length} ta mahsulot ko‘rsatilmoqda`;
  }

  if (items.length === 0) {
    dom.productsGrid.innerHTML = "";
    if (dom.emptyCatalogState) dom.emptyCatalogState.hidden = false;
    return;
  }

  if (dom.emptyCatalogState) dom.emptyCatalogState.hidden = true;

  dom.productsGrid.innerHTML = items.map((product) => {
    const discountPct = getDiscountPercentage(product);
    const isLiked = state.wishlist.includes(product.id);

    const badgesHtml = `
      <div class="card-badges">
        ${product.isNew ? `<span class="badge-tag badge-new">Yangi</span>` : ""}
        ${discountPct > 0 ? `<span class="badge-tag badge-sale">-${discountPct}%</span>` : ""}
      </div>
    `;

    const oldPriceHtml = product.oldPrice
      ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>`
      : "";

    const discountTagHtml = discountPct > 0
      ? `<span class="price-discount-pct">-${discountPct}%</span>`
      : "";

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media" data-open-modal="${product.id}">
          ${badgesHtml}
          <button
            type="button"
            class="wishlist-heart-btn ${isLiked ? "active" : ""}"
            data-toggle-wishlist="${product.id}"
            aria-label="${product.name} — sevimlilarga qo‘shish"
            title="Sevimlilarga qo‘shish"
          >
            <i data-lucide="heart"></i>
          </button>
          <img
            src="${product.image}"
            alt="${product.name}"
            class="product-img"
            loading="lazy"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';"
          />
        </div>

        <div class="product-body">
          <span class="product-cat-label">${product.category}</span>
          <h3 class="product-title" data-open-modal="${product.id}">${product.name}</h3>

          <div class="product-rating">
            ${renderStarsHtml(product.rating)}
            <span>${product.rating.toFixed(1)} (${product.reviews})</span>
          </div>

          <div class="product-price-box">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${oldPriceHtml}
            ${discountTagHtml}
          </div>

          <div class="card-actions">
            <button type="button" class="card-add-btn" data-quick-add="${product.id}">
              <i data-lucide="shopping-bag" style="width:15px;height:15px;"></i>
              <span>Savatga qo‘shish</span>
            </button>
            <button type="button" class="card-detail-btn" data-open-modal="${product.id}">
              Batafsil
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  refreshIcons();
}

function resetAllFilters() {
  state.category = "Barchasi";
  state.filterMode = "all";
  state.sortBy = "default";
  state.searchQuery = "";
  if (dom.searchInput) dom.searchInput.value = "";
  if (dom.clearSearchBtn) dom.clearSearchBtn.hidden = true;
  if (dom.sortSelect) dom.sortSelect.value = "default";
  renderCategoryTabs();
  syncQuickFilterChips();
  renderProductsGrid();
}

/* ==========================================================================
   Sevimlilar (Wishlist) Tizimi
   ========================================================================== */
function toggleWishlist(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(`"${product.name}" sevimlilardan olib tashlandi`);
  } else {
    state.wishlist.push(productId);
    showToast(`"${product.name}" sevimlilarga qo‘shildi`, "success");
  }

  saveWishlist();
  updateWishlistUI();
  renderProductsGrid();
  syncModalWishlistButton();
}

function updateWishlistUI() {
  const count = state.wishlist.length;
  if (dom.wishlistCount) dom.wishlistCount.textContent = String(count);
  if (dom.wishlistDrawerCount) dom.wishlistDrawerCount.textContent = `${count} ta`;

  if (!dom.wishlistItemsContainer) return;

  if (count === 0) {
    dom.wishlistItemsContainer.innerHTML = `
      <div class="drawer-empty">
        <i data-lucide="heart"></i>
        <p>Sevimli mahsulotlar ro‘yxati hozircha bo‘sh.</p>
        <a href="#katalog" class="btn btn-dark" onclick="closeWishlistDrawer()">Katalogga o‘tish</a>
      </div>
    `;
    refreshIcons();
    return;
  }

  const likedProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));
  dom.wishlistItemsContainer.innerHTML = likedProducts.map((product) => `
    <div class="cart-item">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="cart-item-img"
        onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';"
      />
      <div class="cart-item-info">
        <div class="cart-item-top">
          <h4 class="cart-item-title">${product.name}</h4>
          <button
            type="button"
            class="cart-remove-btn"
            data-toggle-wishlist="${product.id}"
            aria-label="Sevimlilardan o‘chirish"
          >
            <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
          </button>
        </div>
        <span class="cart-item-meta">${product.category} • ${formatPrice(product.price)}</span>
        <div class="cart-item-bottom">
          <button type="button" class="card-add-btn" style="padding:7px 12px;font-size:0.78rem;" data-quick-add="${product.id}">
            Savatga qo‘shish
          </button>
          <button type="button" class="card-detail-btn" style="padding:7px 10px;font-size:0.78rem;" data-open-modal="${product.id}">
            Batafsil
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons();
}

/* ==========================================================================
   Savatcha (Cart) Tizimi
   ========================================================================== */
function addToCart(productId, size = "L", color = "Qora", qty = 1) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const safeQty = Math.max(1, Number(qty) || 1);
  const existingIndex = state.cart.findIndex(
    (item) => item.id === productId && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].qty += safeQty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      qty: safeQty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`"${product.name}" (${size}, ${color}) savatga qo‘shildi`, "success");
}

function updateCartItemQty(index, delta) {
  if (!state.cart[index]) return;
  const nextQty = state.cart[index].qty + delta;
  if (nextQty <= 0) {
    state.cart.splice(index, 1);
  } else {
    state.cart[index].qty = nextQty;
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;
  const removedName = state.cart[index].name;
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast(`"${removedName}" savatdan o‘chirildi`);
}

function clearCart() {
  state.cart = [];
  saveCart();
  updateCartUI();
  showToast("Savatcha tozalandi");
}

function getCartTotals() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { totalQty, totalPrice };
}

function updateCartUI() {
  const { totalQty, totalPrice } = getCartTotals();

  if (dom.cartCount) dom.cartCount.textContent = String(totalQty);
  if (dom.cartDrawerCount) dom.cartDrawerCount.textContent = `${totalQty} dona`;
  if (dom.cartSummaryQty) dom.cartSummaryQty.textContent = `${totalQty} ta`;
  if (dom.cartTotalPrice) dom.cartTotalPrice.textContent = formatPrice(totalPrice);
  if (dom.openCheckoutBtn) dom.openCheckoutBtn.disabled = state.cart.length === 0;
  if (dom.clearCartBtn) dom.clearCartBtn.hidden = state.cart.length === 0;

  if (!dom.cartItemsContainer) return;

  if (state.cart.length === 0) {
    dom.cartItemsContainer.innerHTML = `
      <div class="drawer-empty">
        <i data-lucide="shopping-bag"></i>
        <p>Savatchangiz hozircha bo‘sh.</p>
        <a href="#katalog" class="btn btn-gold" onclick="closeCartDrawer()">Xaridni boshlash</a>
      </div>
    `;
    refreshIcons();
    return;
  }

  dom.cartItemsContainer.innerHTML = state.cart.map((item, idx) => {
    const subtotal = item.price * item.qty;
    return `
      <div class="cart-item">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart-item-img"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';"
        />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${item.name}</h4>
            <button
              type="button"
              class="cart-remove-btn"
              data-remove-cart="${idx}"
              aria-label="Mahsulotni o‘chirish"
            >
              <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
            </button>
          </div>
          <span class="cart-item-meta">O‘lcham: <strong>${item.size}</strong> • Rang: <strong>${item.color}</strong></span>
          <div class="cart-item-bottom">
            <div class="qty-box">
              <button type="button" class="qty-btn" data-cart-dec="${idx}" aria-label="Kamaytirish">
                <i data-lucide="minus" style="width:14px;height:14px;"></i>
              </button>
              <span class="qty-value">${item.qty}</span>
              <button type="button" class="qty-btn" data-cart-inc="${idx}" aria-label="Oshirish">
                <i data-lucide="plus" style="width:14px;height:14px;"></i>
              </button>
            </div>
            <span class="cart-item-subtotal">${formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  refreshIcons();
}

/* ==========================================================================
   Mahsulot Batafsil Modal Oynasi
   ========================================================================== */
function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product || !dom.productModal) return;

  state.activeModalProductId = product.id;
  state.selectedSize = "L";
  state.selectedColor = (product.colors && product.colors[0]) || "Qora";
  state.modalQty = 1;

  const discountPct = getDiscountPercentage(product);

  if (dom.modalImg) {
    dom.modalImg.src = product.image;
    dom.modalImg.alt = product.name;
    dom.modalImg.onerror = function () {
      this.onerror = null;
      this.src = FALLBACK_IMAGE;
    };
  }

  if (dom.modalBadges) {
    dom.modalBadges.innerHTML = `
      ${product.isNew ? `<span class="badge-tag badge-new">Yangi</span>` : ""}
      ${discountPct > 0 ? `<span class="badge-tag badge-sale">-${discountPct}%</span>` : ""}
    `;
  }

  if (dom.modalCategory) dom.modalCategory.textContent = product.category;
  if (dom.modalTitle) dom.modalTitle.textContent = product.name;
  if (dom.modalRating) {
    dom.modalRating.innerHTML = `${renderStarsHtml(product.rating)} <span>${product.rating.toFixed(1)} (${product.reviews} sharh)</span>`;
  }
  if (dom.modalPrice) dom.modalPrice.textContent = formatPrice(product.price);

  if (dom.modalOldPrice) {
    if (product.oldPrice) {
      dom.modalOldPrice.textContent = formatPrice(product.oldPrice);
      dom.modalOldPrice.hidden = false;
    } else {
      dom.modalOldPrice.hidden = true;
    }
  }

  if (dom.modalDiscountBadge) {
    if (discountPct > 0) {
      dom.modalDiscountBadge.textContent = `Chegirma -${discountPct}%`;
      dom.modalDiscountBadge.hidden = false;
    } else {
      dom.modalDiscountBadge.hidden = true;
    }
  }

  if (dom.modalDescription) dom.modalDescription.textContent = product.description;

  // O'lcham tugmalarini yangilash
  document.querySelectorAll("#sizeOptions .size-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-size") === state.selectedSize);
  });
  if (dom.selectedSizeText) dom.selectedSizeText.textContent = state.selectedSize;

  // Rang tugmalarini chizish
  renderColorOptions(product.colors || ["Qora", "Oltin jigarrang"]);

  // Miqdor
  if (dom.modalQtyValue) dom.modalQtyValue.textContent = String(state.modalQty);

  syncModalWishlistButton();

  dom.productModal.hidden = false;
  document.body.style.overflow = "hidden";
  refreshIcons();
}

function renderColorOptions(colors) {
  if (!dom.colorOptions) return;
  dom.colorOptions.innerHTML = colors.map((colorName) => {
    const found = COLOR_PALETTE.find((c) => c.name === colorName) || { name: colorName, hex: "#222222" };
    const isActive = state.selectedColor === found.name;
    return `
      <button
        type="button"
        class="color-swatch-btn ${isActive ? "active" : ""}"
        data-color="${found.name}"
        style="background-color:${found.hex};"
        title="${found.name}"
        aria-label="Rang: ${found.name}"
      ></button>
    `;
  }).join("");

  if (dom.selectedColorText) {
    dom.selectedColorText.textContent = state.selectedColor;
  }
}

function syncModalWishlistButton() {
  if (!dom.modalWishlistBtn || !state.activeModalProductId) return;
  const liked = state.wishlist.includes(state.activeModalProductId);
  dom.modalWishlistBtn.classList.toggle("active", liked);
}

function closeProductModal() {
  if (!dom.productModal) return;
  dom.productModal.hidden = true;
  state.activeModalProductId = null;
  if (!isAnyDrawerOrCheckoutOpen()) {
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   Buyurtma Berish Tizimi (Demo Rejim)
   ========================================================================== */
function openCheckoutModal() {
  if (state.cart.length === 0 || !dom.checkoutModal) return;
  closeCartDrawer();

  const { totalQty, totalPrice } = getCartTotals();
  if (dom.checkoutItemsCount) dom.checkoutItemsCount.textContent = `${totalQty} ta`;
  if (dom.checkoutTotalAmount) dom.checkoutTotalAmount.textContent = formatPrice(totalPrice);

  if (dom.checkoutForm) {
    dom.checkoutForm.hidden = false;
    clearFormErrors();
  }
  if (dom.orderConfirmationBox) {
    dom.orderConfirmationBox.hidden = true;
  }

  dom.checkoutModal.hidden = false;
  document.body.style.overflow = "hidden";
  refreshIcons();
}

function closeCheckoutModal() {
  if (!dom.checkoutModal) return;
  dom.checkoutModal.hidden = true;
  if (!isAnyDrawerOrCheckoutOpen()) {
    document.body.style.overflow = "";
  }
}

function clearFormErrors() {
  if (!dom.checkoutForm) return;
  dom.checkoutForm.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("invalid");
    const err = group.querySelector(".error-msg");
    if (err) err.textContent = "";
  });
}

function setFieldError(inputEl, message) {
  const group = inputEl.closest(".form-group");
  if (!group) return;
  group.classList.add("invalid");
  const err = group.querySelector(".error-msg");
  if (err) err.textContent = message;
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  if (!dom.checkoutForm) return;

  clearFormErrors();

  const nameInput = document.getElementById("customerName");
  const phoneInput = document.getElementById("customerPhone");
  const regionSelect = document.getElementById("customerRegion");
  const cityInput = document.getElementById("customerCity");
  const addressInput = document.getElementById("customerAddress");
  const noteInput = document.getElementById("customerNote");

  let isValid = true;

  if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
    setFieldError(nameInput, "Ism va familiyani to‘liq kiriting.");
    isValid = false;
  }

  const phoneDigits = phoneInput.value.replace(/\D/g, "");
  if (!phoneInput.value.trim() || phoneDigits.length < 9) {
    setFieldError(phoneInput, "To‘g‘ri telefon raqamini kiriting.");
    isValid = false;
  }

  if (!regionSelect.value.trim()) {
    setFieldError(regionSelect, "Viloyatni tanlang.");
    isValid = false;
  }

  if (!cityInput.value.trim() || cityInput.value.trim().length < 2) {
    setFieldError(cityInput, "Shahar yoki tumanni kiriting.");
    isValid = false;
  }

  if (!addressInput.value.trim() || addressInput.value.trim().length < 4) {
    setFieldError(addressInput, "Yetkazib berish manzilini kiriting.");
    isValid = false;
  }

  if (!isValid) {
    showToast("Iltimos, majburiy maydonlarni to‘g‘ri to‘ldiring.", "error");
    return;
  }

  const { totalQty, totalPrice } = getCartTotals();
  const demoOrderCode = `DEMO-${Math.floor(100000 + Math.random() * 900000)}`;

  if (dom.orderReceiptDetails) {
    dom.orderReceiptDetails.innerHTML = `
      <div><strong>Demo buyurtma raqami:</strong> ${demoOrderCode}</div>
      <div><strong>Xaridor:</strong> ${escapeHtml(nameInput.value.trim())}</div>
      <div><strong>Telefon:</strong> ${escapeHtml(phoneInput.value.trim())}</div>
      <div><strong>Manzil:</strong> ${escapeHtml(regionSelect.value)}, ${escapeHtml(cityInput.value.trim())}, ${escapeHtml(addressInput.value.trim())}</div>
      ${noteInput.value.trim() ? `<div><strong>Izoh:</strong> ${escapeHtml(noteInput.value.trim())}</div>` : ""}
      <div><strong>Mahsulotlar soni:</strong> ${totalQty} ta</div>
      <div><strong>Jami summa (demo):</strong> ${formatPrice(totalPrice)}</div>
    `;
  }

  // Savatchani tozalash
  state.cart = [];
  saveCart();
  updateCartUI();

  dom.checkoutForm.hidden = true;
  dom.checkoutForm.reset();
  if (dom.orderConfirmationBox) {
    dom.orderConfirmationBox.hidden = false;
  }
  refreshIcons();
  showToast("Demo buyurtma qabul qilindi (serverga yuborilmagan)", "success");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ==========================================================================
   Drawerlar va Navigatsiya
   ========================================================================== */
function isAnyDrawerOrCheckoutOpen() {
  const cartOpen = dom.cartDrawer && dom.cartDrawer.classList.contains("open");
  const wishOpen = dom.wishlistDrawer && dom.wishlistDrawer.classList.contains("open");
  const mobOpen = dom.mobileDrawer && dom.mobileDrawer.classList.contains("open");
  const prodModalOpen = dom.productModal && !dom.productModal.hidden;
  const checkModalOpen = dom.checkoutModal && !dom.checkoutModal.hidden;
  return Boolean(cartOpen || wishOpen || mobOpen || prodModalOpen || checkModalOpen);
}

function openCartDrawer() {
  closeWishlistDrawer();
  closeMobileDrawer();
  if (dom.cartDrawer) dom.cartDrawer.classList.add("open");
  if (dom.cartDrawerBackdrop) dom.cartDrawerBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  if (dom.cartDrawer) dom.cartDrawer.classList.remove("open");
  if (dom.cartDrawerBackdrop) dom.cartDrawerBackdrop.classList.remove("open");
  if (!isAnyDrawerOrCheckoutOpen()) document.body.style.overflow = "";
}

function openWishlistDrawer() {
  closeCartDrawer();
  closeMobileDrawer();
  if (dom.wishlistDrawer) dom.wishlistDrawer.classList.add("open");
  if (dom.wishlistDrawerBackdrop) dom.wishlistDrawerBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWishlistDrawer() {
  if (dom.wishlistDrawer) dom.wishlistDrawer.classList.remove("open");
  if (dom.wishlistDrawerBackdrop) dom.wishlistDrawerBackdrop.classList.remove("open");
  if (!isAnyDrawerOrCheckoutOpen()) document.body.style.overflow = "";
}

function openMobileDrawer() {
  closeCartDrawer();
  closeWishlistDrawer();
  if (dom.mobileDrawer) dom.mobileDrawer.classList.add("open");
  if (dom.mobileDrawerBackdrop) dom.mobileDrawerBackdrop.classList.add("open");
  if (dom.hamburgerBtn) dom.hamburgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobileDrawer() {
  if (dom.mobileDrawer) dom.mobileDrawer.classList.remove("open");
  if (dom.mobileDrawerBackdrop) dom.mobileDrawerBackdrop.classList.remove("open");
  if (dom.hamburgerBtn) dom.hamburgerBtn.setAttribute("aria-expanded", "false");
  if (!isAnyDrawerOrCheckoutOpen()) document.body.style.overflow = "";
}

function toggleSearchPanel(forceOpen = null) {
  if (!dom.searchBarPanel) return;
  const shouldOpen = forceOpen !== null ? forceOpen : !dom.searchBarPanel.classList.contains("open");
  dom.searchBarPanel.classList.toggle("open", shouldOpen);
  if (shouldOpen && dom.searchInput) {
    setTimeout(() => dom.searchInput.focus(), 120);
  }
}

function handleNavAction(navKey) {
  if (navKey === "new") {
    state.category = "Barchasi";
    state.filterMode = "new";
    renderCategoryTabs();
    syncQuickFilterChips();
    renderProductsGrid();
  } else if (navKey === "sale") {
    state.category = "Barchasi";
    state.filterMode = "sale";
    renderCategoryTabs();
    syncQuickFilterChips();
    renderProductsGrid();
  } else if (navKey === "catalog") {
    state.filterMode = "all";
    syncQuickFilterChips();
    renderProductsGrid();
  }
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */
function bindEvents() {
  // Kategoriya tablari
  if (dom.categoryTabs) {
    dom.categoryTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-tab-btn");
      if (!btn) return;
      state.category = btn.getAttribute("data-category") || "Barchasi";
      renderCategoryTabs();
      renderProductsGrid();
    });
  }

  // Tezkor filtr chiplari
  document.querySelectorAll(".chip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-filter-mode") || "all";
      state.filterMode = mode;
      syncQuickFilterChips();
      renderProductsGrid();
    });
  });

  // Saralash
  if (dom.sortSelect) {
    dom.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProductsGrid();
    });
  }

  // Filtrni tozalash
  if (dom.resetFiltersBtn) {
    dom.resetFiltersBtn.addEventListener("click", resetAllFilters);
  }

  // Hero tugmalari
  if (dom.heroNewBtn) {
    dom.heroNewBtn.addEventListener("click", () => {
      handleNavAction("new");
    });
  }

  // Mahsulotlar grididagi delegatsiya
  if (dom.productsGrid) {
    dom.productsGrid.addEventListener("click", (e) => {
      const wishBtn = e.target.closest("[data-toggle-wishlist]");
      if (wishBtn) {
        e.stopPropagation();
        toggleWishlist(wishBtn.getAttribute("data-toggle-wishlist"));
        return;
      }

      const quickAddBtn = e.target.closest("[data-quick-add]");
      if (quickAddBtn) {
        e.stopPropagation();
        addToCart(quickAddBtn.getAttribute("data-quick-add"), "L", "Qora", 1);
        return;
      }

      const detailTrigger = e.target.closest("[data-open-modal]");
      if (detailTrigger) {
        openProductModal(detailTrigger.getAttribute("data-open-modal"));
      }
    });
  }

  // Qidiruv paneli
  if (dom.searchToggleBtn) {
    dom.searchToggleBtn.addEventListener("click", () => toggleSearchPanel());
  }
  if (dom.closeSearchBtn) {
    dom.closeSearchBtn.addEventListener("click", () => toggleSearchPanel(false));
  }
  if (dom.searchInput) {
    dom.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (dom.clearSearchBtn) dom.clearSearchBtn.hidden = state.searchQuery.trim().length === 0;
      renderProductsGrid();
    });
  }
  if (dom.clearSearchBtn) {
    dom.clearSearchBtn.addEventListener("click", () => {
      state.searchQuery = "";
      if (dom.searchInput) dom.searchInput.value = "";
      dom.clearSearchBtn.hidden = true;
      renderProductsGrid();
    });
  }

  // Theme toggle
  if (dom.themeToggleBtn) {
    dom.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Savatcha ochish / yopish
  if (dom.cartOpenBtn) dom.cartOpenBtn.addEventListener("click", openCartDrawer);
  if (dom.closeCartDrawer) dom.closeCartDrawer.addEventListener("click", closeCartDrawer);
  if (dom.cartDrawerBackdrop) dom.cartDrawerBackdrop.addEventListener("click", closeCartDrawer);
  if (dom.clearCartBtn) dom.clearCartBtn.addEventListener("click", clearCart);

  if (dom.cartItemsContainer) {
    dom.cartItemsContainer.addEventListener("click", (e) => {
      const incBtn = e.target.closest("[data-cart-inc]");
      if (incBtn) {
        updateCartItemQty(Number(incBtn.getAttribute("data-cart-inc")), 1);
        return;
      }
      const decBtn = e.target.closest("[data-cart-dec]");
      if (decBtn) {
        updateCartItemQty(Number(decBtn.getAttribute("data-cart-dec")), -1);
        return;
      }
      const remBtn = e.target.closest("[data-remove-cart]");
      if (remBtn) {
        removeCartItem(Number(remBtn.getAttribute("data-remove-cart")));
      }
    });
  }

  // Sevimlilar ochish / yopish
  if (dom.wishlistOpenBtn) dom.wishlistOpenBtn.addEventListener("click", openWishlistDrawer);
  if (dom.closeWishlistDrawer) dom.closeWishlistDrawer.addEventListener("click", closeWishlistDrawer);
  if (dom.wishlistDrawerBackdrop) dom.wishlistDrawerBackdrop.addEventListener("click", closeWishlistDrawer);

  if (dom.wishlistItemsContainer) {
    dom.wishlistItemsContainer.addEventListener("click", (e) => {
      const wishBtn = e.target.closest("[data-toggle-wishlist]");
      if (wishBtn) {
        toggleWishlist(wishBtn.getAttribute("data-toggle-wishlist"));
        return;
      }
      const addBtn = e.target.closest("[data-quick-add]");
      if (addBtn) {
        addToCart(addBtn.getAttribute("data-quick-add"), "L", "Qora", 1);
        return;
      }
      const detBtn = e.target.closest("[data-open-modal]");
      if (detBtn) {
        closeWishlistDrawer();
        openProductModal(detBtn.getAttribute("data-open-modal"));
      }
    });
  }

  // Mobil menyu
  if (dom.hamburgerBtn) dom.hamburgerBtn.addEventListener("click", openMobileDrawer);
  if (dom.closeMobileDrawer) dom.closeMobileDrawer.addEventListener("click", closeMobileDrawer);
  if (dom.mobileDrawerBackdrop) dom.mobileDrawerBackdrop.addEventListener("click", closeMobileDrawer);

  // Navigatsiya linklari
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      const navKey = link.getAttribute("data-nav");
      handleNavAction(navKey);
      closeMobileDrawer();
    });
  });

  // Footer kategoriya tezkor havolalari
  document.querySelectorAll("[data-quick-cat]").forEach((link) => {
    link.addEventListener("click", () => {
      const cat = link.getAttribute("data-quick-cat");
      if (cat && CATEGORIES.includes(cat)) {
        state.category = cat;
        state.filterMode = "all";
        renderCategoryTabs();
        syncQuickFilterChips();
        renderProductsGrid();
      }
    });
  });

  // Mahsulot modal ichidagi boshqaruv
  if (dom.closeProductModal) dom.closeProductModal.addEventListener("click", closeProductModal);
  if (dom.productModal) {
    dom.productModal.addEventListener("click", (e) => {
      if (e.target === dom.productModal) closeProductModal();
    });
  }

  if (dom.sizeOptions) {
    dom.sizeOptions.addEventListener("click", (e) => {
      const btn = e.target.closest(".size-btn");
      if (!btn) return;
      state.selectedSize = btn.getAttribute("data-size") || "L";
      if (dom.selectedSizeText) dom.selectedSizeText.textContent = state.selectedSize;
      dom.sizeOptions.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  }

  if (dom.colorOptions) {
    dom.colorOptions.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-swatch-btn");
      if (!btn) return;
      state.selectedColor = btn.getAttribute("data-color") || "Qora";
      if (dom.selectedColorText) dom.selectedColorText.textContent = state.selectedColor;
      dom.colorOptions.querySelectorAll(".color-swatch-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  }

  if (dom.modalQtyMinus) {
    dom.modalQtyMinus.addEventListener("click", () => {
      if (state.modalQty > 1) {
        state.modalQty -= 1;
        if (dom.modalQtyValue) dom.modalQtyValue.textContent = String(state.modalQty);
      }
    });
  }

  if (dom.modalQtyPlus) {
    dom.modalQtyPlus.addEventListener("click", () => {
      state.modalQty += 1;
      if (dom.modalQtyValue) dom.modalQtyValue.textContent = String(state.modalQty);
    });
  }

  if (dom.modalAddToCartBtn) {
    dom.modalAddToCartBtn.addEventListener("click", () => {
      if (!state.activeModalProductId) return;
      addToCart(
        state.activeModalProductId,
        state.selectedSize,
        state.selectedColor,
        state.modalQty
      );
      closeProductModal();
    });
  }

  if (dom.modalWishlistBtn) {
    dom.modalWishlistBtn.addEventListener("click", () => {
      if (state.activeModalProductId) {
        toggleWishlist(state.activeModalProductId);
      }
    });
  }

  // Buyurtma modal
  if (dom.openCheckoutBtn) dom.openCheckoutBtn.addEventListener("click", openCheckoutModal);
  if (dom.closeCheckoutModal) dom.closeCheckoutModal.addEventListener("click", closeCheckoutModal);
  if (dom.checkoutModal) {
    dom.checkoutModal.addEventListener("click", (e) => {
      if (e.target === dom.checkoutModal) closeCheckoutModal();
    });
  }
  if (dom.checkoutForm) dom.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  if (dom.doneOrderBtn) dom.doneOrderBtn.addEventListener("click", closeCheckoutModal);

  // ESC tugmasi bilan yopish
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCheckoutModal();
      closeCartDrawer();
      closeWishlistDrawer();
      closeMobileDrawer();
      toggleSearchPanel(false);
    }
  });

  // Scroll holati (Header soya va Yuqoriga qaytish tugmasi)
  window.addEventListener("scroll", () => {
    const y = window.scrollY || window.pageYOffset;
    if (dom.mainHeader) {
      dom.mainHeader.classList.toggle("scrolled", y > 20);
    }
    if (dom.scrollTopBtn) {
      dom.scrollTopBtn.classList.toggle("visible", y > 420);
    }
  });

  if (dom.scrollTopBtn) {
    dom.scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ==========================================================================
   Ishga tushirish (Initialization)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  cacheDomElements();
  if (dom.currentYear) {
    dom.currentYear.textContent = String(new Date().getFullYear());
  }

  loadSavedState();
  renderCategoryTabs();
  syncQuickFilterChips();
  renderProductsGrid();
  updateCartUI();
  updateWishlistUI();
  bindEvents();
  refreshIcons();

  // Yuklanish ekranini yumshoq yopish
  setTimeout(() => {
    if (dom.preloader) {
      dom.preloader.classList.add("hidden");
    }
  }, 380);
});
