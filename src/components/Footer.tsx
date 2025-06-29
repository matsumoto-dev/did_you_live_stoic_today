"use Client";
import Link from "next/link";

const ROUTES = [
  { id: 1, title: "question" },
  { id: 2, title: "calendar" },
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
