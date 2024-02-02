import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer, Header } from "@/components/Layout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen">
      <Header />
      xd
      <Footer />
    </main>
  );
}
