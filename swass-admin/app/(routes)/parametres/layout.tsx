import Header from "@/components/header";
import { SidebarNav } from "@/components/tab-nav";
import { currentRole } from "@/lib/auth";

let sidebarNavItems = [
  {
    title: "Profile",
    href: "/parametres",
  },
  {
    title: "Config Produit",
    href: "/parametres/configproduit",
  },
];

let sidebarNavItemsSA = [
  {
    title: "Profile",
    href: "/parametres",
  },
  {
    title: "Config Produit",
    href: "/parametres/configproduit",
  },
  {
    title: "Sécurité",
    href: "/parametres/securite/adminlist",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const role = await currentRole();

  return (
    <div className="   overflow-auto w-full space-y-6 p-10 pb-16  ">
      <Header
        name="Paramétres"
        description="La page des paramètres vous permet de personnaliser votre expérience utilisateur."
      />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={role === "SUPERADMIN" ? sidebarNavItemsSA : sidebarNavItems}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
