"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, DEFAULT_COUNTRY, DEFAULT_PHONE, CountryItem } from "@/lib/countries-data";
import { CountryFlag } from "./country-flag";

interface PhoneCountryInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (country: CountryItem) => void;
  defaultCountry?: CountryItem;
  required?: boolean;
  className?: string;
  label?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
  buttonClassName?: string;
}

export function PhoneCountryInput({
  id = "phone-input",
  name = "phone",
  value,
  onChange,
  onCountryChange,
  defaultCountry = DEFAULT_COUNTRY,
  required = false,
  className = "",
  label = "Phone (with Country Code) *",
  labelClassName,
  inputContainerClassName,
  buttonClassName
}: PhoneCountryInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(defaultCountry);
  const [internalValue, setInternalValue] = useState<string>(value ?? DEFAULT_PHONE);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keep internal state in sync if value prop is controlled
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCountry = (country: CountryItem) => {
    setSelectedCountry(country);
    onCountryChange?.(country);

    // Update phone number: replace old dial code or prepend new dial code
    let newPhone = internalValue;
    if (!newPhone || newPhone === DEFAULT_PHONE) {
      // If default or empty, set with new dial code
      newPhone = `${country.dialCode} 946 123 456`;
    } else if (newPhone.startsWith(selectedCountry.dialCode)) {
      newPhone = `${country.dialCode}${newPhone.slice(selectedCountry.dialCode.length)}`;
    } else if (/^\+\d+/.test(newPhone)) {
      newPhone = newPhone.replace(/^\+\d+/, country.dialCode);
    } else {
      newPhone = `${country.dialCode} ${newPhone.trim()}`;
    }

    setInternalValue(newPhone);
    onChange?.(newPhone);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange?.(val);

    // If user types a known dial code, auto-detect country if possible
    const match = val.match(/^(\+\d{1,4})/);
    if (match) {
      const typedDialCode = match[1];
      const found = COUNTRIES.find((c) => c.dialCode === typedDialCode);
      if (found && found.iso2 !== selectedCountry.iso2) {
        setSelectedCountry(found);
        onCountryChange?.(found);
      }
    }
  };

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.iso2.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`space-y-1.5 ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className={labelClassName || "block text-[12px] font-black uppercase tracking-wider text-slate-300"}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className={
            inputContainerClassName ||
            "flex items-center rounded-xl border border-[#315671] bg-[#14314B] focus-within:border-[#F97316] transition-colors overflow-hidden"
          }
        >
          {/* Country Flag Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={
              buttonClassName ||
              "flex items-center gap-1.5 px-3 py-3.5 bg-[#0e2439] hover:bg-[#16385a] transition-colors border-r border-[#315671] shrink-0 text-white select-none"
            }
            title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
            aria-label="Select Country Code"
            aria-expanded={isOpen}
          >
            <CountryFlag iso2={selectedCountry.iso2} className="w-6 h-4" />
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#F97316]" : ""}`} />
          </button>

          {/* Phone Input */}
          <input
            id={id}
            name={name}
            type="tel"
            required={required}
            value={internalValue}
            onChange={handleInputChange}
            placeholder="+244 946 123 456"
            className="w-full bg-transparent px-4 py-3.5 text-[14px] font-medium text-white placeholder-slate-400 outline-none"
          />
        </div>

        {/* Dropdown Menu matching Milele screenshot */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-50 w-80 max-w-[95vw] rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            {/* Search filter inside dropdown */}
            <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            {/* List of countries */}
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 dropdown-scrollbar">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">No country found</div>
              ) : (
                filteredCountries.map((country) => {
                  const isSelected = country.iso2 === selectedCountry.iso2;
                  return (
                    <button
                      key={`${country.iso2}-${country.dialCode}`}
                      type="button"
                      onClick={() => handleSelectCountry(country)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-slate-100 font-bold text-slate-900"
                          : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <CountryFlag iso2={country.iso2} className="w-5 h-3.5 shrink-0" />
                        <span className="truncate">{country.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 shrink-0 tabular-nums">
                        {country.dialCode}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

