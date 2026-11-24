/**
 * TicketUp - Plataforma de Venda de Ingressos para Museu
 * Funcionalidades: Catálogo Dinâmico, Checkout Simulado, Emissão de Voucher com QR Code,
 * Caixa de Entrada de E-mails Simulada e Painel Administrativo CRUD.
 */

// =============================================================================
// 1. DADOS INICIAIS (SEED DATA)
// =============================================================================
const INITIAL_EXHIBITIONS = [
  {
    id: 1,
    title: "Renascimento Imersivo: Da Vinci & Michelangelo",
    category: "Arte",
    priceFull: 60.00,
    priceHalf: 30.00,
    capacity: 200,
    sold: 42,
    status: "active", // active | paused | soldout
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80",
    location: "Ala Central - Galeria Magna",
    description: "Projeções 360°, réplicas de manuscritos originais e uma imersão sensorial inesquecível pelas obras-primas que moldaram o Renascimento europeu."
  },
  {
    id: 2,
    title: "Tesouros do Egito Antigo: Faraós e Mistérios",
    category: "História",
    priceFull: 50.00,
    priceHalf: 25.00,
    capacity: 180,
    sold: 15,
    status: "active",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=900&q=80",
    location: "Ala Leste - Sala das Relíquias",
    description: "Mais de 120 peças arqueológicas originais, sarcófagos entalhados, amuletos sagrados e uma recriação detalhada de uma tumba faraônica."
  },
  {
    id: 3,
    title: "Cosmos & Luz: Jornada Científica Interativa",
    category: "Ciência",
    priceFull: 45.00,
    priceHalf: 22.50,
    capacity: 150,
    sold: 28,
    status: "active",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=900&q=80",
    location: "Ala Oeste - Planetário & Domo Digital",
    description: "Uma viagem pelos confins do universo com simulação de buracos negros, realidade mista e experimentos ópticos fascinantes para todas as idades."
  },
  {
    id: 4,
    title: "Noite no Museu: Visita Guiada com Tochas e Enigmas",
    category: "Especial",
    priceFull: 80.00,
    priceHalf: 40.00,
    capacity: 60,
    sold: 58,
    status: "active",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=900&q=80",
    location: "Todo o Complexo Histórico",
    description: "Uma experiência teatral noturna exclusiva após o fechamento das portas, conduzida por historiadores caracterizados com iluminação intimista."
  },
  {
    id: 5,
    title: "Modernismo Brasileiro: Da Semana de 22 à Contemporaneidade",
    category: "Arte",
    priceFull: 40.00,
    priceHalf: 20.00,
    capacity: 120,
    sold: 19,
    status: "active",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80",
    location: "Pavilhão Modernista - 2º Andar",
    description: "Acervo com pinturas, gravuras e poemas de Tarsila do Amaral, Anita Malfatti, Di Cavalcanti e seus desdobramentos na arte brasileira atual."
  },
  {
    id: 6,
    title: "Gigantes Pré-Históricos: Fósseis e Dinossauros",
    category: "História",
    priceFull: 48.00,
    priceHalf: 24.00,
    capacity: 140,
    sold: 140,
    status: "soldout",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    location: "Jardim Paleontológico",
    description: "Esqueletos em tamanho real de dinossauros que habitaram a América do Sul, com estações táteis e réplicas escavadas."
  }
];

// =============================================================================
// 2. GERENCIADOR DE ESTADO (LOCALSTORAGE)
// =============================================================================
class TicketUpStore {
  static STORAGE_KEY_EXHIBITIONS = "ticketup_exhibitions_v1";
  static STORAGE_KEY_ORDERS = "ticketup_orders_v1";
  static STORAGE_KEY_EMAILS = "ticketup_emails_v1";

  // Obter exposições / ingressos
  static getExhibitions() {
    const raw = localStorage.getItem(this.STORAGE_KEY_EXHIBITIONS);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY_EXHIBITIONS, JSON.stringify(INITIAL_EXHIBITIONS));
      return [...INITIAL_EXHIBITIONS];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [...INITIAL_EXHIBITIONS];
    }
  }

  // Salvar exposições
  static saveExhibitions(exhibitions) {
    localStorage.setItem(this.STORAGE_KEY_EXHIBITIONS, JSON.stringify(exhibitions));
  }

  // Obter pedidos / vendas
  static getOrders() {
    const raw = localStorage.getItem(this.STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  }

  // Salvar novo pedido
  static addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(orders));
    return order;
  }

  // Obter e-mails simulados
  static getEmails() {
    const raw = localStorage.getItem(this.STORAGE_KEY_EMAILS);
    return raw ? JSON.parse(raw) : [];
  }

  // Adicionar e-mail simulado
  static addEmail(email) {
    const emails = this.getEmails();
    emails.unshift(email);
    localStorage.setItem(this.STORAGE_KEY_EMAILS, JSON.stringify(emails));
    return email;
  }

  // Marcar e-mail como lido
  static markEmailAsRead(emailId) {
    const emails = this.getEmails();
    const target = emails.find(e => e.id === emailId);
    if (target) {
      target.read = true;
      localStorage.setItem(this.STORAGE_KEY_EMAILS, JSON.stringify(emails));
    }
  }

  // Restaurar dados padrão de fábrica
  static resetDefaults() {
    localStorage.setItem(this.STORAGE_KEY_EXHIBITIONS, JSON.stringify(INITIAL_EXHIBITIONS));
    localStorage.removeItem(this.STORAGE_KEY_ORDERS);
    localStorage.removeItem(this.STORAGE_KEY_EMAILS);
  }
}

// =============================================================================
// 3. UTILITÁRIOS (FORMATAÇÃO, QR CODE, TOASTS)
// =============================================================================

function formatCurrency(val) {
  return Number(val || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatDateBR(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Renderizador de QR Code nativo em Canvas
 * Gera uma matriz de autenticação visual com os marcadores de posição característicos
 */
function drawSimulatedQr(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Fundo branco
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Determinar grade (25x25 módulos)
  const modules = 25;
  const modSize = size / modules;

  // Gerador determinístico baseado no hash da string
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  function isPositionFinder(r, c) {
    // Marcador Superior Esquerdo (0..6, 0..6)
    if (r <= 6 && c <= 6) return true;
    // Marcador Superior Direito (0..6, modules-7..modules-1)
    if (r <= 6 && c >= modules - 7) return true;
    // Marcador Inferior Esquerdo (modules-7..modules-1, 0..6)
    if (r >= modules - 7 && c <= 6) return true;
    return false;
  }

  function drawFinderPattern(startX, startY) {
    // Quadrado externo 7x7 preto
    ctx.fillStyle = "#09090b";
    ctx.fillRect(startX * modSize, startY * modSize, 7 * modSize, 7 * modSize);

    // Quadrado interno 5x5 branco
    ctx.fillStyle = "#ffffff";
    ctx.fillRect((startX + 1) * modSize, (startY + 1) * modSize, 5 * modSize, 5 * modSize);

    // Núcleo central 3x3 preto
    ctx.fillStyle = "#09090b";
    ctx.fillRect((startX + 2) * modSize, (startY + 2) * modSize, 3 * modSize, 3 * modSize);
  }

  // Desenhar os 3 Marcadores de Posição
  drawFinderPattern(0, 0);
  drawFinderPattern(modules - 7, 0);
  drawFinderPattern(0, modules - 7);

  // Preencher dados pseudo-aleatórios com base no hash do voucher
  ctx.fillStyle = "#09090b";
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (isPositionFinder(r, c)) continue;

      // Padrão de temporização (linhas guias)
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(c * modSize, r * modSize, modSize, modSize);
        }
        continue;
      }

      // Bit de dados
      const pseudoBit = Math.sin(hash + r * 13 + c * 37) * 10000;
      if (Math.abs(pseudoBit - Math.floor(pseudoBit)) > 0.48) {
        ctx.fillRect(c * modSize, r * modSize, modSize, modSize);
      }
    }
  }
}

// =============================================================================
// 4. CONTROLADOR DA APLICAÇÃO (UI & EVENTOS)
// =============================================================================

class TicketUpApp {
  constructor() {
    this.currentCategory = "all";
    this.currentSearch = "";
    this.selectedExhibition = null;
    this.activeOrder = null;

    // Elementos da UI
    this.grid = document.getElementById("ticketsGrid");
    this.searchInput = document.getElementById("searchInput");
    this.filterTabs = document.getElementById("filterTabs");

    // Modal de Checkout
    this.checkoutModal = document.getElementById("checkoutModal");
    this.checkoutForm = document.getElementById("checkoutForm");
    this.qtyFullEl = document.getElementById("qtyFull");
    this.qtyHalfEl = document.getElementById("qtyHalf");
    this.displayFullPriceEl = document.getElementById("displayFullPrice");
    this.displayHalfPriceEl = document.getElementById("displayHalfPrice");
    this.summaryTicketsCountEl = document.getElementById("summaryTicketsCount");
    this.summaryTotalAmountEl = document.getElementById("summaryTotalAmount");
    this.visitDateInput = document.getElementById("visitDate");

    // Modal de Voucher / Sucesso
    this.ticketSuccessModal = document.getElementById("ticketSuccessModal");

    // Modal de E-mails Simulados
    this.mailboxModal = document.getElementById("mailboxModal");
    this.unreadMailBadge = document.getElementById("unreadMailBadge");

    // Modal do Admin
    this.adminModal = document.getElementById("adminModal");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderCatalog();
    this.updateMailBadge();

    // Definir data mínima do agendamento para hoje
    if (this.visitDateInput) {
      const today = new Date().toISOString().split("T")[0];
      this.visitDateInput.min = today;
      this.visitDateInput.value = today;
    }
  }

  setupEventListeners() {
    // Filtro por abas de categoria
    this.filterTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      this.filterTabs.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      this.currentCategory = btn.dataset.category;
      this.renderCatalog();
    });

    // Busca por texto
    this.searchInput.addEventListener("input", (e) => {
      this.currentSearch = e.target.value.toLowerCase().trim();
      this.renderCatalog();
    });

    // Botão de compra no card em destaque
    const quickBuyBtn = document.querySelector(".btn-quick-buy");
    if (quickBuyBtn) {
      quickBuyBtn.addEventListener("click", () => {
        const ticketId = parseInt(quickBuyBtn.dataset.ticketId, 10);
        this.openCheckout(ticketId);
      });
    }

    // Botão Hero "Como Funciona a Compra"
    const btnHeroSimulate = document.getElementById("btnHeroSimulate");
    if (btnHeroSimulate) {
      btnHeroSimulate.addEventListener("click", () => {
        const firstActive = TicketUpStore.getExhibitions().find(t => t.status === "active");
        if (firstActive) {
          this.openCheckout(firstActive.id);
        } else {
          showToast("Nenhuma exposição ativa no momento.", "warning");
        }
      });
    }

    // Modal Checkout: Contadores de Ingressos
    document.getElementById("btnPlusFull").addEventListener("click", () => this.updateQuantity("full", 1));
    document.getElementById("btnMinusFull").addEventListener("click", () => this.updateQuantity("full", -1));
    document.getElementById("btnPlusHalf").addEventListener("click", () => this.updateQuantity("half", 1));
    document.getElementById("btnMinusHalf").addEventListener("click", () => this.updateQuantity("half", -1));

    // Fechar Checkout
    document.getElementById("btnCloseCheckout").addEventListener("click", () => this.closeCheckout());

    // Submissão da Compra Simulada
    this.checkoutForm.addEventListener("submit", (e) => this.handleCheckoutSubmit(e));

    // Fechar Sucesso / Ingresso
    document.getElementById("btnCloseSuccessModal").addEventListener("click", () => {
      this.ticketSuccessModal.style.display = "none";
    });

    // Imprimir Ingresso
    document.getElementById("btnPrintTicket").addEventListener("click", () => {
      window.print();
    });

    // Abrir Caixa de E-mails a partir do Voucher
    document.getElementById("btnOpenSentMail").addEventListener("click", () => {
      this.ticketSuccessModal.style.display = "none";
      this.openMailbox();
    });

    // Abrir Caixa de E-mails pelo Header / Atalhos
    document.getElementById("btnOpenMailbox").addEventListener("click", () => this.openMailbox());
    document.getElementById("btnCloseMailbox").addEventListener("click", () => {
      this.mailboxModal.style.display = "none";
    });
    const footerLinkMailbox = document.getElementById("footerLinkMailbox");
    if (footerLinkMailbox) {
      footerLinkMailbox.addEventListener("click", () => this.openMailbox());
    }

    // Abrir Painel Administrativo
    const btnOpenAdmin = document.getElementById("btnOpenAdmin");
    const btnHeaderAdmin = document.getElementById("btnHeaderAdmin");
    const footerLinkAdmin = document.getElementById("footerLinkAdmin");
    const btnCloseAdmin = document.getElementById("btnCloseAdmin");

    [btnOpenAdmin, btnHeaderAdmin, footerLinkAdmin].forEach(btn => {
      if (btn) btn.addEventListener("click", () => this.openAdmin());
    });

    if (btnCloseAdmin) {
      btnCloseAdmin.addEventListener("click", () => {
        this.adminModal.style.display = "none";
      });
    }

    // Abas do Painel Administrativo
    const adminTabBtns = document.querySelectorAll(".admin-tab-btn");
    adminTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        adminTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tabKey = btn.dataset.adminTab;
        document.getElementById("tabAdminTickets").style.display = tabKey === "tickets" ? "block" : "none";
        document.getElementById("tabAdminSales").style.display = tabKey === "sales" ? "block" : "none";
        document.getElementById("tabAdminSettings").style.display = tabKey === "settings" ? "block" : "none";

        if (tabKey === "sales") this.renderAdminSales();
      });
    });

    // Abrir Formulário de Novo Ingresso no Admin
    document.getElementById("btnOpenNewTicketForm").addEventListener("click", () => {
      this.openTicketForm();
    });

    // Cancelar Formulário de Ingresso
    document.getElementById("btnCancelTicketForm").addEventListener("click", () => this.closeTicketForm());
    document.getElementById("btnCancelTicketForm2").addEventListener("click", () => this.closeTicketForm());

    // Salvar Ingresso no Admin (Create or Update)
    document.getElementById("ticketCrudForm").addEventListener("submit", (e) => this.handleTicketFormSubmit(e));

    // Resetar Dados Padrão (Settings)
    const resetBtns = [document.getElementById("btnResetToDefaults"), document.getElementById("footerLinkReset")];
    resetBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener("click", () => {
          if (confirm("Deseja realmente restaurar os dados de demonstração? Todas as compras simuladas serão limpas.")) {
            TicketUpStore.resetDefaults();
            this.renderCatalog();
            this.renderAdminTickets();
            this.renderAdminSales();
            this.updateMailBadge();
            showToast("Dados padrão restaurados com sucesso!", "success");
          }
        });
      }
    });

    // Exportar Backup
    const btnExportData = document.getElementById("btnExportData");
    if (btnExportData) {
      btnExportData.addEventListener("click", () => {
        const data = {
          exhibitions: TicketUpStore.getExhibitions(),
          orders: TicketUpStore.getOrders(),
          emails: TicketUpStore.getEmails(),
          exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ticketup-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Backup exportado com sucesso!", "success");
      });
    }

    // Fechar modais ao clicar no overlay escuro
    [this.checkoutModal, this.ticketSuccessModal, this.mailboxModal, this.adminModal].forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    });

    // Fechar modal ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.checkoutModal.style.display = "none";
        this.ticketSuccessModal.style.display = "none";
        this.mailboxModal.style.display = "none";
        this.adminModal.style.display = "none";
      }
    });
  }

  // ===========================================================================
  // RENDERIZAÇÃO DO CATÁLOGO DE INGRESSOS
  // ===========================================================================
  renderCatalog() {
    const exhibitions = TicketUpStore.getExhibitions();
    const filtered = exhibitions.filter(item => {
      const matchCat = this.currentCategory === "all" || item.category === this.currentCategory;
      const matchSearch = !this.currentSearch ||
        item.title.toLowerCase().includes(this.currentSearch) ||
        item.description.toLowerCase().includes(this.currentSearch) ||
        (item.location && item.location.toLowerCase().includes(this.currentSearch));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-size: 1.25rem; color: #475569; margin-bottom: 0.5rem;">Nenhum ingresso encontrado</h3>
          <p style="color: #64748b; font-size: 0.95rem;">Tente ajustar sua busca ou selecione outra categoria.</p>
        </div>
      `;
      return;
    }

    this.grid.innerHTML = filtered.map(item => {
      const isSoldOut = item.status === "soldout" || (item.capacity && item.sold >= item.capacity);
      const isPaused = item.status === "paused";

      let statusBadge = `<span class="ticket-status-pill active">Em Cartaz</span>`;
      if (isSoldOut) {
        statusBadge = `<span class="ticket-status-pill soldout">Esgotado</span>`;
      } else if (isPaused) {
        statusBadge = `<span class="ticket-status-pill paused">Venda Pausada</span>`;
      }

      return `
        <article class="ticket-card" data-id="${item.id}">
          <div class="ticket-card-thumb">
            <img src="${item.image || 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80'}" alt="${item.title}" loading="lazy">
            ${statusBadge}
            <span class="ticket-card-category">${item.category}</span>
          </div>
          <div class="ticket-card-body">
            <span class="ticket-card-location">📍 ${item.location || 'Ala Principal do Museu'}</span>
            <h3 class="ticket-card-title">${item.title}</h3>
            <p class="ticket-card-desc">${item.description}</p>
            
            <div class="ticket-pricing-row">
              <div class="price-col">
                <span class="price-type">Meia-Entrada</span>
                <span class="price-val">${formatCurrency(item.priceHalf)}</span>
              </div>
              <div class="price-col">
                <span class="price-type">Inteira</span>
                <span class="price-val highlight">${formatCurrency(item.priceFull)}</span>
              </div>
            </div>

            <div class="ticket-card-footer">
              ${isSoldOut ? `
                <button class="btn btn-outline-dark btn-block" disabled style="opacity: 0.6; cursor: not-allowed;">
                  Ingressos Esgotados
                </button>
              ` : isPaused ? `
                <button class="btn btn-outline-dark btn-block" disabled style="opacity: 0.6; cursor: not-allowed;">
                  Vendas Temporariamente Suspensas
                </button>
              ` : `
                <button class="btn btn-primary btn-block btn-buy-ticket" data-id="${item.id}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Garantir Ingresso
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Adicionar eventos aos botões de compra renderizados
    this.grid.querySelectorAll(".btn-buy-ticket").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id, 10);
        this.openCheckout(id);
      });
    });
  }

  // ===========================================================================
  // FLUXO DE COMPRA & CHECKOUT SIMULADO
  // ===========================================================================
  openCheckout(ticketId) {
    const exhibitions = TicketUpStore.getExhibitions();
    const item = exhibitions.find(t => t.id === ticketId);
    if (!item) return;

    this.selectedExhibition = item;
    document.getElementById("checkoutTicketId").value = item.id;
    document.getElementById("modalExhibitionTitle").textContent = item.title;
    this.displayFullPriceEl.textContent = formatCurrency(item.priceFull);
    this.displayHalfPriceEl.textContent = formatCurrency(item.priceHalf);

    // Resetar quantidades
    this.qtyFull = 1;
    this.qtyHalf = 0;
    this.qtyFullEl.textContent = "1";
    this.qtyHalfEl.textContent = "0";

    this.updateCheckoutTotals();
    this.checkoutModal.style.display = "flex";
  }

  closeCheckout() {
    this.checkoutModal.style.display = "none";
  }

  updateQuantity(type, delta) {
    if (type === "full") {
      this.qtyFull = Math.max(0, this.qtyFull + delta);
      // Garantir ao menos 1 ingresso selecionado no total
      if (this.qtyFull === 0 && this.qtyHalf === 0) {
        if (delta < 0) this.qtyFull = 1;
      }
      this.qtyFullEl.textContent = this.qtyFull;
    } else {
      this.qtyHalf = Math.max(0, this.qtyHalf + delta);
      if (this.qtyFull === 0 && this.qtyHalf === 0) {
        if (delta < 0) this.qtyHalf = 1;
      }
      this.qtyHalfEl.textContent = this.qtyHalf;
    }
    this.updateCheckoutTotals();
  }

  updateCheckoutTotals() {
    if (!this.selectedExhibition) return;
    const totalTickets = this.qtyFull + this.qtyHalf;
    const totalAmount = (this.qtyFull * this.selectedExhibition.priceFull) +
                        (this.qtyHalf * this.selectedExhibition.priceHalf);

    this.summaryTicketsCountEl.textContent = `${totalTickets} ingresso${totalTickets > 1 ? "s" : ""} selecionado${totalTickets > 1 ? "s" : ""}`;
    this.summaryTotalAmountEl.textContent = formatCurrency(totalAmount);
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();

    const totalTickets = this.qtyFull + this.qtyHalf;
    if (totalTickets <= 0) {
      showToast("Selecione ao menos 1 ingresso para continuar.", "warning");
      return;
    }

    const buyerName = document.getElementById("buyerName").value.trim();
    const buyerEmail = document.getElementById("buyerEmail").value.trim();
    const buyerDoc = document.getElementById("buyerDoc").value.trim();
    const visitDate = document.getElementById("visitDate").value;
    const visitTime = document.getElementById("visitTimeSlot").value;
    const paymentMethod = document.querySelector('input[name="simulatedPayment"]:checked').value;

    const totalAmount = (this.qtyFull * this.selectedExhibition.priceFull) +
                        (this.qtyHalf * this.selectedExhibition.priceHalf);

    // Efeito de carregamento realista
    const submitBtn = document.getElementById("btnSubmitPurchase");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");
    submitBtn.disabled = true;
    btnText.style.display = "none";
    btnSpinner.style.display = "inline-block";

    setTimeout(() => {
      // Restaurar botão
      submitBtn.disabled = false;
      btnText.style.display = "inline-block";
      btnSpinner.style.display = "none";

      // Criar Pedido
      const orderCode = `TK-${Math.floor(1000 + Math.random() * 9000)}-2026`;
      const newOrder = {
        id: Date.now(),
        code: orderCode,
        ticketId: this.selectedExhibition.id,
        exhibitionTitle: this.selectedExhibition.title,
        location: this.selectedExhibition.location || "Ala Central do Museu",
        buyerName,
        buyerEmail,
        buyerDoc,
        visitDate,
        visitTime,
        qtyFull: this.qtyFull,
        qtyHalf: this.qtyHalf,
        totalTickets,
        totalAmount,
        paymentMethod,
        createdAt: new Date().toISOString()
      };

      TicketUpStore.addOrder(newOrder);

      // Atualizar contagem de ingressos vendidos na exposição
      const exhibitions = TicketUpStore.getExhibitions();
      const currentEx = exhibitions.find(ex => ex.id === this.selectedExhibition.id);
      if (currentEx) {
        currentEx.sold = (currentEx.sold || 0) + totalTickets;
        if (currentEx.capacity && currentEx.sold >= currentEx.capacity) {
          currentEx.status = "soldout";
        }
        TicketUpStore.saveExhibitions(exhibitions);
      }

      // Disparar envio de e-mail simulado com o ingresso
      this.sendSimulatedEmail(newOrder);

      // Fechar checkout e abrir voucher
      this.closeCheckout();
      this.openTicketSuccessModal(newOrder);
      this.renderCatalog();
      this.updateMailBadge();

      showToast("Compra aprovada! Ingressos enviados para seu e-mail.", "success");
    }, 1100);
  }

  // ===========================================================================
  // VOUCHER / INGRESSO DIGITAL
  // ===========================================================================
  openTicketSuccessModal(order) {
    this.activeOrder = order;

    document.getElementById("ticketSentEmail").textContent = order.buyerEmail;
    document.getElementById("tExhibition").textContent = order.exhibitionTitle;
    document.getElementById("tDate").textContent = formatDateBR(order.visitDate);
    document.getElementById("tTime").textContent = order.visitTime;
    document.getElementById("tBuyer").textContent = order.buyerName;
    document.getElementById("tDoc").textContent = order.buyerDoc;
    document.getElementById("tCode").textContent = order.code;
    document.getElementById("tTotalPrice").textContent = `Total: ${formatCurrency(order.totalAmount)}`;

    const qtyParts = [];
    if (order.qtyFull > 0) qtyParts.push(`${order.qtyFull}x Inteira`);
    if (order.qtyHalf > 0) qtyParts.push(`${order.qtyHalf}x Meia`);
    document.getElementById("tSummaryQty").textContent = qtyParts.join(" + ");

    // Desenhar QR Code dinâmico no canvas
    const canvas = document.getElementById("ticketQrCanvas");
    drawSimulatedQr(canvas, `TICKETUP:${order.code}:${order.buyerDoc}:${order.visitDate}`);

    this.ticketSuccessModal.style.display = "flex";
  }

  // ===========================================================================
  // SISTEMA DE E-MAILS SIMULADOS
  // ===========================================================================
  sendSimulatedEmail(order) {
    const emailSubject = `Seus Ingressos para o Museu TicketUp chegaram! [${order.code}]`;
    const emailBodyHtml = `
      <div style="font-family: sans-serif; color: #09090b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <div style="background-color: #09090b; padding: 20px; border-radius: 8px 8px 0 0; color: #fff; display: flex; align-items: center; gap: 14px;">
          <img src="assets/logo.jpg" alt="TicketUp" style="width: 44px; height: 44px; object-fit: contain; background: #fff; border-radius: 8px; padding: 2px;">
          <div>
            <h2 style="margin: 0; font-size: 19px; color: #fff;">Museu TicketUp - Confirmação de Ingressos</h2>
            <span style="font-size: 13px; color: #93c5fd;">Pedido #${order.code} • Pagamento Simulado Aprovado</span>
          </div>
        </div>
        
        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; background-color: #ffffff; border-radius: 0 0 8px 8px;">
          <p>Olá, <strong>${order.buyerName}</strong>!</p>
          <p>Seus ingressos para a exposição <strong>"${order.exhibitionTitle}"</strong> já estão confirmados e disponíveis para acesso.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #1d4ed8; padding: 14px 18px; margin: 18px 0; border-radius: 4px;">
            <p style="margin: 4px 0;"><strong>Exposição:</strong> ${order.exhibitionTitle}</p>
            <p style="margin: 4px 0;"><strong>Data da Visita:</strong> ${formatDateBR(order.visitDate)}</p>
            <p style="margin: 4px 0;"><strong>Horário de Entrada:</strong> ${order.visitTime}</p>
            <p style="margin: 4px 0;"><strong>Local:</strong> ${order.location}</p>
            <p style="margin: 4px 0;"><strong>Ingressos:</strong> ${order.qtyFull} Inteira(s) e ${order.qtyHalf} Meia-entrada(s)</p>
            <p style="margin: 4px 0;"><strong>Total Pago:</strong> ${formatCurrency(order.totalAmount)}</p>
          </div>

          <h4 style="margin-top: 20px; margin-bottom: 8px;">Instruções para o dia da visita:</h4>
          <ul style="padding-left: 20px; font-size: 14px; color: #475569;">
            <li>Apresente este e-mail ou o voucher digital na catraca de entrada.</li>
            <li>Tenha em mãos um documento oficial com foto.</li>
            <li>Para ingressos de meia-entrada, a comprovação estudantil/funcional será solicitada.</li>
            <li>Recomendamos chegar com 15 minutos de antecedência.</li>
          </ul>

          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            Museu TicketUp • Av. das Belas Artes, 1200 - Centro Histórico<br>
            Este é um e-mail simulado gerado pela plataforma de demonstração TicketUp.
          </div>
        </div>
      </div>
    `;

    const emailRecord = {
      id: Date.now(),
      orderCode: order.code,
      to: order.buyerEmail,
      from: "ingressos@ticketup.museu.br",
      senderName: "Bilheteria Museu TicketUp",
      subject: emailSubject,
      snippet: `Olá, ${order.buyerName}! Seus ingressos para "${order.exhibitionTitle}" estão confirmados...`,
      bodyHtml: emailBodyHtml,
      receivedAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      read: false,
      orderRef: order
    };

    TicketUpStore.addEmail(emailRecord);
  }

  openMailbox() {
    this.renderMailbox();
    this.mailboxModal.style.display = "flex";
  }

  updateMailBadge() {
    const emails = TicketUpStore.getEmails();
    const unread = emails.filter(e => !e.read).length;
    if (this.unreadMailBadge) {
      if (unread > 0) {
        this.unreadMailBadge.style.display = "inline-block";
        this.unreadMailBadge.textContent = unread;
      } else {
        this.unreadMailBadge.style.display = "none";
      }
    }
  }

  renderMailbox() {
    const emails = TicketUpStore.getEmails();
    const container = document.getElementById("mailItemsContainer");
    const countText = document.getElementById("mailCountText");
    const readPane = document.getElementById("mailFullView");
    const emptyState = document.getElementById("mailEmptyState");

    countText.textContent = `${emails.length} e-mail${emails.length !== 1 ? "s" : ""}`;

    if (emails.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">
          Nenhum e-mail recebido ainda.<br>Faça uma compra simulada para testar o envio!
        </div>
      `;
      readPane.style.display = "none";
      emptyState.style.display = "flex";
      return;
    }

    container.innerHTML = emails.map((mail, idx) => `
      <div class="mail-item ${mail.read ? '' : 'unread'}" data-email-id="${mail.id}">
        <div class="mail-item-header">
          <span>${mail.senderName}</span>
          <span>${mail.receivedAt}</span>
        </div>
        <div class="mail-item-subject">${mail.subject}</div>
        <div class="mail-item-snippet">${mail.snippet}</div>
      </div>
    `).join("");

    // Adicionar clique nos e-mails
    container.querySelectorAll(".mail-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = parseInt(item.dataset.emailId, 10);
        this.selectEmailToRead(id);
      });
    });

    // Abrir o primeiro e-mail automaticamente
    this.selectEmailToRead(emails[0].id);
  }

  selectEmailToRead(emailId) {
    const emails = TicketUpStore.getEmails();
    const mail = emails.find(e => e.id === emailId);
    if (!mail) return;

    TicketUpStore.markEmailAsRead(emailId);
    this.updateMailBadge();

    // Atualizar UI de seleção
    document.querySelectorAll(".mail-item").forEach(el => {
      el.classList.remove("selected");
      if (parseInt(el.dataset.emailId, 10) === emailId) {
        el.classList.add("selected");
        el.classList.remove("unread");
      }
    });

    const readPane = document.getElementById("mailFullView");
    const emptyState = document.getElementById("mailEmptyState");
    emptyState.style.display = "none";
    readPane.style.display = "block";

    readPane.innerHTML = `
      <div class="mail-full-header">
        <h3 class="mail-subject">${mail.subject}</h3>
        <div class="mail-meta">
          <div>
            <strong>De:</strong> ${mail.senderName} &lt;${mail.from}&gt;<br>
            <strong>Para:</strong> ${mail.to}
          </div>
          <div>
            <span>${mail.receivedAt}</span>
          </div>
        </div>
      </div>
      <div class="mail-rendered-body">
        ${mail.bodyHtml}
      </div>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button class="btn btn-outline-dark btn-sm" id="btnMailViewVoucher">
          Ver Ingresso em Tela Cheia
        </button>
      </div>
    `;

    const btnViewVoucher = document.getElementById("btnMailViewVoucher");
    if (btnViewVoucher && mail.orderRef) {
      btnViewVoucher.addEventListener("click", () => {
        this.mailboxModal.style.display = "none";
        this.openTicketSuccessModal(mail.orderRef);
      });
    }
  }

  // ===========================================================================
  // PAINEL ADMINISTRATIVO (CRUD DE INGRESSOS E VENDAS)
  // ===========================================================================
  openAdmin() {
    this.renderAdminTickets();
    this.renderAdminSales();
    this.closeTicketForm();
    this.adminModal.style.display = "flex";
  }

  renderAdminTickets() {
    const exhibitions = TicketUpStore.getExhibitions();
    const tbody = document.getElementById("adminTicketsTableBody");

    tbody.innerHTML = exhibitions.map(item => {
      let statusClass = "status-active";
      let statusLabel = "À Venda";
      if (item.status === "paused") {
        statusClass = "status-paused";
        statusLabel = "Pausado";
      } else if (item.status === "soldout") {
        statusClass = "status-soldout";
        statusLabel = "Esgotado";
      }

      return `
        <tr>
          <td>
            <strong>${item.title}</strong>
            <div style="font-size: 0.75rem; color: #64748b;">${item.location || 'Sem ala definida'}</div>
          </td>
          <td><span class="table-tag" style="background:#e2e8f0; color:#334155;">${item.category}</span></td>
          <td>
            Int: ${formatCurrency(item.priceFull)}<br>
            <span style="font-size: 0.8rem; color:#64748b;">Meia: ${formatCurrency(item.priceHalf)}</span>
          </td>
          <td>
            <strong>${item.sold || 0}</strong> / ${item.capacity} vagas
          </td>
          <td>
            <span class="table-tag ${statusClass}">${statusLabel}</span>
          </td>
          <td>
            <div class="table-action-btns">
              <button class="table-btn btn-edit-ticket" data-id="${item.id}" title="Editar informações">Editar</button>
              <button class="table-btn btn-toggle-status" data-id="${item.id}" title="Alternar status de venda">
                ${item.status === "active" ? "Pausar" : "Ativar"}
              </button>
              <button class="table-btn btn-del btn-del-ticket" data-id="${item.id}" title="Excluir do catálogo">Excluir</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Ações da tabela
    tbody.querySelectorAll(".btn-edit-ticket").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        this.openTicketForm(id);
      });
    });

    tbody.querySelectorAll(".btn-toggle-status").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        this.toggleTicketStatus(id);
      });
    });

    tbody.querySelectorAll(".btn-del-ticket").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        this.deleteTicket(id);
      });
    });
  }

  renderAdminSales() {
    const orders = TicketUpStore.getOrders();
    const tbody = document.getElementById("adminSalesTableBody");
    const countBadge = document.getElementById("adminOrdersCount");
    const revenueEl = document.getElementById("adminTotalRevenue");

    countBadge.textContent = orders.length;

    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    revenueEl.textContent = formatCurrency(totalRevenue);

    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: #94a3b8;">
            Nenhuma venda registrada ainda. Realize uma compra simulada no site para ver o relatório em tempo real!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = orders.map(order => `
      <tr>
        <td><code>${order.code}</code></td>
        <td>${formatDateBR(order.visitDate)} às ${order.visitTime}</td>
        <td>
          <strong>${order.buyerName}</strong><br>
          <span style="font-size: 0.775rem; color: #64748b;">${order.buyerEmail}</span>
        </td>
        <td>${order.exhibitionTitle}</td>
        <td>${order.totalTickets} ingresso(s)</td>
        <td><strong>${formatCurrency(order.totalAmount)}</strong></td>
        <td>
          <button class="table-btn btn-view-order-ticket" data-code="${order.code}">Ver Ingresso</button>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".btn-view-order-ticket").forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.dataset.code;
        const targetOrder = orders.find(o => o.code === code);
        if (targetOrder) {
          this.adminModal.style.display = "none";
          this.openTicketSuccessModal(targetOrder);
        }
      });
    });
  }

  openTicketForm(ticketId = null) {
    const formBox = document.getElementById("adminTicketFormBox");
    const titleEl = document.getElementById("adminFormTitle");
    const form = document.getElementById("ticketCrudForm");

    form.reset();

    if (ticketId) {
      const exhibitions = TicketUpStore.getExhibitions();
      const item = exhibitions.find(t => t.id === ticketId);
      if (item) {
        titleEl.textContent = `Editar Ingresso: ${item.title}`;
        document.getElementById("crudTicketId").value = item.id;
        document.getElementById("crudTitle").value = item.title;
        document.getElementById("crudCategory").value = item.category;
        document.getElementById("crudPriceFull").value = item.priceFull;
        document.getElementById("crudPriceHalf").value = item.priceHalf;
        document.getElementById("crudCapacity").value = item.capacity;
        document.getElementById("crudStatus").value = item.status;
        document.getElementById("crudImage").value = item.image || "";
        document.getElementById("crudLocation").value = item.location || "";
        document.getElementById("crudDescription").value = item.description;
      }
    } else {
      titleEl.textContent = "Cadastrar Novo Ingresso para o Museu";
      document.getElementById("crudTicketId").value = "";
    }

    formBox.style.display = "block";
    formBox.scrollIntoView({ behavior: "smooth" });
  }

  closeTicketForm() {
    const formBox = document.getElementById("adminTicketFormBox");
    formBox.style.display = "none";
  }

  handleTicketFormSubmit(e) {
    e.preventDefault();

    const idVal = document.getElementById("crudTicketId").value;
    const title = document.getElementById("crudTitle").value.trim();
    const category = document.getElementById("crudCategory").value;
    const priceFull = parseFloat(document.getElementById("crudPriceFull").value) || 0;
    const priceHalf = parseFloat(document.getElementById("crudPriceHalf").value) || 0;
    const capacity = parseInt(document.getElementById("crudCapacity").value, 10) || 100;
    const status = document.getElementById("crudStatus").value;
    let image = document.getElementById("crudImage").value.trim();
    const location = document.getElementById("crudLocation").value.trim();
    const description = document.getElementById("crudDescription").value.trim();

    if (!image) {
      image = "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80";
    }

    const exhibitions = TicketUpStore.getExhibitions();

    if (idVal) {
      // Atualização
      const ticketId = parseInt(idVal, 10);
      const index = exhibitions.findIndex(t => t.id === ticketId);
      if (index !== -1) {
        exhibitions[index] = {
          ...exhibitions[index],
          title,
          category,
          priceFull,
          priceHalf,
          capacity,
          status,
          image,
          location,
          description
        };
        showToast("Ingresso atualizado com sucesso!", "success");
      }
    } else {
      // Criação de Novo Ingresso
      const newTicket = {
        id: Date.now(),
        title,
        category,
        priceFull,
        priceHalf,
        capacity,
        sold: 0,
        status,
        image,
        location,
        description
      };
      exhibitions.unshift(newTicket);
      showToast("Novo ingresso colocado à venda!", "success");
    }

    TicketUpStore.saveExhibitions(exhibitions);
    this.closeTicketForm();
    this.renderAdminTickets();
    this.renderCatalog();
  }

  toggleTicketStatus(ticketId) {
    const exhibitions = TicketUpStore.getExhibitions();
    const ticket = exhibitions.find(t => t.id === ticketId);
    if (!ticket) return;

    if (ticket.status === "active") {
      ticket.status = "paused";
      showToast(`Vendas de "${ticket.title}" foram pausadas.`, "info");
    } else {
      ticket.status = "active";
      showToast(`Vendas de "${ticket.title}" foram reativadas!`, "success");
    }

    TicketUpStore.saveExhibitions(exhibitions);
    this.renderAdminTickets();
    this.renderCatalog();
  }

  deleteTicket(ticketId) {
    if (!confirm("Tem certeza que deseja excluir este ingresso do acervo?")) return;

    let exhibitions = TicketUpStore.getExhibitions();
    exhibitions = exhibitions.filter(t => t.id !== ticketId);
    TicketUpStore.saveExhibitions(exhibitions);

    this.renderAdminTickets();
    this.renderCatalog();
    showToast("Ingresso removido do catálogo.", "info");
  }
}

// Inicializar aplicação assim que o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  window.ticketUpApp = new TicketUpApp();
});
