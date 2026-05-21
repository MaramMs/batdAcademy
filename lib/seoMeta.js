 export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://batdacademy.com";

const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
};

function decodeEntitiesOnce(input) {
  return input.replace(
    /&(amp|lt|gt|quot|#39|apos|rsquo|lsquo|rdquo|ldquo|mdash|ndash|hellip|nbsp|copy|reg|trade);/g,
    (m) => ENTITY_MAP[m] ?? m
  );
}

export function cleanMeta(input, { maxLength = 0 } = {}) {
  if (input == null) return undefined;
  let out = String(input).replace(/<[^>]*>?/gm, "");
  let prev;
  do {
    prev = out;
    out = decodeEntitiesOnce(out);
  } while (out !== prev);
  out = out.replace(/\s+/g, " ").trim();
  if (maxLength > 0 && out.length > maxLength) {
    out = out.slice(0, maxLength - 1).replace(/\s+\S*$/, "") + "…";
  }
  return out || undefined;
}

export function parseKeywords(raw) {
  if (!raw) return undefined;
  if (Array.isArray(raw)) return raw.filter(Boolean).join(", ") || undefined;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return (
          parsed
            .map((k) => (typeof k === "string" ? k : k?.value))
            .filter(Boolean)
            .join(", ") || undefined
        );
      }
    } catch {
      /* fall through */
    }
  }
  return trimmed || undefined;
}

export function localePath(locale, path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${p === "/" ? "" : p}`;
}

export function buildAlternates(path = "/") {
  const norm = path.startsWith("/") ? path : `/${path}`;
  return {
    languages: {
      en: `/en${norm === "/" ? "" : norm}`,
      ar: `/ar${norm === "/" ? "" : norm}`,
      "x-default": `/en${norm === "/" ? "" : norm}`,
    },
  };
}
