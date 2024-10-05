import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

const Header = ({
  name,
  description,
  className,
}: {
  name: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={cn(className, "  space-y-6 pt-5  lg:pt-10 pb-8  ")}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
        <p className="text-muted-foreground">{description} </p>
      </div>
      <Separator className="my-6" />
    </div>
  );
};

export default Header;
