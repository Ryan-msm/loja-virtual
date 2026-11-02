// ==========================================================================
// MÓDULO DE ACESSIBILIDADE E INTERAÇÃO (Adicionado para o projeto da faculdade)
// ==========================================================================
let currentFontScale = 1;

function initAccessibilityTools() {
  // Aumentar Fonte
  const btnInc = $("#btnIncreaseText");
  if (btnInc) {
    btnInc.addEventListener("click", () => {
      if (currentFontScale < 1.35) {
        currentFontScale += 0.1;
        document.documentElement.style.setProperty("--font-scale", currentFontScale);
        toast("Tamanho do texto aumentado.");
      }
    });
  }

  // Diminuir Fonte
  const btnDec = $("#btnDecreaseText");
  if (btnDec) {
    btnDec.addEventListener("click", () => {
      if (currentFontScale > 0.85) {
        currentFontScale -= 0.1;
        document.documentElement.style.setProperty("--font-scale", currentFontScale);
        toast("Tamanho do texto diminuído.");
      }
    });
  }

  // Resetar Fonte
  const btnRes = $("#btnResetText");
  if (btnRes) {
    btnRes.addEventListener("click", () => {
      currentFontScale = 1;
      document.documentElement.style.setProperty("--font-scale", 1);
      toast("Tamanho do texto restaurado.");
    });
  }

  // Alto Contraste
  const btnContrast = $("#btnHighContrast");
  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      const active = document.body.classList.toggle("high-contrast");
      btnContrast.setAttribute("aria-pressed", active);
      toast(active ? "Modo de Alto Contraste ativado." : "Modo de Alto Contraste desativado.");
    });
  }

  // Modo Daltônico
  const btnColorblind = $("#btnColorblind");
  if (btnColorblind) {
    btnColorblind.addEventListener("click", () => {
      const active = document.body.classList.toggle("colorblind-mode");
      btnColorblind.setAttribute("aria-pressed", active);
      toast(active ? "Paleta para daltônicos ativada." : "Paleta padrão restaurada.");
    });
  }
}

function renderCompare() {
  const list = compareIds.map(productById).filter(Boolean);
  if (!list.length) {
    $("#compareContent").innerHTML = `<div class="compare-empty"><p>Você ainda não selecionou produtos para comparar.</p><p>Marque a opção “Comparar” nos cards de até três produtos.</p><button class="button outline" type="button" data-close>Voltar ao catálogo</button></div>`;
    return;
  }
  const attributes = [
    { label: "Categoria", get: p => p.category },
    { label: "Marca", get: p => p.brand || "—" },
    { label: "Preço", get: p => money(p.price) },
    { label: "Estoque", get: p => `${stockFor(p.id)} disp.` },
    { label: "Especificações", get: p => (p.specs || []).join(" • ") },
    { label: "Avaliação", get: p => `★ ${Number(p.rating || 4.7).toFixed(1)} (${p.reviews || 0})` }
  ];
  $("#compareContent").innerHTML = `<div class="compare-content"><table class="compare-table"><thead><tr><th>Especificação</th>${list.map(p => `<th><div class="compare-product-title">${imageMarkup(p)}<div>${escapeHTML(p.name)}</div></div></th>`).join("")}</tr></thead><tbody>${attributes.map(attr => `<tr><td><strong>${attr.label}</strong></td>${list.map(p => `<td>${escapeHTML(attr.get(p))}</td>`).join("")}</tr>`).join("")}<tr><td><strong>Ação</strong></td>${list.map(p => `<td><button class="button primary" data-add="${escapeHTML(p.id)}" ${stockFor(p.id) <= 0 ? "disabled" : ""}>Adicionar</button></td>`).join("")}</tr></tbody></table></div>`;
}

function openCompare() {
  renderCompare();
  openOverlay($("#compareModal"));
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const name = formData.get("customerName")?.trim();
  const email = formData.get("customerEmail")?.trim();
  const address = formData.get("customerAddress")?.trim();

  let hasError = false;
  const setError = (nameAttr, msg) => {
    const el = form.querySelector(`[data-error="${nameAttr}"]`);
    if (el) el.textContent = msg;
    hasError = true;
  };

  $$("#checkoutForm .field-error").forEach(el => el.textContent = "");
  $("#checkoutGlobalError").textContent = "";

  if (!name || name.length < 3) setError("customerName", "Informe seu nome completo (mínimo 3 caracteres).");
  if (!email || !email.includes("@") || !email.includes(".")) setError("customerEmail", "Informe um e-mail válido.");
  if (!address || address.length < 5) setError("customerAddress", "Informe o endereço de entrega completo.");

  if (hasError) {
    $("#checkoutGlobalError").textContent = "Por favor, corrija os campos destacados acima.";
    return;
  }

  const orderId = "LQT-" + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString("pt-BR"),
    customer: { name, email, phone: formData.get("customerPhone"), address, cep: formData.get("customerCep") },
    payment: formData.get("paymentMethod"),
    items: structuredCloneSafe(cart),
    subtotal: cartSubtotal(),
    discount: discountAmount(),
    shipping: shippingAmount(),
    total: cartTotal()
  };

  orders.unshift(newOrder);
  cart = {};
  appliedCoupon = false;
  persistAll();
  updateHeader();
  closeAll();

  $("#successContent").innerHTML = `<div class="success-icon">✓</div><h2>Pedido simulado com sucesso!</h2><div><p>Obrigado por testar a demonstração acadêmica, <strong>${escapeHTML(name)}</strong>.</p><div class="order-number">Número do pedido: ${orderId}</div><div class="success-summary"><h3>Resumo da entrega simulada</h3><p><strong>Endereço:</strong> ${escapeHTML(address)}</p><p><strong>Pagamento:</strong> ${escapeHTML(newOrder.payment)}</p><p><strong>Total simulado:</strong> ${money(newOrder.total)}</p></div><p class="muted">Este pedido foi gerado apenas para fins de apresentação e testes de usabilidade.</p><div class="success-actions"><button class="button primary" type="button" data-close>Concluir teste</button></div></div>`;
  openOverlay($("#successModal"));
  toast("Pedido simulado gerado com sucesso!", "success");
}

function renderAdminProducts() {
  $("#adminProducts").innerHTML = `<table class="admin-table"><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead><tbody>${products.map(p => `<tr><td><strong>${escapeHTML(p.name)}</strong><br><small class="muted">${escapeHTML(p.brand)}</small></td><td>${escapeHTML(p.category)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button type="button" data-admin-edit="${escapeHTML(p.id)}">Editar</button><button type="button" data-admin-delete="${escapeHTML(p.id)}">Excluir</button></td></tr>`).join("")}</tbody></table>`;
}

function renderAdminOrders() {
  $("#adminOrders").innerHTML = orders.length ? `<table class="admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Total</th><th>Pagamento</th></tr></thead><tbody>${orders.map(o => `<tr><td><strong>${escapeHTML(o.id)}</strong></td><td>${escapeHTML(o.customer?.name)}<br><small class="muted">${escapeHTML(o.customer?.email)}</small></td><td>${escapeHTML(o.date)}</td><td><strong>${money(o.total)}</strong></td><td>${escapeHTML(o.payment)}</td></tr>`).join("")}</tbody></table>` : `<p class="muted" style="padding:20px;text-align:center;">Nenhum pedido simulado registrado nesta sessão.</p>`;
}

function initAdminCategories() {
  $("#editCategory").innerHTML = CATEGORIES.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = $("#adminPassword").value.trim();
  if (pass === "admin123") {
    adminLoggedIn = true;
    $("#adminLogin").hidden = true;
    $("#adminDashboard").hidden = false;
    renderAdminProducts();
    renderAdminOrders();
    toast("Painel administrativo acessado com sucesso.");
  } else {
    $("#adminLoginError").textContent = "Senha incorreta. Utilize: admin123";
  }
}

function saveProductFromForm(e) {
  e.preventDefault();
  const id = $("#editProductId").value.trim();
  const name = $("#editName").value.trim();
  const category = $("#editCategory").value;
  const price = parseFloat($("#editPrice").value);
  const stock = parseInt($("#editStock").value, 10);
  const description = $("#editDescription").value.trim();
  const brand = $("#editBrand").value.trim();
  const image = $("#editImage").value.trim();
  const specs = $("#editSpecs").value.split(",").map(s => s.trim()).filter(Boolean);
  const storeUrl = $("#editStoreUrl").value.trim();

  if (!name || isNaN(price) || isNaN(stock)) {
    $("#productFormError").textContent = "Preencha os campos obrigatórios corretamente.";
    return;
  }

  if (id) {
    const p = productById(id);
    if (p) {
      p.name = name; p.category = category; p.price = price; p.stock = stock;
      p.description = description; p.brand = brand; p.image = image; p.specs = specs; p.storeUrl = storeUrl;
    }
    toast("Produto atualizado com sucesso!");
  } else {
    const newId = "custom-" + Math.random().toString(36).substring(2, 9);
    products.unshift({ id: newId, name, category, price, stock, description, brand, image, specs, storeUrl, rating: 5.0, reviews: 1 });
    toast("Produto cadastrado com sucesso!");
  }

  persistAll();
  renderProducts();
  renderAdminProducts();
  $("#productForm").reset();
  $("#editProductId").value = "";
  $$(".admin-tab")[0].click();
}

// Event Listeners globais da aplicação
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initAccessibilityTools();
  initAdminCategories();
  renderProducts();
  updateHeader();

  document.body.addEventListener("click", e => {
    const btnAdd = e.target.closest("[data-add]");
    if (btnAdd) { addToCart(btnAdd.dataset.add); return; }

    const btnDetails = e.target.closest("[data-details]");
    if (btnDetails) { showProductDetails(btnDetails.dataset.details); return; }

    const btnQty = e.target.closest("[data-qty]");
    if (btnQty) { changeQuantity(btnQty.dataset.qty, parseInt(btnQty.dataset.delta, 10)); return; }

    const btnRemove = e.target.closest("[data-remove]");
    if (btnRemove) { removeFromCart(btnRemove.dataset.remove); return; }

    const closeTarget = e.target.closest("[data-close], #overlay");
    if (closeTarget && (e.target === closeTarget || closeTarget.hasAttribute("data-close"))) { closeAll(); return; }

    const navCat = e.target.closest(".nav-category, .filter-chip");
    if (navCat) { setCategory(navCat.dataset.category); return; }

    const adminTab = e.target.closest(".admin-tab");
    if (adminTab) {
      $$(".admin-tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      adminTab.classList.add("active");
      adminTab.setAttribute("aria-selected", "true");
      const target = adminTab.dataset.adminTab;
      $("#adminProducts").hidden = target !== "products";
      $("#adminOrders").hidden = target !== "orders";
      $("#adminEditor").hidden = target !== "editor";
      return;
    }

    const editAdmin = e.target.closest("[data-admin-edit]");
    if (editAdmin) {
      const p = productById(editAdmin.dataset.adminEdit);
      if (p) {
        $("#editProductId").value = p.id;
        $("#editName").value = p.name;
        $("#editCategory").value = p.category;
        $("#editPrice").value = p.price;
        $("#editStock").value = p.stock;
        $("#editBrand").value = p.brand || "";
        $("#editImage").value = p.image || "";
        $("#editDescription").value = p.description || "";
        $("#editSpecs").value = (p.specs || []).join(", ");
        $("#editStoreUrl").value = p.storeUrl || "";
        $$(".admin-tab")[2].click();
      }
      return;
    }

    const deleteAdmin = e.target.closest("[data-admin-delete]");
    if (deleteAdmin) {
      if (confirm("Deseja realmente remover este produto do catálogo demonstrativo?")) {
        products = products.filter(x => x.id !== deleteAdmin.dataset.adminDelete);
        persistAll();
        renderProducts();
        renderAdminProducts();
        toast("Produto removido.");
      }
      return;
    }
  });

  document.body.addEventListener("change", e => {
    const chk = e.target.closest("[data-compare]");
    if (chk) { toggleCompare(chk.dataset.compare, chk.checked); }
  });

  // Links do Header e Hero
  $("#cartOpen").addEventListener("click", openCart);
  $("#compareOpen").addEventListener("click", openCompare);
  $("#compareOpenBottom").addEventListener("click", openCompare);
  $("#heroCompare").addEventListener("click", openCompare);
  $("#shopNow").addEventListener("click", () => $("#catalogo").scrollIntoView({ behavior: "smooth" }));
  $("#adminOpen").addEventListener("click", () => {
    $("#adminPassword").value = "";
    $("#adminLoginError").textContent = "";
    if (adminLoggedIn) {
      $("#adminLogin").hidden = true;
      $("#adminDashboard").hidden = false;
      renderAdminProducts();
      renderAdminOrders();
    } else {
      $("#adminLogin").hidden = false;
      $("#adminDashboard").hidden = true;
    }
    openOverlay($("#adminModal"));
  });
  $("#footerAdmin").addEventListener("click", () => $("#adminOpen").click());

  // Busca e Ordenação
  $("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    searchTerm = $("#searchInput").value.trim();
    renderProducts();
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
  });
  $("#searchInput").addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    renderProducts();
  });
  $("#sortSelect").addEventListener("change", e => {
    sortMode = e.target.value;
    renderProducts();
  });

  // Carrinho e Checkout
  $("#applyCoupon").addEventListener("click", applyCoupon);
  $("#checkoutStart").addEventListener("click", () => {
    closeAll();
    // Preencher sumário do checkout
    $("#checkoutReview").innerHTML = `<h3>Resumo do pedido</h3><div class="review-row"><span>Itens (${cartCount()})</span><strong>${money(cartSubtotal())}</strong></div><div class="review-row"><span>Desconto</span><strong>${money(discountAmount())}</strong></div><div class="review-row"><span>Frete</span><strong>${shippingAmount() === 0 ? "Grátis" : money(shippingAmount())}</strong></div><div class="review-row total"><span>Total simulado</span><strong>${money(cartTotal())}</strong></div>`;
    openOverlay($("#checkoutModal"));
  });
  $("#backToCart").addEventListener("click", () => { closeAll(); openCart(); });
  $("#checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  $("#adminLoginForm").addEventListener("submit", handleAdminLogin);
  $("#productForm").addEventListener("submit", saveProductFromForm);
  $("#cancelProductEdit").addEventListener("click", () => {
    $("#productForm").reset();
    $("#editProductId").value = "";
  });
  $("#resetDemo").addEventListener("click", () => {
    if (confirm("Deseja restaurar todos os dados e produtos originais da demonstração?")) {
      localStorage.clear();
      loadState();
      renderProducts();
      renderAdminProducts();
      closeAll();
      toast("Dados demonstrativos restaurados com sucesso!");
    }
  });
  $("#adminLogout").addEventListener("click", () => {
    adminLoggedIn = false;
    closeAll();
    toast("Sessão administrativa encerrada.");
  });

  // Ano atual no rodapé
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
})();
