import { useContextSelector } from 'use-context-selector'
import { ProductsContext } from '../contexts/ProductsContext.tsx'

export function useProducts() {
  const all_products = useContextSelector(
    ProductsContext,
    productContent => productContent.all_products
  )

  const searchedProducts = useContextSelector(
    ProductsContext,
    productContent => productContent.searchedProducts
  )

  const setSearchedProducts = useContextSelector(
    ProductsContext,
    productContent => productContent.setSearchedProducts
  )

  const hideHeader = useContextSelector(
    ProductsContext,
    productContent => productContent.hideHeader
  )

  const setHideHeader = useContextSelector(
    ProductsContext,
    productContent => productContent.setHideHeader
  )

  const selectedMethod = useContextSelector(
    ProductsContext,
    productContent => productContent.selectedMethod
  )

  const setSelectedMethod = useContextSelector(
    ProductsContext,
    productContent => productContent.setSelectedMethod
  )

  const paymentCheckoutForm = useContextSelector(
    ProductsContext,
    productContent => productContent.paymentCheckoutForm
  )

  const validatedValues = useContextSelector(
    ProductsContext,
    productContent => productContent.validatedValues
  )

  const setValidatedValues = useContextSelector(
    ProductsContext,
    productContent => productContent.setValidatedValues
  )

  const favoriteProductsIds = useContextSelector(
    ProductsContext,
    productContent => productContent.favoriteProductsIds
  )

  const setFavoriteProductsIds = useContextSelector(
    ProductsContext,
    productContent => productContent.setFavoriteProductsIds
  )

  const visibleSummary = useContextSelector(
    ProductsContext,
    productContent => productContent.visibleSummary
  )

  const setVisibleSummary = useContextSelector(
    ProductsContext,
    productContent => productContent.setVisibleSummary
  )

  const isButtonVisible = useContextSelector(
    ProductsContext,
    productContent => productContent.isButtonVisible
  )

  const setIsButtonVisible = useContextSelector(
    ProductsContext,
    productContent => productContent.setIsButtonVisible
  )

  return {
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
  }
}
