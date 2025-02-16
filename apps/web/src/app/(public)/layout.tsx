export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-28 bg-radial from-zinc-900 to-zinc-950">
      {children}
    </main>
  );
}
