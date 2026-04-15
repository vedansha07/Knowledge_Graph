import { createContext, useContext, type ReactNode } from 'react';
import { useGraphStore } from '../hooks/useGraphStore';

// Derive the context type directly from the hook's return so it stays in sync automatically
type GraphStoreContextType = ReturnType<typeof useGraphStore>;

const GraphStoreContext = createContext<GraphStoreContextType | null>(null);

/**
 * Wraps the application with a single shared graph store instance.
 * Must be placed inside <ReactFlowProvider>.
 */
export function GraphStoreProvider({ children }: { children: ReactNode }) {
  const store = useGraphStore();
  return (
    <GraphStoreContext.Provider value={store}>
      {children}
    </GraphStoreContext.Provider>
  );
}

/**
 * Consume the shared graph store.
 * Throws if used outside of <GraphStoreProvider>.
 */
export function useGraphStoreContext(): GraphStoreContextType {
  const ctx = useContext(GraphStoreContext);
  if (!ctx) {
    throw new Error('useGraphStoreContext must be used inside <GraphStoreProvider>');
  }
  return ctx;
}
