import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

// Usa matchMedia (largura do layout viewport, que com width=device-width é a
// largura real do aparelho) em vez de window.innerWidth. No Chrome mobile,
// innerWidth reflete o visual viewport: se qualquer conteúdo transbordar, o
// navegador "afasta o zoom", innerWidth cresce (ex.: 786px num celular de
// 360px), o hook conclui "desktop", o layout desktop transborda ainda mais e
// a página fica presa no layout desktop. matchMedia não sofre esse efeito.
function getMatches() {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}

export function useIsMobile() {
  // Inicialização síncrona: o primeiro render já sai no layout certo, sem
  // passar pelo layout desktop no celular.
  const [isMobile, setIsMobile] = React.useState<boolean>(getMatches);

  React.useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
