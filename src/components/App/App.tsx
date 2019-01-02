import React from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
import { IFamilyNode } from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../FamilyNode/FamilyNode';
import nodes from '../../sample.json';
import styles from './App.module.css';

const WIDTH = 70;
const HEIGHT = 80;

class App extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            FamilyTree demo
          </h1>
          <a href="https://github.com/SanichKotikov/react-family-tree-example">GitHub</a>
        </header>
        <PinchZoomPan
          debug
          captureWheel
          min={0.5}
          max={2.5}
          className={styles.wrapper}
        >
          <ReactFamilyTree
            nodes={nodes as IFamilyNode[]}
            rootId={nodes[0].id}
            width={WIDTH}
            height={HEIGHT}
            canvasClassName={styles.tree}
            renderNode={(node: IFamilyNode, point) => (
              <FamilyNode
                key={node.id}
                node={node}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${point.x}px, ${point.y}px)`,
                }}
              />
            )}
          />
        </PinchZoomPan>
      </div>
    );
  }

}

export default App;
