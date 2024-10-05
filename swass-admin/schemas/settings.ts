import { Produit } from "@prisma/client";
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

export const FamilleFormSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
});

export const StockItemSchema = z.object({
  couleurId: z.string().min(1, {
    message: "Le couleur doit contenir au moins 1 caractères",
  }),
  tailleId: z.string().min(1, {
    message: "La taille doit contenir au moins 1 caractères",
  }),
  stock: z
    .number()
    .int()
    .refine((value) => value >= 0, {
      message: "Stock doit être un nombre positif",
    }),
});

export const ProduitFormSchema = z.object({
  reference: z.string().length(7, {
    message: "La référence doit contenir 7 caractères",
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
  archived: z.boolean(),
  etat: z.enum(["Disponible", "En repture", ""]),
  model: z.string(),
  stock: z.array(StockItemSchema).min(1, {
    message: "Veuillez ajouter le stock",
  }),
  categorie: z.string(),
  famille: z.string(),
  images: z.array(z.any()).min(1, {
    message: "Veuillez ajouter au moins une image",
  }),
  longeur: z.enum(["Midi", "Mini", "Maxi", ""]),
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
  personalInfo: z.object({
    userId: z.string().min(1, {
      message: "L'identifiant de l'utilisateur est obligatoire",
    }),
    completed: z.boolean().optional(),
  }),
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

export const OrderSchemaAdmin = z.object({
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
  phone2: z.string().nullable(),
  infoSupp: z.string().nullable(),
  status: z.string(),
  paye: z.boolean(),
  modeLivraison: z.string(),
  modePaiement: z.string(),
  items: z.array(
    z.object({
      ref: z.string().optional(),
      quantity: z.number(),
      couleurId: z.string(),
      tailleId: z.string(),
    })
  ),
});

export type cartItem = Produit & {
  quantity: number;
  selectedCouleur: string;
  selectedTaille: string;
};
export const ChangePwdSchema = z.object({
  passwd: z.string().min(6, {
    message: "Au moins 6 caractères",
  }),
});
