import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { create } from 'pinch-zoom-pan';
import { DEFAULT_STATE } from 'pinch-zoom-pan/lib/constants';

import css from './PinchZoomPan.module.css';

interface IProps {
  min: number;
  max: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default React.memo<IProps>(
  function PinchZoomPan({ min, max, captureWheel, className, style, children }) {
    const root = useRef<HTMLDivElement>(null);
    const [state, setState] = useState(DEFAULT_STATE);

    useEffect(() => {
      const element = root.current;
      if (!element) return;

      return create({
        element,
        minZoom: min,
        maxZoom: max,
        captureWheel,
        setter: setState,
      });
    }, [min, max, captureWheel]);

    const transform = `translate(${state.x}px, ${state.y}px) scale(${state.z})`;

    return (
      <div ref={root} className={classNames(className, css.root)} style={style}>
        <div className={css.point} style={{ transform }}>
          <div className={css.canvas}>
            {children}
          </div>
        </div>
      </div>
    );
  },
);
