import { useRef, useEffect, DependencyList } from 'react'
import isEqual from 'lodash/fp/isEqual'

type EffectHookType = typeof useEffect
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType

export const createDeepCompareEffect: CreateUpdateEffect =
  (effect) => (callback, deps) => {
    const ref = useRef<DependencyList>()
    const signalRef = useRef<number>(0)

    if (deps === undefined || !isEqual(deps, ref.current)) {
      ref.current = deps
      signalRef.current += 1
    }

    effect(callback, [signalRef.current])
  }

export default createDeepCompareEffect(useEffect)

// Usage

import React, { useEffect, useState, useRef } from "react";
import useDeepCompareEffect from "./useDeepCompareEffect";

export default function DeepCompareEffectComponent() {
  const [age, setAge] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);
  const useEffectCountRef = useRef<HTMLSpanElement>(null);
  const useDeepCompareEffectCountRef = useRef<HTMLSpanElement>(null);
  const person = { age: age, name: "Sergey" };

  useEffect(() => {
    if (useEffectCountRef.current) {
      useEffectCountRef.current.textContent = (
        parseInt(useEffectCountRef.current.textContent || "0") + 1
      ).toString();
    }
  }, [person]);

  useDeepCompareEffect(() => {
    if (useDeepCompareEffectCountRef.current) {
      useDeepCompareEffectCountRef.current.textContent = (
        parseInt(useDeepCompareEffectCountRef.current.textContent || "0") + 1
      ).toString();
    }
  }, [person]);

  return (
    <div>
      <div>
        useEffect被触发的次数: <span ref={useEffectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect被触发的次数:
        <span ref={useDeepCompareEffectCountRef}>0</span>
      </div>
      <div>不相干的值: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge((currentAge) => currentAge + 1)}>
        修改监听对象中的值
      </button>
      <button onClick={() => setOtherCount((count) => count + 1)}>
        修改和监听对象无关的值
      </button>
    </div>
  );
}

作者：前端小魔女
链接：https://juejin.cn/post/7292601783725424681
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。