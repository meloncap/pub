import { useState, useEffect } from 'react'
import { chainImplementations } from '../chains'
import { useChainId } from './useChainId'

export const useCurrentPrice = () => {
  const [currentPrice, setCurrentPrice] = useState('0')
  const [chainId] = useChainId()

  useEffect(() => {
    if (!chainImplementations[chainId]) return

    chainImplementations[chainId]
      .dashboard
      .getOtherCardData()
      .then(x => x.market_data.current_price.usd)
      .then(x => x.toLocaleString())
      .then(setCurrentPrice)
  }, [chainId])

  return [currentPrice]
}

