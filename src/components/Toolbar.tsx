const TICKER_ITEMS = [
  'NODES',
  'EDGES',
  'REACT FLOW',
  'TYPESCRIPT',
  'KNOWLEDGE BASE',
  'GRAPH THEORY',
  'SEMANTIC WEB',
  'CONNECTED DATA',
  'VITE',
];

const TICKER_TEXT = TICKER_ITEMS.map((t) => `── ${t}`).join(' ') + ' ──';

interface ToolbarProps {
  onAddNode: () => void;
  onAddEdge: () => void;
  hasNodes: boolean;
}

export function Toolbar({ onAddNode, onAddEdge, hasNodes }: ToolbarProps) {
  return (
    <header
      className="relative z-20 flex-shrink-0"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
    >
      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <span
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
            className="text-2xl font-bold tracking-tight leading-none"
          >
            KG.
          </span>

          <div style={{ width: 1, height: 28, background: 'var(--border)' }} />

          <div className="flex flex-col justify-center">
            <span
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              className="text-[9px] uppercase tracking-[0.25em] leading-tight"
            >
              KNOWLEDGE GRAPH
            </span>
            <span
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              className="text-[9px] leading-tight"
            >
              v1.0 — PERSONAL EDITION
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            id="add-node-btn"
            onClick={onAddNode}
            style={{ fontFamily: 'var(--font-mono)' }}
            className="group text-[10px] font-medium uppercase tracking-widest px-4 py-2 transition-all duration-150"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.color = '#000';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.color = '#000';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.color = '#000';
            }}
          >
            + ADD_NODE ↗
          </button>

          <button
            id="add-edge-btn"
            onClick={onAddEdge}
            disabled={!hasNodes}
            style={{
              fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
            className="text-[10px] font-medium uppercase tracking-widest px-4 py-2 transition-all duration-150 hover:border-[#555] hover:text-[#ccc] disabled:opacity-25 disabled:cursor-not-allowed"
          >
            + ADD_EDGE ↗
          </button>
        </div>
      </div>

      {/* ── Scrolling ticker (like the template's marquee banner) ── */}
      <div
        className="overflow-hidden py-[5px]"
        style={{ borderTop: '1px solid var(--border)', background: '#0D0D0D' }}
      >
        <div className="ticker-track">
          {/* Duplicate 4× so the loop is seamless */}
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', opacity: 0.2 }}
              className="text-[9px] whitespace-nowrap px-6"
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
