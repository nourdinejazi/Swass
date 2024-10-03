const TableFallBack = () => {
  return (
    <div className="w-full bg-transparent rounded-xl  flex items-center justify-center h-[90vh] ">
      <LgSpiner />
    </div>
  );
};

export default TableFallBack;

const LgSpiner = () => {
  return (
    <div className="inline-block  w-16 h-16 animate-spin rounded-full border-2 border-accent  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
