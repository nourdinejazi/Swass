import InfiniteList from "@/app/_components/infinite-list";

const InfiniteListClient = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  let queryUrl = "";

  if (searchParams) {
    for (const key in searchParams) {
      queryUrl = queryUrl + `${key}=${searchParams[key]}&`;
    }
  }

  const produits = await fetch("http://localhost:3001/api/produit?" + queryUrl)
    .then((res) => res.json())
    .then((data) => data);
  return (
    <div className="w-full">
      <InfiniteList
        className="bg-white border p-12 border-primary rounded-lg w-full "
        initialData={produits}
      />
    </div>
  );
};

export default InfiniteListClient;
