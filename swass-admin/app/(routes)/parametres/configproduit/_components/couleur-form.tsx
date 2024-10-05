"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { AddCouleur } from "@/actions/settings/couleur/add-couleur";
import { CouleurFormSchema } from "@/schemas/settings";
import toast from "react-hot-toast";
import { Couleurs } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import SmallSpinner from "@/components/small-spinner";
import { DeleteCouleur } from "@/actions/settings/couleur/delete-couleurs";

export function CouleurForm({ couleurs }: { couleurs: Couleurs[] }) {
  const [isPending, startTransition] = useTransition();
  const [buttonContent, setbuttonContent] = useState<string | ReactNode>(
    "Ajouter"
  );
  const form = useForm<z.infer<typeof CouleurFormSchema>>({
    resolver: zodResolver(CouleurFormSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof CouleurFormSchema>) {
    startTransition(() => {
      AddCouleur(data).then((res) => {
        if (res.success) {
          form.reset();
          toast.success(res.success);
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  }

  useEffect(() => {
    const name = couleurs.find(
      (couleur) => couleur.name === form.getValues("name")
    );

    if (isPending) {
      setbuttonContent(<SmallSpinner />);
    } else if (name) {
      setbuttonContent("Modifier");
    } else {
      setbuttonContent("Ajouter");
    }
  }, [couleurs, isPending, form.watch("name")]);

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex items-center justify-center flex-wrap gap-5       "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="nom du couleur"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="#FFFFFF"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="mt-auto" type="submit">
            {buttonContent}
          </Button>
        </form>
      </Form>
      <div className="h-[300px] overflow-auto rounded-xl">
        <Table>
          <TableCaption>Liste des couleurs disponible.</TableCaption>

          <TableBody>
            {couleurs.map((couleur) => (
              <TableRow key={couleur.id}>
                <TableCell className="flex gap-2 items-center justify-start">
                  <div
                    className={cn(`size-7 border  rounded-full   `)}
                    style={{ backgroundColor: couleur.code.trim() }}
                  />
                  <span>{couleur.name}</span>
                </TableCell>
                <TableCell>{couleur.code}</TableCell>
                <TableCell className="flex gap-5 items-center justify-start">
                  <Pencil
                    onClick={() => {
                      form.setValue("name", couleur.name);
                      form.setValue("code", couleur.code);
                    }}
                    className="cursor-pointer text-[#979797] hover:text-primary"
                    size={17}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash color="#979797" size={17} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Êtes-vous vraiment sûr ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. Cela supprimera
                          définitivement les données
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => DeleteCouleur(couleur.name)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
