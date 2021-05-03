import React, { useState, useEffect, useCallback } from 'react';
import { Node, ExtNode } from 'relatives-tree/lib/types';
import ReactFamilyTree from 'react-family-tree';
import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';
import FamilyNode from '../FamilyNode/FamilyNode';

import averageTree from 'relatives-tree/samples/average-tree.json';
import couple from 'relatives-tree/samples/couple.json';
import diffParents from 'relatives-tree/samples/diff-parents.json';
import divorcedParents from 'relatives-tree/samples/divorced-parents.json';
import empty from 'relatives-tree/samples/empty.json';
import severalSpouses from 'relatives-tree/samples/several-spouses.json';
import simpleFamily from 'relatives-tree/samples/simple-family.json';
import testTreeN1 from 'relatives-tree/samples/test-tree-n1.json';
import testTreeN2 from 'relatives-tree/samples/test-tree-n2.json';

import styles from './App.module.css';

const WIDTH = 70;
const HEIGHT = 80;

const DEFAULT_SOURCE = 'average-tree.json'

type Source = Array<Node>

const SOURCES: { [key: string]: Source } = {
  'average-tree.json': averageTree as Source,
  'couple.json': couple as Source,
  'diff-parents.json': diffParents as Source,
  'divorced-parents.json': divorcedParents as Source,
  'empty.json': empty as Source,
  'several-spouses.json': severalSpouses as Source,
  'simple-family.json': simpleFamily as Source,
  'test-tree-n1.json': testTreeN1 as Source,
  'test-tree-n2.json': testTreeN2 as Source
}

const URL = 'URL (Gist, Paste.bin, ...)'

export default React.memo<{}>(
  function App() {
    const [source, setSource] = useState<string>(DEFAULT_SOURCE);
    const [nodes, setNodes] = useState<Source>([]);
    const [myId, setMyId] = useState<string>('');
    const [rootId, setRootId] = useState<string>('');

    useEffect(() => {
      const loadData = async () => {
        let newNodes;

        if (source === URL) {
          const response = await fetch(prompt('Paste the url to load:') || '');

          newNodes = await response.json()
        } else {
          newNodes = SOURCES[source];
        }

        if (newNodes) {
          setNodes([]); // Avoid invalid references to unknown nodes
          setRootId(newNodes[0].id);
          setMyId(newNodes[0].id);
          setNodes(newNodes);
        }
      }

      loadData();
    }, [source])

    const onResetClick = useCallback(() => setRootId(myId), [myId]);
    const onSetSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSource(event.target.value)
    }

    const sources = {
      ...SOURCES,
      [URL]: []
    }

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            FamilyTree demo
          </h1>

          <div>
            <span>Source: </span>
            <select onChange={onSetSource} defaultValue={source}>
              {Object.keys(sources).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <a href="https://github.com/SanichKotikov/react-family-tree-example">GitHub</a>
        </header>
        {nodes.length > 0 && (
          <PinchZoomPan
            min={0.5}
            max={2.5}
            captureWheel
            className={styles.wrapper}
          >
            <ReactFamilyTree
              nodes={nodes as Node[]}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={styles.tree}
              renderNode={(node: ExtNode) => (
                <FamilyNode
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  onSubClick={setRootId}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                  }}
                />
              )}
            />
          </PinchZoomPan>
        )}
        {rootId !== myId && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )}
      </div>
    );
  }
);
