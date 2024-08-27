import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <div className="flex flex-col items-center mb-12 gap-6">
        <h1 className="text-5xl font-bold text-slate-50">
          Welcome to Authentication App!
        </h1>
        <span className="text-transparent text-lg bg-gradient-to-t from-cyan-300 to-slate-100 bg-clip-text font-medium transition-all hover:underline hover:bg-gradient-to-t hover:from-cyan-400 hover:to-slate-300 hover:bg-clip-text">
          <Link href="/signup">Go to Sign up page</Link>
        </span>
      </div>
    </main>
  );
}
