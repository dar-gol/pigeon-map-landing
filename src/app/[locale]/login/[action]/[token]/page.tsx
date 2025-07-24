import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import LoginActionEnum from "@/models/enums/LoginActionEnum";

interface LoginPageProps {
  params: Promise<{ action?: string; token?: string }>;
}

export default async function LoginActionPage({ params }: LoginPageProps) {
  const { action, token } = await params;

  // Convert string action to enum if it matches
  const actionEnum =
    action && Object.values(LoginActionEnum).includes(action as LoginActionEnum)
      ? (action as LoginActionEnum)
      : undefined;

  return (
    <main className="min-h-screen bg-white text-grey-100 transition-colors duration-300">
      <Navbar />
      <section className="w-full bg-white rounded-lg shadow-md p-8">
        <LoginForm action={actionEnum} token={token} />
      </section>
    </main>
  );
}
