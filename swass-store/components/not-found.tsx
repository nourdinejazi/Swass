import Link from "next/link";
import Image from "next/image";
const NotFound = () => {
  return (
    <div className="flex h-[80vh] flex-col bg-white">
      <div className="relative w-full h-64">
        <Image
          // src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
          src="/notfound.avif"
          alt=""
          priority
          quality={100}
          fill
          className=" object-cover object-center w-full  "
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            We can't find that page.
          </h1>

          <p className="mt-4 text-gray-500">
            Try searching again, or return home to start from the beginning.
          </p>

          <Link
            className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-colors focus:outline-none  "
            href="/"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
