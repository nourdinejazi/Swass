"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { ChangePwdfn } from "@/actions/change-pwd";
import toast from "react-hot-toast";
import { ChangePwdSchema } from "@/schemas/settings";
import SmallSpinner from "@/components/small-spinner";

export function ChangePwd({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePwdSchema>>({
    resolver: zodResolver(ChangePwdSchema),
    defaultValues: {
      passwd: "",
    },
  });

  function onSubmit(data: z.infer<typeof ChangePwdSchema>) {
    console.log(data);
    startTransition(() => {
      ChangePwdfn(data, userId).then((res) => {
        if (res.success) {
          // form.reset();
          toast.success(res.success);
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start  justify-start gap-2"
      >
        <FormField
          control={form.control}
          name="passwd"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  className="w-[150px]"
                  placeholder="Changer mdp"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} size={"icon"} type="submit">
          {isPending ? <SmallSpinner /> : <Check size={17} />}
        </Button>
      </form>
    </Form>
  );
}
