import React, { useState } from 'react'
import { createContext } from 'use-context-selector'

interface CartContextProps {
  teste: string
  totalItemsInCard: number
  setTotalItemsInCard: (value: number) => void
  showPixField: boolean
  setShowPixField: (value: boolean) => void
}

export const CartContentContext = createContext<CartContextProps>(
  {} as CartContextProps
)

export const CartContentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const teste = 'aaaa'
  const entries = Object.entries(localStorage)
  const cartList = entries?.map((a) => {
    if (a[0]?.includes("@Danti:Cart_Products")) {
      const parsed_product = JSON.parse(a[1])     
      return parsed_product
    }
  })?.filter(b => b)
  const [totalItemsInCard, setTotalItemsInCard] = useState(cartList?.length)
  const [showPixField, setShowPixField] = useState(false)

  return (
    <CartContentContext.Provider
      value={{
        teste,
        totalItemsInCard,
        setTotalItemsInCard,
        showPixField,
        setShowPixField
      }}
    >
      {children}
    </CartContentContext.Provider>
  )
}
