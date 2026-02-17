import type { Route } from "./+types/ui-kit-docs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "~/components/ui/Container";
import { Stack } from "~/components/ui/Stack";
import { Box } from "~/components/ui/Box";
import { Text } from "~/components/ui/Text";
import { Card, CardHeader, CardBody, CardFooter } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Field, Input } from "~/components/ui/Field";
import { Form, FormGroup } from "~/components/ui/Form";
import { FormField } from "~/components/ui/FormField";
import { Link } from "~/components/ui/Link";
import styles from "./ui-kit-docs.module.css";

const formFieldSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().min(1).email("Email inválido"),
});

type FormFieldFormValues = z.infer<typeof formFieldSchema>;

function DocSection({
  title,
  when,
  how,
  children,
}: {
  title: string;
  when: string;
  how: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.docWhen}>{when}</p>
      <pre className={styles.docHow}>{how}</pre>
      <div className={styles.docVariants}>
        <div className={styles.docVariantsLabel}>Variações</div>
        {children}
      </div>
    </section>
  );
}

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "UI Kit – Documentação" },
    { name: "description", content: "Documentação do design system: componentes, variações e uso" },
  ];
}

export default function UiKitDocs() {
  const { control } = useForm<FormFieldFormValues>({
    resolver: zodResolver(formFieldSchema),
    defaultValues: { name: "", email: "" },
  });

  return (
    <Container size="lg" centered>
      <Stack gap="xl">
        <Box padding="md" border background="muted" radius="md">
          <Text as="h1" variant="title">
            UI Kit – Documentação
          </Text>
          <Text as="p" variant="subtitle" className={styles.subtitle}>
            Componentes do design system com variações, quando usar e como usar.
          </Text>
        </Box>

        <DocSection
          title="Container"
          when="Limitar largura e padding horizontal; layout base de páginas."
          how={`<Container size="lg" centered>
  {/* conteúdo da página */}
</Container>`}
        >
          <Stack direction="row" gap="md" wrap>
            <Box padding="sm" border radius="sm">
              size=&quot;sm&quot; (640px)
            </Box>
            <Box padding="sm" border radius="sm">
              size=&quot;md&quot; (768px)
            </Box>
            <Box padding="sm" border radius="sm">
              size=&quot;lg&quot; (1024px) – padrão
            </Box>
            <Box padding="sm" border radius="sm">
              size=&quot;xl&quot; (1280px)
            </Box>
            <Box padding="sm" border radius="sm">
              centered / fluid
            </Box>
          </Stack>
        </DocSection>

        <DocSection
          title="Stack"
          when="Dispor elementos em fila ou coluna com gap consistente."
          how={`<Stack direction="column" gap="md" align="center">
  {/* filhos */}
</Stack>`}
        >
          <Stack gap="md">
            <Stack direction="row" gap="sm" wrap>
              <Box padding="sm" border radius="sm">
                gap xs
              </Box>
              <Box padding="sm" border radius="sm">
                gap sm
              </Box>
              <Box padding="sm" border radius="sm">
                gap md
              </Box>
              <Box padding="sm" border radius="sm">
                gap lg
              </Box>
              <Box padding="sm" border radius="sm">
                gap xl
              </Box>
            </Stack>
            <Stack direction="row" gap="md" align="center" justify="between">
              <Box padding="sm" background="muted" radius="sm">
                align center
              </Box>
              <Box padding="sm" background="muted" radius="sm">
                justify between
              </Box>
            </Stack>
          </Stack>
        </DocSection>

        <DocSection
          title="Box"
          when="Bloco genérico com padding, borda, fundo e radius. Use para agrupar conteúdo ou criar áreas visuais."
          how={`<Box padding="md" border background="muted" radius="md">
  Conteúdo
</Box>`}
        >
          <Stack direction="row" gap="md" wrap>
            <Box padding="sm" border radius="sm">
              padding sm + border
            </Box>
            <Box padding="md" background="muted" radius="md">
              padding md + muted
            </Box>
            <Box padding="lg" border background="card" radius="lg">
              padding lg + card
            </Box>
          </Stack>
        </DocSection>

        <DocSection
          title="Text"
          when="Títulos, subtítulos, corpo e texto secundário. Use as para escolher o elemento semântico (h1, p, span)."
          how={`<Text as="h1" variant="title">Título</Text>
<Text as="p" variant="subtitle" align="center">Subtítulo</Text>
<Text variant="body">Corpo</Text>
<Text variant="muted">Secundário</Text>`}
        >
          <Stack gap="sm">
            <Text as="h3" variant="title">
              variant title
            </Text>
            <Text as="p" variant="subtitle" align="center">
              variant subtitle (align center)
            </Text>
            <Text variant="body">variant body</Text>
            <Text variant="muted">variant muted</Text>
          </Stack>
        </DocSection>

        <DocSection
          title="Card"
          when="Agrupar conteúdo em blocos (formulários, resumos, painéis). Use CardHeader, CardBody e CardFooter para estrutura."
          how={`<Card variant="default" padding="md">
  <CardHeader>Título</CardHeader>
  <CardBody>Conteúdo</CardBody>
  <CardFooter>Rodapé</CardFooter>
</Card>`}
        >
          <Stack direction="row" gap="md" wrap>
            <Card variant="default" padding="md">
              <CardHeader>Card default</CardHeader>
              <CardBody>Body content here.</CardBody>
              <CardFooter>Footer</CardFooter>
            </Card>
            <Card variant="outlined" padding="md">
              <CardHeader>Card outlined</CardHeader>
              <CardBody>Outlined variant.</CardBody>
            </Card>
          </Stack>
        </DocSection>

        <DocSection
          title="Button"
          when="Ações do usuário: submit, confirmações, cancelar. primary para ação principal; danger para destrutivas."
          how={`<Button variant="primary">Salvar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Secundário</Button>
<Button variant="danger">Excluir</Button>
<Button loading variant="primary">Enviando...</Button>`}
        >
          <Stack direction="row" gap="md" align="center" wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="lg" variant="secondary">
              Large
            </Button>
            <Button loading variant="primary">
              Loading
            </Button>
            <Button disabled variant="primary">
              Disabled
            </Button>
          </Stack>
        </DocSection>

        <DocSection
          title="Field + Input"
          when="Campos de formulário com label, hint e mensagem de erro. Field estrutura; Input pode ser usado standalone com size."
          how={`<Field label="Email" hint="We never share." required>
  <Input type="email" placeholder="you@example.com" />
</Field>
<Field label="Campo" error="Mensagem de erro">
  <Input invalid />
</Field>`}
        >
          <Stack gap="md" className={styles.formWidth}>
            <Field label="Email" hint="We never share your email." required />
            <Field
              label="Username"
              error="This username is already taken."
              required
            />
            <Field label="Input sizes">
              <Stack gap="sm">
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium (padrão)" />
                <Input size="lg" placeholder="Large" />
              </Stack>
            </Field>
          </Stack>
        </DocSection>

        <DocSection
          title="Form + FormGroup"
          when="Agrupar campos e ações em formulários. FormGroup é um Stack vertical com gap lg."
          how={`<Form onSubmit={handleSubmit(onSubmit)} padding="md">
  <FormGroup>
    <FormField control={control} name="email" label="Email" />
    <Button type="submit">Enviar</Button>
  </FormGroup>
</Form>`}
        >
          <Stack direction="row" gap="md" wrap>
            <Form padding="none">
              <FormGroup>
                <Field label="Campo 1" />
                <Field label="Campo 2" />
                <Button type="button" variant="secondary">
                  Enviar
                </Button>
              </FormGroup>
            </Form>
            <Form padding="md">
              <FormGroup>
                <Field label="Com padding md" />
                <Button type="button" variant="primary">
                  Salvar
                </Button>
              </FormGroup>
            </Form>
          </Stack>
        </DocSection>

        <DocSection
          title="FormField"
          when="Campo conectado ao React Hook Form (Controller + Field + Input). Valide com schema Zod via zodResolver."
          how={`const schema = z.object({ email: z.string().email() });
const { control } = useForm({ resolver: zodResolver(schema) });

<FormField control={control} name="email" label="Email" type="email" required />`}
        >
          <Form padding="md" onSubmit={(e) => e.preventDefault()} className={styles.formWidth}>
            <FormGroup>
              <FormField
                control={control}
                name="name"
                label="Nome"
                placeholder="Seu nome"
                required
              />
              <FormField
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <Button type="submit" variant="primary">
                Enviar (demo)
              </Button>
            </FormGroup>
          </Form>
        </DocSection>

        <DocSection
          title="Link"
          when="Links estilizados. Use href para navegação; para SPA interna, combine com React Router Link (to)."
          how={`<Link href="/">Home</Link>
<Link href="/login">Login</Link>`}
        >
          <Stack direction="row" gap="md">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/ui-kit-docs">UI Kit Docs</Link>
          </Stack>
        </DocSection>
      </Stack>
    </Container>
  );
}
