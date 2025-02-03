import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { usePathname } from "next/navigation";

const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[2];
  return (
    <div className="flex flex-col gap-6 lg:gap-0 w-full items-start">
      <div className="p-2">
        <Breadcrumb>
          <Item href={"/"}>Home</Item>
          <Item href={"/dashboard/orders"}>Dashboard</Item>
          <Item href={`/dashboard/${path}`} isEnd={true}>
            {path}
          </Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default DashboardBreadcrumb;
