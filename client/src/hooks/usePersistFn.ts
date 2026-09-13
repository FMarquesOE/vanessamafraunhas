import { useRef } from "react";

// "never[]" nos parametros faz o tipo aceitar qualquer funcao como argumento
// generico (contravariancia), sem precisar de "any".
type AnyFn = (...args: never[]) => unknown;

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 */
export function usePersistFn<T extends AnyFn>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T | null>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args: Parameters<T>) {
      return fnRef.current.apply(this, args);
    } as unknown as T;
  }

  return persistFn.current as T;
}
