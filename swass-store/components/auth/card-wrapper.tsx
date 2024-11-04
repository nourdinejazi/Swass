// "use client";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { BackButton } from "@/components/auth/back-button";
// import { Social } from "./social";
// import { Separator } from "../ui/separator";

// interface CardWrapperProps {
//   children: React.ReactNode;
//   headerLabel: string;
//   backButtonLabel: string;
//   backButtonHref: string;
//   showSocial?: boolean;

//   redirectUrl?: string;
// }

// export const CardWrapper = ({
//   children,
//   headerLabel,
//   backButtonLabel,
//   backButtonHref,
//   showSocial,
//   redirectUrl,
// }: CardWrapperProps) => {
//   return (
//     <Card className="md:w-[400px] sm:w-[88%] shadow-none    bg-white">
//       <CardContent>{children}</CardContent>
//       <div className="relative h-10   flex items-center justify-center">
//         <Separator className="w-[80%]" />
//         <span className="absolute  bg-white px-2 text-sm text-[#2F2F2F]">
//           Ou
//         </span>
//       </div>
//       {showSocial && (
//         <CardFooter>
//           <Social redirectUrl={redirectUrl} />
//         </CardFooter>
//       )}
//       <CardFooter>
//         <BackButton label={backButtonLabel} href={backButtonHref} />
//       </CardFooter>
//     </Card>
//   );
// };
