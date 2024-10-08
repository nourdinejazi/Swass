"use client";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaLocationArrow } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { NewsTellerShema } from "@/schemas/settings";
import { useState } from "react";
import { addCustomerEmail } from "@/server/actions/newsteller";
import toast from "react-hot-toast";
import SmallSpinner from "./small-spinner";

const hoverClass =
  "relative  hover:text-accent/80 after:absolute after:bg-accent/80 after:bottom-1 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="flex bg-secondary flex-col mt-auto">
      <MainSubFooter />
      <div className="bg-secondary flex flex-col footerFont   ">
        <div className="p-4 py-10  lg:p-16 ">
          <div className="flex justify-start lg:justify-center flex-wrap gap-10 lg:gap-32 ">
            <div className="flex flex-col gap-5 ">
              <Image src="/logo.png" width={200} height={50} alt="log" />
              <span className="flex gap-2 items-center   ">
                <Phone size={16} />
                <Link href={"tel:28 797 822"}>+216 28 797 822</Link>
              </span>
              <span className="flex gap-2 items-center  ">
                <Mail size={16} />
                <Link href={"mailto:Swassfashion@gmail.com"}>
                  Swassfashion@gmail.com
                </Link>
              </span>
              <span className="flex gap-2 items-center  ">
                <FaLocationArrow size={16} />
                <Link
                  href="https://maps.app.goo.gl/uncSbfMZptoaPDxM6"
                  target="_blank"
                >
                  Notre Adresse
                </Link>
              </span>
            </div>

            <div className="flex flex-col gap-3 ">
              <h6 className="text-accent font-[600] mb-2">Quick Links</h6>
              <span className="flex gap-2 items-center   ">
                <Phone size={16} />
                <Link href={"tel:28 797 822"}>+216 28 797 822</Link>
              </span>
              <Link href="/">
                <span>Accueil</span>{" "}
              </Link>

              <Link href="/vetements?newCollection=true">
                <span>Nouveau Collection</span>
              </Link>
              <Link href="#">
                <span>Meilleures Ventes</span>
              </Link>
              <Link href="/vetements?categories[]=Dresses">
                <span>Robes</span>
              </Link>

              <Link href="/vetements?promotion=true">
                <span>Soldes </span>
              </Link>
            </div>

            <div className="flex flex-col gap-3 ">
              <h6 className="text-accent font-[600] mb-2">Suivez-nous</h6>

              <Link
                href="https://www.instagram.com/swass_fashion_/"
                target="_blank"
              >
                <span className="flex items-center justify-center  gap-2">
                  <FaInstagram size={16} />
                  Instagram
                </span>
              </Link>
              {/* <Link href="#">
                <span className="flex items-center justify-center  gap-2">
                  <FaTiktok size={16} />
                  +216 28 797 822
                </span>
              </Link> */}
              <Link
                href="https://www.facebook.com/SWASSFASHION"
                target="_blank"
              >
                <span className="flex items-center justify-center  gap-2">
                  <FaFacebook size={16} />
                  Facebook
                </span>
              </Link>
            </div>

            {/* <div className="flex flex-col gap-3 ">
              <h6 className="text-accent font-[600] mb-2">
                {footer.subFooter.title}
              </h6>
              <div className="flex gap-5 ">
                <Linkedin className="text-primary fill-primary" />
                <Facebook className="text-primary fill-primary" />
                <Instagram className="text-primary " />
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-auto w-full h-[50px] bg-accent flex items-center pl-[10%]">
          <span className="text-white">
            <span className="text-[#AAAAAA]">© </span>SWASS FASHION{" "}
            <span className="text-[#AAAAAA]"> – All rights reserved</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const MainSubFooter = () => {
  return (
    <div className="bg-accent w-[95%] min-h-[300px] shadowsm flex  justify-center    lg:justify-between  flex-wrap m-auto rounded-2xl z-50 mb-4 lg:-mb-10">
      <div className="lg:w-[60%] p-8 flex flex-col gap-5 lg:p-12">
        <h4 className="text-white">Abonnez-vous à notre service</h4>
        <small className="text-[#FFF]  max-w-[700px]">
          Abonnez-vous à notre service et profitez d'une expérience
          personnalisée avec des avantages exclusifs. Recevez nos dernières
          offres, nouveautés, et conseils directement dans votre boîte de
          réception
        </small>
        {/* <div className="relative  w-full  max-w-[600px]  ">
          <Input
            type="text"
            placeholder="Email Address"
            className="rounded-[50px]  pr-[60px] px-4 h-[60px] shadow-md pl-7 text-black "
          />
          <Button className="rounded-full sm:rounded-3xl absolute right-3 top-2.5  ">
            Subscribe
          </Button>
        </div>  */}
        <EmailInput></EmailInput>
      </div>
      <div className="      p-8">
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3209.2007521669607!2d10.7350408!3d36.4527045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302992c1abfe54b%3A0x721e592cfbeb859e!2sswass!5e0!3m2!1sfr!2stn!4v1727618507014!5m2!1sfr!2stn"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

function EmailInput() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof NewsTellerShema>>({
    resolver: zodResolver(NewsTellerShema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewsTellerShema>) => {
    try {
      setIsPending(true);
      addCustomerEmail(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          setIsPending(false);
        } else if (data.error) {
          toast.error(data.error);

          setIsPending(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative  w-full  max-w-[600px]  ">
                  <Input
                    type="text"
                    disabled={isPending}
                    {...field}
                    placeholder="Email Address"
                    className="rounded-[50px]  pr-[60px] px-4 h-[60px] shadow-md pl-7 text-black "
                  />
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="rounded-full sm:rounded-3xl absolute right-3 top-2.5  "
                  >
                    {isPending ? (
                      <SmallSpinner />
                    ) : (
                      <>
                        <ArrowRight className="lg:hidden" size={12} />
                        <span className="hidden lg:block">Subscribe</span>
                      </>
                    )}
                  </Button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

// const SecondarySubfooter = () => {
//   return (
//     <div className="min-h-[300px] p-8 text-white   footerGradiant flex flex-col items-center justify-center">
//       <div className=" max-w-[700px] flex flex-col text-center gap-5 items-center justify-center">
//         <h4 className="text-white"> </h4>
//         <small className="text-[#FFF]  max-w-[700px]"></small>
//         <div className="relative  w-full  max-w-[600px]  ">
//           <Input
//             type="text"
//             placeholder="Email Address"
//             className="rounded-[50px] py-4 pr-[60px] px-4 h-[60px] text-black pl-7 shadow-md "
//           />
//           <Button className="rounded-full sm:rounded-3xl absolute right-3 top-2.5  ">
//             Subscribe
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
