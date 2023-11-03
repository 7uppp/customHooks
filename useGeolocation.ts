import { useState, useEffect } from 'react'

type GeolocationOptions = PositionOptions

type GeolocationHookReturn = {
  loading: boolean
  error: GeolocationPositionError | null
  data: GeolocationCoordinates
}

export default function useGeolocation(
  options?: GeolocationOptions
): GeolocationHookReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [data, setData] = useState<GeolocationCoordinates>(
    {} as GeolocationCoordinates
  )

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false)
      setError(null)
      setData(e.coords)
    }

    const errorHandler = (e: GeolocationPositionError) => {
      setError(e)
      setLoading(false)
    }

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )

    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data }
}

// Usage
import useGeolocation from './useGeolocation'

export default function GeolocationComponent() {
  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation()
  return (
    <>
      <div>加载状态: {loading.toString()}</div>
      <div>加载是否失败: {error?.message}</div>
      <div>
        纬度:{latitude} x 经度:{longitude}
      </div>
    </>
  )
}
