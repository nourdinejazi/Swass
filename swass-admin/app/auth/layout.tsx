import "../globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex flex-col items-center   justify-center  absolute inset-0   h-full w-full bg-white bg-[linear-gradient(to_right,#F6EBE4_1px,transparent_1px),linear-gradient(to_bottom,#F6EBE4_1px,transparent_1px)] bg-[size:14px_24px] ">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
