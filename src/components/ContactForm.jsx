import { useEffect, useRef, useState } from "react";
import { FORM_ENDPOINT, SITE } from "../data/site";
import { validateField } from "../utils/validators";
import { AlertIcon, CheckIcon } from "./Icons";

const EMPTY = { name: "", email: "", subject: "", message: "" };

// Controlled field with a label and inline error message.
function Field({ id, label, type = "text", textarea = false, value, error, onChange, onBlur, ...rest }) {
  const Control = textarea ? "textarea" : "input";
  return (
    <div className={`field${error ? " invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <Control
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        {...(textarea ? { rows: 5 } : { type })}
        {...rest}
      />
      <span className="err" role="alert">{error}</span>
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // The success banner hides itself after 6 seconds.
  useEffect(() => {
    if (status !== "success") return undefined;
    const timer = setTimeout(() => setStatus("idle"), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Re-validate live only once a field has already been flagged.
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("idle");

    const nextErrors = {};
    Object.keys(EMPTY).forEach((name) => {
      nextErrors[name] = validateField(name, values[name]);
    });
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      formRef.current?.querySelector(".field.invalid input, .field.invalid textarea")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(formRef.current),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form service responded with an error");
      setValues(EMPTY);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="two-col">
        <Field id="name" label="Full Name" value={values.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} autoComplete="name" />
        <Field id="email" label="Email Address" type="email" value={values.email} error={errors.email} onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
      </div>
      <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={handleChange} onBlur={handleBlur} />
      <Field id="message" label="Message" textarea value={values.message} error={errors.message} onChange={handleChange} onBlur={handleBlur} />

      <button type="submit" className="btn btn-primary form-submit" disabled={sending}>
        {sending ? "Sending…" : "Send Message"}
      </button>

      <div className={`success-msg${status === "success" ? " show" : ""}`} role="status">
        <CheckIcon />
        <span>Thanks for reaching out! Your message has been sent, I'll reply soon.</span>
      </div>
      <div className={`error-msg${status === "error" ? " show" : ""}`} role="status">
        <AlertIcon />
        <span>
          Something went wrong sending your message. Please try again, or email me directly at {SITE.email}.
        </span>
      </div>
    </form>
  );
}
