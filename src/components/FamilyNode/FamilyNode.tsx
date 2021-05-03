import React from 'react';
import classNames from 'classnames';
import { ExtNode } from 'relatives-tree/lib/types';
import styles from './FamilyNode.module.css';

interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style }) {
    return (
      <div className={styles.root} style={style} title={node.id}>
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,
          )}
        />
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )}
      </div>
    );
  }
);
