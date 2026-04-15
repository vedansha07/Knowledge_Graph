import { useState, useEffect, useCallback } from 'react';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as addReactFlowEdge,
  MarkerType,
} from '@xyflow/react';
import type { NodeChange, EdgeChange, Connection } from '@xyflow/react';
import type { KBNode, KBEdge } from '../types';
import { initialNodes, initialEdges } from '../data/seed';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'kb-graph-data';

export function useGraphStore() {
  const [nodes, setNodes] = useState<KBNode[]>([]);
  const [edges, setEdges] = useState<KBEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Initialise from localStorage, fall back to seed data ──
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { nodes: parsedNodes, edges: parsedEdges } = JSON.parse(stored);
        if (Array.isArray(parsedNodes) && (parsedNodes.length > 0 || parsedEdges.length > 0)) {
          setNodes(parsedNodes);
          setEdges(parsedEdges);
          setIsLoaded(true);
          return;
        }
      } catch (e) {
        console.error('Failed to parse localStorage', e);
      }
    }
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsLoaded(true);
  }, []);

  // ── Persist every time the graph changes ──
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges, isLoaded]);

  // ── React Flow change handlers ──

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as KBNode[]);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds) as KBEdge[]);
  }, []);

  // Fix: drag-to-connect now creates a proper custom edge with label + marker
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) =>
      addReactFlowEdge(
        {
          ...connection,
          id: uuidv4(),
          type: 'custom',
          data: { label: 'related to' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
        },
        eds,
      ) as KBEdge[],
    );
  }, []);

  // ── CRUD actions — all wrapped in useCallback to stabilise references ──

  const addNode = useCallback((title: string, note: string) => {
    const newNode: KBNode = {
      id: uuidv4(),
      // Spread new nodes across a larger area to avoid clustering
      position: { x: Math.random() * 500 + 50, y: Math.random() * 400 + 50 },
      data: { title, note },
      type: 'custom',
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const updateNode = useCallback(
    (id: string, data: Partial<{ title: string; note: string }>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
        ),
      );
    },
    [],
  );

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    // Use functional update to avoid closing over stale selectedNodeId
    setSelectedNodeId((current) => (current === id ? null : current));
  }, []);

  const addEdge = useCallback((source: string, target: string, label: string) => {
    // Prevent self-loops
    if (source === target) return;

    setEdges((eds) => {
      // Duplicate check inside the setter so it reads fresh state
      const exists = eds.some(
        (e) => e.source === source && e.target === target && e.data?.label === label,
      );
      if (exists) return eds;

      const newEdge: KBEdge = {
        id: uuidv4(),
        source,
        target,
        type: 'custom',
        data: { label },
        // Fix: was '#8cf8' (invalid 4-char hex), now correct 6-char colour
        markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
      };
      return [...eds, newEdge];
    });
  }, []);

  const deleteEdge = useCallback((id: string) => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  }, []);

  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  return {
    nodes,
    edges,
    selectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNode,
    deleteNode,
    addEdge,
    deleteEdge,
    selectNode,
  };
}
