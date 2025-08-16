import { useEffect } from "react";

/**
 * A custom hook that debounces a callback function based on specified dependencies.
 * The callback will only be executed after the specified delay has passed without any new changes.
 *
 * @param {Object} props - The hook properties
 * @param {number} props.delay - The delay in milliseconds before executing the callback
 * @param {Function} props.callback - The function to be executed after the delay
 * @param {any[]} props.dependencies - Array of dependencies that will trigger the debounce when changed
 *
 * @example
 * useDebounce({
 *   delay: 1000,
 *   callback: () => console.log('Debounced!'),
 *   dependencies: [searchTerm]
 * });
 */
type UseDebounceProps = {
  delay: number;
  callback: () => void;
  dependencies: any[];
};

export const useDebounce = ({
  delay,
  callback,
  dependencies,
}: UseDebounceProps) => {
  useEffect(() => {
    const id = setTimeout(() => callback(), delay);

    return () => clearTimeout(id);
  }, [delay, ...dependencies]);
};
