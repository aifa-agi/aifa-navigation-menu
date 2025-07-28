"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { menuData } from "./menu-data";
import { Badge } from "@/components/ui/badge";
import type { MenuLink } from "./menu-data";
import { cn, getStoredRole, Role } from "../lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  topOffset: string;
}

const greenDotClass = "bg-emerald-500";

export default function MobileMenu({ isOpen, topOffset }: MobileMenuProps) {
  // Роль пользователя — теперь из localStorage, с реагированием на изменения в других вкладках
  const [role, setRole] = useState<Role>("guest");

  useEffect(() => {
    setRole(getStoredRole());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "aifa-role") setRole(getStoredRole());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isOpen]);

  // Фильтрация ссылок под роль
  const getFilteredLinks = (links: MenuLink[]) =>
    links.filter((link) => link.roles.includes(role));

  // Фильтр категорий с наличием видимых ссылок
  const roleFilteredCategories = menuData.categories
    .map((category) => ({
      ...category,
      links: getFilteredLinks(category.links),
    }))
    .filter((category) => category.links.length > 0);

  // Рендер ссылок внутри категории
  const renderCategoryLinks = (categoryLinks: MenuLink[]) => (
    <ul className="space-y-3 py-2">
      {categoryLinks.map((link) => (
        <li key={link.name}>
          <a
            href={link.href ?? "#"}
            className="flex items-center text-white transition-colors duration-200 relative"
          >
            {link.hasBadge && link.badgeName ? (
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="flex-grow overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-2">
                  {link.name}
                </span>
                <Badge
                  className={cn(
                    "shadow-none rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  )}
                >
                  <div className={cn("h-1.5 w-1.5 rounded-full mr-2", greenDotClass)} />
                  {link.badgeName}
                </Badge>
              </div>
            ) : (
              <span className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                {link.name}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 flex justify-center items-start z-50"
          style={{ marginTop: topOffset }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="bg-black text-white rounded-lg shadow-2xl border border-gray-700 p-6 mx-6 mb-6 w-full max-w-md flex flex-col"
            style={{ height: `calc(100vh - ${topOffset} - 100px)` }}
          >
            <h2 className="text-2xl font-bold mb-4 text-left">Mobile Menu</h2>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <Accordion type="single" collapsible className="w-full">
                {roleFilteredCategories.map((category, index) => (
                  <AccordionItem key={category.title} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg flex items-center gap-3">
                      {category.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {renderCategoryLinks(category.links)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
