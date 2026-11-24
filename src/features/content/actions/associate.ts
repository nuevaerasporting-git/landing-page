"use server";

const WHATSAPP_NUMBER = "5493462504698";

export interface AssociateInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sport: string;
  message: string;
}

export interface AssociateResult {
  ok: boolean;
  url?: string;
  errors?: Partial<Record<keyof AssociateInput, string>>;
}

const SPORTS = new Set(["Fútbol", "Hockey", "Tenis"]);

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return /^[0-9+\-\s()]{6,20}$/.test(value);
}

export async function buildWhatsAppUrl(input: AssociateInput): Promise<AssociateResult> {
  const errors: AssociateResult["errors"] = {};

  if (!input.firstName.trim()) errors.firstName = "Ingresá tu nombre.";
  if (!input.lastName.trim()) errors.lastName = "Ingresá tu apellido.";
  if (!input.email.trim()) errors.email = "Ingresá tu email.";
  else if (!isValidEmail(input.email)) errors.email = "Email inválido.";
  if (!input.phone.trim()) errors.phone = "Ingresá tu teléfono.";
  else if (!isValidPhone(input.phone)) errors.phone = "Teléfono inválido.";
  if (!SPORTS.has(input.sport)) errors.sport = "Elegí una disciplina.";

  if (errors && Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const text = [
    "Hola, quiero asociarme al club.",
    `Nombre: ${input.firstName.trim()} ${input.lastName.trim()}`,
    `Email: ${input.email.trim()}`,
    `Teléfono: ${input.phone.trim()}`,
    `Disciplina de interés: ${input.sport}`,
    input.message.trim() ? `Mensaje: ${input.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    ok: true,
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
  };
}
