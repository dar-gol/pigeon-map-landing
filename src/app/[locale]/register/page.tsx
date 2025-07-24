import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage() {
  return (
    <main className="min-h-screen bg-white text-grey-100 transition-colors duration-300">
      <Navbar />
      <section className="w-full bg-white rounded-lg shadow-md sm:p-8">
        <RegisterForm />
      </section>
    </main>
  );
}
