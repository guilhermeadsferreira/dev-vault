import { redirect, useFetcher, useLoaderData } from "react-router";
import { Container } from "~/components/ui/Container";
import { HomePage } from "~/modules/home";
import { LoginForm } from "~/modules/login";
import { getAuth, serializeAuth, clearAuth } from "~/lib/session.server";
import { loginSchema } from "~/modules/login/schema";

export function meta() {
  return [
    { title: "Dev Vault" },
    { name: "description", content: "Dev Vault" },
  ];
}

export async function loader({ request }: { request: Request }) {
  const auth = await getAuth(request.headers.get("Cookie"));
  return { isAuthenticated: "loggedIn" in auth };
}

export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") return null;

  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "logout") {
    return redirect("/", {
      headers: {
        "Set-Cookie": await clearAuth(),
      },
    });
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const result = loginSchema.safeParse({ username, password });

  if (!result.success) {
    return { error: "Dados inválidos" };
  }

  // Esboço: aceita qualquer credencial. Quando tiver backend, validar aqui.
  return redirect("/", {
    headers: {
      "Set-Cookie": await serializeAuth({ loggedIn: true }),
    },
  });
}

export default function Index() {
  const { isAuthenticated } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  if (isAuthenticated) {
    return <HomePage />;
  }

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
