import React, { memo, useCallback, ChangeEvent } from 'react';
import type { Node } from 'relatives-tree/lib/types';
import { URL_LABEL } from '../const';

interface SourceSelectProps {
  value: string;
  items: Record<string, readonly Readonly<Node>[]>;
  onChange: (value: string, nodes: readonly Readonly<Node>[]) => void;
}

export const SourceSelect = memo(
  function SourceSelect({ value, items, onChange }: SourceSelectProps) {
    const changeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
      const key = event.target.value;

      if (key === URL_LABEL) {
        const url = prompt('Paste the url to load:');
        if (!url) return;

        fetch(url)
          .then((resp) => resp.json())
          .then((data) => Array.isArray(data) && onChange(key, data))
          .catch(() => {});
      }
      else {
        onChange(key, items[key]);
      }
    }, [items, onChange]);

    return (
      <select value={value} onChange={changeHandler}>
        {Object.keys(items).map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
        <option value={URL_LABEL}>{URL_LABEL}</option>
      </select>
    );
  },
);
