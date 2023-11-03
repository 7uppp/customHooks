import { useState, Dispatch, SetStateAction } from "react";

export type ArrayReturnType<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): ArrayReturnType<T> {
  const [array, setArray] = useState<T[]>(defaultValue);

  function push(element: T) {
    setArray((a) => [...a, element]);
  }

  function filter(callback: (value: T, index: number, array: T[]) => boolean) {
    setArray((a) => a.filter(callback));
  }

  function update(index: number, newElement: T) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}


//Usage

import React from "react";
import useArray, { ArrayReturnType } from "./useArray";


 const { array, set, push, remove, filter, update, clear }: ArrayReturnType<number> = useArray([
    1, 2, 3, 4, 5, 6,
  ]); 

