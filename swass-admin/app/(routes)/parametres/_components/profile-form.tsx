"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useTransition } from "react";
import SmallSpinner from "@/components/small-spinner";
export const ProfileSchema = z.object({
  imageFile: z.instanceof(FileList),
  title: z.string().min(3).max(25).optional(),
  description: z.string().min(3).max(200).optional(),
});

export default function ProfileForm({ profile }: { profile: any }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profile || {
      title: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ProfileSchema>) {
    try {
      const formData = new FormData();
      if (data.imageFile && data.imageFile[0]) {
        formData.append("file", data.imageFile[0]);
      }
      formData.append("title", data.title ?? "");
      formData.append("description", data.description ?? "");

      startTransition(async () => {
        const response = await fetch("/api/settings/profile", {
          method: "POST",
          body: formData,
        });
        toast.success("mise à jour avec succès");
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fileRef = form.register("imageFile");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Image-accueil"
                  type="file"
                  disabled={isPending}
                  {...fileRef}
                  onChange={(event) => {
                    field.onChange(event.target?.files?.[0] ?? undefined);
                  }}
                />
              </FormControl>
              <FormDescription>
                Sélectionnez l'image que vous voulez afficher sur la page
                d'accueil.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Taper un Titre.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Taper un bio .</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? <SmallSpinner /> : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
}
