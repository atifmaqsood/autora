"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Images, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CatalogCategory, CatalogItem } from "@/lib/product-catalog/types";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { dubaiAutomotiveFeatures } from "@/lib/dubai-automotive/data";
import {
  dubaiDetailsFrom,
  dubaiDetailsToLines,
  type DubaiDetails,
} from "@/lib/product-catalog/details";

const productBlank = {
  categoryId: "",
  slug: "",
  title: "",
  description: "",
  features: "",
  priceLabel: "On Request",
  isActive: true,
  sortOrder: 0,
};
const detailsBlank = dubaiDetailsFrom([]);
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Products of the fixed catalogue categories. Categories can't be added or
 * removed here; parts products list features, Dubai products fill in the
 * fixed details (Industry, Specialization, ...).
 */
export function CatalogManager({
  type,
  title,
}: {
  type: "parts" | "dubai";
  title: string;
}) {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [productDraft, setProductDraft] = useState(productBlank);
  const [details, setDetails] = useState<DubaiDetails>(detailsBlank);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch(`/api/admin/product-catalog/${type}`, {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load catalogue.");
      const items = body as CatalogCategory[];
      setCategories(items);
      // Keep the selected tab; default to the first category.
      setActiveCategory((current) =>
        items.some((item) => item.id === current) ? current : (items[0]?.id ?? ""),
      );
      setProductDraft((current) =>
        current.categoryId ? current : { ...current, categoryId: items[0]?.id ?? "" },
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load catalogue.",
      );
    } finally {
      setLoading(false);
    }
  }, [type]);
  useEffect(() => {
    void load();
  }, [load]);
  const message = (body: { message?: string | string[] }, fallback: string) =>
    Array.isArray(body.message) ? body.message[0] : (body.message ?? fallback);
  function selectCategory(id: string) {
    setActiveCategory(id);
    // New products go into the selected tab's category.
    if (!editingProduct)
      setProductDraft((current) => ({ ...current, categoryId: id }));
  }
  function resetProduct() {
    setEditingProduct(null);
    setProductDraft({ ...productBlank, categoryId: activeCategory });
    setDetails(detailsBlank);
    setProductImages([]);
  }
  function editProduct(product: CatalogItem) {
    setEditingProduct(product.id);
    setProductDraft({
      categoryId: product.categoryId,
      slug: product.slug,
      title: product.title,
      description: product.description,
      features: product.features.join("\n"),
      priceLabel: product.priceLabel,
      isActive: product.isActive,
      sortOrder: product.sortOrder,
    });
    setDetails(dubaiDetailsFrom(product.attributes));
    setProductImages([]);
  }
  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    if (!categories.some((category) => category.id === productDraft.categoryId)) {
      setError("Select a category first.");
      return;
    }
    if (!editingProduct && !productImages.length) {
      setError("At least one product image is required.");
      return;
    }
    setSaving(true);
    setError("");
    const data = new FormData();
    Object.entries(productDraft).forEach(([key, value]) =>
      data.set(key, String(value)),
    );
    if (type === "dubai") {
      // Dubai products show only their fixed details, as Key: Value.
      data.set("features", "");
      data.set("attributes", dubaiDetailsToLines(details));
    } else {
      data.set("attributes", "");
    }
    productImages.forEach((file) => data.append("images", file));
    try {
      const response = await adminFetch(
        editingProduct
          ? `/api/admin/product-catalog/items/${editingProduct}`
          : "/api/admin/product-catalog/items",
        { method: editingProduct ? "PATCH" : "POST", body: data },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(message(body, "Unable to save product."));
      setNotice(editingProduct ? "Product updated." : "Product added.");
      setActiveCategory(productDraft.categoryId);
      resetProduct();
      setProductDraft({ ...productBlank, categoryId: productDraft.categoryId });
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save product.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function toggleProduct(id: string, isActive: boolean) {
    const data = new FormData();
    data.set("isActive", String(isActive));
    const response = await adminFetch(`/api/admin/product-catalog/items/${id}`, {
      method: "PATCH",
      body: data,
    });
    const body = await response.json();
    if (!response.ok) {
      setError(message(body, "Unable to update status."));
      return;
    }
    setNotice(isActive ? "Product shown." : "Product hidden.");
    await load();
  }
  async function removeProduct(id: string, label: string) {
    if (!window.confirm(`Delete “${label}”?`)) return;
    const response = await adminFetch(`/api/admin/product-catalog/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(message(body, "Unable to delete product."));
      return;
    }
    if (editingProduct === id) resetProduct();
    setNotice("Product deleted.");
    await load();
  }
  const control = "mt-1.5 h-11 bg-white text-slate-950";
  const textarea =
    "mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950";
  const selected = categories.find((category) => category.id === activeCategory);
  return (
    <section className="space-y-6 border-t border-slate-200 pt-8">
      <header>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <Images className="h-4 w-4" />
          Full product catalogue
        </div>
        <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          The {categories.length || ""} categories are fixed. Add, edit and
          hide the products inside each one.
        </p>
      </header>
      {(error || notice) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {error || notice}
        </div>
      )}
      <form
        onSubmit={saveProduct}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
      >
        <div className="flex justify-between">
          <h3 className="font-black text-slate-950">
            {editingProduct ? "Edit product" : "Add product in category"}
          </h3>
          {editingProduct && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetProduct}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Category</Label>
            <select
              required
              value={productDraft.categoryId}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  categoryId: e.target.value,
                }))
              }
              className="mt-1.5 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Product title</Label>
            <Input
              required
              value={productDraft.title}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  title: e.target.value,
                  ...(!editingProduct && { slug: slugify(e.target.value) }),
                }))
              }
              className={control}
            />
          </div>
          <div>
            <Label>URL slug</Label>
            <Input
              required
              value={productDraft.slug}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  slug: slugify(e.target.value),
                }))
              }
              className={control}
            />
          </div>
          <div>
            <Label>Price label</Label>
            <Input
              value={productDraft.priceLabel}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  priceLabel: e.target.value,
                }))
              }
              className={control}
            />
          </div>
          <div>
            <Label>Display order</Label>
            <Input
              type="number"
              min={0}
              max={999}
              value={productDraft.sortOrder}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  sortOrder: Number(e.target.value),
                }))
              }
              className={control}
            />
          </div>
          <div>
            <Label>
              Gallery images {editingProduct ? "(replaces gallery)" : "*"}
            </Label>
            <Input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setProductImages(Array.from(e.target.files ?? []))
              }
              className={control}
            />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            rows={4}
            value={productDraft.description}
            onChange={(e) =>
              setProductDraft((current) => ({
                ...current,
                description: e.target.value,
              }))
            }
            className={textarea}
          />
        </div>
        {type === "dubai" ? (
          <div>
            <Label>Product details</Label>
            <p className="mt-0.5 text-xs text-slate-500">
              Shown in the product&apos;s Features tab. Leave a field empty to
              hide it.
            </p>
            <div className="mt-2 grid gap-4 md:grid-cols-3">
              {dubaiAutomotiveFeatures.map((key) => (
                <div key={key}>
                  <Label className="text-xs font-bold text-slate-700">
                    {key}
                  </Label>
                  <Input
                    value={details[key]}
                    maxLength={300}
                    onChange={(e) =>
                      setDetails((current) => ({
                        ...current,
                        [key]: e.target.value,
                      }))
                    }
                    className={control}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Label>Features (one per line)</Label>
            <textarea
              rows={7}
              value={productDraft.features}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  features: e.target.value,
                }))
              }
              className={textarea}
            />
          </div>
        )}
        <label className="flex gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={productDraft.isActive}
            onChange={(e) =>
              setProductDraft((current) => ({
                ...current,
                isActive: e.target.checked,
              }))
            }
          />
          Visible on website
        </label>
        <Button disabled={saving} className="gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Save product
        </Button>
      </form>
      {loading && !categories.length ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div
            role="tablist"
            aria-label="Categories"
            className="flex flex-wrap gap-2 border-b border-slate-200 p-4"
          >
            {categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectCategory(category.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                >
                  {category.title}
                  <span
                    className={`ml-2 rounded-full px-1.5 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}
                  >
                    {category.products.length}
                  </span>
                </button>
              );
            })}
          </div>
          <div role="tabpanel" className="divide-y divide-slate-100">
            {!selected?.products.length && (
              <p className="p-6 text-sm text-slate-500">
                No products in this category yet.
              </p>
            )}
            {selected?.products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-slate-900">{product.title}</p>
                  <p className="text-xs text-slate-500">
                    {product.priceLabel} · {product.images.length} images ·{" "}
                    {product.isActive ? "Active" : "Hidden"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      void toggleProduct(product.id, !product.isActive)
                    }
                  >
                    {product.isActive ? "Hide" : "Show"}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => editProduct(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => void removeProduct(product.id, product.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
