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
import { TaillesFormSchema } from "@/schemas/settings";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import SmallSpinner from "@/components/small-spinner";
import { Tailles } from "@prisma/client";
import { AddTailles } from "@/actions/settings/tailles/add-tailles";
import toast from "react-hot-toast";
import { DeleteTaille } from "@/actions/settings/tailles/delete-tailles";

export function TailleForm({ tailles }: { tailles: Tailles[] }) {
  const [isPending, startTransition] = useTransition();
  const [buttonContent, setbuttonContent] = useState<string | ReactNode>(
    "Ajouter"
  );
  const form = useForm<z.infer<typeof TaillesFormSchema>>({
    resolver: zodResolver(TaillesFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof TaillesFormSchema>) {
    startTransition(() => {
      AddTailles(data).then((res) => {
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
    const name = tailles.find(
      (tailles) => tailles.name === form.getValues("name")
    );

    if (isPending) {
      setbuttonContent(<SmallSpinner />);
    } else {
      setbuttonContent("Ajouter");
    }
  }, [tailles, isPending, form.watch("name")]);

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex items-center justify-center gap-5  flex-wrap     "
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
                    placeholder="nom du taille"
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
          <TableCaption>Liste des tailles disponible.</TableCaption>

          <TableBody>
            {tailles.map((tailles) => (
              <TableRow key={tailles.id}>
                <TableCell>{tailles.name}</TableCell>

                <TableCell className="flex gap-5 items-center justify-end ">
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
                          onClick={() => DeleteTaille(tailles.name)}
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
