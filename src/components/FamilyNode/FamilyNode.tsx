import React from 'react';
import classNames from 'classnames';
import { IFamilyNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';

interface Props {
  node: IFamilyNode;
  isRoot: boolean;
  hasSub: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

class FamilyNode extends React.Component<Props> {

  onSubClick = () => {
    const { node, onSubClick } = this.props;
    if (typeof onSubClick === 'function') onSubClick(node.id);
  };

  render() {
    const { node, isRoot, hasSub, style } = this.props;

    return (
      <div className={styles.root} style={style}>
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,
          )}
        />
        {hasSub && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={this.onSubClick}
          />
        )}
      </div>
    );
  }

}

export default FamilyNode;
