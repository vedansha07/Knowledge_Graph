import { useState, useEffect, useRef } from 'react';
import type { KBNode } from '../types';

interface AddEdgeModalProps {
  nodes: KBNode[];
  onClose: () => void;
  onAdd: (source: string, target: string, label: string) => void;
}

const selectStyle: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-mono)',
  width: '100%',
  padding: '9px 10px',
  outline: 'none',
  fontSize: 12,
  appearance: 'none',
  cursor: 'pointer',
};

export function AddEdgeModal({ nodes, onClose, onAdd }: AddEdgeModalProps) {
  const [source, setSource] = useState(nodes[0]?.id || '');
  const [target, setTarget] = useState(nodes[1]?.id || nodes[0]?.id || '');
  const [label, setLabel] = useState('');
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => { labelRef.current?.focus(); }, []);

  const isSelfLoop = source === target;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !target || !label.trim() || isSelfLoop) return;
    onAdd(source, target, label.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          width: '100%',
          maxWidth: 520,
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
              -- create.edge --
            </div>
            <h2 style={{ color: 'var(--text-primary)' }} className="text-[13px] font-bold uppercase tracking-widest">
              ADD_RELATIONSHIP ↗
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

        <form onSubmit={handleSubmit} style={{ padding: '24px 20px 20px' }} className="flex flex-col gap-5">
          {/* Source → Target */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label
                htmlFor="edge-source"
                style={{ color: 'var(--text-muted)' }}
                className="block text-[9px] uppercase tracking-[0.25em] mb-3"
              >
                .source <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select
                id="edge-source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={selectStyle}
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id} style={{ background: '#111' }}>
                    {n.data.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Arrow separator — the template's ↗ motif */}
            <div style={{ color: 'var(--accent)', paddingBottom: 10 }} className="text-base font-bold leading-none flex-shrink-0">
              →
            </div>

            <div className="flex-1">
              <label
                htmlFor="edge-target"
                style={{ color: 'var(--text-muted)' }}
                className="block text-[9px] uppercase tracking-[0.25em] mb-3"
              >
                .target <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select
                id="edge-target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                style={selectStyle}
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id} style={{ background: '#111' }}>
                    {n.data.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Self-loop warning */}
          {isSelfLoop && (
            <div
              style={{ border: '1px solid var(--danger)', padding: '7px 12px', color: 'var(--danger)' }}
              className="text-[9px] uppercase tracking-widest"
            >
              ✕ SOURCE AND TARGET CANNOT BE THE SAME NODE
            </div>
          )}

          {/* Label field */}
          <div>
            <label
              htmlFor="edge-label"
              style={{ color: 'var(--text-muted)' }}
              className="block text-[9px] uppercase tracking-[0.25em] mb-3"
            >
              .relationship_label <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="edge-label"
              ref={labelRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. requires, related to, built on"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                width: '100%',
                padding: '10px 12px',
                outline: 'none',
                fontSize: 12,
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
            />
          </div>

          {/* Actions */}
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
              id="confirm-add-edge-btn"
              type="submit"
              disabled={!source || !target || !label.trim() || isSelfLoop}
              style={{
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
              }}
              className="text-[10px] uppercase tracking-widest px-5 py-2 transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-black"
            >
              CONFIRM ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
