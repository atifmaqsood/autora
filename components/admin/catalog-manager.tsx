"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Images,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CatalogCategory, CatalogItem } from "@/lib/product-catalog/types";
import { adminFetch } from "@/lib/admin/admin-fetch";

const categoryBlank = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  isActive: true,
  sortOrder: 0,
};
const productBlank = {
  categoryId: "",
  slug: "",
  title: "",
  description: "",
  features: "",
  attributes: "",
  priceLabel: "On Request",
  isActive: true,
  sortOrder: 0,
};
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function CatalogManager({
  type,
  title,
}: {
  type: "parts" | "dubai";
  title: string;
}) {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [categoryDraft, setCategoryDraft] = useState(categoryBlank);
  const [productDraft, setProductDraft] = useState(productBlank);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
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
      setCategories(body);
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
  function resetCategory() {
    setEditingCategory(null);
    setCategoryDraft(categoryBlank);
    setCategoryImage(null);
  }
  function resetProduct() {
    setEditingProduct(null);
    setProductDraft({ ...productBlank, categoryId: categories[0]?.id ?? "" });
    setProductImages([]);
  }
  function editCategory(category: CatalogCategory) {
    setEditingCategory(category.id);
    setCategoryDraft({
      slug: category.slug,
      title: category.title,
      subtitle: category.subtitle,
      description: category.description,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    });
    setCategoryImage(null);
  }
  function editProduct(product: CatalogItem) {
    setEditingProduct(product.id);
    setProductDraft({
      categoryId: product.categoryId,
      slug: product.slug,
      title: product.title,
      description: product.description,
      features: product.features.join("\n"),
      attributes: product.attributes.join("\n"),
      priceLabel: product.priceLabel,
      isActive: product.isActive,
      sortOrder: product.sortOrder,
    });
    setProductImages([]);
  }
  async function saveCategory(event: FormEvent) {
    event.preventDefault();
    if (!editingCategory && !categoryImage) {
      setError("Category cover image is required.");
      return;
    }
    setSaving(true);
    setError("");
    const data = new FormData();
    data.set("catalogType", type);
    Object.entries(categoryDraft).forEach(([key, value]) =>
      data.set(key, String(value)),
    );
    if (categoryImage) data.set("image", categoryImage);
    try {
      const response = await adminFetch(
        editingCategory
          ? `/api/admin/product-catalog/categories/${editingCategory}`
          : "/api/admin/product-catalog/categories",
        { method: editingCategory ? "PATCH" : "POST", body: data },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(message(body, "Unable to save category."));
      setNotice(editingCategory ? "Category updated." : "Category added.");
      resetCategory();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save category.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    if (!productDraft.categoryId) {
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
      resetProduct();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save product.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function patch(
    kind: "categories" | "items",
    id: string,
    isActive: boolean,
  ) {
    const data = new FormData();
    data.set("isActive", String(isActive));
    const response = await adminFetch(`/api/admin/product-catalog/${kind}/${id}`, {
      method: "PATCH",
      body: data,
    });
    const body = await response.json();
    if (!response.ok) {
      setError(message(body, "Unable to update status."));
      return;
    }
    setNotice(isActive ? "Item activated." : "Item hidden.");
    await load();
  }
  async function remove(
    kind: "categories" | "items",
    id: string,
    label: string,
  ) {
    if (!window.confirm(`Delete “${label}”?`)) return;
    const response = await adminFetch(`/api/admin/product-catalog/${kind}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(message(body, "Unable to delete item."));
      return;
    }
    setNotice("Item deleted.");
    await load();
  }
  const control = "mt-1.5 h-11 bg-white text-slate-950";
  return (
    <section className="space-y-6 border-t border-slate-200 pt-8">
      <header>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <Images className="h-4 w-4" />
          Full product catalogue
        </div>
        <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage categories, products, galleries, features and product
          specifications.
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
        onSubmit={saveCategory}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
      >
        <div className="flex justify-between">
          <h3 className="font-black text-slate-950">
            {editingCategory ? "Edit category" : "Add new category"}
          </h3>
          {editingCategory && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetCategory}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Title</Label>
            <Input
              required
              value={categoryDraft.title}
              onChange={(e) =>
                setCategoryDraft((current) => ({
                  ...current,
                  title: e.target.value,
                  ...(!editingCategory && { slug: slugify(e.target.value) }),
                }))
              }
              className={control}
            />
          </div>
          <div>
            <Label>URL slug</Label>
            <Input
              required
              value={categoryDraft.slug}
              onChange={(e) =>
                setCategoryDraft((current) => ({
                  ...current,
                  slug: slugify(e.target.value),
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
              value={categoryDraft.sortOrder}
              onChange={(e) =>
                setCategoryDraft((current) => ({
                  ...current,
                  sortOrder: Number(e.target.value),
                }))
              }
              className={control}
            />
          </div>
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            value={categoryDraft.subtitle}
            onChange={(e) =>
              setCategoryDraft((current) => ({
                ...current,
                subtitle: e.target.value,
              }))
            }
            className={control}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            rows={4}
            value={categoryDraft.description}
            onChange={(e) =>
              setCategoryDraft((current) => ({
                ...current,
                description: e.target.value,
              }))
            }
            className="mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950"
          />
        </div>
        <div>
          <Label>
            Category image {editingCategory ? "(optional replacement)" : "*"}
          </Label>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setCategoryImage(e.target.files?.[0] ?? null)}
            className={control}
          />
        </div>
        <label className="flex gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={categoryDraft.isActive}
            onChange={(e) =>
              setCategoryDraft((current) => ({
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
          Save category
        </Button>
      </form>
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
              <option value="">Select category</option>
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
            className="mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
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
              className="mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950"
            />
          </div>
          <div>
            <Label>Specifications (Key: Value, one per line)</Label>
            <textarea
              rows={7}
              value={productDraft.attributes}
              onChange={(e) =>
                setProductDraft((current) => ({
                  ...current,
                  attributes: e.target.value,
                }))
              }
              className="mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950"
            />
          </div>
        </div>
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
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <div className="space-y-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-20 overflow-hidden rounded-lg bg-slate-900">
                    <Image
                      src={category.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      /{category.slug} · {category.products.length} products
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      void patch("categories", category.id, !category.isActive)
                    }
                  >
                    {category.isActive ? (
                      <EyeOff className="mr-1 h-4 w-4" />
                    ) : (
                      <Eye className="mr-1 h-4 w-4" />
                    )}
                    {category.isActive ? "Hide" : "Show"}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => editCategory(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-red-600"
                    onClick={() =>
                      void remove("categories", category.id, category.title)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {product.title}
                      </p>
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
                          void patch("items", product.id, !product.isActive)
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
                        onClick={() =>
                          void remove("items", product.id, product.title)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
