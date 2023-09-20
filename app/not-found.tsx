import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center">
      <div className="mt-8">
        <h1 className="font-bold text-5xl my-4">404 Not Found</h1>
        <Link href="/" className="text-xl text-blue-600 underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
