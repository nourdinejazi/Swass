// "use client";

// import { GetProduitType } from "@/server/server-only";
// import { Button } from "./ui/button";
// import useCart from "@/hooks/use-cart";
// import useFavorites from "@/hooks/use-favorites";

// import { HeartFilledIcon } from "@radix-ui/react-icons";
// import { Heart } from "lucide-react";

// interface ProduitItemProps {
//   produit: GetProduitType;
// }

// const ProduitItem = ({ produit }: ProduitItemProps) => {
//   const cart = useCart();
//   const favoris = useFavorites();
//   return (
//     <div className="text-white p-20  bg-slate-800">
//       <h1>{produit.reference}</h1>
//       <h1>{produit.nom}</h1>
//       <p>{produit.description}</p>
//       <p>{produit.prix}</p>
//       <p>{produit.images.map((image) => image.path)}</p>
//       <Button onClick={() => cart.addItem({ ...produit, quantity: 1 })}>
//         Add to cart
//       </Button>
//       <div>
//         <Button onClick={() => favoris.addItem(produit)}>
//           {favoris.items.find((item) => item.id === produit.id) ? (
//             <HeartFilledIcon />
//           ) : (
//             <Heart />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProduitItem;
