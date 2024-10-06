import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css"; // Keep this if needed for CSS

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // If there's a specific URL query parameter logic needed, handle it here
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({});
};

export default function App() {
  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Dark Academia Countdown Timer</h1>
        <p className={styles.text}>
          A tagline about your countdown timer that creates a sense of urgency during sales.
        </p>
      </div>
    </div>
  );
}
