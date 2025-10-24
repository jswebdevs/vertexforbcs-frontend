import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const Root = () => {
  return (
    <div className="mx-auto font-poppins max-w-full">
      <SiteHeader></SiteHeader>
      <div className="pt-20">
        <Outlet></Outlet>
      </div>
      <SiteFooter></SiteFooter>
    </div>
  );
};

export default Root;
