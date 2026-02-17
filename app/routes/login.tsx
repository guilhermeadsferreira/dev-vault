import { Container } from "~/components/ui/Container";
import { LoginForm } from "~/features/login";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Container size="md">
        <LoginForm />
      </Container>
    </main>
  );
}
