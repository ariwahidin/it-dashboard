"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

function IconUser() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function IconEye({ off }: { off?: boolean }) {
  return off ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Invalid username or password.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className={styles.root}>

      {/* Background image — full page */}
      <div className={styles.bgWrap}>
        <Image
          src="/images/bg-login.jpeg"
          alt="Yusen Logistics BI Dashboard"
          fill
          priority
          quality={90}
          style={{ objectFit: "fill", transformOrigin: "left center" }}
        />
        {/* overlay gelap di sisi kanan agar form terbaca */}
        <div className={styles.bgOverlay} />
      </div>

      {/* Solid cover — nutup sisa gambar di balik & sekitar form card */}
      <div className={styles.solidCover} />

      {/* Form card — overlay di kanan tengah */}
      <div className={styles.formWrap}>
        <div className={styles.formCard}>

          <div className={styles.avatarCircle} aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a3a8f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <h1 className={styles.welcomeTitle}>Welcome Back</h1>
          <p className={styles.welcomeSub}>
            Sign in to access your Business Intelligence<br />Analytics Dashboard
          </p>

          <form className={styles.form} onSubmit={handleLogin} noValidate>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="username">Username</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconUser /></span>
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconLock /></span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <IconEye off={showPassword} />
                </button>
              </div>
            </div>

            <div className={styles.formFooter}>
              <label className={styles.rememberLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotLink}>Forgot Password?</a>
            </div>

            {error && <p className={styles.errorMsg} role="alert">{error}</p>}

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} aria-label="Signing in…" /> : "LOGIN"}
            </button>

          </form>

          <div className={styles.dividerOr}><span>OR</span></div>
          <p className={styles.tagline}>Connecting People, Connecting Possibilities.</p>

        </div>
      </div>

    </main>
  );
}