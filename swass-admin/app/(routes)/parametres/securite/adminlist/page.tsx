import { db } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangePwd } from "../_components/change-pwd";
import { currentUser } from "@/lib/auth";

const AdminListPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const role = user?.role;

  const data = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>Liste des administrateurs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Role</TableHead>
            {role === "SUPERADMIN" && (
              <TableHead className="text-right text-nowrap">
                Changer Mot de passe
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-sm">
                {user.email}
              </TableCell>
              <TableCell className="text-sm">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              {role === "SUPERADMIN" && (
                <TableCell className="text-right">
                  <ChangePwd userId={user.id} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminListPage;
