// app/menu-data.ts

export type UserRole =
  | "guest"
  | "architect"
  | "admin"
  | "editor"
  | "authUser"
  | "subscriber"
  | "customer"
  | "apiUser";

export type BadgeName =
  | "NEW"
  | "AD"
  | "UPDATED"
  | "IMPORTANT"
  | "RECOMMENDATION";

export interface MenuLink {
  name: string;
  href?: string;
  roles: UserRole[];  // Now always two roles: ['guest', one more]
  hasBadge?: boolean;
  badgeName?: BadgeName;
}

export interface MenuCategory {
  title: string;
  links: MenuLink[];
}

/**
 * Utility: Returns a random non-guest role from availableRoles list
 */
function getRandomNonGuestRole(index: number): UserRole {
  const roles: UserRole[] = [
    "architect",
    "admin",
    "editor",
    "authUser",
    "subscriber",
    "customer",
    "apiUser",
  ];
  // To evenly distribute roles, use modulo by index
  return roles[index % roles.length];
}

/**
 * Generates 50 website links, each with roles: ['guest', one random other role]
 */
const generateWebsiteLinks = (): MenuLink[] => {
  const links: MenuLink[] = [];
  for (let i = 1; i <= 50; i++) {
    const extraRole = getRandomNonGuestRole(i - 1);
    // Badge rules as before
    let hasBadge = false;
    let badgeName: BadgeName | undefined;
    if (i % 5 === 0) {
      hasBadge = true;
      badgeName = i % 10 === 0 ? "IMPORTANT" : "NEW";
    }
    links.push({
      name: `Website Link ${i}`,
      href: `/website-link-${i}`,
      roles: ["guest", extraRole],
      hasBadge,
      badgeName,
    });
  }
  return links;
};

/**
 * Helper for static links: Assigns guest + one role, rotating through role list
 */
function assignRolesToLinks(links: Omit<MenuLink, "roles">[]): MenuLink[] {
  const roles: UserRole[] = [
    "architect",
    "admin",
    "editor",
    "authUser",
    "subscriber",
    "customer",
    "apiUser",
  ];
  return links.map((link, idx) => ({
    ...link,
    roles: ["guest", roles[idx % roles.length]],
  }));
}


export const menuData = {
  categories: [
    {
      title: "WEBSITE",
       links: [
        { name: "Website Link 1", href: "/website-link-1", roles: ["guest", "architect"] },
        { name: "Website Link 2", href: "/website-link-2", roles: ["guest", "admin"] },
        { name: "Website Link 3", href: "/website-link-3", roles: ["guest", "editor"] },
        { name: "Website Link 4", href: "/website-link-4", roles: ["guest", "authUser"] },
        { name: "Website Link 5", href: "/website-link-5", roles: ["guest", "subscriber"], hasBadge: true, badgeName: "NEW" },
        { name: "Website Link 6", href: "/website-link-6", roles: ["guest", "customer"] },
        { name: "Website Link 7", href: "/website-link-7", roles: ["guest", "apiUser"] },
        { name: "Website Link 8", href: "/website-link-8", roles: ["guest", "admin"] },
        { name: "Website Link 9", href: "/website-link-9", roles: ["guest", "editor"] },
        { name: "Website Link 10", href: "/website-link-10", roles: ["guest", "architect"], hasBadge: true, badgeName: "IMPORTANT" },
      ],
    },
    {
      title: "COMMERCE",
       links: [
        { name: "Ecommerce", href: "/ecommerce", roles: ["guest", "customer"] },
        { name: "Ecommerce Templates", href: "/ecommerce-templates", roles: ["guest", "admin"] },
        { name: "Online Stores", href: "/stores", roles: ["guest", "customer"], hasBadge: true, badgeName: "IMPORTANT" },
        { name: "Services", href: "/services", roles: ["guest", "editor"] },
        { name: "Invoicing", href: "/invoicing", roles: ["guest", "authUser"], hasBadge: true, badgeName: "AD" },
      ],
    },
    {
      title: "MARKETING",
     links: [
        { name: "Marketing Tools", href: "/marketing", roles: ["guest", "editor"] },
        { name: "Email Campaigns", href: "/email", roles: ["guest", "admin"], hasBadge: true, badgeName: "NEW" },
        { name: "SEO Tools", href: "/seo", roles: ["guest", "subscriber"]},
        { name: "Free Tools", href: "/free-tools", roles: ["guest", "subscriber"] },
        { name: "Recommendation", href: "/recommendation-2", roles: ["guest", "authUser"], hasBadge: true, badgeName: "RECOMMENDATION" },
      ],
    },
    {
      title: "DOMAINS",
       links: [
        { name: "Find a Domain", href: "/find-domain", roles: ["guest", "editor"] },
        { name: "Transfer a Domain", href: "/transfer-domain", roles: ["guest", "admin"] },
        { name: "Domain Management", href: "/domain-management", roles: ["guest", "architect"], hasBadge: true, badgeName: "UPDATED" },
        { name: "DNS Settings", href: "/dns", roles: ["guest", "apiUser"] },
      ]
    },
  
    {
      title: "ANALYTICS",
     links: [
        { name: "Website Analytics", href: "/analytics", roles: ["guest", "architect"], hasBadge: true, badgeName: "NEW" },
        { name: "Traffic Reports", href: "/traffic", roles: ["guest", "admin"] },
        { name: "Conversion Tracking", href: "/conversion", roles: ["guest", "editor"], hasBadge: true, badgeName: "IMPORTANT" },
        { name: "User Behavior", href: "/behavior", roles: ["guest", "customer"] },
        { name: "Performance Metrics", href: "/performance", roles: ["guest", "subscriber"] },
        { name: "Custom Dashboards", href: "/dashboards", roles: ["guest", "admin"], hasBadge: true, badgeName: "UPDATED" },
        { name: "Real-time Data", href: "/realtime", roles: ["guest", "apiUser"] },
        { name: "Export Tools", href: "/export", roles: ["guest", "editor"] },
        { name: "API Access", href: "/api", roles: ["guest", "apiUser"] },
        { name: "Advanced Filters", href: "/filters", roles: ["guest", "architect"] },
        { name: "Automated Reports", href: "/reports", roles: ["guest", "authUser"], hasBadge: true, badgeName: "AD" },
        { name: "Goal Tracking", href: "/goals", roles: ["guest", "customer"] },
      ],
    },
    {
      title: "DESIGN",
          links: [
        { name: "Logo Maker", href: "/logo", roles: ["guest", "architect"] },
        { name: "Brand Kit", href: "/brand", roles: ["guest", "editor"], hasBadge: true, badgeName: "NEW" },
        { name: "Color Palette", href: "/colors", roles: ["guest", "admin"] },
        { name: "Font Library", href: "/fonts", roles: ["guest", "authUser"] },
        { name: "Image Editor", href: "/image-editor", roles: ["guest", "subscriber"], hasBadge: true, badgeName: "UPDATED" },
        { name: "Icon Collection", href: "/icons", roles: ["guest", "apiUser"] },
        { name: "Template Gallery", href: "/gallery", roles: ["guest", "customer"] },
        { name: "Recommendation", href: "/recommendation-3", roles: ["guest", "editor"], hasBadge: true, badgeName: "RECOMMENDATION" },
      ],
    },
    {
      title: "HOSTING",
      links: [
        { name: "Web Hosting", href: "/hosting", roles: ["guest", "admin"] },
        { name: "Cloud Storage", href: "/storage", roles: ["guest", "editor"] },
        { name: "CDN Services", href: "/cdn", roles: ["guest", "customer"], hasBadge: true, badgeName: "IMPORTANT" },
        { name: "SSL Certificates", href: "/ssl", roles: ["guest", "architect"] },
        { name: "Backup Solutions", href: "/backup", roles: ["guest", "subscriber"] },
        { name: "Server Management", href: "/server", roles: ["guest", "apiUser"] },
        { name: "Database Hosting", href: "/database", roles: ["guest", "customer"] },
        { name: "Email Hosting", href: "/email-hosting", roles: ["guest", "authUser"] },
        { name: "FTP Access", href: "/ftp", roles: ["guest", "editor"] },
        { name: "Custom Domains", href: "/custom-domains", roles: ["guest", "architect"] },
        { name: "Staging Environment", href: "/staging", roles: ["guest", "admin"], hasBadge: true, badgeName: "NEW" },
        { name: "Load Balancing", href: "/load-balancing", roles: ["guest", "apiUser"] },
        { name: "Security Monitoring", href: "/security", roles: ["guest", "admin"], hasBadge: true, badgeName: "UPDATED" },
        { name: "Performance Optimization", href: "/optimization", roles: ["guest", "subscriber"] },
        { name: "Technical Support", href: "/support", roles: ["guest", "customer"] },
      ],
    },
    {
      title: "INTEGRATIONS",
      links: [
        { name: "Third-party Apps", href: "/apps", roles: ["guest", "authUser"] },
        { name: "API Connections", href: "/api-connections", roles: ["guest", "admin"], hasBadge: true, badgeName: "IMPORTANT" },
        { name: "Webhook Setup", href: "/webhooks", roles: ["guest", "apiUser"] },
        { name: "Social Media", href: "/social", roles: ["guest", "subscriber"] },
        { name: "Payment Gateways", href: "/payments", roles: ["guest", "editor"], hasBadge: true, badgeName: "AD" },
        { name: "CRM Integration", href: "/crm", roles: ["guest", "customer"] },
        { name: "Email Marketing", href: "/email-marketing", roles: ["guest", "architect"] },
        { name: "Analytics Tools", href: "/analytics-tools", roles: ["guest", "editor"] },
        { name: "Chat Widgets", href: "/chat", roles: ["guest", "authUser"], hasBadge: true, badgeName: "NEW" },
      ],
    },
  ] as MenuCategory[],
};

// Type for consumers
export type MenuData = typeof menuData;
