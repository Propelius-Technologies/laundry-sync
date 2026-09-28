"use client";

import { useId, useMemo, useRef, useState } from "react";
import { FieldShell, describedBy } from "@/components/ui/Field";
import { countries, type Country } from "@/data/countries";
import { cn } from "@/lib/utils";

/** Lower-case, accents stripped, separators collapsed to single spaces. */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[\s\-(),.'’/]+/g, " ")
    .trim();
}

const searchIndex = countries.map((country) => ({
  country,
  terms: [country.name, ...(country.aliases ?? [])].map(normalize),
}));

/** The country whose name or alias equals `text`, ignoring case and accents. */
export function findCountry(text: string): Country | undefined {
  const query = normalize(text);
  if (!query) return undefined;
  return searchIndex.find(({ terms }) => terms.includes(query))?.country;
}

/**
 * Countries with a word starting with the query: "king" finds United Kingdom,
 * "ind" finds India and Indonesia. Names that start with it come first.
 */
function filterCountries(text: string): Country[] {
  const query = normalize(text);
  if (!query) return countries;

  const leading: Country[] = [];
  const inner: Country[] = [];
  for (const { country, terms } of searchIndex) {
    if (terms.some((term) => term.startsWith(query))) leading.push(country);
    else if (terms.some((term) => ` ${term}`.includes(` ${query}`)))
      inner.push(country);
  }
  return [...leading, ...inner];
}

/**
 * Searchable country field: the WAI-ARIA 1.2 editable combobox with list
 * autocomplete and manual selection.
 *
 * - Typing filters the list; nothing is chosen until the visitor picks an
 *   option (click or tap, or arrows then Enter). Escape closes the list, and
 *   a second Escape clears the text.
 * - Tab leaves the field. An option highlighted with the arrow keys is
 *   selected on the way out.
 * - Focus never leaves the input: the active option is announced through
 *   aria-activedescendant, and pointer presses on options do not blur it.
 * - The input itself carries name="country", so the form submits the text
 *   shown. Text that matches a name or alias exactly - typed, or filled in by
 *   the browser from autocomplete="country-name" - is normalized to the
 *   list's spelling. The form rejects anything else on submit.
 */
export function CountryCombobox({
  name,
  label,
  error,
  required,
  disabled,
  onCountryChange,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** The matched country, or undefined while the text matches none. */
  onCountryChange?: (country: Country | undefined) => void;
}) {
  const listId = useId();
  const optionId = (code: string) => `${listId}-${code}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // A complete name shows the whole list, so the visitor can browse from it.
  const options = useMemo(
    () => (findCountry(text)?.name === text ? countries : filterCountries(text)),
    [text],
  );
  const active = open ? options[activeIndex] : undefined;

  function commit(value: string) {
    setText(value);
    onCountryChange?.(findCountry(value));
  }

  function choose(country: Country) {
    commit(country.name);
    setOpen(false);
    setActiveIndex(-1);
  }

  function moveTo(index: number) {
    setOpen(true);
    setActiveIndex(index);
    const option = listRef.current?.children[index] as HTMLElement | undefined;
    option?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (last < 0) return;
        if (event.altKey) setOpen(true);
        else moveTo(!open || activeIndex >= last ? 0 : activeIndex + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        if (last < 0) return;
        moveTo(!open || activeIndex <= 0 ? last : activeIndex - 1);
        return;
      case "Enter":
        // Only intercept when choosing; otherwise Enter submits the form.
        if (active) {
          event.preventDefault();
          choose(active);
        }
        return;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
          setActiveIndex(-1);
        } else if (text) {
          event.preventDefault();
          commit("");
        }
        return;
      case "Tab":
        if (active) choose(active);
        else setOpen(false);
        return;
    }
  }

  function onBlur() {
    setOpen(false);
    setActiveIndex(-1);
    const match = findCountry(text);
    if (match && match.name !== text) commit(match.name);
  }

  const resultsMessage = open
    ? options.length === 0
      ? "No matching countries"
      : `${options.length} ${options.length === 1 ? "country" : "countries"} available`
    : "";

  return (
    <FieldShell name={name} label={label} error={error} required={required}>
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={active ? optionId(active.code) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, undefined, error)}
          autoComplete="country-name"
          autoCapitalize="words"
          spellCheck={false}
          required={required}
          disabled={disabled}
          value={text}
          onChange={(event) => {
            const value = event.target.value;
            // A browser autofill arrives as one change with the full name.
            const exact = findCountry(value);
            commit(exact && exact.name.length === value.length ? exact.name : value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={cn(
            "h-11 w-full rounded-ls-md border bg-white px-3.5 text-body-sm text-ls-ink",
            "transition-colors duration-(--motion-normal) placeholder:text-ls-muted",
            "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-focus-ring)",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-ls-error" : "border-ls-border",
          )}
        />

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          hidden={!open || options.length === 0}
          // Lenis would otherwise take over the wheel inside the list.
          data-lenis-prevent
          className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-y-auto overscroll-contain rounded-ls-md border border-ls-border bg-white py-1 shadow-ls-card"
        >
          {options.map((country, index) => {
            const isActive = index === activeIndex;
            const isSelected = country.name === text;
            return (
              <li
                key={country.code}
                id={optionId(country.code)}
                role="option"
                aria-selected={isSelected}
                // Keep focus in the input so the list does not close first.
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => {
                  choose(country);
                  inputRef.current?.focus();
                }}
                onPointerMove={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2 text-body-sm",
                  isActive ? "bg-ls-sky-50 text-ls-navy" : "text-ls-ink",
                  isSelected && "font-semibold",
                )}
              >
                <span>{country.name}</span>
                {country.dial && (
                  <span className="text-caption text-ls-muted">{country.dial}</span>
                )}
              </li>
            );
          })}
        </ul>

        <p className="sr-only" aria-live="polite">
          {resultsMessage}
        </p>
      </div>
    </FieldShell>
  );
}
