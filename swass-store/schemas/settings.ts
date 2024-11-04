import { z } from "zod";

export const CouleurFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  code: z
    .string()
    .length(7, {
      message: "Le code doit contenir 7 caractères",
    })
    .regex(/^#/),
});

export const TaillesFormSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
});

export const ModelesFormSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
});

export const CategorieFormSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
});

export const SizeStockSchema = z.object({
  size: z.string().min(1, {
    message: "La taille doit contenir au moins 1 caractères",
  }),
  stock: z
    .number()
    .int()

    .refine((value) => value >= 0, {
      message: "Stock doit être un nombre positif",
    }),
});

export const CouleurStockSchema = z.object({
  couleur: z.string(),
  stock: z
    .number()
    .int()

    .refine((value) => value >= 0, {
      message: "Stock doit être un nombre positif",
    }),
});

export const ProduitFormSchema = z.object({
  reference: z
    .string()
    .min(1, {
      message: "La référence doit contenir au moins 1caractères",
    })
    .max(4, {
      message: "La référence doit contenir au plus 4 caractères",
    }),

  nom: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
  description: z.string(),

  prix: z.coerce
    .number()
    .multipleOf(0.001)
    .refine((value) => value > 0, {
      message: "Le montant doit être un nombre positif",
    }),
  newCollection: z.boolean(),
  etat: z.enum(["Disponible", "En repture", ""]),
  model: z.string(),
  sizeStock: z.array(SizeStockSchema),
  couleurStock: z.array(CouleurStockSchema),
  categorie: z.string(),
  images: z.array(z.any()).min(1, {
    message: "Veuillez ajouter au moins une image",
  }),
  longeur: z.enum(["Midi", "Mini", "Maxi", ""]),
  famille: z.string(),
  promotion: z.coerce
    .number()
    .int({
      message: "Promotion doit être un nombre sans virgule",
    })
    .refine((value) => value >= 0 && value <= 100, {
      message: "Promotion doit être un nombre positif et inférieur à 100",
    }),
});

export const OrderSchema = z.object({
  address: z.object({
    nom: z.string().min(1, {
      message: "L'adresse est obligatoire",
    }),
    prenom: z.string().min(1, {
      message: "L'adresse est obligatoire",
    }),
    location: z.string().min(1, {
      message: "L'adresse est obligatoire",
    }),
    city: z.string().min(1, {
      message: "La ville  est obigatoire",
    }),
    postalCode: z.string().min(1, {
      message: "Le code Postal est obigatoire",
    }),
    country: z.string().min(1, {
      message: "Le pays est obigatoire",
    }),
    phone: z.string().min(1, {
      message: "Le téléphone est obigatoire",
    }),
    phone2: z.string().optional(),
    infoSupp: z.string().optional(),
    completed: z.boolean().optional(),
  }),
  modeLivraison: z.object({
    mode: z.string().min(1, {
      message: "Mode Livraison est obligatoire",
    }),
    completed: z.boolean().optional(),
  }),
  modePaiement: z.object({
    paiement: z.string().min(1, {
      message: "Mode Paiement est obligatoire",
    }),
    completed: z.boolean().optional(),
  }),
});

export const NewsTellerShema = z.object({
  email: z.string().email(),
});
