import type { Node, Edge } from '@xyflow/react';

// ── Persisted / serializable shapes (these are what goes into localStorage) ──

export type KBNodeData = {
  title: string;
  note: string;
};

export type KBEdgeData = {
  label: string;
};

// ── React Flow node / edge types (stored in state & persisted) ──

export type KBNode = Node<KBNodeData>;
export type KBEdge = Edge<KBEdgeData>;

// ── Render-time augmented data (injected in GraphCanvas, NEVER persisted) ──

export type KBNodeRenderData = KBNodeData & {
  onDelete: (id: string) => void;
};

export type KBEdgeRenderData = KBEdgeData & {
  onDelete: (id: string) => void;
};
