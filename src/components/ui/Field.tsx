import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field primitive: label, control, and an accessible error message.
 *
 * The control is always labelled and, when invalid, is wired to its message
 * through `aria-describedby` and `aria-invalid` - so the error reaches
 * assistive tech rather than only being visible.
 *
 * Deliberately uncontrolled. The browser keeps the values, which is what
 * guarantees nothing is lost when a submission fails.
 */

const controlClass = cn(
  "w-full rounded-ls-md border bg-white px-3.5 text-body-sm text-ls-ink",
  "transition-colors duration-(--motion-normal) placeholder:text-ls-muted",
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-focus-ring)",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

type BaseProps = {
  name: string;
  label: string;
  /**
   * Short guidance shown in brackets after the label, e.g. "(work email
   * preferred)". Inside the <label>, so it is part of the field's name and
   * keeps every label one line, aligned with its neighbours in the grid.
   */
  hint?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type FieldProps =
  | (BaseProps & {
      as?: "input";
      type?: string;
      maxLength?: number;
      inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    })
  | (BaseProps & { as: "textarea"; rows?: number; maxLength?: number })
  | (BaseProps & { as: "select"; options: string[] });

/** The control's aria-describedby: its error message, while it has one. */
export function describedBy(name: string, error?: string) {
  return error ? `${name}-error` : undefined;
}

export function FieldShell({
  name,
  label,
  hint,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-body-sm font-semibold text-ls-ink"
      >
        {label}
        {/* A real space, not a margin, so the accessible name reads naturally. */}
        {hint && (
          <>
            {" "}
            <span className="font-normal text-ls-muted">({hint})</span>
          </>
        )}
        {/* The required attribute is the signal for assistive tech; this is
            the matching visual cue. */}
        {required && (
          <span aria-hidden="true" className="ml-1 text-ls-error">
            *
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-caption text-ls-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Field(props: FieldProps) {
  const { name, label, hint, error, required, disabled } = props;

  const shared = {
    id: name,
    name,
    required,
    disabled,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy(name, error),
    className: cn(controlClass, error ? "border-ls-error" : "border-ls-border"),
  };

  return (
    <FieldShell
      name={name}
      label={label}
      hint={hint}
      error={error}
      required={required}
    >
      {props.as === "textarea" ? (
        <textarea
          {...shared}
          rows={props.rows ?? 5}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className={cn(shared.className, "resize-y py-2.5 leading-relaxed")}
        />
      ) : props.as === "select" ? (
        <select
          {...shared}
          defaultValue=""
          autoComplete={props.autoComplete}
          className={cn(shared.className, "h-11 appearance-none pr-9")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...shared}
          type={props.type ?? "text"}
          maxLength={props.maxLength}
          inputMode={props.inputMode}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          className={cn(shared.className, "h-11")}
        />
      )}
    </FieldShell>
  );
}
