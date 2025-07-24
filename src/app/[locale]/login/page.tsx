import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

export default async function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-grey-100 transition-colors duration-300">
      <Navbar />
      <section className="w-full bg-white rounded-lg shadow-md p-8">
        <LoginForm />
      </section>
    </main>
  );
}
