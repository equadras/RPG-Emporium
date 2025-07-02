import { Drawer, Menu } from "antd"
import { useNavigate } from "react-router-dom";

interface IMenuDrawer {
  setVisibleMenuDrawer: (value: boolean) => void
  items: {
    key: string;
    label: string;
}[]
}
const MenuDrawer: React.FC<IMenuDrawer> = ({setVisibleMenuDrawer, items}) => {
  const navigate = useNavigate()

  return (
    <Drawer 
      open
      onClose={() => setVisibleMenuDrawer(false)}
      placement="left"
      width={700}
      title={
      <div style={{textAlign: 'center'}}>
        <div className="header-logo" style={{marginTop: 0}} onClick={() => {
          navigate('/')
          setVisibleMenuDrawer(false)
        }}>
          RPG EMPORIUM
        </div>
      </div>
      }
    >
      <Menu
        className='header-menu'
        mode="vertical"
        onClick={(value) => {
          navigate(value?.key)
          setVisibleMenuDrawer(false)
        }}
        items={items}
      />
    </Drawer>
  )
}

export default MenuDrawer