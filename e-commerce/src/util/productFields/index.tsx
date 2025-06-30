/* eslint-disable @typescript-eslint/no-explicit-any */
import AccessoriesPage from "../../pages/AccessoriesPage";
import CheckoutPage from "../../pages/CheckoutPage";
import CoatsPage from "../../pages/CoatsPage";
import CommerceHome from "../../pages/CommerceHome";
import PantsPage from "../../pages/PantsPage";
import ShoesPage from "../../pages/ShoesPage";
import ShortsPage from "../../pages/ShortsPage";
import ShowProductPage from "../../pages/ShowProductPage";
import TshirtsPage from "../../pages/TshirtsPage";
import WishListPage from "../../pages/WishListPage";

export const routePathsAndElements: any = [
  {path: '/', element: <CommerceHome />},
  {path: '/tshirts', element: <TshirtsPage />},
  {path: '/shorts', element: <ShortsPage />},
  {path: '/coats', element: <CoatsPage />},
  {path: '/pants', element: <PantsPage />},
  {path: '/shoes', element: <ShoesPage />},
  {path: '/accessories', element: <AccessoriesPage />},
  {path: '/products/:product_name', element: <ShowProductPage />},
  {path: '/wishlist', element: <WishListPage />},
  {path: '/checkout/:transition_status', element: <CheckoutPage />}
]

export const defaultProductsList = [{
  label: 'tshirts',
  products: [
    {name: 'Camiseta gola polo off-white', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_1.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_2.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_3.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_4.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_5.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_6.png', '/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_7.png'], favorite: true, discount: 15, code: 6 },
    {name: 'Camiseta gola polo verde', collection: 'Basic', images: ['/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_1.png', '/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_2.png', '/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_3.png', '/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_4.png', '/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_5.png'], price: 119.99, favorite: false, code: 7},
    {name: 'Camiseta gola polo off-white', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_1.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_2.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_3.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_4.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_5.png','/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_6.png', '/e-commerce/assets/TShirts/CamisetaBrancaeMarrom/cam_bm_7.png'], favorite: false, code: 8 },
    {name: 'Camiseta listrada', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/TShirts/CamisetaListrada/camiseta_li_1.png','/e-commerce/assets/TShirts/CamisetaListrada/camiseta_li_2.png','/e-commerce/assets/TShirts/CamisetaListrada/camiseta_li_3.png','/e-commerce/assets/TShirts/CamisetaListrada/camiseta_li_4.png'], favorite: true, code: 9 },
    {name: 'Camiseta gola polo verde', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_1.png'], favorite: false, code: 10 },
    {name: 'Camiseta gola polo verde', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/TShirts/CamisetaVerde/cam_ver_1.png'], favorite: true, code: 11 }
  ]
}, 
{
  label: 'coats',
  products: [
    {name: 'Moletom Hypermode', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_1.png','/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_2.png','/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_3.png','/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_4.png'], favorite: true, code: 1 },
    {name: 'Moletom Térmico Manfinity', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Coats/BlusaPreta/blusa_p_1.png','/e-commerce/assets/Coats/BlusaPreta/blusa_p_2.png','/e-commerce/assets/Coats/BlusaPreta/blusa_p_3.png','/e-commerce/assets/Coats/BlusaPreta/blusa_p_4.png'], favorite: false, code: 2 },
    {name: 'Moletom Hypermode', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_1.png'], favorite: false, code: 3 },
    {name: 'Moletom Térmico Manfinity', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Coats/BlusaPreta/blusa_p_1.png'], favorite: false, code: 4 },
    {name: 'Moletom Hypermode', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Coats/BlusaPretaeBranca/blusa_pb_1.png'], favorite: false, code: 5 },
  ]
},
{
  label: 'shorts',
  products: [
    {name: 'Bermuda preta lisa', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_1.png','/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_2.png','/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_3.png','/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_4.png'], favorite: true, code: 12 },
    {name: 'Bermuda preta lisa', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_1.png'], favorite: false, code: 13 },
    {name: 'Bermuda preta lisa', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_1.png'], favorite: false, code: 14 },
    {name: 'Bermuda preta lisa', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_1.png'], favorite: false, code: 15 },
    {name: 'Bermuda preta lisa', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Shorts/BermudaPreta/bermuda_p_1.png'], favorite: false, code: 16 },
  ]
},
{
  label: 'pants',
  products: [
    {name: 'Calça chino preta', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaPreta/calca_p_1.png','/e-commerce/assets/Pants/CalcaPreta/calca_p_2.png','/e-commerce/assets/Pants/CalcaPreta/calca_p_3.png','/e-commerce/assets/Pants/CalcaPreta/calca_p_4.png','/e-commerce/assets/Pants/CalcaPreta/calca_p_5.png','/e-commerce/assets/Pants/CalcaPreta/calca_p_6.png'], favorite: true, discount: 10, code: 17 },
    {name: 'Calça chino azul', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaAzul/calca_az_1.png','/e-commerce/assets/Pants/CalcaAzul/calca_az_2.png','/e-commerce/assets/Pants/CalcaAzul/calca_az_3.png','/e-commerce/assets/Pants/CalcaAzul/calca_az_4.png','/e-commerce/assets/Pants/CalcaAzul/calca_az_5.png','/e-commerce/assets/Pants/CalcaAzul/calca_az_6.png'], favorite: true, code: 18},
    {name: 'Calça chino preta', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaPreta/calca_p_1.png'], favorite: true, code: 19},
    {name: 'Calça chino azul', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaAzul/calca_az_1.png'], favorite: true, code: 20},
    {name: 'Calça chino preta', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaPreta/calca_p_1.png'], favorite: true, code: 21},
    {name: 'Calça chino azul', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaAzul/calca_az_1.png'], favorite: true, code: 22},
    {name: 'Calça chino preta', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Pants/CalcaPreta/calca_p_1.png'], favorite: true, code: 23}
  ]
},
{
  label: 'shoes',
  products: [
    {name: 'Tênis preto', collection: 'Basic', price: 299.99, images: ['/e-commerce/assets/Shoes/TenisPretoPadrao/tenis-preto.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/atras.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/baixo.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/cima.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/diagonal-direita.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/frente.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/lado.png'], favorite: true, discount: 35, code: 24 },
    {name: 'Tênis preto e branco', collection: 'Basic', price: 199.99, images: ['/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_1.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_2.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_3.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_4.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_5.png'], favorite: false, code: 25 },
    {name: 'Tênis preto', collection: 'Basic', price: 199.99, images: ['/e-commerce/assets/Shoes/TenisPretoPadrao/tenis-preto.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/atras.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/baixo.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/cima.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/diagonal-direita.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/frente.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/lado.png'], favorite: false, code: 26 },
    {name: 'Tênis preto e branco', collection: 'Basic', price: 199.99, images: ['/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_1.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_2.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_3.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_4.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_5.png'], favorite: false, code: 27 },
    {name: 'Tênis preto', collection: 'Basic', price: 199.99, images: ['/e-commerce/assets/Shoes/TenisPretoPadrao/tenis-preto.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/atras.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/baixo.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/cima.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/diagonal-direita.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/frente.png', '/e-commerce/assets/Shoes/TenisPretoPadrao/lado.png'], favorite: false, code: 28 },
    {name: 'Tênis preto e branco', collection: 'Basic', price: 199.99, images: ['/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_1.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_2.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_3.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_4.png','/e-commerce/assets/Shoes/TenisBrancoPreto/tenis_bp_5.png'], favorite: false, code: 29 },
  ]
},
{
  label: 'accessories',
  products: [
    {name: 'Boné preto peace love', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-1.png','/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-2.png','/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-3.png','/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-4.png'], favorite: true, discount: 10, code: 30 },
    {name: 'Kit shoulder bag + Carteira', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_1.png', '/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_2.png','/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_3.png','/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_4.png','/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_5.png'], favorite: true, code: 31 },
    {name: 'Boné preto peace love', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-1.png'], favorite: true, code: 32 },
    {name: 'Kit shoulder bag + Carteira', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_1.png'], favorite: true, code: 33 },
    {name: 'Boné preto peace love', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/BonePretoPeace/bone-peace-1.png'], favorite: true, code: 34 },
    {name: 'Kit shoulder bag + Carteira', collection: 'Basic', price: 89.99, images: ['/e-commerce/assets/Accessories/ShoulderCarteira/shoulder_c_1.png'], favorite: true, code: 35 }
  ]
}
]

export const allCountries = [
  { label: "Afeganistão", value: "Afeganistão", flag: "🇦🇫" },
  { label: "Albânia", value: "Albânia", flag: "🇦🇱" },
  { label: "Argélia", value: "Argélia", flag: "🇩🇿" },
  { label: "Andorra", value: "Andorra", flag: "🇦🇩" },
  { label: "Angola", value: "Angola", flag: "🇦🇴" },
  { label: "Argentina", value: "Argentina", flag: "🇦🇷" },
  { label: "Armênia", value: "Armênia", flag: "🇦🇲" },
  { label: "Austrália", value: "Austrália", flag: "🇦🇺" },
  { label: "Áustria", value: "Áustria", flag: "🇦🇹" },
  { label: "Azerbaijão", value: "Azerbaijão", flag: "🇦🇿" },
  { label: "Bahamas", value: "Bahamas", flag: "🇧🇸" },
  { label: "Bahrein", value: "Bahrein", flag: "🇧🇭" },
  { label: "Bangladesh", value: "Bangladesh", flag: "🇧🇩" },
  { label: "Barbados", value: "Barbados", flag: "🇧🇧" },
  { label: "Bielorrússia", value: "Bielorrússia", flag: "🇧🇾" },
  { label: "Bélgica", value: "Bélgica", flag: "🇧🇪" },
  { label: "Belize", value: "Belize", flag: "🇧🇿" },
  { label: "Benim", value: "Benim", flag: "🇧🇯" },
  { label: "Butão", value: "Butão", flag: "🇧🇹" },
  { label: "Bolívia", value: "Bolívia", flag: "🇧🇴" },
  { label: "Brasil", value: "Brasil", flag: "🇧🇷" },
  { label: "Canadá", value: "Canadá", flag: "🇨🇦" },
  { label: "Chile", value: "Chile", flag: "🇨🇱" },
  { label: "China", value: "China", flag: "🇨🇳" },
  { label: "Colômbia", value: "Colômbia", flag: "🇨🇴" },
  { label: "Equador", value: "Equador", flag: "🇪🇨" },
  { label: "França", value: "França", flag: "🇫🇷" },
  { label: "Alemanha", value: "Alemanha", flag: "🇩🇪" },
  { label: "Guiana", value: "Guiana", flag: "🇬🇾" },
  { label: "Índia", value: "Índia", flag: "🇮🇳" },
  { label: "Itália", value: "Itália", flag: "🇮🇹" },
  { label: "Japão", value: "Japão", flag: "🇯🇵" },
  { label: "México", value: "México", flag: "🇲🇽" },
  { label: "Paraguai", value: "Paraguai", flag: "🇵🇾" },
  { label: "Peru", value: "Peru", flag: "🇵🇪" },
  { label: "Rússia", value: "Rússia", flag: "🇷🇺" },
  { label: "África do Sul", value: "África do Sul", flag: "🇿🇦" },
  { label: "Coreia do Sul", value: "Coreia do Sul", flag: "🇰🇷" },
  { label: "Espanha", value: "Espanha", flag: "🇪🇸" },
  { label: "Suriname", value: "Suriname", flag: "🇸🇷" },
  { label: "Reino Unido", value: "Reino Unido", flag: "🇬🇧" },
  { label: "Estados Unidos", value: "Estados Unidos", flag: "🇺🇸" },
  { label: "Uruguai", value: "Uruguai", flag: "🇺🇾" },
  { label: "Venezuela", value: "Venezuela", flag: "🇻🇪" }
];

export const validsPromotionalCodes = [
  {code: 'DANTI10', value: '10'},
  {code: 'DANTI15', value: '15'},
  {code: 'BEMVINDO20', value: '20'},
]