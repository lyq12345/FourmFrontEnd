import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { createContext } from 'react';

export const PostEventContext = createContext<EventEmitter<string | [string, ...any[]]> | null>(
  null,
);
