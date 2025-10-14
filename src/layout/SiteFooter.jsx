import FooterColumn1 from "./FooterColumn1";
import FooterColumn2 from "./FooterColumn2";
import FooterColumn3 from "./FooterColumn3";
import FooterColumn4 from "./FooterColumn4";
import FooterCopyright from "./FooterCopyright";

const SiteFooter = () => (
  <footer className="bg-gray-800 pt-10">
    <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-300">
      <FooterColumn1 />
      <FooterColumn2 />
      <FooterColumn3 />
      <FooterColumn4 />
    </div>
    <FooterCopyright></FooterCopyright>
  </footer>
);

export default SiteFooter;