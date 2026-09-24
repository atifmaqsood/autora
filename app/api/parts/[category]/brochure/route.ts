import { getPartsCategoryBySlug } from "@/lib/parts/data";
import { createPartsBrochure } from "@/lib/parts/brochure";

export async function GET(_request: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getPartsCategoryBySlug(slug);
  if (!category) return new Response("Category not found", { status: 404 });

  return new Response(createPartsBrochure(category.title, category.products), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${category.slug}-brochure.pdf"`,
      "Cache-Control": "public, max-age=3600"
    }
  });
}
