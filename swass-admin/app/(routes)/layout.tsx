import SideBar from "@/components/sidebar";
import { currentRole } from "@/lib/auth";

const RoutesLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();

  if (role !== "ADMIN" && role !== "SUPERADMIN")
    return <div>Not Authorized</div>;

  return (
    <div className="  m-0 p-0  w-full h-full  max-h-full overflow-auto lg:flex     bg-secondary/20       ">
      <div className="bg-white    lg:h-full ">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default RoutesLayout;
