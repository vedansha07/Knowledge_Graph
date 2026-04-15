import { useState, useRef, useEffect } from 'react';

interface AddNodeModalProps {
  onClose: () => void;
  onAdd: (title: string, note: string) => void;
}

export function AddNodeModal({ onClose, onAdd }: AddNodeModalProps) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), note);
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card — template's sharp-cornered service card style */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 0 0 1px var(--border), 0 32px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Header band */}
        <div
          style={{
            borderBottom: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            background: 'var(--bg-card)',
            padding: '14px 20px',
          }}
          className="flex items-center justify-between"
        >
          <div>
            <div style={{ color: 'var(--text-muted)' }} className="text-[8px] uppercase tracking-[0.3em] mb-1">
              -- create.node --
            </div>
            <h2 style={{ color: 'var(--text-primary)' }} className="text-[13px] font-bold uppercase tracking-widest">
              ADD_NODE ↗
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)' }}
            className="text-sm hover:text-white transition-colors"
          >
            [ESC]
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 20px 20px' }} className="flex flex-col gap-6">
          {/* Title field */}
          <div>
            <label
              htmlFor="new-node-title"
              style={{ color: 'var(--text-muted)' }}
              className="block text-[9px] uppercase tracking-[0.25em] mb-3"
            >
              .title <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="new-node-title"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. GraphQL"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                width: '100%',
                padding: '10px 12px',
                outline: 'none',
                fontSize: 13,
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
            />
          </div>

          {/* Note field */}
          <div>
            <label
              htmlFor="new-node-note"
              style={{ color: 'var(--text-muted)' }}
              className="block text-[9px] uppercase tracking-[0.25em] mb-3"
            >
              .note <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
            </label>
            <textarea
              id="new-node-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="// Description..."
              rows={4}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                width: '100%',
                padding: '10px 12px',
                outline: 'none',
                fontSize: 12,
                resize: 'vertical',
                lineHeight: 1.7,
              }}
              onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'; }}
            />
          </div>

          {/* Actions — template uses the invert-on-hover CTA pattern */}
          <div
            style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}
            className="flex items-center justify-between"
          >
            <button
              type="button"
              onClick={onClose}
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              className="text-[10px] uppercase tracking-widest hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              id="confirm-add-node-btn"
              type="submit"
              disabled={!title.trim()}
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[10px] uppercase tracking-widest px-5 py-2 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
              onMouseEnter={(e) => {
                if (!title.trim()) return;
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = 'var(--accent)';
                btn.style.color = '#000';
                btn.style.border = '1px solid var(--accent)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = 'transparent';
                btn.style.color = 'var(--accent)';
                btn.style.border = '1px solid var(--accent)';
              }}
              ref={(el) => {
                if (el) {
                  el.style.border = '1px solid var(--accent)';
                  el.style.color = 'var(--accent)';
                }
              }}
            >
              CONFIRM ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
