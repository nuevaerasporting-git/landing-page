import { Container } from "@/shared/ui/container";

export default function PublicLoading() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="border-b border-white/10 bg-ink">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-4">
            <div className="h-3 w-40 rounded bg-white/20" />
            <div className="h-12 w-full max-w-xl rounded bg-white/20" />
            <div className="h-4 w-full max-w-md rounded bg-white/10" />
            <div className="flex gap-3 pt-4">
              <div className="h-12 w-40 rounded bg-white/20" />
              <div className="h-12 w-40 rounded bg-white/10" />
            </div>
          </div>
          <div className="aspect-[4/3] rounded-lg bg-white/10 sm:aspect-[16/9]" />
        </Container>
      </div>
      <Container className="space-y-4 py-12">
        <div className="h-8 w-72 rounded bg-line" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((slot) => (
            <div key={slot} className="aspect-[4/3] rounded-lg bg-surface" />
          ))}
        </div>
      </Container>
    </div>
  );
}
