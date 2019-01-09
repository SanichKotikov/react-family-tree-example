import React from 'react';
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';

interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

class FamilyNode extends React.Component<Props> {

  onSubClick = () => {
    const { node, onSubClick } = this.props;
    onSubClick(node.id);
  };

  render() {
    const { node, isRoot, style } = this.props;

    return (
      <div className={styles.root} style={style}>
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
            onClick={this.onSubClick}
          />
        )}
      </div>
    );
  }

}

export default FamilyNode;
