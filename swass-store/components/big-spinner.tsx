const BigSpinner = () => {
  return (
    <div
      className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-accent/80  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_0.1s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default BigSpinner;
