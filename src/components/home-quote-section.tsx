"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { serviceOptions } from "@/components/service-options";

export function HomeQuoteSection() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [service, setService] = useState("");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeDropdown(event: PointerEvent) {
      if (!serviceDropdownRef.current?.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeDropdown);
    return () => document.removeEventListener("pointerdown", closeDropdown);
  }, []);

  function selectService(value: string) {
    setService(value);
    setIsServiceOpen(false);
    serviceButtonRef.current?.focus();
  }

  function handleServiceKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setIsServiceOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsServiceOpen(true);
      setActiveServiceIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + serviceOptions.length) % serviceOptions.length;
      });
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && isServiceOpen) {
      event.preventDefault();
      selectService(serviceOptions[activeServiceIndex].value);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;
    if (!service) {
      setIsServiceOpen(true);
      serviceButtonRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to submit your request.");
      }

      form.reset();
      setService("");
      router.push("/thanks-you");
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="home-quote-section" id="home-quote-section" aria-labelledby="home-quote-title">
      <div className="home-quote-container">
        <div className="home-quote-content reveal">
          <p className="home-quote-kicker">LET’S GET STARTED</p>
          <h2 className="home-quote-title" id="home-quote-title">
            READY TO<br /> 
            TRANSFORM<br />
            YOUR HOME?
          </h2>
          <p className="home-quote-script">Book your free measure &amp; quote.</p>
          <p className="home-quote-copy">
            Our team will help you find the right blinds or shutters for your space,
            style and budget.
          </p>
          <ul className="home-quote-benefits" aria-label="Appointment benefits">
            <li>Free in-home measure</li>
            <li>No obligation quote</li>
            <li>Expert installation</li>
          </ul>
        </div>

        <div className="home-quote-panel reveal">
          <form className="home-quote-form" onSubmit={handleSubmit}>
              <div className="home-quote-field">
                <label htmlFor="home-quote-name">Full Name</label>
                <input
                  autoComplete="name"
                  id="home-quote-name"
                  name="fullName"
                  required
                  type="text"
                />
              </div>
              <div className="home-quote-field">
                <label htmlFor="home-quote-phone">Phone Number</label>
                <input
                  autoComplete="tel"
                  id="home-quote-phone"
                  inputMode="tel"
                  maxLength={20}
                  name="phone"
                  placeholder="0458 822 281"
                  required
                  type="tel"
                />
              </div>
              <div className="home-quote-field">
                <label htmlFor="home-quote-email">Email Address</label>
                <input
                  autoComplete="email"
                  id="home-quote-email"
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div className="home-quote-field">
                <label htmlFor="home-quote-postcode">Postcode</label>
                <input
                  autoComplete="postal-code"
                  id="home-quote-postcode"
                  inputMode="numeric"
                  maxLength={4}
                  name="postcode"
                  onInput={(event) => {
                    event.currentTarget.value = event.currentTarget.value
                      .replace(/\D/g, "")
                      .slice(0, 4);
                  }}
                  pattern="[0-9]{4}"
                  placeholder="3000"
                  required
                  title="Enter a 4-digit Australian postcode"
                  type="text"
                />
              </div>
              <div className="home-quote-field home-quote-select-field">
                <label id="home-quote-service-label">Required Service</label>
                <div className="home-service-dropdown" ref={serviceDropdownRef}>
                  <input name="service" type="hidden" value={service} />
                  <button
                    aria-controls="home-quote-service-options"
                    aria-expanded={isServiceOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="home-quote-service-label home-quote-service-value"
                    className={`home-service-trigger${service ? " has-value" : ""}`}
                    id="home-quote-service"
                    onClick={() => setIsServiceOpen((open) => !open)}
                    onKeyDown={handleServiceKeyDown}
                    ref={serviceButtonRef}
                    type="button"
                  >
                    <span id="home-quote-service-value">
                      {serviceOptions.find((option) => option.value === service)?.label ||
                        "Select a service"}
                    </span>
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </button>

                  {isServiceOpen && (
                    <div
                      aria-labelledby="home-quote-service-label"
                      className="home-service-options"
                      id="home-quote-service-options"
                      role="listbox"
                    >
                      <div className="home-service-options-header">
                        <span>Choose a service</span>
                        <span>{serviceOptions.length} options</span>
                      </div>
                      {serviceOptions.map((option, index) => (
                        <button
                          aria-selected={service === option.value}
                          className={`home-service-option${
                            index === activeServiceIndex ? " is-active" : ""
                          }`}
                          key={option.value}
                          onClick={() => selectService(option.value)}
                          onMouseEnter={() => setActiveServiceIndex(index)}
                          role="option"
                          type="button"
                        >
                          <span>{option.label}</span>
                          {service === option.value && (
                            <svg aria-hidden="true" viewBox="0 0 20 20">
                              <path d="m4.5 10 3.5 3.5 7.5-8" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="home-quote-field home-quote-description-field">
                <label htmlFor="home-quote-description">Description</label>
                <textarea
                  id="home-quote-description"
                  maxLength={2000}
                  name="description"
                  placeholder="Tell us about your windows and what you need"
                  required
                  rows={5}
                />
              </div>

              <button className="home-quote-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "SENDING..." : "BOOK FREE MEASURE"}
              </button>
              <p className="home-quote-privacy">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12a1 1 0 0 1 1 1v9H5v-9a1 1 0 0 1 1-1Zm6 4v3" />
                </svg>
                Your details are safe with us.
              </p>
          </form>
        </div>
      </div>
    </section>
  );
}
