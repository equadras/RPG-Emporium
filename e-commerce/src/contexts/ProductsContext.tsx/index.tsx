/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { createContext } from 'use-context-selector'
import { defaultProductsList } from '../../util/productFields'
import { Form, FormInstance } from 'antd'
import { ProductDTO, fetchProducts } from '../../services/products'


interface IAllProducts {
  label: string
   products: ProductDTO[]
}

interface ProductsContextProps {
  all_products: IAllProducts[]
  searchedProducts: IAllProducts[]
  setSearchedProducts: (value: IAllProducts[]) => void
  hideHeader: boolean
  setHideHeader: (value: boolean) => void
  selectedMethod: string
  setSelectedMethod: (value: string) => void
  paymentCheckoutForm: FormInstance
  validatedValues: any
  setValidatedValues: (value: any) => void
  favoriteProductsIds: string[]
  setFavoriteProductsIds: (value: any) => void
  visibleSummary: boolean
  setVisibleSummary: (value: boolean) => void
  isButtonVisible: boolean
  setIsButtonVisible: (value: boolean) => void
 }

export const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps
)

export const ProductsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [all_products, setAllProducts] = useState<IAllProducts[]>([])
  const [searchedProducts, setSearchedProducts] = useState<IAllProducts[]>([])
  const [favoriteProductsIds, setFavoriteProductsIds] = useState<string[]>(() => {
    const storagedIds = localStorage.getItem('@Danti:FavoriteProducts')
    return storagedIds ? storagedIds.split(',') : []
  })
  const [hideHeader, setHideHeader] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('pix')
  const [paymentCheckoutForm] = Form.useForm()
  const [validatedValues, setValidatedValues] = useState()
  const [visibleSummary, setVisibleSummary] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  function groupByCategory(products: ProductDTO[]): IAllProducts[] {
    const map = new Map<string, ProductDTO[]>()
    products.forEach(p => {
      const cat = p.category
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(p)
    })
    return Array.from(map.entries()).map(([label, prods]) => ({ label, products: prods }))
  }

  // no mount, busca do back e popula
  useEffect(() => {
    fetchProducts()
      .then(prods => {
        const grouped = groupByCategory(prods)
        setAllProducts(grouped)
        setSearchedProducts(grouped)
      })
      .catch(console.error)
  }, [])
 return (
    <ProductsContext.Provider
      value={{
        all_products,
        searchedProducts,
        setSearchedProducts,
        hideHeader,
        setHideHeader,
        selectedMethod,
        setSelectedMethod,
        paymentCheckoutForm,
        validatedValues,
        setValidatedValues,
        favoriteProductsIds,
        setFavoriteProductsIds,
        visibleSummary,
        setVisibleSummary,
        isButtonVisible,
        setIsButtonVisible
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
