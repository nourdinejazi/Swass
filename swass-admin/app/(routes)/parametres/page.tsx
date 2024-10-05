import { Separator } from "@/components/ui/separator";
import ProfileForm from "./_components/profile-form";
import { db } from "@/lib/db";

export default async function SettingsProfilePage() {
  const profile = await db.profile.findFirst({
    where: {
      key: 1,
    },
  });

  const { imageFile, ...formattedProfile } = profile!;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Cette page vous permet de contrôler la visibilité de vos informations
        </p>
      </div>
      <Separator />
      <ProfileForm profile={formattedProfile} />
    </div>
  );
}
