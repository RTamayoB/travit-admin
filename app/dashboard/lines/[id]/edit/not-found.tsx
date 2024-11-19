import { LinkButton } from "@/ui/components";

export default function NotFound() {
  return (
    <main>
      <h2>404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <LinkButton
        label="Go Back"
        href="/dashboard/lines"
      />
    </main>
  );
}
