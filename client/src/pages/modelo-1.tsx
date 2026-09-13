/**
 * ============================================================================
 * Vanessa Mafra · Especialista no Alongamento de Unhas em Gel
 * ============================================================================
 * VERSÃO MOBILE-RESPONSIVE
 * Projeto que adapta layout entre desktop e mobile.
 */
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import Nav from "@/components/Nav";
import PhotoFrame from "@/components/PhotoFrame";
import Hero, { RotatingSeal } from "@/components/Hero";
import MapaLocalizacao from "@/components/MapaLocalizacao";
import InstagramEmbed from "@/components/InstagramEmbed";
import { CONFIG } from "@/lib/siteConfig";

// =============================================================================
// Variantes de animação
// =============================================================================
const vFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeIn" as const },
  },
};

const vStagger: Variants = {
  visible: { transition: { staggerChildren: 0.13 } },
};

// =============================================================================
// Scroll Reveal
// =============================================================================
function ScrollReveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={vFadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay, duration: 0.75, ease: "easeIn" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// `RotatingSeal` is exported from `client/src/components/Hero.tsx`.

// =============================================================================
// Divisor filete
// =============================================================================
function Filete({ color = CONFIG.cores.acento }: { color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ height: 1, backgroundColor: color, opacity: 0.35 }} />
      <div style={{ height: 1, backgroundColor: color, opacity: 0.15 }} />
    </div>
  );
}

// =============================================================================
// Label de seção
// =============================================================================
function SectionLabel({
  numero,
  label,
  color = CONFIG.cores.acento,
  numeroColor,
  labelColor,
  as = "span",
}: {
  numero: string;
  label: string;
  color?: string;
  numeroColor?: string;
  labelColor?: string;
  as?: "span" | "h2";
}) {
  const numberColor = numeroColor ?? color;
  const titleColor = labelColor ?? color;
  const LabelTag = as;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
      }}
    >
      <span
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 10,
          opacity: 0.9,
          letterSpacing: "0.08em",
          color: numberColor,
        }}
      >
        {numero}
      </span>
      <div
        style={{ height: 1, width: 40, backgroundColor: color, opacity: 0.3 }}
      />
      <LabelTag
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.8,
          whiteSpace: "pre-line",
          color: titleColor,
        }}
      >
        {label}
      </LabelTag>
    </div>
  );
}

// `Hero` is implemented in `client/src/components/Hero.tsx` and imported above.

// =============================================================================
// SOBRE
// =============================================================================
function SobreSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <section
      id="sobre"
      style={{
        backgroundColor: c.fundo,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <Filete />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 80,
            marginTop: isMobile ? 56 : 88,
            alignItems: "center",
            justifyItems: isMobile ? "center" : "stretch",
          }}
        >
          {/* Foto em arco — também visível no mobile */}
          <ScrollReveal>
            <div
              style={{ width: "100%", maxWidth: isMobile ? 360 : undefined }}
            >
              <PhotoFrame
                src="/fotos/OEspaco.webp"
                alt="Espaço da Vanessa Mafra para alongamento de unhas em gel em Duque de Caxias"
                arch
                aspectRatio={isMobile ? "4/5" : "3/4"}
                label="O Espaço"
                gradientFallback={`linear-gradient(145deg, ${c.fundoSecundario}, ${c.salvia}60)`}
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <SectionLabel numero="I" label="Sobre o Espaço" color={c.texto} />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile
                    ? "clamp(32px, 10vw, 48px)"
                    : "clamp(34px, 3.8vw, 54px)",
                  fontWeight: 400,
                  color: c.texto,
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Naturalidade
                <br />
                <em>que fala por si só</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.9,
                  color: c.texto,
                  opacity: 0.68,
                  marginBottom: 22,
                }}
              >
                O espaço Vanessa Mafra nasceu da crença de que beleza verdadeira
                é aquela que parece natural — como se sempre tivesse estado ali.
                Especialista de unhas em gel naturalista, cada atendimento é
                pensado nos mínimos detalhes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.9,
                  color: c.texto,
                  opacity: 0.68,
                  marginBottom: 36,
                }}
              >
                Localizado no Centro de Duque de Caxias, o espaço foi desenhado
                para ser um refúgio — um momento só seu, do início ao fim.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: c.salvia,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: c.acento,
                    opacity: 0.65,
                  }}
                >
                  Especialista de Unhas em Gel
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SERVIÇOS
// =============================================================================
function ServicosSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();


  return (
    <section
      id="servicos"
      style={{
        backgroundColor: c.fundoSecundario,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="II"
            label={"Serviços"}
            color={c.fundo}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 2 : 2,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {CONFIG.servicos.map((s) => (
            <motion.div
              key={s.numero}
              variants={vFadeUp}
              style={{
                padding: isMobile ? "36px 24px" : "52px 48px",
                backgroundColor: c.fundo,
                border: `1px solid ${c.acento}18`,
                cursor: "default",
                transition: "background-color 400ms",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = c.acentoClaro)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = c.fundo)
              }
            >
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 16,
                  color: c.texto,
                  opacity: 0.7,
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 14,
                }}
              >
                {s.numero}
              </span>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile ? 26 : 30,
                  fontWeight: 500,
                  color: c.texto,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                {s.nome}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 14 : 15,
                  lineHeight: 1.8,
                  color: c.texto,
                  opacity: 0.62,
                  marginBottom: 24,
                }}
              >
                {s.descricao}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    height: 1,
                    width: 24,
                    backgroundColor: c.texto,
                    opacity: 0.3,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: c.acento,
                    opacity: 0.65,
                  }}
                >
                  {s.duracao}
                </span>
              </div>
              {s.src && (
                <div
                  style={{
                    marginTop: 28,
                    maxHeight: isMobile ? undefined : 480,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={s.src}
                    alt={`${s.nome} — ${s.descricao}`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                    className="servico-bg"
                    style={{
                      width: "100%",
                      aspectRatio: isMobile ? "1/1" : (s.aspectRatio ?? "4/3"),
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: c.fundo,
                opacity: 0.8,
                textDecoration: "none",
                borderBottom: `1px solid ${c.texto}60`,
                paddingBottom: 3,
                transition: "opacity 300ms",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
            >
              Consultar disponibilidade via WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// =============================================================================
// DEPOIMENTOS
// =============================================================================
function DepoimentosSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        backgroundColor: c.fundo,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="III"
            label={"Avaliações no Google Mapas"}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 32,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {CONFIG.depoimentos.map((d, i) => (
            <motion.div
              key={i}
              variants={vFadeUp}
              style={{
                padding: isMobile ? "28px 24px" : "40px 36px",
                border: `1px solid ${c.acento}20`,
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 42,
                  color: c.acento,
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile ? 17 : 19,
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  color: c.texto,
                  opacity: 0.8,
                  marginBottom: 24,
                }}
              >
                {d.texto}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    height: 1,
                    width: 24,
                    backgroundColor: c.acento,
                    opacity: 0.3,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: c.texto,
                    opacity: 0.4,
                  }}
                >
                  {d.nome}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// DÚVIDAS FREQUENTES
// =============================================================================
function FaqItem({
  numero,
  pergunta,
  resposta,
  isOpen,
  onToggle,
  c,
  isMobile,
}: {
  numero: string;
  pergunta: string;
  resposta: string;
  isOpen: boolean;
  onToggle: () => void;
  c: typeof CONFIG.cores;
  isMobile: boolean;
}) {
  return (
    <motion.div
      variants={vFadeUp}
      style={{
        backgroundColor: c.fundo,
        border: `1px solid ${c.acento}18`,
      }}
    >
      <h3 style={{ margin: 0 }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: isMobile ? "22px 24px" : "28px 40px",
          background: "none",
          border: "none",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 15,
              color: c.texto,
              opacity: 0.5,
              letterSpacing: "0.08em",
            }}
          >
            {numero}
          </span>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: isMobile ? 19 : 22,
              fontWeight: 500,
              color: c.texto,
              lineHeight: 1.3,
            }}
          >
            {pergunta}
          </span>
        </div>
        <span
          style={{
            flexShrink: 0,
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `1px solid ${c.texto}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            color: c.texto,
            opacity: 0.7,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 300ms",
          }}
        >
          +
        </span>
      </button>
      </h3>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p
          style={{
            fontFamily: "DM Sans, Inter, sans-serif",
            fontSize: isMobile ? 14.5 : 15.5,
            lineHeight: 1.8,
            color: c.texto,
            opacity: 0.65,
            padding: isMobile ? "0 24px 24px 24px" : "0 40px 32px 74px",
          }}
        >
          {resposta}
        </p>
      </motion.div>
    </motion.div>
  );
}

function DuvidasSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="duvidas"
      style={{
        backgroundColor: c.fundoSecundario,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="IV"
            label={"Dúvidas Frequentes"}
            color={c.fundo}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {CONFIG.duvidas.map((d, index) => (
            <FaqItem
              key={d.pergunta}
              numero={String(index + 1).padStart(2, "0")}
              pergunta={d.pergunta}
              resposta={d.resposta}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              c={c}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <span
              style={{
                fontFamily: "DM Sans, Inter, sans-serif",
                fontSize: isMobile ? 14 : 15,
                color: c.fundo,
                opacity: 0.7,
                display: "block",
                marginBottom: 18,
              }}
            >
              Ainda ficou com alguma dúvida?
            </span>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: c.fundo,
                opacity: 0.85,
                textDecoration: "none",
                borderBottom: `1px solid ${c.fundo}60`,
                paddingBottom: 3,
                transition: "opacity 300ms",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >
              Falar no WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// =============================================================================
// CONTATO
// =============================================================================
function ContatoSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <section
      id="contato"
      style={{
        backgroundColor: c.texto,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 80,
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <ScrollReveal>
              <SectionLabel
                numero="V"
                label="Localização & Contato"
                color={c.fundo}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile
                    ? "clamp(32px, 10vw, 48px)"
                    : "clamp(34px, 3.8vw, 54px)",
                  fontWeight: 400,
                  color: c.fundo,
                  lineHeight: 1.15,
                  marginBottom: isMobile ? 32 : 44,
                }}
              >
                Venha nos <em style={{ color: c.acentoClaro }}>visitar!</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {[
                  { label: "Endereço", valor: CONFIG.endereco },
                  { label: "Horário", valor: CONFIG.horario },
                  { label: "Instagram", valor: CONFIG.instagram },
                ].map(({ label, valor }) => (
                  <div key={label} style={{ minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: c.acentoClaro,
                        opacity: 0.55,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </span>
                    {label === "Endereço" ? (
                      <>
                        <a
                          href={CONFIG.enderecoMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "DM Sans, Inter, sans-serif",
                            fontSize: isMobile ? 15 : 16,
                            color: c.fundo,
                            opacity: 0.7,
                            lineHeight: 1.5,
                            display: "inline-block",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {valor}
                        </a>
                        <div style={{ marginTop: 12, maxWidth: 420 }}>
                          <MapaLocalizacao
                            embedUrl={CONFIG.enderecoMapsEmbed}
                          />
                        </div>
                      </>
                    ) : label === "Instagram" ? (
                      <>
                        <a
                          href={`https://instagram.com/${CONFIG.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "DM Sans, Inter, sans-serif",
                            fontSize: isMobile ? 15 : 16,
                            color: c.fundo,
                            opacity: 0.7,
                            lineHeight: 1.5,
                            display: "inline-block",
                            textDecoration: "none",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {valor}
                        </a>
                        <div style={{ marginTop: 16, width: "100%" }}>
                          <InstagramEmbed
                            permalink="https://www.instagram.com/reel/DXrhznpkXUN/"
                            captionHtml="Um post compartilhado por Vanessa Mafra | Manicure | Nail Designer | Duque de Caxias 📍 (@vanessamafra_especialistanails)"
                          />
                        </div>
                      </>
                    ) : (
                      <span
                        style={{
                          fontFamily: "DM Sans, Inter, sans-serif",
                          fontSize: isMobile ? 15 : 16,
                          color: c.fundo,
                          opacity: 0.7,
                          lineHeight: 1.5,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {valor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <a
                href={`https://wa.me/${CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.texto,
                  backgroundColor: c.acentoClaro,
                  padding: isMobile ? "16px 24px" : "16px 40px",
                  borderRadius: 2,
                  textDecoration: "none",
                  display: isMobile ? "block" : "inline-block",
                  textAlign: isMobile ? "center" : "left",
                  transition: "background-color 350ms",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor = c.fundo)
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = c.acentoClaro)
                }
              >
                Agende agora pelo WhatsApp
              </a>
            </ScrollReveal>
          </div>

          {/* Selo — centralizado no mobile */}
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RotatingSeal size={isMobile ? 160 : 220} color={c.acentoClaro} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        backgroundColor: "black",
        borderTop: `1px solid ${c.fundo}18`,
        padding: isMobile ? "24px 20px" : "28px 80px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        gap: isMobile ? 20 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          backgroundColor: "rgba(255, 255, 255, 0.82)", // ← máscara branca (opacidade elevada de 0.5 para 0.82: contraste do texto sobre o fundo preto não atingia 4.5:1)
          borderRadius: 45, // ← bordas arredondadas
          padding: isMobile ? "6px 12px" : "8px 16px", // ← espaço interno
        }}
      >
        <div style={{ width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }}>
          <img
            src="/fotos/Logo.webp"
            alt="Vanessa Mafra Unhas"
            loading="lazy"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 16,
            fontStyle: "bold",
            color: c.texto, // ← trocado de c.fundo para ficar legível sobre fundo branco
            lineHeight: 3,
          }}
        >
          {CONFIG.nome}
        </span>
      </div>

      <div
        style={{
          color: "white",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          lineHeight: 1.8,
          textAlign: isMobile ? "center" : "right",
          opacity: 0.9,
        }}
      >
        <div>© {CONFIG.anoFundacao} · Todos os direitos reservados</div>
        <div>
          Administrado por{" "}
          <a
            href="https://wa.me/5521976822900?text=Ol%C3%A1%20FMarques%20TechSolu%C3%A7%C3%B5es!%20Quero%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontWeight: "bold" }}
          >
            FMarques TechSoluções
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
// =============================================================================
// Página principal
// =============================================================================
export default function Modelo1() {
  const c = CONFIG.cores;
  return (
    <div style={{ backgroundColor: c.fundo, minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        <SobreSection />
        <ServicosSection />
        <DepoimentosSection />
        <DuvidasSection />
        <ContatoSection />
      </main>
      <Footer />
    </div>
  );
}
