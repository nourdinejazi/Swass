import { currentRole, currentUser } from "@/lib/auth";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const role = await currentRole();
  const user = await currentUser();
  // if (role !== "SUPERADMIN") {
  //   return <div className="uppercase">{user?.email} : Non Autorisé</div>;
  // } else {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center ">
      <Navbar />
      {children}
    </div>
  );
};
// };

export default ProtectedLayout;
