export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="h-8 w-48 animate-pulse rounded bg-nesc-gray" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-nesc-gray" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-nesc-gray" />
    </div>
  );
}