// "use client";
// import {
//   Credenza,
//   CredenzaBody,
//   CredenzaContent,
//   CredenzaDescription,
//   CredenzaHeader,
//   CredenzaTitle,
//   CredenzaTrigger,
// } from "@/components/ui/credenza";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { RegisterForm } from "./register-form";
// import { LoginForm } from "./login-form";
// interface AuthButtonProps {
//   children: React.ReactNode;
//   authMode?: "login" | "register";
//   asChild?: boolean;
//   className?: string;
//   redirectUrl?: string;
// }

// export const AuthButton = ({
//   children,
//   authMode = "login",
//   asChild,
//   redirectUrl,
//   className,
// }: AuthButtonProps) => {
//   return (
//     <Credenza>
//       <CredenzaTrigger asChild className={className}>
//         {children}
//       </CredenzaTrigger>
//       <CredenzaContent className="   w-auto bg-white  ">
//         <CredenzaHeader>
//           <CredenzaTitle>
//             <></>
//           </CredenzaTitle>
//           <CredenzaDescription>
//             <></>
//           </CredenzaDescription>
//         </CredenzaHeader>
//         <CredenzaBody>
//           <Tabs defaultValue={authMode}>
//             <TabsList className="w-full bg-white">
//               <TabsTrigger
//                 className="data-[state=active]:border-accent border-b-2 rounded-none text-md  w-1/2"
//                 value="login"
//               >
//                 Se connecter
//               </TabsTrigger>
//               <TabsTrigger
//                 className="data-[state=active]:border-accent border-b-2 rounded-none text-md  w-1/2"
//                 value="register"
//               >
//                 Créer un compte
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="login">
//               <LoginForm redirectUrl={redirectUrl} />
//             </TabsContent>
//             <TabsContent value="register">
//               <RegisterForm redirectUrl={redirectUrl} />
//             </TabsContent>
//           </Tabs>
//         </CredenzaBody>
//       </CredenzaContent>
//     </Credenza>
//   );
// };
