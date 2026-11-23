import { Container } from "@/shared/ui/container";

export default function AdminLoading() {
  return (
    <div aria-busy="true" className="animate-pulse space-y-6">
      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-line" />
        <div className="h-9 w-64 rounded bg-line" />
        <div className="h-4 w-full max-w-xl rounded bg-surface" />
      </div>
      <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((slot) => (
          <div key={slot} className="h-24 rounded-lg border border-line bg-white" />
        ))}
      </Container>
      <div className="h-64 rounded-lg border border-line bg-white" />
    </div>
  );
}
