import { dubaiAutomotiveFeatures } from "@/lib/dubai-automotive/data";

export type DubaiDetailKey = (typeof dubaiAutomotiveFeatures)[number];
export type DubaiDetails = Record<DubaiDetailKey, string>;

export interface ProductDetail {
  key: string;
  value: string;
}

/** Splits stored "Key: Value" lines, keeping only lines that have a value. */
export function parseProductDetails(lines: readonly string[]): ProductDetail[] {
  return lines.flatMap((line) => {
    const at = line.indexOf(":");
    if (at < 0) return [];
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();
    return key && value ? [{ key, value }] : [];
  });
}

/** Admin form values for the fixed Dubai product details (blank when unset). */
export function dubaiDetailsFrom(lines: readonly string[]): DubaiDetails {
  const values = new Map(
    parseProductDetails(lines).map(({ key, value }) => [key, value]),
  );
  return Object.fromEntries(
    dubaiAutomotiveFeatures.map((key) => [key, values.get(key) ?? ""]),
  ) as DubaiDetails;
}

/** Stores the filled Dubai details as "Key: Value" lines, in the fixed order. */
export function dubaiDetailsToLines(details: DubaiDetails): string {
  return dubaiAutomotiveFeatures
    .map((key) => [key, details[key].replace(/\s+/g, " ").trim()] as const)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

/** Website order for a product's details: the fixed Dubai fields that have a value. */
export function dubaiProductDetails(lines: readonly string[]): ProductDetail[] {
  const details = dubaiDetailsFrom(lines);
  return dubaiAutomotiveFeatures
    .filter((key) => details[key])
    .map((key) => ({ key, value: details[key] }));
}
