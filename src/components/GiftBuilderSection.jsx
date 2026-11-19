import React from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { OCCASIONS, MESSAGE_SUGGESTIONS } from '../data/catalog';

export function GiftBuilderSection({
  giftDraft,
  onChangeGiftDraft,
  onApplyToCollection,
}) {
  const handleSelectOccasion = (occasionId) => {
    const suggestion = MESSAGE_SUGGESTIONS[occasionId] || '';
    onChangeGiftDraft({
      ...giftDraft,
      occasion: occasionId,
      message: giftDraft.messageTouched ? giftDraft.message : suggestion,
    });
  };

  const selectedOccasion =
    OCCASIONS.find((o) => o.id === giftDraft.occasion) || OCCASIONS[0];

  return (
    <section id="lembrancas" className="gift-section">
      <div className="container">
        <div className="gift-shell">
          <div className="gift-visual">
            <div className="gift-photo-frame">
              <img
                src="/images/embalagem-carinho.jpg"
                alt="Embalagem afetiva Entre Nós Ateliê com sacola kraft, barbante e flores secas"
                loading="lazy"
              />
              <div className="gift-stamp-pill">
                <span>🌿 Produto artesanal feito com carinho</span>
              </div>
            </div>

            {/* Live Handwritten Gift Tag Preview */}
            <div className="handwritten-tag-card" aria-live="polite">
              <div className="tag-hole" aria-hidden="true" />
              <div className="tag-twine" aria-hidden="true" />
              <div className="tag-header-row">
                <span className="tag-occasion">
                  {selectedOccasion.emoji} {selectedOccasion.label}
                </span>
                <span className="tag-atelier">Entre Nós Ateliê</span>
              </div>
              <p className="tag-recipient">
                Para {giftDraft.recipient.trim() || 'alguém muito especial'},
              </p>
              <p className="tag-message">
                “{giftDraft.message.trim() || MESSAGE_SUGGESTIONS[selectedOccasion.id]}”
              </p>
              <p className="tag-signature">
                Com carinho, {giftDraft.sender.trim() || 'quem pensou em você'} ♡
              </p>
            </div>
          </div>

          <div className="gift-copy">
            <span className="eyebrow">
              <Heart size={14} /> Presentear com Significado
            </span>
            <h2>
              Quando você presenteia um trabalho manual, oferece{' '}
              <em>tempo, calma e presença</em>.
            </h2>
            <p className="lead-muted">
              Cada lembrança sai do ateliê dentro de uma sacola kraft amarrada com
              barbante de algodão cru, raminho de flores secas e um cartão escrito
              à mão com as suas palavras. Experimente montar o bilhete aqui:
            </p>

            <div className="occasion-pills" role="group" aria-label="Escolha a ocasião">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  className={`occasion-pill ${
                    giftDraft.occasion === occ.id ? 'is-active' : ''
                  }`}
                  onClick={() => handleSelectOccasion(occ.id)}
                >
                  <span>{occ.emoji}</span>
                  <span>{occ.label}</span>
                </button>
              ))}
            </div>

            <div className="gift-form-grid">
              <label className="field-group">
                <span>Para quem é essa lembrança?</span>
                <input
                  type="text"
                  maxLength={40}
                  placeholder="Ex: Marina, Mãe, Pri e Lucas..."
                  value={giftDraft.recipient}
                  onChange={(e) =>
                    onChangeGiftDraft({ ...giftDraft, recipient: e.target.value })
                  }
                />
              </label>

              <label className="field-group">
                <span>Assinado por</span>
                <input
                  type="text"
                  maxLength={40}
                  placeholder="Seu nome"
                  value={giftDraft.sender}
                  onChange={(e) =>
                    onChangeGiftDraft({ ...giftDraft, sender: e.target.value })
                  }
                />
              </label>
            </div>

            <label className="field-group">
              <div className="field-label-row">
                <span>Sua mensagem para o cartão manuscrito</span>
                <button
                  type="button"
                  className="text-action-btn"
                  onClick={() =>
                    onChangeGiftDraft({
                      ...giftDraft,
                      message: MESSAGE_SUGGESTIONS[giftDraft.occasion],
                      messageTouched: false,
                    })
                  }
                >
                  <Sparkles size={13} /> Usar sugestão poética
                </button>
              </div>
              <textarea
                rows={3}
                maxLength={220}
                placeholder="Escreva algo que aqueça o coração de quem vai abrir..."
                value={giftDraft.message}
                onChange={(e) =>
                  onChangeGiftDraft({
                    ...giftDraft,
                    message: e.target.value,
                    messageTouched: true,
                  })
                }
              />
            </label>

            <div className="gift-cta-row">
              <button
                type="button"
                className="btn-primary"
                onClick={onApplyToCollection}
              >
                Escolher uma peça para esse presente <ArrowRight size={16} />
              </button>
              <span className="gift-note-hint">
                Embalagem afetiva &amp; cartão manuscrito sem custo adicional
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
