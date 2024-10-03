import { Header } from "@/components/auth/header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col items-center   justify-center     h-[90vh] w-full bg-white bg-[linear-gradient(to_right,#F6EBE4_1px,transparent_1px),linear-gradient(to_bottom,#F6EBE4_1px,transparent_1px)] bg-[size:14px_24px] ">
      <div className="bg-white p-5 lg:p-8    border-[3px]  border-primary rounded-[30px]">
        <Header label="Welcome!"></Header>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
