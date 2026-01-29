"use client";

import dynamic from "next/dynamic";
import { atom, useAtom } from "jotai";
import { z } from "zod";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Text, Button, PopUp } from "@/components/ui";
import { termsOfService, privacyPolicy } from "@/content/legal";

const ParticlesBg = dynamic(() => import("particles-bg"), {
  ssr: false,
});

// Date validation regex for dd/mm/yyyy format
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

// Zod schema for form validation
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  cumpleanos: z
    .string()
    .min(1, "La fecha de cumpleaños es requerida")
    .regex(dateRegex, "Formato inválido. Usa dd/mm/aaaa"),
  email: z.string().min(1, "El correo es requerido").email("Email inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  dni: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

// Jotai atoms for state management
const formDataAtom = atom<FormData>({
  nombre: "",
  cumpleanos: "",
  email: "",
  telefono: "",
  dni: "",
});

const formErrorsAtom = atom<FormErrors>({});
const isLoadingAtom = atom(false);
const submitMessageAtom = atom<{
  type: "success" | "error";
  text: string;
} | null>(null);

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyNoVhmjqHCc4CmnOxhK2vjGujln0WDomPX_Kawo6YuVnwsPO-bOUk3OoU1gDciUC-u-Q/exec";

// Format date input as dd/mm/yyyy
const formatDateInput = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, "");

  // Apply mask
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  } else {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  }
};

export const Header = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [submitMessage, setSubmitMessage] = useAtom(submitMessageAtom);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    updateField("cumpleanos", formatted);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const errors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        errors[field] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      setSubmitMessage({
        type: "success",
        text: "¡Registro exitoso! Revisa tu correo para ver tus ofertas de cumpleaños.",
      });

      setFormData({
        nombre: "",
        cumpleanos: "",
        email: "",
        telefono: "",
        dni: "",
      });
    } catch {
      setSubmitMessage({
        type: "error",
        text: "Hubo un error al enviar el formulario. Por favor intenta de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("**") && paragraph.includes("**")) {
        const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1] || "";
        const rest = paragraph.replace(/\*\*.*?\*\*/, "").trim();
        return (
          <div key={index} className="mb-4">
            <Text.SemiBold
              size="base"
              color="dark"
              as="h4"
              className="mb-1 dark:text-white"
            >
              {title}
            </Text.SemiBold>
            {rest && (
              <Text.Regular
                size="sm"
                color="gray"
                as="p"
                className="leading-relaxed"
              >
                {rest}
              </Text.Regular>
            )}
          </div>
        );
      }
      return (
        <Text.Regular
          key={index}
          size="sm"
          color="gray"
          as="p"
          className="mb-4 leading-relaxed"
        >
          {paragraph}
        </Text.Regular>
      );
    });
  };

  return (
    <>
      <header
        id="header"
        className="min-h-screen bg-gradient-to-br from-whitesmoke to-white dark:from-gray-900 dark:to-gray-800 relative flex items-center py-10 px-5"
      >
        <ParticlesBg
          type="circle"
          bg={{ zIndex: 0, position: "absolute", top: 0 }}
          color="#FE4A4966"
          num={10}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 max-w-7xl mx-auto w-full relative z-10">
          {/* Left Section - Content */}
          <div className="flex-1 flex flex-col justify-center pl-4 lg:pl-8 pr-4 lg:pr-5 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-naples/30 text-naples px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit mx-auto lg:mx-0">
              <span>🎁</span>
              <span>Tu cumple, tus recompensas</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <Text.Bold
                size="5xl"
                color="dark"
                as="span"
                className="block dark:text-white"
              >
                ¡Aquí tu cumpleaños
              </Text.Bold>
              <Text.Bold size="5xl" color="naples" as="span" className="block">
                sí se celebra!
              </Text.Bold>
            </h1>

            {/* Description */}
            <Text.Regular
              size="lg"
              color="gray"
              as="p"
              className="leading-relaxed mb-8 dark:text-white"
            >
              Encuentra regalos, descuentos, sorteos y sorpresas de las mejores
              marcas para ti
            </Text.Regular>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <Text.SemiBold
                  size="sm"
                  color="dark"
                  className="dark:text-white"
                >
                  +100 Marcas Aliadas
                </Text.SemiBold>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <Text.SemiBold
                  size="sm"
                  color="dark"
                  className="dark:text-white"
                >
                  Ofertas Personalizadas
                </Text.SemiBold>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <Text.SemiBold
                  size="sm"
                  color="dark"
                  className="dark:text-white"
                >
                  Registro Gratis
                </Text.SemiBold>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-xl p-6 lg:p-8 w-full max-w-md lg:w-[90%]">
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-naples to-tomato rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  🎁
                </div>
                <Text.Bold
                  size="xl"
                  color="dark"
                  as="h2"
                  className="mb-2 dark:text-white"
                >
                  Descubre Tus Ofertas
                </Text.Bold>
                <Text.Regular size="sm" color="gray" as="p">
                  Ingresa tu fecha de cumpleaños para comenzar
                </Text.Regular>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`p-3 rounded-lg mb-4 text-sm text-center ${
                    submitMessage.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Nombre <span className="text-tomato">*</span>
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    aria-required="true"
                    aria-invalid={!!formErrors.nombre}
                    aria-describedby={formErrors.nombre ? "nombre-error" : undefined}
                    autoComplete="name"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-700 dark:text-white
                      ${formErrors.nombre ? "border-red-500" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10"}`}
                    value={formData.nombre}
                    onChange={(e) => updateField("nombre", e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.nombre && (
                    <p id="nombre-error" className="text-red-500 text-xs mt-1" role="alert">
                      {formErrors.nombre}
                    </p>
                  )}
                </div>

                {/* Cumpleaños */}
                <div>
                  <label htmlFor="cumpleanos" className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Tu Cumpleaños <span className="text-tomato">*</span>
                  </label>
                  <input
                    id="cumpleanos"
                    type="text"
                    placeholder="dd/mm/aaaa"
                    maxLength={10}
                    aria-required="true"
                    aria-invalid={!!formErrors.cumpleanos}
                    aria-describedby={formErrors.cumpleanos ? "cumpleanos-error" : undefined}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                      ${formErrors.cumpleanos ? "border-red-500" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10"}`}
                    value={formData.cumpleanos}
                    onChange={handleDateChange}
                    disabled={isLoading}
                  />
                  {formErrors.cumpleanos && (
                    <p id="cumpleanos-error" className="text-red-500 text-xs mt-1" role="alert">
                      {formErrors.cumpleanos}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Correo electrónico <span className="text-tomato">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    aria-required="true"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    autoComplete="email"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                      ${formErrors.email ? "border-red-500" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10"}`}
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Teléfono <span className="text-tomato">*</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    aria-required="true"
                    aria-invalid={!!formErrors.telefono}
                    aria-describedby={formErrors.telefono ? "telefono-error" : undefined}
                    autoComplete="tel"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-700 dark:text-white
                      ${formErrors.telefono ? "border-red-500" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10"}`}
                    value={formData.telefono}
                    onChange={(e) => updateField("telefono", e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.telefono && (
                    <p id="telefono-error" className="text-red-500 text-xs mt-1" role="alert">
                      {formErrors.telefono}
                    </p>
                  )}
                </div>

                {/* DNI */}
                <div>
                  <label htmlFor="dni" className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    DNI{" "}
                    <span className="text-gray-400 font-normal">
                      (opcional)
                    </span>
                  </label>
                  <input
                    id="dni"
                    type="text"
                    aria-invalid={!!formErrors.dni}
                    aria-describedby={formErrors.dni ? "dni-error" : undefined}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm transition-all outline-none dark:bg-gray-700 dark:text-white
                      ${formErrors.dni ? "border-red-500" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 focus:border-tomato focus:ring-2 focus:ring-tomato/10"}`}
                    value={formData.dni}
                    onChange={(e) => updateField("dni", e.target.value)}
                    disabled={isLoading}
                  />
                  {formErrors.dni && (
                    <p id="dni-error" className="text-red-500 text-xs mt-1" role="alert">
                      {formErrors.dni}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-2"
                >
                  Ver Mis Ofertas de Cumpleaños
                </Button>
              </form>

              {/* Legal */}
              <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                Al continuar, aceptas nuestros{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-tomato hover:underline"
                >
                  Términos de Servicio
                </button>{" "}
                y{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-tomato hover:underline"
                >
                  Política de Privacidad
                </button>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* PopUps */}
      <PopUp
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={termsOfService.title}
      >
        {formatContent(termsOfService.content)}
      </PopUp>

      <PopUp
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={privacyPolicy.title}
      >
        {formatContent(privacyPolicy.content)}
      </PopUp>
    </>
  );
};
