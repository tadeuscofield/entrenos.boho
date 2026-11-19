import React, { useState, useEffect } from 'react';
import { X, Check, Gift, Sparkles, MessageCircle, ShoppingBag } from 'lucide-react';
import {
  CORD_PALETTES,
  WOOD_SUPPORTS,
  OCCASIONS,
  MESSAGE_SUGGESTIONS,
  buildWhatsAppUrl,
} from '../data/catalog';

export function CustomizeModal({
  product,
  initialGiftDraft,
  onClose,
  onAddToBag,
}) {
  const [paletteId, setPaletteId] = useState(
    product?.defaultPalette || 'cru'
  );
  const [supportId, setSupportId] = useState(
    product?.supports?.[0] || 'cavilha'
  );
  const [isGift, setIsGift] = useState(true);
  const [occasion, setOccasion] = useState(
    initialGiftDraft?.occasion || 'casa-nova'
  );
  const [recipient, setRecipient] = useState(
    initialGiftDraft?.recipient || ''
  );
  const [sender, setSender] = useState(initialGiftDraft?.sender || '');
  const [message, setMessage] = useState(
    initialGiftDraft?.message || MESSAGE_SUGGESTIONS['casa-nova']
  );
  const [customNotes, setCustomNotes] = useState('');

  useEffect(() => {
    if (!product) return;
    setPaletteId(product.defaultPalette || product.palettes[0]);
    setSupportId(product.supports[0]);
    setOccasion(initialGiftDraft?.occasion || 'casa-nova');
    setRecipient(initialGiftDraft?.recipient || '');
    setSender(initialGiftDraft?.sender || '');
    setMessage(
      initialGiftDraft?.message ||
        MESSAGE_SUGGESTIONS[initialGiftDraft?.occasion || 'casa-nova']
    );
    setCustomNotes('');
  }, [product, initialGiftDraft]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const availablePalettes = CORD_PALETTES.filter((p) =>
    product.palettes.includes(p.id)
  );
  const selectedPalette =
    CORD_PALETTES.find((p) => p.id === paletteId) || availablePalettes[0];
  const availableSupports = WOOD_SUPPORTS.filter((s) =>
    product.supports.includes(s.id)
  );
  const selectedSupport =
    WOOD_SUPPORTS.find((s) => s.id === supportId) || availableSupports[0];

  const buildItemPayload = () => ({
    uid: `${product.id}-${paletteId}-${supportId}-${Date.now()}`,
    product,
    palette: selectedPalette,
    support: selectedSupport,
    isGift,
    gift: isGift
      ? {
          occasion: OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0],
          recipient: recipient.trim(),
          sender: sender.trim(),
          message: message.trim(),
        }
      : null,
    customNotes: customNotes.trim(),
    quantity: 1,
  });

  const handleDirectWhatsApp = () => {
    const item = buildItemPayload();
    const lines = [
      `Olá, Entre Nós Ateliê! 🌿 Gostaria de fazer uma encomenda sob medida:`,
      ``,
      `• *Peça:* ${item.product.name}`,
      `• *Cor dos fios:* ${item.palette.name}`,
      `• *Suporte:* ${item.support.name}`,
    ];
    if (item.isGift) {
      lines.push(`• *Para presente:* Sim (${item.gift.occasion.label}) 🎁`);
      if (item.gift.recipient)
        lines.push(`• *Para:* ${item.gift.recipient}`);
      if (item.gift.message)
        lines.push(`• *Cartão manuscrito:* "${item.gift.message}"`);
      if (item.gift.sender)
        lines.push(`• *Assinatura:* ${item.gift.sender}`);
    }
    if (item.customNotes) {
      lines.push(`• *Observações sob medida:* ${item.customNotes}`);
    }
    lines.push(``, `Podemos alinhar os detalhes da minha encomenda? 🤍`);

    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <button
          type="button"
          className="modal-close"
          aria-label="Fechar janela de personalização"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-media-col">
            <div className="modal-image-wrap">
              <img src={product.image} alt={product.name} />
              <span className="modal-badge">{product.badge}</span>
            </div>

            <div className="modal-meta-box">
              <div className="meta-row">
                <span>Produção</span>
                <strong>Feito sob encomenda</strong>
              </div>
              <div className="meta-row">
                <span>Proporção</span>
                <strong>{product.sizeLabel}</strong>
              </div>
              <div className="meta-row">
                <span>Destaque</span>
                <strong>{product.highlight}</strong>
              </div>
            </div>
          </div>

          <div className="modal-form-col">
            <div className="modal-head">
              <span className="eyebrow-sm">Encomenda Sob Medida</span>
              <h3 id="customizer-title">{product.name}</h3>
              <p className="modal-bespoke-tag">
                Peça feita à mão sob encomenda
              </p>
              <p className="modal-desc">{product.description}</p>
            </div>

            {/* Step 1: Cord Color */}
            <div className="config-block">
              <div className="config-label">
                <span>1. Escolha o tom dos fios 100% algodão</span>
                <strong>{selectedPalette.name}</strong>
              </div>
              <div className="swatch-row">
                {availablePalettes.map((pal) => {
                  const active = pal.id === paletteId;
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      className={`swatch-btn ${active ? 'is-selected' : ''}`}
                      onClick={() => setPaletteId(pal.id)}
                      title={`${pal.name} — ${pal.mood}`}
                    >
                      <span
                        className="swatch-dot"
                        style={{
                          backgroundColor: pal.hex,
                          borderColor: pal.ring,
                        }}
                      >
                        {active && <Check size={12} color="#3B2F26" />}
                      </span>
                      <span className="swatch-name">{pal.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Support */}
            {availableSupports.length > 1 && (
              <div className="config-block">
                <div className="config-label">
                  <span>2. Acabamento da madeira</span>
                </div>
                <div className="support-options">
                  {availableSupports.map((sup) => (
                    <button
                      key={sup.id}
                      type="button"
                      className={`support-card ${
                        supportId === sup.id ? 'is-selected' : ''
                      }`}
                      onClick={() => setSupportId(sup.id)}
                    >
                      <strong>{sup.name}</strong>
                      <span>{sup.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Gift toggle */}
            <div className="config-block gift-toggle-box">
              <div className="gift-toggle-head">
                <div className="gift-toggle-title">
                  <Gift size={18} />
                  <div>
                    <strong>Vai presentear alguém especial?</strong>
                    <span>
                      Inclui sacola kraft, barbante e cartão escrito à mão
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isGift}
                  className={`toggle-pill ${isGift ? 'is-on' : ''}`}
                  onClick={() => setIsGift((v) => !v)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              {isGift && (
                <div className="gift-subform">
                  <div className="occasion-mini-row">
                    {OCCASIONS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        className={`mini-chip ${occasion === o.id ? 'is-active' : ''}`}
                        onClick={() => {
                          setOccasion(o.id);
                          if (!message || Object.values(MESSAGE_SUGGESTIONS).includes(message)) {
                            setMessage(MESSAGE_SUGGESTIONS[o.id]);
                          }
                        }}
                      >
                        {o.emoji} {o.label}
                      </button>
                    ))}
                  </div>
                  <div className="gift-inputs-two">
                    <input
                      type="text"
                      placeholder="Nome de quem vai receber"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Assinado por (seu nome)"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Dedicatória para o cartão manuscrito..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="config-block">
              <label className="field-group">
                <span className="field-hint-label">
                  <Sparkles size={13} /> Algum detalhe sob medida? (opcional)
                </span>
                <input
                  type="text"
                  placeholder="Ex: medida especial ou duas cores"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleDirectWhatsApp}
              >
                <MessageCircle size={16} /> Encomendar no WhatsApp
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  onAddToBag(buildItemPayload());
                  onClose();
                }}
              >
                <ShoppingBag size={16} /> Guardar na Sacola
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
