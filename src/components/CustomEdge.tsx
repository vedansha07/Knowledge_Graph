import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import type { EdgeProps, Edge } from '@xyflow/react';
import type { KBEdgeRenderData } from '../types';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<Edge<KBEdgeRenderData>>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} className="react-flow__edge-path" />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            fontFamily: 'var(--font-mono)',
          }}
          className="nodrag nopan"
        >
          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
            className="text-[9px] uppercase tracking-widest px-2 py-[3px] flex items-center gap-[6px] hover:border-[#3a3a3a] transition-colors"
          >
            <span>{data?.label}</span>

            {data?.onDelete && (
              <button
                onClick={() => data!.onDelete(id)}
                style={{ color: 'var(--border)', lineHeight: 1 }}
                className="hover:text-red-500 transition-colors text-[10px] leading-none"
                aria-label="Delete edge"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
