import { useContextSelector } from 'use-context-selector'
import { CartContentContext } from '../contexts/CartContext.tsx'

export function useCartContent() {
  const teste = useContextSelector(
    CartContentContext,
    cartContent => cartContent.teste
  )

  const totalItemsInCard = useContextSelector(
    CartContentContext,
    cartContent => cartContent.totalItemsInCard
  )

  const setTotalItemsInCard = useContextSelector(
    CartContentContext,
    cartContent => cartContent.setTotalItemsInCard
  )

  const showPixField = useContextSelector(
    CartContentContext,
    cartContent => cartContent.showPixField
  )

  const setShowPixField = useContextSelector(
    CartContentContext,
    cartContent => cartContent.setShowPixField
  )
  
  return {
    teste,
    totalItemsInCard,
    setTotalItemsInCard,
    showPixField,
    setShowPixField
  }
}
