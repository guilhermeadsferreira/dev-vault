import { redirect, useFetcher } from "react-router";
import { Container } from "~/components/ui/Container";
import { LoginForm } from "~/modules/login";
import { getAuth } from "~/lib/session.server";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export async function loader({ request }: { request: Request }) {
  const auth = await getAuth(request.headers.get("Cookie"));
  if ("loggedIn" in auth) return redirect("/");
  return null;
}

export default function Login() {
  const fetcher = useFetcher();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090d1f]">
      <Container size="md">
        <LoginForm
          onSubmit={(data) => {
            fetcher.submit(
              { username: data.username, password: data.password },
              { method: "post", action: "/?index" }
            );
          }}
        />
      </Container>
    </main>
  );
}
