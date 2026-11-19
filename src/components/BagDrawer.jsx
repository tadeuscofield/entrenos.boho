import React, { useState } from 'react';
import {
  X,
  Trash2,
  Gift,
  MessageCircle,
  Copy,
  Check,
  Instagram,
  ShoppingBag,
  Plus,
} from 'lucide-react';
import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from '../data/catalog';

export function BagDrawer({
  isOpen,
  items,
  onClose,
  onRemoveItem,
  onClearBag,
}) {
  const [customerName, setCustomerName] = useState('');
  const [cityState, setCityState] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formatOrderText = () => {
    const header = [
      `Olá, Entre Nós Ateliê! 🌿✨`,
      customerName.trim()
        ? `Me chamo *${customerName.trim()}* e escolhi essas peças sob encomenda pelo site:`
        : `Escolhi essas peças sob encomenda pelo site:`,
      ``,
    ];

    const itemLines = items.flatMap((item, idx) => {
      const block = [
        `*${idx + 1}. ${item.product.name}*`,
        `   • Fios: ${item.palette.name}`,
        `   • Suporte: ${item.support.name}`,
      ];
      if (item.isGift && item.gift) {
        block.push(`   • 🎁 Embalagem para presente (${item.gift.occasion.label})`);
        if (item.gift.recipient)
          block.push(`   • Para: ${item.gift.recipient}`);
        if (item.gift.message)
          block.push(`   • Cartão à mão: "${item.gift.message}"`);
        if (item.gift.sender)
          block.push(`   • De: ${item.gift.sender}`);
      }
      if (item.customNotes) {
        block.push(`   • Sob medida: ${item.customNotes}`);
      }
      block.push('');
      return block;
    });

    const footer = [
      cityState.trim() ? `*Cidade / Estado:* ${cityState.trim()}` : '',
      `Podemos conversar para alinhar os detalhes da encomenda? 🤍`,
    ].filter(Boolean);

    return [...header, ...itemLines, ...footer].join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formatOrderText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(buildWhatsAppUrl(formatOrderText()), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de encomendas"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="drawer-panel">
        <div className="drawer-header">
          <div>
            <span className="eyebrow-sm">Tudo feito sob encomenda</span>
            <h3>
              Sua Sacola de Carinho{' '}
              {items.length > 0 && (
                <span className="drawer-count-label">({items.length})</span>
              )}
            </h3>
          </div>
          <button
            type="button"
            className="icon-circle-btn"
            aria-label="Fechar sacola"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-body">
            <div className="drawer-empty">
              <div className="empty-circle">
                <ShoppingBag size={26} />
              </div>
              <h4>Sua sacola ainda está vazia</h4>
              <p>
                Escolha uma peça da coleção para conversar direto no WhatsApp ou
                personalizar os fios e o cartão manuscrito de presente.
              </p>
              <button type="button" className="btn-primary" onClick={onClose}>
                Explorar peças artesanais
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer-scroll-items">
              <div className="bag-items-list">
                {items.map((item) => (
                  <div key={item.uid} className="bag-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="bag-item-info">
                      <div className="bag-item-top">
                        <strong>{item.product.name}</strong>
                        <button
                          type="button"
                          className="remove-btn"
                          aria-label={`Remover ${item.product.name}`}
                          onClick={() => onRemoveItem(item.uid)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="bag-item-meta">
                        <span
                          className="mini-dot"
                          style={{ backgroundColor: item.palette.hex }}
                        />
                        {item.palette.name} · {item.support.name}
                      </p>
                      {item.isGift && item.gift && (
                        <div className="bag-gift-summary">
                          <div className="bag-gift-pill">
                            <Gift size={12} />
                            <span>
                              Presente ({item.gift.occasion.label})
                              {item.gift.recipient
                                ? ` para ${item.gift.recipient}`
                                : ''}
                            </span>
                          </div>
                          {item.gift.message && (
                            <p className="bag-gift-note">
                              “{item.gift.message}”
                              {item.gift.sender ? ` — ${item.gift.sender}` : ''}
                            </p>
                          )}
                        </div>
                      )}
                      {item.customNotes && (
                        <p className="bag-custom-note">
                          Sob medida: {item.customNotes}
                        </p>
                      )}
                      <div className="bag-item-bespoke">
                        Feito sob encomenda
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn-add-more"
                onClick={onClose}
              >
                <Plus size={15} /> Continuar escolhendo mais peças
              </button>
            </div>

            <div className="drawer-checkout-box">
              <div className="drawer-customer-fields">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cidade / UF (opcional)"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                />
              </div>

              <p className="drawer-shipping-note">
                📦 Tudo feito sob encomenda · Enviamos para todo o Brasil.
              </p>

              <div className="drawer-actions">
                <button
                  type="button"
                  className="btn-whatsapp full-width"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle size={18} /> Chamar no WhatsApp · {WHATSAPP_DISPLAY}
                </button>

                <div className="drawer-secondary-row">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCopySummary}
                  >
                    {copied ? (
                      <>
                        <Check size={15} /> Pedido copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={15} /> Copiar p/ Direct
                      </>
                    )}
                  </button>
                  <a
                    href="https://www.instagram.com/entrenos.boho/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <Instagram size={15} /> @entrenos.boho
                  </a>
                </div>

                <button
                  type="button"
                  className="clear-bag-link"
                  onClick={onClearBag}
                >
                  Limpar sacola
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
