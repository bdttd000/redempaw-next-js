import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer, Header } from "@/components/Layout";
import { redirect } from "next/navigation";
import Form from "./form";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen relative items-center overflow-hidden">
      <Header />
      <div className="flex flex-col mb-40 w-4/5">
        <h1 className="font-semibold text-4xl text-center mt-12 mb-8">
          Dodawanie zwierzaka
        </h1>
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default page;
