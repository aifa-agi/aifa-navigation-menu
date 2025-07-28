"use client"
import { useEffect, useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import WideMenu from "./wide-menu";
import MobileMenu from "./mobile-menu";
import { Button } from "@/components/ui/button";

const HEADER_HEIGHT = 56;
const MOBILE_MENU_OFFSET = 40;

export default function AifaNavBar() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Блокируем прокрутку страницы когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mobileMenuTopOffset = `${MOBILE_MENU_OFFSET}px`;
  const handleButtonClick = () => setIsOpen((v) => !v);

  // Закрытие меню при клике на overlay
  const handleOverlayClick = () => setIsOpen(false);

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center bg-primary text-primary-foreground px-4 h-[56px]"
          style={{ minHeight: HEADER_HEIGHT, maxHeight: HEADER_HEIGHT }}
        >
          {isLargeScreen ? (
            <Button
              onClick={handleButtonClick}
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap px-4"
            >
              <span>{isOpen ? "Close bar menu" : "Open bar menu"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          ) : (
            <Button
              onClick={handleButtonClick}
              className="flex items-center justify-center px-2"
              aria-label={isOpen ? "Close bar menu" : "Open bar menu"}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* WideMenu и MobileMenu выводятся ниже и анимируются по своему собственному сценарию */}
        {isLargeScreen ? (
          <WideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} topOffset={mobileMenuTopOffset} />
        )}
      </div>

      {/* Затемняющий фон (overlay) */}
      {isOpen && (
        <div
          className={`
            fixed inset-0 bg-black/50 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            z-40
          `}
          style={{ 
            top: '64px' 
          }}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
    </>
  );
}
