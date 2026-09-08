"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, DEFAULT_COUNTRY, CountryItem } from "@/lib/countries-data";
import { CountryFlag } from "./country-flag";

interface CountrySelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (countryName: string) => void;
  onCountryChange?: (country: CountryItem) => void;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  buttonClassName?: string;
  required?: boolean;
  className?: string;
}

export function CountrySelect({
  id = "country-select",
  name = "country",
  value,
  onChange,
  onCountryChange,
  defaultValue = DEFAULT_COUNTRY.name, // Angola by default
  placeholder = "Enter your country",
  label = "Country *",
  labelClassName,
  buttonClassName,
  required = false,
  className = ""
}: CountrySelectProps) {
  const [selectedCountryName, setSelectedCountryName] = useState<string>(value ?? defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedCountryName(value);
    }
  }, [value]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: CountryItem) => {
    setSelectedCountryName(country.name);
    onChange?.(country.name);
    onCountryChange?.(country);
    setIsOpen(false);
  };

  const selectedItem = COUNTRIES.find(
    (c) => c.name.toLowerCase() === (selectedCountryName || "").toLowerCase()
  );

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.iso2.toLowerCase().includes(q);
  });

  return (
    <div className={`space-y-1.5 ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className={labelClassName || "block text-[12px] font-black uppercase tracking-wider text-slate-300"}
        >
          {label}
        </label>
      )}

      {/* Hidden input for HTML form submissions */}
      <input type="hidden" name={name} value={selectedCountryName} required={required} />

      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={
            buttonClassName ||
            "w-full flex items-center justify-between rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-left text-[14px] font-medium text-white transition-colors focus:border-[#F97316] outline-none"
          }
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            {selectedItem && (
              <CountryFlag iso2={selectedItem.iso2} className="w-5 h-3.5 shrink-0" />
            )}
            <span className={selectedCountryName ? "text-white truncate" : "text-slate-400 truncate"}>
              {selectedCountryName || placeholder}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180 text-[#F97316]" : ""
            }`}
          />
        </button>

        {/* Dropdown menu matching Milele screenshot */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            {/* Search input */}
            <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            {/* Alphabetical country list */}
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-50 dropdown-scrollbar">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">No country found</div>
              ) : (
                filteredCountries.map((country) => {
                  const isSelected = country.name === selectedCountryName;
                  return (
                    <button
                      key={`${country.iso2}-${country.name}`}
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-slate-100 font-bold text-slate-900"
                          : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <CountryFlag iso2={country.iso2} className="w-4 h-3 shrink-0" />
                      <span className="truncate">{country.name}</span>
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

