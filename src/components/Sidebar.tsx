import { useState, useEffect } from 'react';
import type { KBNode } from '../types';

interface SidebarProps {
  node: KBNode | null;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<{ title: string; note: string }>) => void;
}

export function Sidebar({ node, onClose, onUpdate }: SidebarProps) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  // Only reset when the selected node ID changes, not on every render
  useEffect(() => {
    if (node) {
      setTitle(node.data.title);
      setNote(node.data.note ?? '');
      setIsSaved(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.id]);

  if (!node) return null;

  const handleSave = () => {
    onUpdate(node.id, { title, note });
    setIsSaved(true);
  };

  return (
    /* Template reference: the right-side panel with thick left accent border */
    <aside
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: 340,
        background: 'var(--bg)',
        borderLeft: '1px solid var(--border)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Header band — thick accent left-border like template's section headers */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          background: 'var(--bg-card)',
          padding: '14px 18px',
        }}
      >
        <div style={{ color: 'var(--text-muted)' }} className="text-[8px] uppercase tracking-[0.3em] mb-1">
          -- system.output --
        </div>
        <div className="flex items-center justify-between">
          <h2 style={{ color: 'var(--text-primary)' }} className="text-[13px] font-bold uppercase tracking-widest">
            NODE DETAILS
          </h2>
          <button
            id="close-sidebar-btn"
            onClick={onClose}
            style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
            className="text-sm hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            [×]
          </button>
        </div>
      </div>

      {/* Node ID tag */}
      <div
        style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', padding: '8px 18px' }}
      >
        <span style={{ color: 'var(--accent)', opacity: 0.6 }} className="text-[9px] uppercase tracking-wider">
          id: {node.id}
        </span>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-0 flex-1 overflow-y-auto">
        {/* Title */}
        <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--border)' }}>
          <label
            htmlFor="node-title"
            style={{ color: 'var(--text-muted)' }}
            className="block text-[9px] uppercase tracking-[0.25em] mb-3"
          >
            .title
          </label>
          <input
            id="node-title"
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setIsSaved(false); }}
            onBlur={handleSave}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${isSaved ? 'var(--border)' : 'var(--accent)'}`,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              width: '100%',
              padding: '6px 0',
              outline: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'border-color 0.15s',
            }}
          />
        </div>

        {/* Note */}
        <div style={{ padding: '18px', borderBottom: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="node-note"
            style={{ color: 'var(--text-muted)' }}
            className="block text-[9px] uppercase tracking-[0.25em] mb-3"
          >
            .note
          </label>
          <textarea
            id="node-note"
            value={note}
            onChange={(e) => { setNote(e.target.value); setIsSaved(false); }}
            onBlur={handleSave}
            placeholder="// Add notes here..."
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              width: '100%',
              flex: 1,
              minHeight: 140,
              padding: '10px 12px',
              outline: 'none',
              fontSize: 12,
              resize: 'none',
              lineHeight: 1.7,
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'; }}
            onBlurCapture={(e) => { handleSave(); (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'; }}
          />
        </div>
      </div>

      {/* Footer status — like template's small label tags */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '10px 18px',
          background: 'var(--bg-card)',
        }}
        className="flex items-center justify-between"
      >
        <span style={{ color: 'var(--text-muted)' }} className="text-[8px] uppercase tracking-widest">
          AUTO-SAVE ON BLUR
        </span>
        <span
          style={{ color: isSaved ? 'var(--text-muted)' : 'var(--accent)' }}
          className="text-[9px] uppercase tracking-widest transition-colors"
        >
          {isSaved ? '● SYNCED' : '○ PENDING'}
        </span>
      </div>
    </aside>
  );
}
