import useAsync from '@hooks/useAsync'

export default function useScript(url: string) {
  return useAsync(() => {
    const script = document.createElement('script')
    script.src = url
    script.async = true
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('load', () => resolve())
      script.addEventListener('error', () => reject())
      document.body.appendChild(script)
    })
  }, [url])
}

// Usage

import useScript from './useScript'

export default function ScriptComponent() {
  const { loading, error } = useScript(
    'https://code.jquery.com/jquery-3.6.0.min.js'
  )
  if (loading) return <div>资源加载中...</div>
  if (error) return <div>资源加载失败😡</div>
  return <div>显示当前视图的宽度{window.$(window).width()}</div>
}

declare interface Window {
  $: any
}
