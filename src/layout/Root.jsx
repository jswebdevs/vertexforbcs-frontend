import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const Root = () => {
  return (
    <div className="mx-auto font-poppins max-w-full">
      <SiteHeader></SiteHeader>
      <Outlet></Outlet>
      <SiteFooter></SiteFooter>
    </div>
  );
};

export default Root;
