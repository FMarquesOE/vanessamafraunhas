import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { CONFIG } from "@/lib/siteConfig";

export default function Nav() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile || !menuOpen) return;

    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, menuOpen]);

  const navLinks = [
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dúvidas", href: "#duvidas" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <>
      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "14px 20px" : "20px 64px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          backgroundColor: `${c.fundo}D0`,
          borderBottom: `1px solid ${c.acento}15`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 6 : 10,
          }}
        >
          <div
            style={{
              width: isMobile ? 40 : 60,
              height: isMobile ? 40 : 60,
              flexShrink: 0,
            }}
          >
            <img
              src="/fotos/Logo.webp"
              alt="Vanessa Mafra Unhas"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 12,
              fontWeight: 550,
              fontStyle: "italic",
              color: c.texto,
              letterSpacing: "0.03em",
              lineHeight: 1.3,
              opacity: 0.95,
            }}
          >
            Eleve sua autoestima cuidando-se como merece!
          </span>
        </div>

        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.texto,
                  textDecoration: "none",
                  opacity: 0.8,
                  transition: "opacity 300ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
              >
                {label}
              </a>
            ))}
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: c.fundo,
                backgroundColor: c.texto,
                padding: "10px 24px",
                borderRadius: 2,
                textDecoration: "none",
                transition: "background-color 350ms",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = c.acento)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = c.texto)
              }
            >
              Agendar
            </a>
          </div>
        )}

        {isMobile && (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.fundo,
                backgroundColor: c.texto,
                padding: "8px 16px",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Agendar
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: 4,
              }}
              aria-label="Menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 1.5,
                    backgroundColor: c.texto,
                    opacity: menuOpen && i === 1 ? 0 : 0.7,
                    transform: menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4.5px, 4.5px)"
                        : i === 2
                          ? "rotate(-45deg) translate(4.5px, -4.5px)"
                          : "none"
                      : "none",
                    transition: "all 300ms",
                  }}
                />
              ))}
            </button>
          </div>
        )}
      </nav>

      {isMobile && (
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 76,
            left: 0,
            right: 0,
            zIndex: 99,
            overflow: "hidden",
            backgroundColor: c.fundo,
            borderBottom: `1px solid ${c.acento}20`,
          }}
        >
          <div style={{ padding: "16px 20px 24px" }}>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.texto,
                  textDecoration: "none",
                  opacity: 0.8,
                  padding: "12px 0",
                  borderBottom: `1px solid ${c.acento}15`,
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
