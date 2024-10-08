// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Couleurs } from "@prisma/client";
// import { cn } from "@/lib/utils";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Trash } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";

// interface CouleurStockFormProps {
//   isPending: boolean;
//   field: any;
//   colors: Couleurs[];
//   initialData: {
//     stock: number;
//     couleur: string;
//   }[];
// }

// const CouleurStockForm = (props: CouleurStockFormProps) => {
//   const [data, setData] = useState(() => {
//     return props.initialData && props.initialData.length > 0
//       ? props.initialData.map((item) => ({
//           ...item,
//           id: uuidv4(),
//         }))
//       : [
//           {
//             id: uuidv4(),
//             stock: 0,
//             couleur: "",
//           },
//         ];
//   });

//   const handleChangeStock = (value: string, id: string) => {
//     const newData = data.map((obj) => {
//       if (obj.id === id) {
//         return { ...obj, stock: Number(value) };
//       }
//       return obj;
//     });
//     setData(newData);
//   };

//   const handleChangecouleur = (value: string, id: string) => {
//     const newData = data.map((obj) => {
//       if (obj.id === id) {
//         return { ...obj, couleur: value };
//       }
//       return obj;
//     });
//     setData(newData);
//   };

//   useEffect(() => {
//     props.field.onChange(data);
//   }, [data]);

//   return (
//     <div className="max-h-[500px] overflow-auto  ">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Stock</TableHead>

//             <TableHead className="text-right">Couleur</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item, key) => (
//             <TableRow key={key}>
//               <TableCell className="font-medium">
//                 <Input
//                   type="number"
//                   disabled={props.isPending}
//                   value={Number(item.stock).toString()}
//                   onChange={(ev) => handleChangeStock(ev.target.value, item.id)}
//                 />
//               </TableCell>

//               <TableCell className="text-right">
//                 <Select
//                   disabled={props.isPending}
//                   defaultValue={item.couleur}
//                   onValueChange={(value: string) =>
//                     handleChangecouleur(value, item.id)
//                   }
//                   value={item.couleur}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Choisir un couleur" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {props.colors.map((color) => (
//                       <SelectItem key={color.id} value={color.name}>
//                         <div className="flex flex-row gap-2 items-center justify-center  ">
//                           <div
//                             className={cn(`size-7 border  rounded-full   `)}
//                             style={{ backgroundColor: color.code.trim() }}
//                           />
//                           <span>{color.name}</span>{" "}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </TableCell>

//               <TableCell>
//                 <AlertDialog>
//                   <AlertDialogTrigger>
//                     <Trash color="#979797" size={17} />
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                         Êtes-vous vraiment sûr ?
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         Cette action est irréversible. Cela supprimera
//                         définitivement les données
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => {
//                           const newData = data.filter(
//                             (obj) => obj.id !== item.id
//                           );
//                           setData(newData);
//                         }}
//                       >
//                         Continue
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button
//         type="button"
//         disabled={props.isPending}
//         onClick={() =>
//           setData([...data, { id: uuidv4(), stock: 0, couleur: "" }])
//         }
//       >
//         Add Variant
//       </Button>
//     </div>
//   );
// };

// export default CouleurStockForm;
