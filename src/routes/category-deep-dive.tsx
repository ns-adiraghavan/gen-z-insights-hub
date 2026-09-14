import { createFileRoute } from "@tanstack/react-router";
import { LoginGate } from "@/components/login/LoginGate";
import { CategoryDeepDive } from "@/components/category-deepdive/CategoryDeepDive";

export const Route = createFileRoute("/category-deep-dive")({
  component: CategoryDeepDivePage,
  head: () => ({
    meta: [
      { title: "Category Deep-Dive — Sample | Netscribes × Shopsy" },
      {
        name: "description",
        content:
          "Illustrative sample of the Category Deep-Dive framing for Shopsy — from Gen Z questionnaire to competitive shelf scrape to a positioned read per sub-category.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
});

function CategoryDeepDivePage() {
  return (
    <LoginGate>
      <CategoryDeepDive />
    </LoginGate>
  );
}
