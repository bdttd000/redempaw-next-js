import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer, Header } from "@/components/Layout";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen">
      <Header />

      <Footer />
    </main>
  );
}
