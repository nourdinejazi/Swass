import { cn } from "@/lib/utils";

const SmallSpinner = ({
  className,
}:{
  className? : string
}) => {
  return (
    <div
      className={cn(className,"inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent/80  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_0.1s_linear_infinite]")}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default SmallSpinner;
