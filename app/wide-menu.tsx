"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { menuData, type MenuLink, type MenuCategory } from "./menu-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, getStoredRole, Role } from "../lib/utils";

interface WideMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const COLUMN_WIDTH = 180;
const MAX_LINKS_PER_COLUMN_DEFAULT = 10;
const MAX_LINKS_PER_COLUMN_ACTIVE = 11;

const isSmallCategory = (category: MenuCategory) => category.links.length <= 5;
const greenDotClass = "bg-emerald-500";

export default function WideMenu({ isOpen, setIsOpen }: WideMenuProps) {
  const [role, setRole] = useState<Role>("guest");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(null);

  useEffect(() => {
    setRole(getStoredRole());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "aifa-role") {
        setRole(getStoredRole());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveCategoryTitle(null);
      setHoveredLink(null);
    }
  }, [isOpen]);

  // Фильтрация по роли
  const getFilteredLinks = (links: MenuLink[]) =>
    links.filter((link) => link.roles.includes(role));

  const roleFilteredCategories = menuData.categories
    .map((category) => ({
      ...category,
      links: getFilteredLinks(category.links),
    }))
    .filter((category) => category.links.length > 0);

  // ----------- ВАЖНЫЙ ФРАГМЕНТ ДЛЯ ИСПРАВЛЕНИЯ БАГА С BADGE -----------
  const renderCategoryLinks = (links: MenuLink[], maxLinks: number) => (
    <ul className="space-y-3">
      {links.slice(0, maxLinks).map((link, idx) => {
        // Определяем, наведён ли курсор на элемент
        const hoverKey = `${link.name}-${idx}`;
        const isHovered = hoveredLink === hoverKey;

        return (
          <li key={link.name} style={{ height: 24, marginTop: 12 }}>
            <a
              href={link.href || "#"}
              className="group flex items-center justify-between text-white hover:text-gray-300 transition-colors duration-200 relative"
              onMouseEnter={() => setHoveredLink(hoverKey)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ height: 24 }}
            >
              {/* 
                КОНТЕЙНЕР ТЕКСТА: всегда занимает максимум ширины.
                Если есть бейдж — справа margin, если нет (или isHovered) — margin 0.
              */}
              <span
                className={cn(
                  "flex-grow overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-2",
                  link.hasBadge && link.badgeName && !isHovered ? "mr-2" : ""
                )}
                style={{
                  transition: "margin 0.2s"
                }}
              >
                {link.name}
              </span>
              {/* 
                 При обычном состоянии: badge (если есть)
                 При наведении: только стрелка
                 Главное – badge не должен занимать место в DOM при наведении!
               */}
              {link.hasBadge && link.badgeName && !isHovered && (
                <Badge
                  className={cn(
                    "shadow-none rounded-full px-2.5 py-0.5 text-xs font-semibold h-6 flex items-center"
                  )}
                >
                  <div className={cn("h-1.5 w-1.5 rounded-full mr-2", greenDotClass)} />
                  {link.badgeName}
                </Badge>
              )}
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.16 }}
                  className="ml-2 flex-shrink-0 flex items-center"
                  style={{ height: 24 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
  // --------------------------------------------------------------------

  const activeCategory = activeCategoryTitle
    ? roleFilteredCategories.find((cat) => cat.title === activeCategoryTitle)
    : null;

  // Columns for default and active category (filtered)
  const defaultColumns: JSX.Element[] = [];
  for (let i = 0; i < roleFilteredCategories.length; ) {
    const current = roleFilteredCategories[i];
    const next = roleFilteredCategories[i + 1];
    if (isSmallCategory(current) && next && isSmallCategory(next)) {
      defaultColumns.push(
        <div key={`col-group-${i}`} className="w-[180px] flex-shrink-0 pr-4">
          <h3 className="text-gray-400 text-sm font-semibold mb-4 tracking-wider border-b border-gray-700 pb-1">
            {current.title}
            <span className="text-gray-500 text-xs ml-1">
              (
              {Math.min(current.links.length, MAX_LINKS_PER_COLUMN_DEFAULT)}/
              {current.links.length})
            </span>
          </h3>
          {renderCategoryLinks(current.links, MAX_LINKS_PER_COLUMN_DEFAULT)}
          <div className="my-5 h-[2px]" />
          <h3 className="text-gray-400 text-sm font-semibold mb-4 tracking-wider border-b border-gray-700 pb-1">
            {next.title}
            <span className="text-gray-500 text-xs ml-1">
              (
              {Math.min(next.links.length, MAX_LINKS_PER_COLUMN_DEFAULT)}/
              {next.links.length})
            </span>
          </h3>
          {renderCategoryLinks(next.links, MAX_LINKS_PER_COLUMN_DEFAULT)}
        </div>
      );
      i += 2;
    } else {
      defaultColumns.push(
        <div key={`col-${i}`} className="w-[180px] flex-shrink-0 pr-4">
          <h3 className="text-gray-400 text-sm font-semibold mb-4 tracking-wider border-b border-gray-700 pb-1">
            {current.title}
            <span className="text-gray-500 text-xs ml-1">
              (
              {Math.min(current.links.length, MAX_LINKS_PER_COLUMN_DEFAULT)}/
              {current.links.length})
            </span>
          </h3>
          {renderCategoryLinks(current.links, MAX_LINKS_PER_COLUMN_DEFAULT)}
        </div>
      );
      i++;
    }
  }

  const activeColumns: JSX.Element[] = [];
  if (activeCategory) {
    const numColumns = Math.ceil(
      activeCategory.links.length / MAX_LINKS_PER_COLUMN_ACTIVE
    );
    for (let col = 0; col < numColumns; col++) {
      const start = col * MAX_LINKS_PER_COLUMN_ACTIVE;
      const end = start + MAX_LINKS_PER_COLUMN_ACTIVE;
      const columnLinks = activeCategory.links.slice(start, end);
      activeColumns.push(
        <div key={`active-col-${col}`} className="w-[180px] flex-shrink-0 pr-4">
          {col === 0 && (
            <h3 className="text-gray-400 text-sm font-semibold mb-4 tracking-wider border-b border-gray-700 pb-1">
              {activeCategory.title}
              <span className="text-gray-500 text-xs ml-1">
                (
                {Math.min(
                  activeCategory.links.length,
                  MAX_LINKS_PER_COLUMN_ACTIVE
                )}
                /
                {activeCategory.links.length})
              </span>
            </h3>
          )}
          {renderCategoryLinks(columnLinks, MAX_LINKS_PER_COLUMN_ACTIVE)}
        </div>
      );
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 mx-auto bg-black text-white rounded-lg shadow-2xl overflow-hidden z-50"
          style={{ maxWidth: "80vw", top: "120px", height: "432px" }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex h-full">
            <div className="flex-1 p-8 pb-12 overflow-y-hidden flex custom-scrollbar overflow-x-auto flex-nowrap">
              {activeCategory ? activeColumns : defaultColumns}
            </div>
            <div className="w-80 bg-gray-900 p-8 flex flex-col">
              <h3 className="text-gray-400 text-sm font-semibold mb-2 tracking-wider">
                CATEGORIES
              </h3>
              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {roleFilteredCategories.map((category) => (
                  <div key={category.title} className="p-1">
                    <Card
                      className={cn(
                        "bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer h-[60px]",
                        activeCategoryTitle === category.title
                          ? "ring-2 ring-white"
                          : ""
                      )}
                      onClick={() => setActiveCategoryTitle(category.title)}
                    >
                      <CardContent className="flex items-center justify-start p-0">
                        <h4 className="text-white font-semibold text-base line-clamp-1 whitespace-nowrap overflow-hidden">
                          {category.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
