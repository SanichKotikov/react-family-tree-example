import React from 'react';
import classNames from 'classnames';
import { IFamilyNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';

interface Props {
  node: IFamilyNode;
  style?: React.CSSProperties;
}

const FamilyNode: React.FunctionComponent<Props> = ({ node, style }) => (
  <div className={styles.root} style={style}>
    <div
      className={classNames(
        styles.inner,
        node.gender === 'male' && styles.male,
        node.gender === 'female' && styles.female,
      )}
    />
  </div>
);

export default FamilyNode;
