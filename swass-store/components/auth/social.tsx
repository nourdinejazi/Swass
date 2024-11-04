// "use client";

// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { useSearchParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// export const Social = ({ redirectUrl }: { redirectUrl?: string }) => {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl");

//   const onClick = (provider: "google") => {
//     signIn(provider, {
//       callbackUrl: redirectUrl || callbackUrl || DEFAULT_LOGIN_REDIRECT,
//     });
//   };

//   return (
//     <div className="flex items-center w-full gap-x-2">
//       <Button
//         size="lg"
//         className="w-full flex items-center justify-center gap-2"
//         variant="outline"
//         onClick={() => onClick("google")}
//       >
//         <FcGoogle className="h-5 w-5" />
//         connecter avec Google
//       </Button>
//     </div>
//   );
// };
