import type { Route } from "./+types/ui-demo";
import { Container } from "~/components/ui/Container";
import { Stack } from "~/components/ui/Stack";
import { Box } from "~/components/ui/Box";
import { Card, CardHeader, CardBody, CardFooter } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Field, Input } from "~/components/ui/Field";
import styles from "./ui-demo.module.css";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "UI Kit – Demo" },
    { name: "description", content: "Design system components demo" },
  ];
}

export default function UiDemo() {
  return (
    <Container size="lg" centered>
      <Stack gap="lg">
        <Box padding="md" border background="muted" radius="md">
          <h1 className={styles.pageTitle}>UI Kit – Demo</h1>
          <p className={styles.subtitle}>
            Container, Stack, Box, Card, Button, Field.
          </p>
        </Box>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Container + Stack + Box</h2>
          <Stack direction="row" gap="md" wrap>
            <Box padding="sm" border radius="sm">
              Box sm
            </Box>
            <Box padding="md" background="muted" radius="md">
              Box md muted
            </Box>
            <Box padding="lg" border background="card" radius="lg">
              Box lg card
            </Box>
          </Stack>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cards</h2>
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
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Buttons</h2>
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
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Field + Input</h2>
          <Stack gap="md" className={styles.formWidth}>
            <Field label="Email" hint="We never share your email." required />
            <Field
              label="Username"
              error="This username is already taken."
              required
            />
            <Field label="With custom input">
              <Input size="sm" placeholder="Small input" />
            </Field>
          </Stack>
        </section>
      </Stack>
    </Container>
  );
}
