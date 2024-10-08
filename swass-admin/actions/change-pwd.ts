"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { ChangePwdSchema } from "@/schemas/settings";

export const ChangePwdfn = async (
  values: z.infer<typeof ChangePwdSchema>,
  userId: string
) => {
  const validatedFields = ChangePwdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { passwd } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(passwd, 10);

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return { error: "Utilisateur non trouvé!" };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Mot de pass Modifié!" };
};
