"use Client";

import Link from "next/link";

import "./Footer.css";

const ROUTES = [
  { id: 1, title: "calendar" },
  { id: 2, title: "list" },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        {ROUTES.map((route) => (
          <Link key={route.id} href={`/${route.title}`}>
            {route.title}
            {route.id !== ROUTES.length && "・"}
          </Link>
        ))}
      </nav>
    </footer>
  );
};
