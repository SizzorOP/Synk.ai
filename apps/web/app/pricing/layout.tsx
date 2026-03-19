import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Synk.ai",
  description: "Flexible pricing plans for both candidates and hiring partners. Scale your engineering team or career at Synk.ai.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
