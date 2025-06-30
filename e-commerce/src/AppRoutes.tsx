/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route , Routes } from "react-router-dom";
import { routePathsAndElements } from "./util/productFields";

const AppRoutes:React.FC = () => {
  return (
    <Routes>
      {routePathsAndElements?.map((route: any) => {
        return (
          <Route path={route?.path} element={route?.element} key={route?.path}/>
        )
      })}
    </Routes>
  )
}

export default AppRoutes