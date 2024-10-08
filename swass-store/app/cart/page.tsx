// "use client";
// import useCart from "@/hooks/use-cart";
// import { Navigation } from "@/components/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Minus, Plus, Trash } from "lucide-react";
// import Currency from "@/components/currency";
// import { Separator } from "@/components/ui/separator";
// const CartPage = () => {
//   const cart = useCart();
//   const total = cart.items
//     .map(
//       (item) => (item.prix - item.prix * (item.promotion / 100)) * item.quantity
//     )
//     .reduce((a, b) => a + b, 0);
//   return (
//     <main className="lg:px-[5%]  pb-[200px] bg-secondary flex-justify-center    ">
//       <Navigation />
//       <div className="bg-white flex flex-col gap-5  p-8 rounded-lg mt-10 max-w-[1300px]   ">
//         <h3 className="text-2xl font-medium">Panier</h3>
//         <Button onClick={() => cart.setOpen(true)}>open</Button>
//         <Table className="flex-shrink">
//           <TableHeader className="">
//             <TableRow className="hover:bg-white flex items-center justify-start gap-10 py-3  ">
//               <TableHead className="w-[150px]">#</TableHead>
//               <TableHead className="w-[150px] ">Produit</TableHead>
//               <TableHead className="w-[150px] ">Prix Unitaire</TableHead>
//               <TableHead className="w-[150px]">Qte</TableHead>

//               <TableHead className="w- *:">Prix Total</TableHead>
//               <TableHead className="w- ">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody className=" space-y-10">
//             {cart.items.map((item) => (
//               <TableRow
//                 key={item.id}
//                 className=" flex items-center justify-start gap-10"
//               >
//                 <TableCell className=" size-[170px]  relative      ">
//                   {item.images[0]?.path !== undefined && (
//                     <Image
//                       src={`http://localhost:3001${item.images[0].path}`}
//                       fill
//                       alt="img"
//                       sizes="100"
//                       onLoadingComplete={(image) =>
//                         image.classList.remove("img--hidden")
//                       }
//                       className="object-cover object-center   h-auto w-full rounded-md  img img--hidden"
//                     ></Image>
//                   )}
//                 </TableCell>

//                 <TableCell className="flex flex-col gap-3">
//                   <span className="font-medium">{item.nom}</span>
//                   {/* <span>{item.co}</span> */}
//                   <span>{item.description}</span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-lg font-medium text-black">
//                     <div className="flex gap-2 items-center flex-col  ">
//                       <Currency
//                         className="text-red-500 opacity-60 line-through"
//                         value={item.prix}
//                       />

//                       <Currency value={item.prix} promotion={item.promotion} />
//                     </div>
//                   </span>
//                 </TableCell>

//                 <TableCell className="flex  gap-2 items-center justify-center ">
//                   <Button
//                     variant={"ghost"}
//                     size={"icon"}
//                     onClick={() => cart.removeItem(item.id)}
//                   >
//                     <Minus size={17} />
//                   </Button>

//                   <span className="text-lg text-black">
//                     {cart.getItem(item.id)?.quantity}
//                   </span>

//                   <Button
//                     variant={"ghost"}
//                     size={"icon"}
//                     onClick={() =>
//                       cart.addItem({
//                         ...item,
//                         quantity: cart.getItem(item.id)?.quantity || 0 + 1,
//                       })
//                     }
//                   >
//                     <Plus size={17} />
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-lg font-medium text-black">
//                     <Currency
//                       promotion={item.promotion}
//                       value={item.prix * item.quantity}
//                     />
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant={"ghost"}
//                     onClick={() => cart.removeItem(item.id, true)}
//                   >
//                     <Trash size={20} />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Separator />
//         <div className="flex justify-between   ">
//           <h3>TOTAL TTC</h3>
//           <Currency value={total} className="text-black font-medium text-xl" />
//         </div>
//       </div>
//       <div className="flex justify-between max-w-[1300px] mt-5  ">
//         <Button size={"lg"} className=" " variant={"default"}>
//           <ChevronLeft size={20} /> Continuer Mes Achats
//         </Button>
//         <Button
//           size={"lg"}
//           className="bg-[#F05F4B] text-white hover:bg-[#F05F4B] hover:bg-opacity-80 hover:text-white"
//           variant={"default"}
//         >
//           Commander <ChevronRight size={20} />
//         </Button>
//       </div>
//     </main>
//   );
// };

// export default CartPage;

const CartPage = () => {
  return <div>cart</div>;
};

export default CartPage;
