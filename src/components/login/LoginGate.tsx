import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import netscribesLogo from "@/assets/netscribes-logo.png";
import styles from "./LoginGate.module.css";

const STORAGE_KEY = "shopsy_poc_auth";
const VALID_EMAIL = "shopsy@netscribes.com";
const VALID_PASSWORD = "passw0rd";

export function LoginGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
      setReady(true);
    }
  }, []);

  if (!ready) return null;
  if (authed) return <>{children}</>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <img src={netscribesLogo} alt="Netscribes" className={styles.logo} />
        <h1 className={`${styles.title} text-lg text-center`}>NS x Shopsy: Gen Z Recommendations</h1>
        <p className={styles.subtitle}>Sign in to continue</p>

        <label className={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            autoComplete="username"
            required
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}
