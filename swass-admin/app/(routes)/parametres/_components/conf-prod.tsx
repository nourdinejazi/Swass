import Link from "next/link";

import Image from "next/image";

const ConfProd = () => {
  return (
    <div className="w-full  grid grid-cols-2 gap-10">
      <Link
        href="/parametres/configproduit/couleur"
        className="  border p-5 border-accent rounded-xl flex flex-col items-center justify-center gap-5"
      >
        <Image
          src={"/images/conf-couleur.svg"}
          width={100}
          height={100}
          className=" "
          alt="conf-couleur"
        />
        <span className="text-accent text-center font-medium">
          Configuration des couleurs
        </span>
      </Link>
      <Link
        href="/parametres/configproduit/taille"
        className="  border p-5 border-accent rounded-xl flex flex-col items-center justify-center gap-5"
      >
        <Image
          src={"/images/conf-taille.svg"}
          width={100}
          height={100}
          className=" "
          alt="conf-couleur"
        />
        <span className="text-accent text-center font-medium">
          Configuration des tailles
        </span>
      </Link>
      <Link
        href="/parametres/configproduit/categorie"
        className="  border p-5 border-accent rounded-xl flex flex-col items-center justify-center gap-5"
      >
        <Image
          src={"/images/conf-cat.svg"}
          width={100}
          height={100}
          className=" "
          alt="conf-couleur"
        />
        <span className="text-accent text-center font-medium">
          Configuration des catégories et Famille
        </span>
      </Link>
      <Link
        href="/parametres/configproduit/modele"
        className="  border p-5 border-accent rounded-xl flex flex-col items-center justify-center gap-5"
      >
        <Image
          src={"/images/conf-model.svg"}
          width={100}
          height={100}
          className=" "
          alt="conf-couleur"
        />
        <span className="text-accent text-center font-medium">
          Configuration des modéles
        </span>
      </Link>
    </div>
  );
};

export default ConfProd;
