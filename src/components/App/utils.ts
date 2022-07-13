import type { CSSProperties } from 'react';
import type { ExtNode } from 'relatives-tree/lib/types';
import { NODE_HEIGHT, NODE_WIDTH } from '../const';

export function getNodeStyle({ left, top }: Readonly<ExtNode>): CSSProperties {
  return {
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    transform: `translate(${left * (NODE_WIDTH / 2)}px, ${top * (NODE_HEIGHT / 2)}px)`,
  };
}
