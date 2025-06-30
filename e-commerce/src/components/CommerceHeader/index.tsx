import { Badge, Button, Input, Layout, Menu, Row, Space } from 'antd';
import { CloseOutlined, HeartFilled, HeartOutlined, MenuOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CartDrawer from '../CartDrawer';
import { useCartContent } from '../../hooks/useCardContent';
import { useProducts } from '../../hooks/useProducts';
import { removeAccents } from '../../util/removeAccents';
import MenuDrawer from '../MenuDrawer';

const CommerceHeader: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Header } = Layout;
  const [currentTab, setCurrentTab] = useState(location?.pathname?.split('/')[1])
  const [visibleCartDrawer, setVisibleCartDrawer] = useState(false)
  const [visibleMenuDrawer, setVisibleMenuDrawer] = useState(false)
  const { totalItemsInCard } = useCartContent()
  const { all_products, setSearchedProducts, hideHeader, setHideHeader } = useProducts()
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollThreshold = 150
  const [showSearch, setShowSearch] = useState(false)
  
  const items = [
    {key: 'tshirts', label: 'CAMISETAS'},
    {key: 'coats', label: 'BLUSAS'},
    {key: 'shorts', label: 'BERMUDAS'},
    {key: 'pants', label: 'CALÇAS'},
    {key: 'shoes', label: 'CALÇADOS'},
    {key: 'accessories', label: 'ACESSÓRIOS'},
  ]
  

  useEffect(() => {
    const path = location?.pathname?.split('/')[1]
    setCurrentTab(path)
  }, [location?.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold && window.scrollY > lastScrollY) {
        setHideHeader(true);
        setShowSearch(false)
      } else if (window.scrollY < lastScrollY) {
        setHideHeader(false);
      }
      setLastScrollY(window.scrollY);
    };

    if (!location?.pathname?.includes('/checkout')) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSearchProducts(e: any) {
    const searchTerm = removeAccents(e.target.value?.toLowerCase()); 
    const filteredProducts = all_products
      .map(category => ({
        ...category,
        products: category?.products?.filter(product => 
          removeAccents(product?.name?.toLowerCase())?.includes(searchTerm) 
        )
      }))
      .filter(category => category?.products?.length > 0); 
  
    setSearchedProducts(filteredProducts)
  }

  return (
    <Header className={!showSearch ? `main-header ${hideHeader ? "hidden" : ""}` : `main-header show-search`}>
        {visibleCartDrawer && <CartDrawer setVisibleCartDrawer={setVisibleCartDrawer} />}
        {visibleMenuDrawer && <MenuDrawer setVisibleMenuDrawer={setVisibleMenuDrawer} items={items}/>}
        <Row justify="center" style={{alignItems: 'center'}}>
          <div className="header-logo" onClick={() => {
            navigate('/')
            setCurrentTab('')
            }}>DANTI</div>
        </Row>
        <Row justify="center" style={{alignItems: 'center'}}>
          <Space.Compact size="large" className='search-area'>
            <Button className='lateral-menu-button' onClick={() => setVisibleMenuDrawer(true)}>
              <MenuOutlined />
            </Button>
            <SearchOutlined className='search-button' onClick={() => setShowSearch(!showSearch)}/>
            <Input addonBefore={<SearchOutlined id="search-icon" />} placeholder="Search" className='input-search-header' id="search-header" onChange={
              onSearchProducts
            }/>
          </Space.Compact>
          <Menu
            className='header-menu'
            mode="horizontal"
            selectedKeys={[currentTab]}
            onClick={(value) => {
              navigate(value?.key)
              setCurrentTab(value?.key)
            }}
            items={items}
          />
          <span className='personal-user-actions'>
            {/* <UserOutlined className='user-icon' onClick={() => alert('usuário')}/> */}
            {location?.pathname === '/wishlist' ? (<HeartFilled style={{marginRight: 10, cursor: 'pointer'}}/>) : (
              <HeartOutlined style={{marginRight: 10, cursor: 'pointer'}} onClick={() => navigate('/wishlist')}/>
            )}
            <Badge count={totalItemsInCard} style={{backgroundColor: 'black'}}>
              <ShoppingOutlined style={{fontSize: 25}} onClick={() => setVisibleCartDrawer(true)} />
            </Badge>
          </span>
        </Row>
        <Row justify="center">
          <Input placeholder='Buscar' className='testando' addonAfter={<CloseOutlined className="close-search-icon" onClick={() => {
            setShowSearch(false)
            onSearchProducts({target: {value: ''}})
            }}/>} style={{padding: '0px 20px', margin: '0px 10px'}} onChange={onSearchProducts}/>
        </Row>
        
      </Header>
  )
}

export default CommerceHeader