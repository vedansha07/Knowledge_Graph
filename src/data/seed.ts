import { MarkerType } from '@xyflow/react';
import type { KBNode, KBEdge } from '../types';

export const initialNodes: KBNode[] = [
  { id: '1', position: { x: 250, y: 150 }, data: { title: 'React', note: 'A JavaScript library for building user interfaces.' }, type: 'custom' },
  { id: '2', position: { x: 50, y: 50 }, data: { title: 'Next.js', note: 'The React Framework for the Web.' }, type: 'custom' },
  { id: '3', position: { x: 450, y: 50 }, data: { title: 'TypeScript', note: 'Strongly typed programming language that builds on JavaScript.' }, type: 'custom' },
  { id: '4', position: { x: 50, y: 250 }, data: { title: 'State Management', note: 'Handling state across the application smoothly.' }, type: 'custom' },
  { id: '5', position: { x: 450, y: 250 }, data: { title: 'Component Design', note: 'Building reusable, modular components.' }, type: 'custom' },
  { id: '6', position: { x: 250, y: 350 }, data: { title: 'Performance', note: 'Optimizing rendering and load times.' }, type: 'custom' },
  { id: '7', position: { x: 550, y: 150 }, data: { title: 'Testing', note: 'Ensuring code quality via unit and end-to-end tests.' }, type: 'custom' },
  { id: '8', position: { x: -50, y: 150 }, data: { title: 'CSS & Styling', note: 'Approaches to style React components.' }, type: 'custom' },
];

export const initialEdges: KBEdge[] = [
  { id: 'e2-1', source: '2', target: '1', data: { label: 'built on' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e1-3', source: '1', target: '3', data: { label: 'pairs well with' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e1-4', source: '1', target: '4', data: { label: 'uses' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e1-5', source: '1', target: '5', data: { label: 'guides' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e2-6', source: '2', target: '6', data: { label: 'improves' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e1-7', source: '1', target: '7', data: { label: 'requires' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e1-8', source: '1', target: '8', data: { label: 'styled with' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e4-6', source: '4', target: '6', data: { label: 'impacts' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
  { id: 'e5-6', source: '5', target: '6', data: { label: 'impacts' }, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' } },
];
