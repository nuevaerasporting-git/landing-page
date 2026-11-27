"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "@/features/content/actions/associate";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  sport?: string;
}

const SPORTS = ["Fútbol", "Hockey", "Tenis"] as const;

export function AssociateForm({ submitLabel }: { submitLabel: string }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sport: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await buildWhatsAppUrl(values);
    setPending(false);

    if (!result.ok) {
      setErrors(result.errors ?? {});
      return;
    }

    setErrors({});
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm font-semibold text-white">
        Se abrió WhatsApp con tu solicitud. Si no se abrió, revisá el bloqueador de
        ventanas emergentes.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="firstName"
          label="Nombre"
          placeholder="Nombre"
          value={values.firstName}
          error={errors.firstName}
          onChange={(v) => setValues((s) => ({ ...s, firstName: v }))}
        />
        <Field
          id="lastName"
          label="Apellido"
          placeholder="Apellido"
          value={values.lastName}
          error={errors.lastName}
          onChange={(v) => setValues((s) => ({ ...s, lastName: v }))}
        />
      </div>

      <Field
        id="email"
        label="Email"
        type="email"
        placeholder="Email"
        value={values.email}
        error={errors.email}
        onChange={(v) => setValues((s) => ({ ...s, email: v }))}
      />

      <Field
        id="phone"
        label="Teléfono"
        type="tel"
        placeholder="Teléfono"
        value={values.phone}
        error={errors.phone}
        onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
      />

      <div>
        <label
          htmlFor="sport"
          className="block text-xs font-bold uppercase tracking-[0.1em] text-white/90"
        >
          Disciplina de interés
        </label>
        <select
          id="sport"
          value={values.sport}
          onChange={(e) => setValues((s) => ({ ...s, sport: e.target.value }))}
          className="mt-2 h-11 w-full rounded-md border border-white/30 bg-white px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <option value="">Seleccioná una disciplina</option>
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        {errors.sport ? (
          <p className="mt-1 text-xs font-semibold text-white">{errors.sport}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-bold uppercase tracking-[0.1em] text-white/90"
        >
          Mensaje (opcional)
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
          rows={3}
          className="mt-2 w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-semibold text-brand transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Enviando..." : submitLabel}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

function Field({ id, label, value, error, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className="mt-2 h-11 w-full rounded-md border border-white/30 bg-white px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      {error ? (
        <p className="mt-1 text-xs font-semibold text-white">{error}</p>
      ) : null}
    </div>
  );
}
