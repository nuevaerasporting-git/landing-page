import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_CONTEXT = "news-upload-token-v1";
const TOKEN_TTL_MS = 60 * 60 * 1000;

interface NewsUploadTokenPayload {
  path: string;
  exp: number;
}

function sign(body: string): string {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) {
    throw new Error("SUPABASE_SECRET_KEY is required to sign news upload tokens.");
  }

  const key = createHmac("sha256", secret).update(TOKEN_CONTEXT).digest();
  return createHmac("sha256", key).update(body).digest("base64url");
}

export function createNewsUploadToken(path: string): string {
  const payload: NewsUploadTokenPayload = {
    path,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function verifyNewsUploadToken(path: string, token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [body, signature] = parts;
    if (!body || !signature) return false;

    const expected = Buffer.from(sign(body), "utf8");
    const received = Buffer.from(signature, "utf8");
    if (received.length !== expected.length) return false;
    if (!timingSafeEqual(received, expected)) return false;

    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as unknown;
    if (typeof payload !== "object" || payload === null) return false;

    const { path: tokenPath, exp } = payload as Partial<NewsUploadTokenPayload>;
    return tokenPath === path && typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}
