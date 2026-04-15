import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import type { Node, Edge, NodeTypes, EdgeTypes, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useGraphStoreContext } from '../context/GraphStoreContext';
import { CustomNode } from './CustomNode';
import { CustomEdge } from './CustomEdge';
import type { KBNodeRenderData, KBEdgeRenderData } from '../types';

export function GraphCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    deleteEdge,
    selectNode,
    selectedNodeId,
  } = useGraphStoreContext();

  // Cast required: React Flow's generic data constraint is wide (Record<string, unknown>)
  // which is structurally incompatible with our narrowed render types due to contravariance.
  const nodeTypes = useMemo<NodeTypes>(
    () => ({ custom: CustomNode as NodeTypes[string] }),
    [],
  );
  const edgeTypes = useMemo<EdgeTypes>(
    () => ({ custom: CustomEdge as EdgeTypes[string] }),
    [],
  );

  const nodesWithInteractions = useMemo(
    (): Node<KBNodeRenderData>[] =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, onDelete: deleteNode },
        selected: node.id === selectedNodeId,
      })),
    [nodes, deleteNode, selectedNodeId],
  );

  const edgesWithInteractions = useMemo(
    (): Edge<KBEdgeRenderData>[] =>
      edges.map((edge) => ({
        ...edge,
        data: { ...(edge.data ?? { label: '' }), onDelete: deleteEdge },
      })),
    [edges, deleteEdge],
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => selectNode(node.id),
    [selectNode],
  );

  const onPaneClick = useCallback(() => selectNode(null), [selectNode]);

  return (
    <div className="w-full h-full" style={{ background: 'var(--bg)' }}>
      <ReactFlow
        nodes={nodesWithInteractions as Node[]}
        edges={edgesWithInteractions as Edge[]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.15}
        maxZoom={4}
        proOptions={{ hideAttribution: true }}
      >
        {/* Fine grid — like the template's subtle graph-paper background */}
        <Background
          variant={BackgroundVariant.Lines}
          gap={48}
          color="#141414"
          style={{ opacity: 0.6 }}
        />
        <Controls />
        <MiniMap
          nodeColor="var(--accent)"
          maskColor="rgba(8,8,8,0.8)"
          nodeStrokeWidth={0}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
