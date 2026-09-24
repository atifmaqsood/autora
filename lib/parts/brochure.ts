// A single-page PDF using built-in PDF fonts; no external service is needed.
export function createPartsBrochure(title: string, products: string[]): string {
  const escape = (value: string) => value
    .replace(/×/g, "x")
    .replace(/[^\x20-\x7e]/g, "-")
    .replace(/([\\()])/g, "\\$1");
  const text = (value: string, x: number, y: number, size: number, bold = false) =>
    `BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${escape(value)}) Tj ET`;
  const content = [
    "0.035 0.06 0.1 rg 0 0 595 842 re f",
    "0.263 0.38 0.933 rg 44 785 34 4 re f",
    "0.65 0.7 0.8 rg",
    text("AGTP GROUP / PARTS & ACCESSORIES", 44, 755, 10, true),
    "1 1 1 rg",
    text(title, 44, 712, 23, true),
    "0.65 0.7 0.8 rg",
    text("Category product guide", 44, 685, 12),
    "0.2 0.25 0.33 RG 44 660 m 551 660 l S",
    "1 1 1 rg",
    text("AVAILABLE PRODUCT TYPES", 44, 630, 11, true),
    ...products.flatMap((product, index) => [
      "0.263 0.38 0.933 rg",
      text(String(index + 1).padStart(2, "0"), 44, 596 - index * 27, 10, true),
      "0.85 0.88 0.94 rg",
      text(product, 78, 596 - index * 27, 12)
    ]),
    "0.2 0.25 0.33 RG 44 145 m 551 145 l S",
    "1 1 1 rg",
    text("REQUEST A QUOTE", 44, 120, 11, true),
    "0.65 0.7 0.8 rg",
    text("Share part numbers, vehicle details, quantities and destination.", 44, 99, 10),
    text("Compatibility, availability and pricing are confirmed on request.", 44, 82, 10),
    text("AGTP Group | UAE | Worldwide supply", 44, 44, 9)
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return pdf;
}
