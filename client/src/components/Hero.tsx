import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";
import { CONFIG } from "@/lib/siteConfig";

export function RotatingSeal({
  size = 140,
  color = CONFIG.cores.acento,
}: {
  size?: number;
  color?: string;
}) {
  const radius = size / 2 - 16;
  const text = `SOFISTICAÇÃO COM NATURALIDADE · ELEVANDO SUA AUTOESTIMA ·`;
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size, display: "inline-block" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id={`circlePath-${size}`}
            d={`M ${size / 2} ${size / 2} m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`}
          />
        </defs>
        <text
          fill={color}
          fontSize="8"
          fontFamily="Inter, sans-serif"
          letterSpacing="2.2"
          fontWeight="500"
        >
          <textPath href={`#circlePath-${size}`}>{text}</textPath>
        </text>
        <circle cx={size / 2} cy={size / 2} r={4} fill={color} opacity={0.8} />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  if (isMobile) {
    return (
      <section
        ref={ref}
        style={{
          minHeight: "100svh",
          backgroundColor: c.fundo,
          display: "flex",
          flexDirection: "column",
          paddingTop: 76,
          overflow: "hidden",
        }}
      >
        {/* Imagem no topo no mobile */}
        <div
          style={{
            position: "relative",
            height: "45vw",
            minHeight: 220,
            maxHeight: 320,
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              background: `linear-gradient(160deg, ${c.fundoSecundario} 0%, ${c.acentoClaro}70 45%, ${c.salvia}50 100%)`,
            }}
          >
            <img
              src="/fotos/ImgVanessa.webp"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Vanessa Mafra, especialista em unhas em gel, no espaço em Duque de Caxias"
            />
          </div>

          {/* Selo fora do overflow hidden */}
          <div
            style={{
              position: "absolute",
              bottom: -110,
              right: 16,
              zIndex: 10,
            }}
          >
            <RotatingSeal size={100} color={c.acento} />
          </div>
        </div>

        {/* Texto abaixo */}
        <div
          style={{
            padding: "48px 24px 60px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                height: 1,
                width: 28,
                backgroundColor: c.acento,
                opacity: 0.4,
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: c.acento,
              }}
            >
              Duque de Caxias · RJ
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(44px, 13vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.0,
              color: c.texto,
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
          >
            {CONFIG.nome}
            <span
              style={{
                display: "block",
                fontSize: "clamp(15px, 4.5vw, 20px)",
                fontWeight: 400,
                letterSpacing: 0,
                marginTop: 6,
              }}
            >
              {CONFIG.titulo}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(17px, 5vw, 26px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: c.acento,
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            {CONFIG.slogan}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22 }}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.8,
              color: c.texto,
              opacity: 0.7,
              marginBottom: 36,
            }}
          >
            {CONFIG.descricaoHero}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.fundo,
                backgroundColor: c.texto,
                padding: "16px 24px",
                borderRadius: 2,
                textDecoration: "none",
                textAlign: "center",
                display: "block",
              }}
            >
              Agendar Agora
            </a>
            <a
              href="#servicos"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.texto,
                textDecoration: "none",
                opacity: 0.8,
                textAlign: "center",
                paddingBottom: 2,
              }}
            >
              Ver Serviços →
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop hero
  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        backgroundColor: c.fundo,
        display: "grid",
        gridTemplateColumns: "60fr 40fr",
        alignItems: "stretch",
        paddingTop: 80,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 72px 100px 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              height: 1,
              width: 32,
              backgroundColor: c.acento,
              opacity: 0.4,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: c.acento,
            }}
          >
            Duque de Caxias · RJ
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(52px, 6.5vw, 92px)",
            fontWeight: 400,
            lineHeight: 1.0,
            color: c.texto,
            marginBottom: 10,
            letterSpacing: "-0.01em",
          }}
        >
          {CONFIG.nome}
          <span
            style={{
              display: "block",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 400,
              letterSpacing: 0,
              marginTop: 8,
            }}
          >
            {CONFIG.titulo}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(18px, 2.2vw, 30px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: c.acento,
            marginBottom: 36,
            lineHeight: 1.3,
          }}
        >
          {CONFIG.slogan}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "DM Sans, Inter, sans-serif",
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.85,
            color: c.texto,
            opacity: 0.7,
            maxWidth: 440,
            marginBottom: 52,
          }}
        >
          {CONFIG.descricaoHero}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: 20, alignItems: "center" }}
        >
          <a
            href={`https://wa.me/${CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.fundo,
              backgroundColor: c.texto,
              padding: "15px 38px",
              borderRadius: 2,
              textDecoration: "none",
              transition: "background-color 400ms",
              display: "inline-block",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = c.acento)
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = c.texto)
            }
          >
            Agendar Agora
          </a>
          <a
            href="#servicos"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.texto,
              textDecoration: "none",
              opacity: 0.8,
              borderBottom: `1px solid ${c.texto}80`,
              paddingBottom: 2,
              transition: "opacity 300ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
          >
            Ver Serviços →
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ y: imgY, position: "relative", overflow: "visible" }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            minHeight: "100vh",
            position: "relative",
            borderRadius: "48% 0 0 48% / 32% 0 0 32%",
            overflow: "hidden",
            background: `linear-gradient(160deg, ${c.fundoSecundario} 0%, ${c.acentoClaro}70 45%, ${c.salvia}50 100%)`,
          }}
        >
          <img
            src="/fotos/ImgVanessa.webp"
            alt="Vanessa Mafra, especialista em unhas em gel, em seu estúdio no Centro de Duque de Caxias"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to right, ${c.fundo}50, transparent 40%)`,
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Selo fora do overflow hidden */}
        <div
          style={{ position: "absolute", bottom: 100, left: -80, zIndex: 10 }}
        >
          <RotatingSeal size={160} color={c.acento} />
        </div>
      </motion.div>
    </section>
  );
}
