import React, { useState, useMemo } from 'react';
import {
  Instagram,
  ShoppingBag,
  Sparkles,
  Heart,
  Package,
  ArrowRight,
  Gift,
  Menu,
  X,
  MessageCircle,
  SlidersHorizontal,
} from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  CORD_PALETTES,
  OCCASIONS,
  MESSAGE_SUGGESTIONS,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from './data/catalog';
import { BrandEmblem } from './components/BrandEmblem';
import { GiftBuilderSection } from './components/GiftBuilderSection';
import { CustomizeModal } from './components/CustomizeModal';
import { BagDrawer } from './components/BagDrawer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bagItems, setBagItems] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [giftDraft, setGiftDraft] = useState({
    occasion: 'casa-nova',
    recipient: '',
    sender: '',
    message: MESSAGE_SUGGESTIONS['casa-nova'],
    messageTouched: false,
  });

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToBag = (newItem) => {
    setBagItems((prev) => [...prev, newItem]);
    setIsBagOpen(true);
  };

  const openBagDrawer = () => {
    setIsBagOpen(true);
  };

  const handleRemoveItem = (uid) => {
    setBagItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStartProductWhatsApp = (product) => {
    const occasionObj = OCCASIONS.find((o) => o.id === giftDraft.occasion);
    const lines = [
      'Olá, Entre Nós Ateliê! 🌿',
      `Me encantei pela peça *${product.name}* e gostaria de encomendar sob medida.`,
    ];

    if (giftDraft.recipient.trim()) {
      lines.push('');
      lines.push(
        `🎁 *É para presentear:* ${giftDraft.recipient.trim()} (${occasionObj?.label || 'Lembrança especial'})`
      );
      if (giftDraft.message.trim()) {
        lines.push(`✍️ *Cartão manuscrito:* "${giftDraft.message.trim()}"`);
      }
      if (giftDraft.sender.trim()) {
        lines.push(`🤍 *Assinatura:* ${giftDraft.sender.trim()}`);
      }
    }

    lines.push('', 'Podemos conversar sobre cores, medidas e detalhes da encomenda? 🤍');

    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const handleCustomProjectWhatsApp = () => {
    const text = [
      'Olá, Entre Nós Ateliê! 🌿',
      'Gostaria de conversar sobre uma *encomenda especial sob medida* (ou lembrancinhas personalizadas).',
      'Pode me ajudar a escolher cores e detalhes?',
    ].join('\n');
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="site-wrapper">
      {/* Delicate Top Ribbon */}
      <div className="top-ribbon">
        <span>
          🌿 Macramê autoral em fibras naturais · Tudo feito sob encomenda · Enviamos para todo o Brasil 📦
        </span>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#inicio"
            className="logo-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <BrandEmblem size={46} showWordmark />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#colecao" onClick={(e) => { e.preventDefault(); scrollToSection('colecao'); }}>
              Coleção
            </a>
            <a href="#lembrancas" onClick={(e) => { e.preventDefault(); scrollToSection('lembrancas'); }}>
              Monte sua Lembrança
            </a>
            <a href="#sob-medida" onClick={(e) => { e.preventDefault(); scrollToSection('sob-medida'); }}>
              Sob Medida
            </a>
            <a href="#historia" onClick={(e) => { e.preventDefault(); scrollToSection('historia'); }}>
              O Ateliê
            </a>
          </nav>

          <div className="header-actions">
            <a
              href="https://www.instagram.com/entrenos.boho/"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-pill"
              aria-label="Instagram Entre Nós Ateliê"
            >
              <Instagram size={15} />
              <span>@entrenos.boho</span>
            </a>

            <button
              type="button"
              className="bag-btn"
              onClick={openBagDrawer}
              aria-label="Abrir sacola de encomendas"
            >
              <ShoppingBag size={16} />
              <span>Sacola</span>
              {bagItems.length > 0 && (
                <span className="bag-count">{bagItems.length}</span>
              )}
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Abrir menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#colecao" onClick={(e) => { e.preventDefault(); scrollToSection('colecao'); }}>
              Coleção Artesanal
            </a>
            <a href="#lembrancas" onClick={(e) => { e.preventDefault(); scrollToSection('lembrancas'); }}>
              Monte sua Lembrança
            </a>
            <a href="#sob-medida" onClick={(e) => { e.preventDefault(); scrollToSection('sob-medida'); }}>
              Como funciona o Sob Medida
            </a>
            <a href="#historia" onClick={(e) => { e.preventDefault(); scrollToSection('historia'); }}>
              Nossa História
            </a>
            <a
              href="https://www.instagram.com/entrenos.boho/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @entrenos.boho
            </a>
          </div>
        )}
      </header>

      <main id="inicio">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <Sparkles size={14} />
                <span>Feito à mão, com alma e intenção</span>
              </div>

              <h1>
                Nós que unem histórias: <em>lembranças</em> tecidas à mão para quem mora no seu coração.
              </h1>

              <p className="hero-subtitle">
                No <strong>Entre Nós Ateliê</strong>, cada peça em macramê nasce de fios 100% naturais,
                exclusivamente <strong>sob encomenda</strong>. Pensadas para transformar espaços em
                lares — e eternizar o seu carinho na casa de alguém especial.
              </p>

              <div className="hero-cta-group">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollToSection('colecao')}
                >
                  Escolher uma Lembrança <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => scrollToSection('lembrancas')}
                >
                  <Gift size={16} /> Escrever cartão de presente
                </button>
              </div>

              <div className="hero-whispers">
                <span>🤍 100% algodão natural</span>
                <span>✨ Tudo feito sob encomenda</span>
                <span>✍️ Cartão escrito à mão</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-arch-frame">
                <img
                  src="/images/hero-atelier.jpg"
                  alt="Grande painel boho em macramê natural feito à mão pelo Entre Nós Ateliê"
                />
              </div>

              <div className="floating-keepsake-card">
                <span className="floating-tag-icon">🎁</span>
                <div>
                  <strong>Pronto para emocionar</strong>
                  <span>Vai na sacola kraft com barbante &amp; flores secas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars of Delicacy & Authenticity */}
        <section className="pillars-section">
          <div className="container">
            <div className="pillars-grid">
              <article className="pillar-card">
                <span className="pillar-num">01</span>
                <h3>Tempo e presença em cada nó</h3>
                <p>
                  Nada aqui é produção em série. Cada cordão de algodão é trançado manualmente,
                  respeitando a delicadeza de uma peça feita especialmente para o seu pedido.
                </p>
              </article>

              <article className="pillar-card">
                <span className="pillar-num">02</span>
                <h3>Sob medida para quem vai receber</h3>
                <p>
                  Você escolhe a paleta de fios — do algodão cru ao mostarda ocre ou verde sálvia —
                  e adapta cada detalhe para combinar com o cantinho de quem você ama.
                </p>
              </article>

              <article className="pillar-card">
                <span className="pillar-num">03</span>
                <h3>Uma lembrança que abraça</h3>
                <p>
                  Embalagem artesanal em papel kraft, tag botânica e sua dedicatória transcrita à mão
                  em papel texturizado, para transformar o ato de abrir em memória.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Collection Showcase */}
        <section id="colecao" className="collection-section">
          <div className="container">
            <div className="section-header-split">
              <div>
                <span className="eyebrow">
                  <Heart size={14} /> Coleção Sob Encomenda
                </span>
                <h2>
                  Peças autorais para <em>presentear</em> ou acolher o seu lar
                </h2>
              </div>
              <p className="section-lead">
                Toque na foto de qualquer peça para iniciar uma conversa no WhatsApp com o ateliê, ou
                personalize cores e cartão antes de encomendar.
              </p>
            </div>

            <div className="category-bar" role="tablist" aria-label="Filtrar peças por categoria">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`cat-pill ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => {
                const swatches = CORD_PALETTES.filter((c) =>
                  product.palettes.includes(c.id)
                );
                return (
                  <article key={product.id} className="product-card">
                    <div
                      className="product-media"
                      onClick={() => handleStartProductWhatsApp(product)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Conversar no WhatsApp sobre ${product.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleStartProductWhatsApp(product);
                        }
                      }}
                    >
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="product-badge">{product.badge}</span>
                      <div className="product-hover-hint">
                        <span>💬 Conversar sobre esta peça no WhatsApp</span>
                      </div>
                    </div>

                    <div className="product-body">
                      <div className="product-top-meta">
                        <span className="product-dims">{product.sizeLabel}</span>
                        <span className="product-lead">Sob encomenda</span>
                      </div>

                      <h3>{product.name}</h3>
                      <p className="product-for-who">{product.forWho}</p>

                      <div className="product-swatches" aria-label="Cores disponíveis">
                        {swatches.map((sw) => (
                          <span
                            key={sw.id}
                            className="card-swatch-dot"
                            title={sw.name}
                            style={{
                              backgroundColor: sw.hex,
                              borderColor: sw.ring,
                            }}
                          />
                        ))}
                        <span className="swatch-label-hint">cores personalizáveis</span>
                      </div>

                      <div className="product-footer">
                        <button
                          type="button"
                          className="btn-card-customize"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <SlidersHorizontal size={14} /> Personalizar
                        </button>
                        <button
                          type="button"
                          className="btn-card-action"
                          onClick={() => handleStartProductWhatsApp(product)}
                        >
                          <MessageCircle size={14} /> Escolher
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Interactive Gift Packaging & Handwritten Card Builder */}
        <GiftBuilderSection
          giftDraft={giftDraft}
          onChangeGiftDraft={setGiftDraft}
          onApplyToCollection={() => {
            setActiveCategory('lembrancas');
            scrollToSection('colecao');
          }}
        />

        {/* Bespoke Process Timeline */}
        <section id="sob-medida" className="process-section">
          <div className="container">
            <div className="section-center-head">
              <span className="eyebrow">
                <Package size={14} /> Como nasce a sua encomenda
              </span>
              <h2>
                Do primeiro nó até chegar às mãos de quem você ama
              </h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <span className="step-circle">1</span>
                <h4>Escolha a peça &amp; as cores</h4>
                <p>
                  Toque na criação que tocou seu coração e converse com a gente pelo WhatsApp para
                  definir tons, medidas e se será um presente.
                </p>
              </div>

              <div className="process-step">
                <span className="step-circle">2</span>
                <h4>Escreva sua dedicatória</h4>
                <p>
                  Transcrevemos a sua mensagem à mão no nosso cartão de papel texturizado, assinado
                  com o seu carinho.
                </p>
              </div>

              <div className="process-step">
                <span className="step-circle">3</span>
                <h4>Tecemos nó por nó</h4>
                <p>
                  Tudo é feito exclusivamente sob encomenda no ateliê, sem pressa e com atenção a
                  cada detalhe do acabamento.
                </p>
              </div>

              <div className="process-step">
                <span className="step-circle">4</span>
                <h4>Embalagem afetiva</h4>
                <p>
                  Embalamos na sacola kraft com barbante e flores secas para chegar com todo cuidado
                  até quem vai receber em qualquer lugar do Brasil.
                </p>
              </div>
            </div>

            {/* Special Events & Custom Orders Banner */}
            <div className="bespoke-banner">
              <div className="bespoke-banner-copy">
                <span className="eyebrow-sm">Projetos Exclusivos &amp; Lembrancinhas</span>
                <h3>
                  Quer lembrancinhas de casamento, maternidade ou um painel em medida exclusiva?
                </h3>
                <p>
                  Criamos miniaturas personalizadas para datas marcantes e painéis sob medida para a
                  sua parede. Conte sua ideia e tecemos juntas!
                </p>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={handleCustomProjectWhatsApp}
              >
                <MessageCircle size={16} /> Conversar no WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Brand Story & Instagram Bridge */}
        <section id="historia" className="story-section">
          <div className="container story-grid">
            <div className="story-crest-col">
              <div className="story-crest-card">
                <BrandEmblem size={110} showWordmark={false} />
                <p className="story-crest-quote">
                  “Feito à mão, com alma e intenção.”
                </p>
                <span className="story-crest-handle">@entrenos.boho</span>
              </div>
            </div>

            <div className="story-copy-col">
              <span className="eyebrow">Sobre o Entre Nós Ateliê</span>
              <h2>
                Entre um nó e outro, nasce o desejo de tornar o mundo mais <em>gentil</em>.
              </h2>
              <p>
                O <strong>Entre Nós</strong> nasceu do encantamento pelas fibras naturais e pela
                beleza das coisas feitas sem pressa. Acreditamos que uma casa acolhedora — e um
                presente inesquecível — não precisa de excessos, mas sim de verdade.
              </p>
              <p>
                Cada cordão de algodão cru, cada galho tratado à mão e cada laço de barbante na
                embalagem carregam um convite: desacelerar, notar os detalhes e lembrar quem
                amamos do quanto ela é especial.
              </p>

              <div className="story-actions">
                <a
                  href="https://www.instagram.com/entrenos.boho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Instagram size={16} /> Acompanhar o ateliê no Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <BrandEmblem size={52} showWordmark />
            <p>
              Macramê autoral em fibras naturais. Peças feitas à mão, sob encomenda, para transformar
              espaços em lares e eternizar lembranças cheias de afeto.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navegar</h4>
            <a href="#colecao" onClick={(e) => { e.preventDefault(); scrollToSection('colecao'); }}>
              Coleção Sob Encomenda
            </a>
            <a href="#lembrancas" onClick={(e) => { e.preventDefault(); scrollToSection('lembrancas'); }}>
              Monte sua Lembrança
            </a>
            <a href="#sob-medida" onClick={(e) => { e.preventDefault(); scrollToSection('sob-medida'); }}>
              Como funciona o Sob Medida
            </a>
            <a href="#historia" onClick={(e) => { e.preventDefault(); scrollToSection('historia'); }}>
              Sobre o Ateliê
            </a>
          </div>

          <div className="footer-contact">
            <h4>Ateliê &amp; Encomendas</h4>
            <p>✨ Tudo feito sob encomenda</p>
            <p>📦 Enviamos para todo o Brasil</p>
            <a
              href={buildWhatsAppUrl('Olá, Entre Nós Ateliê! 🌿 Vim pelo site e gostaria de fazer uma encomenda.')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ig-link"
            >
              <MessageCircle size={15} /> WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a
              href="https://www.instagram.com/entrenos.boho/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ig-link"
            >
              <Instagram size={15} /> instagram.com/entrenos.boho
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Entre Nós Ateliê · Feito à mão, com alma e intenção.</span>
          <span>Macramê · Fibras Naturais · Lembranças Afetivas</span>
        </div>
      </footer>

      {/* Bespoke Customizer Modal */}
      <CustomizeModal
        product={selectedProduct}
        initialGiftDraft={giftDraft}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      {/* Order Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}
