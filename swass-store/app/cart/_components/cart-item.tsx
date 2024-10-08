// "use client";
// import { GetProduitType } from "@/server/server-only";

// import useCart from "@/hooks/use-cart";
// import { Button } from "@/components/ui/button";

// interface ProduitItemProps {
//   data: GetProduitType;
// }

// const CartItem = ({ data }: ProduitItemProps) => {
//   const cart = useCart();
//   return (
//     <div className="text-white p-5 m-5  bg-blue-400">
//       <Button onClick={() => cart.removeItem(data.id)}>remove from cart</Button>
//       <h1>{data.reference}</h1>
//       <h1>{data.nom}</h1>
//       <p>{data.description}</p>
//       <p>{data.prix}</p>
//       <div>
//         <Button onClick={() => cart.removeItem(data.id)}>-</Button>

//         <span className="text-xl text-red-600">
//           quantity : {cart.getItem(data.id)?.quantity}
//         </span>

//         {/* <Button
//           onClick={() =>
//             cart.addItem({
//               ...data,
//               quantity: cart.getItem(data.id)?.quantity || 0 + 1,
//             })
//           }
//         >
//           +
//         </Button> */}
//       </div>

//       <p>{data.images.map((image) => image.path)}</p>
//     </div>
//   );
// };

// export default CartItem;
