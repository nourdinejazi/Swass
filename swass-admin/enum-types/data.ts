import {
  CheckCircledIcon,
  CircleBackslashIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";

export const modeLivraison = [
  {
    value: "Transporteur",
    label: "Transporteur",
  },
  {
    value: "Retrait",
    label: "Retrait",
  },
];

export const modePaiement = [
  {
    value: "carte",
    label: "Carte",
  },
  {
    value: "livraison",
    label: "Livraison",
  },
];

export const statuses = [
  {
    value: "injoignable",
    label: "Injoignable",
    icon: QuestionMarkCircledIcon,
    color: "#cbd5e1",
  },
  {
    value: "En attente",
    label: "En Attente",
    icon: CircleIcon,
    color: "#fde047",
  },

  {
    value: "retour",
    label: "Retour",
    icon: ReloadIcon,
    color: "#c084fc",
  },

  {
    value: "En cours",
    label: "En Cours",
    icon: CircleBackslashIcon,
    color: "#f472b6",
  },

  {
    value: "envoye",
    label: "Envoyée",
    icon: CheckCircledIcon,
    color: "#22d3ee",
  },

  {
    value: "livre",
    label: "Livrée",
    icon: CheckCircledIcon,
    color: "#4ade80",
  },
  {
    value: "annule",
    label: "Annulé",
    icon: CrossCircledIcon,
    color: "#ef4444",
  },
];

export const statusPaiement = [
  {
    value: "paye",
    label: "Payé",
    icon: CheckCircledIcon,
  },
  {
    value: "nonPaye",
    label: "Non Payé",
    icon: CircleIcon,
  },
];

export const etatsProduit = [
  {
    value: "Disponible",
    label: "Disponible",
    color: "#4ade80",
  },

  {
    value: "En repture",
    label: "En repture",
    color: "#ef4444",
  },
];

export const statusCollection = [
  {
    value: "newCollection",
    label: "New Collection",
    icon: CheckCircledIcon,
  },
  {
    value: "collection",
    label: "Collection",
    icon: CircleIcon,
  },
];

export const statusArchive = [
  {
    value: "archived",
    label: "Archivé",
    icon: CheckCircledIcon,
  },
  {
    value: "visible",
    label: "Visible",
    icon: CircleIcon,
  },
];

export const longueurs = [
  {
    value: "Mini",
    label: "Mini",
  },
  {
    value: "Midi",
    label: "Midi",
  },
  {
    value: "Maxi",
    label: "Maxi",
  },
];

export const inactiveOrderStatuses = ["injoignable", "annule", "retour"];
