import type { Metadata } from "next";
import ProductExplorer from "./product-explorer";

export const metadata: Metadata = {
  title: "Made-to-Measure Window Furnishings",
  description:
    "Explore our curtains, blinds, shutters, Curvers and flyscreens in one interactive made-to-measure collection.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <main className="product-showcase-page">
      <ProductExplorer initialProduct={product} />
    </main>
  );
}
