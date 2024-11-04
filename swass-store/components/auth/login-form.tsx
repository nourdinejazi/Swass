// "use client";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { useState, useTransition } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { LoginSchema } from "@/schemas";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { CardWrapper } from "@/components/auth/card-wrapper";
// import { Button } from "@/components/ui/button";
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { login } from "@/server/actions/login";
// import SmallSpinner from "../small-spinner";
// import { KeyRound, Mail } from "lucide-react";

// export const LoginForm = ({ redirectUrl }: { redirectUrl?: string }) => {
//   const path = usePathname();

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl");
//   const urlError =
//     searchParams.get("error") === "OAuthAccountNotLinked"
//       ? "Email already in use with different provider!"
//       : "";

//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof LoginSchema>>({
//     resolver: zodResolver(LoginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
//     setError("");
//     setSuccess("");

//     startTransition(() => {
//       login(values, redirectUrl || callbackUrl)
//         .then((data) => {
//           if (data?.error) {
//             form.reset();
//             setError(data.error);
//           } else if (data?.success) {
//             form.reset();

//             setSuccess(data.success);
//             window.location.reload();
//           } else {
//             window.location.reload();
//           }
//         })
//         .catch(() => setError("Something went wrong"));
//     });
//   };

//   return (
//     <CardWrapper
//       headerLabel="Welcome back"
//       backButtonLabel="Vous n'avez pas de compte ?"
//       backButtonHref="/auth/register"
//       showSocial
//       redirectUrl={redirectUrl}
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4 rounded-md p-4 bg-secondary">
//             <>
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-accent">Email</FormLabel>
//                     <FormControl>
//                       <div className="flex items-center justify-center  gap-2">
//                         <Mail size={20} className="text-accent" />
//                         <Input
//                           {...field}
//                           disabled={isPending}
//                           placeholder="john.doe@example.com"
//                           className="focus-visible:ring-0"
//                           type="email"
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-accent">Password</FormLabel>
//                     <FormControl>
//                       <div className="flex items-center justify-center  gap-2">
//                         <KeyRound size={20} className="text-accent" />
//                         <Input
//                           {...field}
//                           disabled={isPending}
//                           placeholder="******"
//                           className="focus-visible:ring-0"
//                           type="password"
//                         />
//                       </div>
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           </div>
//           <FormError message={error || urlError} />
//           <FormSuccess message={success} />
//           <Button
//             disabled={isPending}
//             type="submit"
//             className="w-full   text-white  "
//           >
//             <span className="flex gap-3 items-center justify-center">
//               {isPending ? "Se connecter " && <SmallSpinner /> : "Se connecter"}
//             </span>
//           </Button>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// };
