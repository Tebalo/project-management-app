import { Link } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import ApplicationLogo from "../ApplicationLogo";
import { Button } from "../ui/button";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

const footerLinks = {
  socialLinks: [
    {
      label: "View on GitHub",
      href: "https://github.com/stekatag/project-management-app",
      external: true,
      icon: <GitHubLogoIcon className="h-4 w-4" />,
    },
    {
      label: "Contact Us",
      href: "mailto:contact@teamsync.vip",
      external: true,
    },
  ],
  quickLinks: [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Testimonials",
      href: "#testimonials",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ],
  authLinks: [
    {
      label: "Sign in",
      href: route("login"),
      variant: "outline",
    },
    {
      label: "Create Account",
      href: route("register"),
      variant: "default",
    },
  ],
} as const;

export const Footer = () => {
  const renderExternalLink = (link: FooterLink) => (
    <a
      key={link.label}
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer noopener" : undefined}
      title={link.title || link.label}
      className="max-w-max text-sm text-muted-foreground hover:text-primary"
    >
      {link.icon && (
        <span className="flex items-center gap-2">
          {link.icon}
          {link.label}
        </span>
      )}
      {!link.icon && link.label}
    </a>
  );

  return (
    <footer className="container mx-auto max-w-7xl border-t px-4 py-16">
      <div className="grid gap-8 md:grid-cols-3 md:gap-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ApplicationLogo variant="circular" className="h-8 w-8" />
            <span className="font-semibold">TeamSync</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Efficient project management for modern teams
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.socialLinks.map(renderExternalLink)}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.quickLinks.map(renderExternalLink)}
          </div>
        </div>

        {/* Actions Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Get Started</h3>
          <div className="flex flex-col gap-2 sm:flex-row">
            {footerLinks.authLinks.map((link) => (
              <Link key={link.label} href={link.href} title={link.label}>
                <Button variant={link.variant} className="w-full sm:w-auto">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} TeamSync. Created by{" "}
          <a
            className="dark:text-primary-light text-primary hover:underline"
            target="_blank"
            rel="noreferrer noopener"
            title="26DigitalBw"
            href="https://sgogov.dev/"
          >
            Stefan Gogov
          </a>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};
