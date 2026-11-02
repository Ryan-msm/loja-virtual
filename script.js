/* ==========================================================================
   LOJAS QUASE TUDO - E-COMMERCE ACESSÍVEL & INTERATIVO
   ========================================================================== */

(function () {
  "use strict";

  // --- DADOS INICIAIS DO CATÁLOGO (COM IMAGENS REAIS) ---
  const INITIAL_PRODUCTS = [
    {
      id: "ram-kingston-fury-16",
      name: "Kingston Fury Beast 16GB DDR4",
      category: "Memórias RAM",
      brand: "Kingston",
      price: 249.9,
      stock: 15,
      rating: 4.9,
      description: "Memória RAM de alto desempenho para jogos e multitarefa pesada com dissipador de calor metálico.",
      specs: ["16 GB", "DDR4", "3200 MHz", "CL16"],
      image: "https://images.unsplash.com/photo-1562976540-1e02c5108c49?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "ssd-kingston-nv2-1tb",
      name: "SSD Kingston NV2 1TB NVMe M.2",
      category: "SSDs",
      brand: "Kingston",
      price: 419.9,
      stock: 20,
      rating: 4.8,
      description: "Leituras ultra-rápidas de até 3500MB/s. Ideal para acelerar o sistema operacional e carregar jogos instantaneamente.",
      specs: ["1 TB", "NVMe PCIe 4.0", "Leitura: 3500 MB/s", "M.2 2280"],
      image: "https://images.unsplash.com/photo-1597872250970-45d2e3ad8f5b?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "gpu-rtx-3060-12gb",
      name: "NVIDIA GeForce RTX 3060 12GB",
      category: "Placas de Vídeo",
      brand: "NVIDIA",
      price: 1899.0,
      stock: 8,
      rating: 5.0,
      description: "Excelente desempenho em Full HD e Quad HD com suporte a Ray Tracing e DLSS.",
      specs: ["12 GB GDDR6", "192-bit", "Ray Tracing", "DLSS Support"],
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "cpu-i5-10400f",
      name: "Processador Intel Core i5-10400F",
      category: "Processadores",
      brand: "Intel",
      price: 629.0,
      stock: 10,
      rating: 4.7,
      description: "Processador de 6 núcleos e 12 threads com ótimo custo-benefício para jogos e produtividade.",
      specs: ["6 Núcleos / 12 Threads", "LGA 1200", "Base: 2.9 GHz", "Turbo: 4.3 GHz"],
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "mb-asus-tuf-b460m",
      name: "Placa-Mãe ASUS TUF Gaming B460M-PLUS",
      category: "Placas-Mãe",
      brand: "ASUS",
      price: 749.9,
      stock: 5,
      rating: 4.9,
      description: "Construção de nível militar com suporte a memórias DDR4, dois slots M.2 e proteção contra sobretensão.",
      specs: ["Socket LGA 1200", "Micro-ATX", "DDR4 Dual Channel", "Aura Sync RGB"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "monitor-superframe-27",
      name: "Monitor Gamer SuperFrame 27 Quad HD 180Hz",
      category: "Monitores",
      brand: "SuperFrame",
      price: 1299.0,
      stock: 6,
      rating: 4.8,
      description: "Tela curva de 27 polegadas com resolução QHD (2560x1440), painel ultra-rápido de 180Hz e suporte G-Sync/FreeSync.",
      specs: ["27 polegadas QHD", "Painel 180Hz", "1ms Tempo Resposta", "G-Sync / FreeSync"],
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"
    }
  ];

  // --- ESTADO GLOBAL DA APLICAÇÃO ---
  let products = [];
  let cart = {}; // { productId: quantity }
  let compareList = []; // [productId]
  let orders = [];
  let appliedCoupon = false;
  let currentFontSize = 100; // Percentual
  let isAdminLoggedIn = false;

  // --- FUNÇÕES UTILITÁRIAS ---
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  function money(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, (tag) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[tag] || tag));
  }

  function toast(message, type = "info") {
    let container = $("#toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const elem = document.createElement("div");
    elem.className = `toast toast-${type}`;
    elem.innerText = message;
    container.appendChild(elem);
    setTimeout(() => elem.remove(), 4000);
  }

  // --- PERSISTÊNCIA NO LOCALSTORAGE ---
  function loadState() {
    try {
      const savedProducts = localStorage.getItem("lqt_products");
      products = savedProducts ? JSON.parse(savedProducts) : [...INITIAL_PRODUCTS];

      const savedCart = localStorage.getItem("lqt_cart");
      cart = savedCart ? JSON.parse(savedCart) : {};

      const savedCompare = localStorage.getItem("lqt_compare");
      compareList = savedCompare ? JSON.parse(savedCompare) : [];

      const savedOrders = localStorage.getItem("lqt_orders");
      orders = savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      console.error("Erro ao carregar dados do LocalStorage:", e);
      products = [...INITIAL_PRODUCTS];
      cart = {};
      compareList = [];
      orders = [];
    }
  }

  function persistAll() {
    try {
      localStorage.setItem("lqt_products", JSON.stringify(products));
      localStorage.setItem("lqt_cart", JSON.stringify(cart));
      localStorage.setItem("lqt_compare", JSON.stringify(compareList));
      localStorage.setItem("lqt_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Erro ao guardar no LocalStorage:", e);
    }
  }

  // --- RENDERING DO CATÁLOGO E INTERFACE ---
  function renderProducts() {
    const grid = $("#productGrid");
    if (!grid) return;

    const searchTerm = $("#searchInput")?.value.toLowerCase().trim() || "";
    const categoryTerm = $("#categoryFilter")?.value || "";
    const sortTerm = $("#sortFilter")?.value || "";

    let filtered = products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm) || p.brand.toLowerCase().includes(searchTerm);
      const matchCategory = !categoryTerm || p.category === categoryTerm;
      return matchSearch && matchCategory;
    });

    if (sortTerm === "low") filtered.sort((a, b) => a.price - b.price);
    if (sortTerm === "high") filtered.sort((a, b) => b.price - a.price);
    if (sortTerm === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align:center; padding: 40px;"><p>Nenhum produto encontrado com os filtros selecionados.</p></div>`;
      return;
    }

    grid.innerHTML = filtered.map((p) => {
      const isComparing = compareList.includes(p.id);
      return `
        <article class="product-card">
          <img src="${p.image}" alt="${escapeHTML(p.name)}" class="product-image" loading="lazy">
          <div class="product-info">
            <span class="product-category">${escapeHTML(p.category)}</span>
            <h3 class="product-title">${escapeHTML(p.name)}</h3>
            <p class="product-description">${escapeHTML(p.description)}</p>
            <div class="product-price">${money(p.price)}</div>
            <div class="product-stock">${p.stock > 0 ? `Estoque: ${p.stock} uni.` : '<span style="color:red">Esgotado</span>'}</div>
            
            <div class="product-actions" style="margin-top:15px; display:flex; gap:8px; flex-wrap:wrap;">
              <button class="button primary" onclick="LQT.addToCart('${p.id}')" ${p.stock <= 0 ? 'disabled' : ''}>
                Adicionar ao Carrinho
              </button>
              <button class="button outline ${isComparing ? 'active' : ''}" onclick="LQT.toggleCompare('${p.id}')">
                ${isComparing ? '✓ Comparando' : 'Comparar'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function updateHeader() {
    const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    const cartBadge = $("#cartBadge");
    if (cartBadge) cartBadge.innerText = totalCount;

    const compareBadge = $("#compareBadge");
    if (compareBadge) compareBadge.innerText = compareList.length;
  }

  function cartTotal() {
    let subtotal = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const p = products.find((prod) => prod.id === id);
      if (p) subtotal += p.price * qty;
    }
    return appliedCoupon ? subtotal * 0.9 : subtotal;
  }

  // --- CARRINHO & CHECKOUT ---
  function renderCartDrawer() {
    const cartItemsDiv = $("#cartItems");
    if (!cartItemsDiv) return;

    const keys = Object.keys(cart);
    if (keys.length === 0) {
      cartItemsDiv.innerHTML = `<p style="text-align:center; padding: 20px;">O seu carrinho está vazio.</p>`;
      $("#cartSubtotal").innerText = money(0);
      return;
    }

    let html = "";
    for (const id of keys) {
      const p = products.find((item) => item.id === id);
      if (!p) continue;
      const qty = cart[id];
      html += `
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <strong>${escapeHTML(p.name)}</strong>
            <div>${money(p.price)} x ${qty}</div>
          </div>
          <div style="display:flex; gap:5px; align-items:center;">
            <button class="button small" onclick="LQT.updateCartQty('${p.id}', ${qty - 1})">-</button>
            <span>${qty}</span>
            <button class="button small" onclick="LQT.updateCartQty('${p.id}', ${qty + 1})">+</button>
            <button class="button danger small" onclick="LQT.updateCartQty('${p.id}', 0)">x</button>
          </div>
        </div>
      `;
    }
    cartItemsDiv.innerHTML = html;
    $("#cartSubtotal").innerText = money(cartTotal());
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const name = $("#customerName")?.value.trim();
    const email = $("#customerEmail")?.value.trim();
    const phone = $("#customerPhone")?.value.trim() || "";
    const address = $("#customerAddress")?.value.trim();

    if (!name || name.length < 3 || !email || !email.includes("@")) {
      toast("Preencha o nome e e-mail corretamente.", "error");
      return;
    }

    const orderId = "LQT-" + Math.floor(100000 + Math.random() * 900000);
    const total = cartTotal();

    // Abater estoque
    for (const [id, qty] of Object.entries(cart)) {
      const p = products.find((item) => item.id === id);
      if (p) p.stock = Math.max(0, p.stock - qty);
    }

    // Criar histórico do pedido
    const newOrder = { id: orderId, name, email, total, date: new Date().toLocaleDateString() };
    orders.push(newOrder);

    // Formatar mensagem para o WhatsApp
    const cleanPhone = phone.replace(/\D/g, "");
    const whatsappMsg = encodeURIComponent(
      `Olá ${name}! O seu pedido simulado #${orderId} no Lojas Quase Tudo foi registado com sucesso!\n\n` +
      `📦 Total: ${money(total)}\n` +
      `📍 Endereço: ${address}\n\n` +
      `Obrigado por testar a nossa demonstração académica!`
    );

    const whatsappLink = cleanPhone 
      ? `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${whatsappMsg}`
      : `https://api.whatsapp.com/send?text=${whatsappMsg}`;

    // Limpar carrinho e persistir
    cart = {};
    appliedCoupon = false;
    persistAll();
    updateHeader();
    renderProducts();

    // Fechar checkout e abrir confirmação
    closeModal("#checkoutModal");
    closeModal("#cartDrawer");

    const successContent = $("#successContent");
    if (successContent) {
      successContent.innerHTML = `
        <div style="text-align:center; padding: 20px;">
          <h2 style="color: #2e7d32;">✓ Pedido Simulado Gerado!</h2>
          <p>Obrigado por testar o nosso e-commerce, <strong>${escapeHTML(name)}</strong>.</p>
          <div style="background:#e8f5e9; padding:15px; border-radius:8px; margin: 15px 0;">
            <strong>Código do Pedido:</strong> ${orderId}<br>
            <strong>Total do Pedido:</strong> ${money(total)}<br>
            <strong>E-mail de confirmação enviado para:</strong> ${escapeHTML(email)}
          </div>
          <div style="display:flex; gap:10px; justify-content:center; margin-top:20px; flex-wrap:wrap;">
            <a href="${whatsappLink}" target="_blank" class="button primary" style="background-color:#25D366; border-color:#25D366; color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
              📲 Enviar Comprovativo no WhatsApp
            </a>
            <button class="button outline" onclick="LQT.closeModal('#successModal')">Concluir</button>
          </div>
        </div>
      `;
      openModal("#successModal");
    }

    toast(`E-mail demonstrativo enviado para ${email}`, "success");
  }

  // --- ACESSIBILIDADE ---
  function changeFontSize(delta) {
    if (delta === 0) currentFontSize = 100;
    else currentFontSize = Math.min(140, Math.max(90, currentFontSize + delta));
    document.documentElement.style.fontSize = `${currentFontSize}%`;
    toast(`Tamanho da fonte: ${currentFontSize}%`, "info");
  }

  function toggleContrast() {
    document.body.classList.toggle("high-contrast");
    const isActive = document.body.classList.contains("high-contrast");
    toast(isActive ? "Alto Contraste ativado" : "Alto Contraste desativado", "info");
  }

  function toggleColorblind() {
    document.body.classList.toggle("colorblind-mode");
    const isActive = document.body.classList.contains("colorblind-mode");
    toast(isActive ? "Modo Daltónico ativado" : "Modo Daltónico desativado", "info");
  }

  // --- MODAIS ---
  function openModal(selector) {
    const elem = $(selector);
    if (elem) elem.classList.add("open");
  }

  function closeModal(selector) {
    const elem = $(selector);
    if (elem) elem.classList.remove("open");
  }

  // --- API PÚBLICA (EXPOSTA PARA O HTML) ---
  window.LQT = {
    addToCart: (id) => {
      const p = products.find((item) => item.id === id);
      if (!p || p.stock <= 0) return toast("Produto fora de estoque.", "error");
      cart[id] = (cart[id] || 0) + 1;
      persistAll();
      updateHeader();
      toast(`${p.name} adicionado ao carrinho!`, "success");
    },
    updateCartQty: (id, qty) => {
      if (qty <= 0) delete cart[id];
      else cart[id] = qty;
      persistAll();
      updateHeader();
      renderCartDrawer();
    },
    toggleCompare: (id) => {
      const index = compareList.indexOf(id);
      if (index > -1) {
        compareList.splice(index, 1);
        toast("Produto removido do comparador.", "info");
      } else {
        if (compareList.length >= 3) return toast("Pode comparar no máximo 3 produtos.", "error");
        compareList.push(id);
        toast("Produto adicionado ao comparador!", "success");
      }
      persistAll();
      updateHeader();
      renderProducts();
    },
    applyCoupon: () => {
      const val = $("#couponInput")?.value.trim().toUpperCase();
      if (val === "UNIVERSIDADE10") {
        appliedCoupon = true;
        toast("Cupão de 10% aplicado com sucesso!", "success");
        renderCartDrawer();
      } else {
        toast("Cupão inválido. Tente UNIVERSIDADE10", "error");
      }
    },
    openCart: () => {
      renderCartDrawer();
      openModal("#cartDrawer");
    },
    closeModal: (selector) => closeModal(selector),
    resetDemo: () => {
      if (confirm("Deseja restaurar os produtos e limpar o carrinho?")) {
        localStorage.clear();
        loadState();
        renderProducts();
        updateHeader();
        toast("Dados demonstrativos restaurados!", "info");
      }
    }
  };

  // --- INICIALIZAÇÃO DA PÁGINA ---
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderProducts();
    updateHeader();

    // Eventos de Busca e Filtro
    $("#searchInput")?.addEventListener("input", renderProducts);
    $("#categoryFilter")?.addEventListener("change", renderProducts);
    $("#sortFilter")?.addEventListener("change", renderProducts);

    // Form de Checkout
    $("#checkoutForm")?.addEventListener("submit", handleCheckoutSubmit);

    // Botões de Acessibilidade
    $("#btnFontIncrease")?.addEventListener("click", () => changeFontSize(10));
    $("#btnFontDecrease")?.addEventListener("click", () => changeFontSize(-10));
    $("#btnFontReset")?.addEventListener("click", () => changeFontSize(0));
    $("#btnContrast")?.addEventListener("click", toggleContrast);
    $("#btnColorblind")?.addEventListener("click", toggleColorblind);
  });
})();
