import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { KBNodeRenderData } from '../types';

export function CustomNode({ id, data, selected }: NodeProps<Node<KBNodeRenderData>>) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'var(--bg-card)',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        boxShadow: selected
          ? '0 0 0 1px var(--accent), 0 0 28px var(--accent-dim), inset 0 0 20px var(--accent-glow)'
          : '0 4px 32px rgba(0,0,0,0.5)',
        transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
        minWidth: 148,
        cursor: 'pointer',
        position: 'relative',
      }}
      className="px-[14px] py-[10px]"
    >
      {/* Micro tag — like the template's small "consultancy" labels */}
      <div
        style={{ color: selected ? 'var(--accent)' : 'var(--text-muted)', opacity: 0.7 }}
        className="text-[7px] uppercase tracking-[0.3em] mb-[6px] leading-none"
      >
        node://
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between gap-3">
        <span
          style={{ color: 'var(--text-primary)' }}
          className="text-[12px] font-medium leading-tight"
        >
          {data.title}
        </span>

        {/* Delete — template uses the ↗ arrow link style; we use ✕ but styled similarly */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
          style={{ color: 'var(--border)', fontFamily: 'monospace', lineHeight: 1 }}
          className="text-[11px] hover:text-red-500 transition-colors flex-shrink-0 p-0.5"
          aria-label={`Delete ${data.title}`}
        >
          ✕
        </button>
      </div>

      {/* Bottom-right dot indicator when selected (template decorative element) */}
      {selected && (
        <div
          style={{ color: 'var(--accent)' }}
          className="absolute bottom-[5px] right-[8px] text-[8px] leading-none"
        >
          ●
        </div>
      )}

      {/* Handles — square, accent-coloured */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
