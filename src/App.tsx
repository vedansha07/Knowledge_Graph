import { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { GraphCanvas } from './components/GraphCanvas';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { AddNodeModal } from './components/AddNodeModal';
import { AddEdgeModal } from './components/AddEdgeModal';
import { GraphStoreProvider, useGraphStoreContext } from './context/GraphStoreContext';

function GraphApp() {
  // Single source of truth — all components share this one context instance
  const { nodes, selectedNodeId, updateNode, selectNode, addNode, addEdge } =
    useGraphStoreContext();

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingEdge, setIsAddingEdge] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-slate-950 flex flex-col font-sans">
      <Toolbar
        onAddNode={() => setIsAddingNode(true)}
        onAddEdge={() => setIsAddingEdge(true)}
        // Require at least 2 nodes before the "Add Edge" button is active
        hasNodes={nodes.length >= 2}
      />

      <main className="flex-1 relative w-full h-full">
        <GraphCanvas />

        <Sidebar
          node={selectedNode}
          onClose={() => selectNode(null)}
          onUpdate={updateNode}
        />
      </main>

      {isAddingNode && (
        <AddNodeModal onClose={() => setIsAddingNode(false)} onAdd={addNode} />
      )}

      {isAddingEdge && (
        <AddEdgeModal
          nodes={nodes}
          onClose={() => setIsAddingEdge(false)}
          onAdd={addEdge}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    // ReactFlowProvider must be outermost so hooks like useReactFlow work anywhere below
    <ReactFlowProvider>
      {/* GraphStoreProvider calls useGraphStore once and shares it via Context */}
      <GraphStoreProvider>
        <GraphApp />
      </GraphStoreProvider>
    </ReactFlowProvider>
  );
}
