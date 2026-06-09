"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ── Icons ──────────────────────────────────────────────────────────────────
function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 6v6l4 2",
  db: "M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  help: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16 16l4.5 4.5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chevron: "M6 9l6 6 6-6",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  info: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M12 8v4 M12 16h.01",
};

// ── Dashboard card data ────────────────────────────────────────────────────
const DASHBOARDS = [
  {
    id: "clt",
    title: "Corporate Planning Dashboard",
    desc: "Monitor strategic initiatives, corporate KPI achievement, business planning, and project portfolio management.",
    iconColor: "#1a3a8f",
    // img: "/images/img-1.jpeg",
    img: "/images/img-8.jpeg",
    href: "/dashboards/YIID_CLT_Dashboard.html",
  },
  {
    id: "warehouse",
    title: "BU Division Dashboard",
    desc: "Track revenue growth, profitability, customer portfolio, business development, and operational performance.",
    iconColor: "#d97706",
    // img: "/images/img-2.jpeg",
    img: "/images/img-7.jpeg",
    href: "/dashboards/YIID_Warehouse_Dashboard.html",
  },
  {
    id: "it",
    title: "IT & Solution Design Dashboard",
    desc: "Monitor system availability, project delivery, digital transformation, cybersecurity, and automation initiatives.",
    iconColor: "#0284c7",
    img: "/images/img-3.jpeg",
    href: "/dashboards/YIID_ITSD_Dashboard.html",
  },
  {
    id: "hr",
    title: "Administration Dashboard",
    desc: "Track workforce analytics, recruitment, training, employee engagement, administration, and corporate support activities.",
    iconColor: "#6366f1",
    // img: "/images/img-4.jpeg",
    img: "/images/img-2.jpeg",
    href: "/dashboards/YIID_Admin_Dashboard.html",
  },
  {
    id: "finance",
    title: "Finance & Accounting Dashboard",
    desc: "Monitor P&L, budget realization, cash flow, financial performance, AR/AP aging, and cost optimization.",
    iconColor: "#16a34a",
    // img: "/images/img-5.jpeg",
    img: "/images/img-1.jpeg",
    href: "/dashboards/YIID_FA_Dashboard.html",
  },
  {
    id: "transport",
    title: "Transport Division Dashboard",
    desc: "Track transportation performance including fleet utilization, shipment status, delivery performance, and cost.",
    iconColor: "#d97706",
    img: "/images/img-10.png",
    href: "/dashboards/YIID_TPT_Dashboard.html",
  },
  {
    id: "sales",
    title: "SSM Dashboard",
    desc: "Track service performance, operational support efficiency, process management, and internal service excellence.",
    iconColor: "#dc2626",
    // img: "/images/img-7.jpeg",
    img: "/images/img-4.jpeg",
    href: "/dashboards/YIID_SSM_Dashboard.html",
  },
  {
    id: "sustainability",
    title: "QPI Division Dashboard",
    desc: "Monitor Quality Management, KPI Achievement, Continuous Improvement, Productivity Index, and Operational Excellence.",
    iconColor: "#16a34a",
    // img: "/images/img-8.jpeg",
    img: "/images/img-9.jpeg",
    href: "/dashboards/YIID_QPI_Dashboard.html",
  },
];

type NavPage = "home" | "favorites" | "recent" | "catalog" | "reports" | "alerts" | "users" | "settings" | "help";

const NAV_ITEMS: { id: NavPage; label: string; iconKey: keyof typeof Icons }[] = [
  { id: "home", label: "Dashboard Home", iconKey: "home" },
  { id: "favorites", label: "Favorites", iconKey: "star" },
  { id: "recent", label: "Recent", iconKey: "clock" },
  { id: "catalog", label: "Data Catalog", iconKey: "db" },
  { id: "reports", label: "Reports", iconKey: "file" },
  { id: "alerts", label: "Alerts", iconKey: "bell" },
  { id: "users", label: "User Management", iconKey: "users" },
  { id: "settings", label: "Settings", iconKey: "settings" },
  { id: "help", label: "Help & Support", iconKey: "help" },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activePage, setActivePage] = useState<NavPage>("home");
  const [sessionUser, setSessionUser] = useState("Admin User");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.username) setSessionUser(data.username);
      })
      .catch(() => { });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.replace("/login");
  }

  return (
    <div className={styles.root}>
      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        {/* <div className={styles.sidebarLogo}>
          <svg width="40" height="32" viewBox="0 0 80 50" fill="none">
            <path d="M10 38 Q20 8 40 12 Q60 16 70 6" stroke="#1a3a8f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M12 42 Q22 12 42 16 Q62 20 72 10" stroke="#1a3a8f" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M6 34 L38 34 L28 44 Z" fill="#1a3a8f" />
          </svg>
          <div>
            <span className={styles.logoText}>Yusen Logistics</span>
            <span className={styles.logoSub}>BI ANALYTICS</span>
          </div>
        </div> */}

        <div className={styles.sidebarLogo}>
          <Image src="/svg/logo.svg" alt="Yusen Logistics" width={120} height={32} />
          {/* <div>
            <span className={styles.logoText}>Yusen Logistics</span>
            <span className={styles.logoSub}>BI ANALYTICS</span>
          </div> */}
        </div>

        <nav className={styles.sidebarNav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activePage === item.id ? styles.navActive : ""}`}
              onClick={() => setActivePage(item.id)}
              aria-current={activePage === item.id ? "page" : undefined}
            >
              <Icon d={Icons[item.iconKey]} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <button onClick={handleLogout} className={`${styles.navItem} ${styles.navLogout}`}>
            <Icon d={Icons.logout} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className={styles.main}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.pageHeader}>
            <h1>Executive Management Portal</h1>
            <p>Business Intelligence & Analytics Dashboard</p>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} aria-label="Search">
              <Icon d={Icons.search} />
            </button>
            <button className={styles.iconBtn} aria-label="3 notifications">
              <Icon d={Icons.bell} />
              <span className={styles.badge} aria-hidden="true">3</span>
            </button>
            <div className={styles.userInfo}>
              <div className={styles.avatar}><Icon d={Icons.user} /></div>
              <span className={styles.userName}>{sessionUser}</span>
              <Icon d={Icons.chevron} />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className={styles.content}>
          {activePage === "home" && <HomePage />}
          {activePage === "favorites" && <PlaceholderPage icon={Icons.star} title="Favorites" sub="Your pinned dashboards" msg="No favorites yet. Pin a dashboard to see it here." />}
          {activePage === "recent" && <PlaceholderPage icon={Icons.clock} title="Recent" sub="Recently accessed dashboards" msg="No recent activity found." />}
          {activePage === "catalog" && <PlaceholderPage icon={Icons.db} title="Data Catalog" sub="Browse all available data sources" msg="Data catalog is loading..." />}
          {activePage === "reports" && <PlaceholderPage icon={Icons.file} title="Reports" sub="Scheduled and ad-hoc reports" msg="No reports available at the moment." />}
          {activePage === "alerts" && <AlertsPage />}
          {activePage === "users" && <UsersPage />}
          {activePage === "settings" && <SettingsPage />}
          {activePage === "help" && <HelpPage />}
        </main>
      </div>
    </div>
  );
}

// ── Sub-pages ──────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      {/* <div className={styles.pageHeader}>
        <h1>Executive Management Portal</h1>
        <p>Business Intelligence & Analytics Dashboard</p>
      </div> */}

      <h2 className={styles.sectionTitle}>Welcome Back!</h2>
      <p className={styles.sectionSub}>Explore key insights and performance metrics across all divisions.</p>

      <div className={styles.cardGrid}>
        {DASHBOARDS.map((d) => (
          <div key={d.id} className={styles.dashCard}>
            <div className={styles.cardImg}>
              <Image
                src={d.img}
                alt={d.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1200px) 50vw, 25vw"
              />
              <div className={styles.cardIconBadge} style={{ color: d.iconColor }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10 M12 20V4 M6 20v-6" />
                </svg>
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardDesc}>{d.desc}</p>
              <a href={d.href}
                className={styles.cardLink}
                // target="_blank"
                rel="noopener noreferrer"
              >
                View Dashboard <Icon d={Icons.arrow} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* <div className={styles.helpBanner}>
        <div className={styles.helpLeft}>
          <Icon d={Icons.info} />
          <div>
            <strong>Need Help?</strong>
            <p>If you have any questions or need assistance, please contact the Business Intelligence Team.</p>
          </div>
        </div>
        <button className={styles.helpBtn}>
          <Icon d={Icons.mail} /> Contact Support
        </button>
      </div> */}
    </>
  );
}

function PlaceholderPage({ icon, title, sub, msg }: { icon: string; title: string; sub: string; msg: string }) {
  return (
    <>
      <div className={styles.pageHeader}><h1>{title}</h1><p>{sub}</p></div>
      <div className={styles.emptyCard}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
        <p>{msg}</p>
      </div>
    </>
  );
}

function AlertsPage() {
  return (
    <>
      <div className={styles.pageHeader}><h1>Alerts</h1><p>System notifications and threshold alerts</p></div>
      <div className={styles.alertCard}>
        <div className={`${styles.alertRow} ${styles.alertDanger}`}>
          <span className={styles.alertDot} style={{ background: "#e53e3e" }} />
          <div><strong>High Priority</strong><p>Warehouse utilization exceeded 90% threshold</p></div>
          <span className={styles.alertTime}>2h ago</span>
        </div>
        <div className={`${styles.alertRow} ${styles.alertWarn}`}>
          <span className={styles.alertDot} style={{ background: "#d97706" }} />
          <div><strong>Warning</strong><p>Delivery SLA at risk for 12 shipments</p></div>
          <span className={styles.alertTime}>5h ago</span>
        </div>
        <div className={`${styles.alertRow} ${styles.alertSuccess}`}>
          <span className={styles.alertDot} style={{ background: "#16a34a" }} />
          <div><strong>Resolved</strong><p>System maintenance completed successfully</p></div>
          <span className={styles.alertTime}>1d ago</span>
        </div>
      </div>
    </>
  );
}

function UsersPage() {
  return (
    <>
      <div className={styles.pageHeader}><h1>User Management</h1><p>Manage users and access permissions</p></div>
      <div className={styles.statGrid}>
        <div className={styles.statCard} style={{ background: "#f0f4ff" }}><span style={{ color: "#1a3a8f" }}>24</span><small>Total Users</small></div>
        <div className={styles.statCard} style={{ background: "#f0fff4" }}><span style={{ color: "#16a34a" }}>21</span><small>Active</small></div>
        <div className={styles.statCard} style={{ background: "#fff5f5" }}><span style={{ color: "#e53e3e" }}>3</span><small>Inactive</small></div>
      </div>
    </>
  );
}

function SettingsPage() {
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <>
      <div className={styles.pageHeader}><h1>Settings</h1><p>Application preferences and configuration</p></div>
      <div className={styles.settingsCard}>
        <div className={styles.settingRow}>
          <div><strong>Email Notifications</strong><p>Receive dashboard alerts via email</p></div>
          <button className={`${styles.toggle} ${notif ? styles.toggleOn : ""}`} onClick={() => setNotif(v => !v)} aria-label="Toggle email notifications" role="switch" aria-checked={notif}>
            <span className={styles.toggleThumb} />
          </button>
        </div>
        <div className={styles.settingRow}>
          <div><strong>Dark Mode</strong><p>Switch to dark theme</p></div>
          <button className={`${styles.toggle} ${dark ? styles.toggleOn : ""}`} onClick={() => setDark(v => !v)} aria-label="Toggle dark mode" role="switch" aria-checked={dark}>
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </>
  );
}

function HelpPage() {
  return (
    <>
      <div className={styles.pageHeader}><h1>Help & Support</h1><p>Documentation and contact information</p></div>
      <div className={styles.helpGrid}>
        <div className={styles.helpCard}>
          <Icon d={Icons.file} />
          <h3>Documentation</h3>
          <p>Browse guides and how-to articles for the BI platform.</p>
        </div>
        <div className={styles.helpCard}>
          <Icon d={Icons.mail} />
          <h3>Contact Support</h3>
          <p>Reach the BI team at <a href="mailto:bi-support@yusen.co.id">bi-support@yusen.co.id</a></p>
        </div>
      </div>
    </>
  );
}