"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Filter, Send } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  RevealHeading,
  RevealText,
  RevealButton,
  RevealEyebrow,
  RevealStagger,
  Reveal
} from "@/components/ui/scroll-reveal";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: any;
}

const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Cross-Border Trade: Opportunities for SMEs",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "How small and medium enterprises can leverage digital sourcing hubs, transparent supply chains, and Dubai's re-export ecosystem.",
    image: agtpAssets.exportPort
  },
  {
    id: 2,
    title: "Why Supplier Verification Is Critical in Global Sourcing",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Mitigating risks in overseas procurement: Auditing stockists, factory inspections, and verifying pre-shipment compliance.",
    image: agtpAssets.sparePartsHero
  },
  {
    id: 3,
    title: "5 Common Challenges in International Procurement and How to Overcome Them",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Overcoming currency fluctuations, customs bottlenecks, freight delays, and specification mismatches in global trade.",
    image: agtpAssets.aboutHero
  },
  {
    id: 4,
    title: "Top Trends Shaping Global Trade and Supply Chains in 2026",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Key shifts in ocean container freight, automated trade documentation, and regional logistics hubs connecting East to West.",
    image: agtpAssets.inventoryHero
  },
  {
    id: 5,
    title: "How AGTP Group Simplifies International Sourcing for Businesses",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "From single-unit vehicle export to bulk spare parts supply, see how our Dubai-based logistics desk coordinates the end-to-end process.",
    image: agtpAssets.suvs
  },
  {
    id: 6,
    title: "Emerging Opportunities in Africa and the Middle East for Global Traders",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Analyzing high-demand automotive, machinery, and construction material trade routes connecting Dubai to African port cities.",
    image: agtpAssets.heroYard
  },
  {
    id: 7,
    title: "Automotive Spare Parts: OEM vs Aftermarket – Which Is Right for Your Business?",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Understanding quality tiers, price points, and compatibility for commercial fleet maintenance and retail stockists.",
    image: agtpAssets.cadillacEscaladeCard
  },
  {
    id: 8,
    title: "Freight & Logistics: Choosing Between Air, Sea, and Land Transport",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Comparing Ro-Ro, containerized ocean shipping, air express, and overland freight for cost-effective global delivery.",
    image: agtpAssets.exportPort
  },
  {
    id: 9,
    title: "Essential Export Documentation Every Business Should Know",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Demystifying Certificates of Origin, Bills of Lading, SWIFT MT-103 proofs, and destination customs declarations.",
    image: agtpAssets.contactHero
  },
  {
    id: 10,
    title: "The Importance of Quality Inspection in Global Supply Chains",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Why pre-shipment photo & video reports, mechanical testing, and VIN verification prevent costly import disputes.",
    image: agtpAssets.aboutYard
  },
  {
    id: 11,
    title: "How to Choose Reliable Suppliers for International Procurement",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Proven criteria for evaluating supplier credibility, inventory depth, warranty policies, and export track record.",
    image: agtpAssets.bmw760Card
  },
  {
    id: 12,
    title: "Top Construction Materials Sourced Internationally for Modern Projects",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "High-grade tiles, marble, sanitaryware, and structural hardware sourced through Middle Eastern trade channels.",
    image: agtpAssets.vans
  },
  {
    id: 13,
    title: "A Complete Guide to Importing Automotive Vehicles from Dubai",
    category: "Business",
    date: "JUNE 16, 2026",
    excerpt: "Step-by-step walkthrough for overseas buyers sourcing luxury SUVs, pickups, and commercial fleets from Dubai Free Zones.",
    image: agtpAssets.suvs
  },
  {
    id: 14,
    title: "Why Dubai Is the Ideal Hub for Global Trade and Sourcing?",
    category: "AGTP Insights",
    date: "JUNE 16, 2026",
    excerpt: "Tax incentives, world-class port infrastructure at JAFZA, and strategic geographic proximity to emerging global markets.",
    image: agtpAssets.sedans
  },
  {
    id: 15,
    title: "How Global Sourcing Helps Businesses Reduce Costs and Increase Efficiency",
    category: "Sound",
    date: "NOVEMBER 22, 2023",
    excerpt: "Leveraging international supplier networks to unlock competitive unit costs without compromising on quality.",
    image: agtpAssets.pickups
  },
  {
    id: 16,
    title: "2024 BMW ALPINA XB7 with Exclusive Details & Extraordinary Performance",
    category: "Accessories",
    date: "NOVEMBER 22, 2023",
    excerpt: "An in-depth review of the luxury performance SUV featuring bespoke interior accents, tuned V8 engine, and export options.",
    image: agtpAssets.bmw760ArmoredCard
  },
  {
    id: 17,
    title: "BMW X6 M50i: Designed to Exceed Your Sportiest Expectations",
    category: "Exterior",
    date: "NOVEMBER 22, 2023",
    excerpt: "Exploring the aggressive coupe-SUV styling, quad exhaust design, and aerodynamic enhancements of the X6 M50i.",
    image: agtpAssets.bmwX2Card
  },
  {
    id: 18,
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport, Heavy on Luxury",
    category: "Body Kit",
    date: "NOVEMBER 22, 2023",
    excerpt: "Evaluating custom gold trim packages, widebody aerodynamic kits, and performance stance upgrades for the X5 series.",
    image: agtpAssets.spotlightFerrari
  },
  {
    id: 19,
    title: "2024 Kia Sorento Hybrid Review: Big Vehicle Comfort with Small-Vehicle Efficiency",
    category: "Fuel Systems",
    date: "NOVEMBER 22, 2023",
    excerpt: "Analyzing fuel economy, hybrid powertrain longevity, and family utility in the latest 3-row crossover.",
    image: agtpAssets.bydDestroyerCard
  },
  {
    id: 20,
    title: "2024 Audi Hybrid: Uncompromised Efficiency with Optimized Engineering",
    category: "Exterior",
    date: "NOVEMBER 22, 2023",
    excerpt: "How Audi integrates plugin hybrid technology into sleek sedan designs while maintaining dynamic driving dynamics.",
    image: agtpAssets.mercedesCclassCard
  },
  {
    id: 21,
    title: "2024 BMW X3 M Sport Seats: Available as Standalone Upgrade Options",
    category: "Body Kit",
    date: "NOVEMBER 22, 2023",
    excerpt: "Bespoke leather ergonomics, lumbar support, and lateral bolstering options for high-performance SUV interiors.",
    image: agtpAssets.bmwX2Card
  },
  {
    id: 22,
    title: "2023 Kia Carnival: Standard Blind-Spot & Collision Avoidance Technology",
    category: "Sound",
    date: "SEPTEMBER 19, 2023",
    excerpt: "Comprehensive safety package review for high-capacity multi-purpose passenger minivans.",
    image: agtpAssets.vans
  },
  {
    id: 23,
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
    category: "Oil & Filters",
    date: "SEPTEMBER 19, 2023",
    excerpt: "Comparing maintenance costs, fuel economy, engine reliability, and resale value for VW's popular hatchbacks.",
    image: agtpAssets.sedans
  },
  {
    id: 24,
    title: "Battle of the SUVs: Kia Sportage vs Hyundai Tucson",
    category: "Accessories",
    date: "SEPTEMBER 19, 2023",
    excerpt: "Head-to-head comparison between South Korea's top compact crossovers on reliability, technology, and export value.",
    image: agtpAssets.suvs
  },
  {
    id: 25,
    title: "The Best Used Cars for Affordable Insurance & Low Ownership Costs",
    category: "AGTP Insights",
    date: "SEPTEMBER 19, 2023",
    excerpt: "Practical guide to selecting pre-owned sedans and SUVs with proven mechanical longevity and accessible spare parts.",
    image: agtpAssets.careersHero
  }
];

const categories = ["ALL", "AGTP Insights", "Business", "Exterior", "Body Kit", "Accessories", "Sound"];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL") return allBlogPosts;
    return allBlogPosts.filter((post) => post.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "BLOGS & ARTICLES" }
        ]}
        badge={{
          text: "AGTP INSIGHTS & TRADE NEWS"
        }}
        title="AUTOMOTIVE INSIGHTS & GUIDES"
        subtitle="Practical insights on vehicles, automotive spare parts, maintenance, exports, and buying from the UAE."
        imageSrc={agtpAssets.blogsHero}
        imageAlt="AGTP Group Automotive Insights and Guides"
      />

      {/* ── 2. Category Filter Bar ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-12">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-[#315671] bg-[#102941] p-4 shadow-xl">
            <span className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#FDBA74] mr-2">
              <Filter className="h-4 w-4 text-[#F97316]" />
              Filter By Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-[12px] font-black transition-all ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#F97316] text-white shadow-md"
                    : "border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Blog Posts Grid ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-slate-400">
            Showing <strong className="text-white">{filteredPosts.length}</strong> articles
          </span>
        </div>

        <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F97316]"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#0B1F33]/85 px-3 py-1 text-[11px] font-black text-[#FDBA74] backdrop-blur border border-[#F97316]/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <Calendar className="h-3.5 w-3.5 text-[#F97316]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-[20px] font-black leading-snug text-white transition-colors group-hover:text-[#FDBA74] line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-[14px] font-medium text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-[#24445F]/60">
                <span className="inline-flex items-center gap-2 text-[13px] font-black text-[#F97316] group-hover:text-[#FDBA74] transition-colors">
                  <span>Read full article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 4. Immersive Hero-Style Newsletter Banner matching design reference ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[#315671] shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={agtpAssets.exportPort}
                alt="AGTP Group Export Insights"
                fill
                className="object-cover object-center brightness-105"
                sizes="(max-width: 1570px) 100vw, 1570px"
              />
              {/* Soft modern overlay for readability */}
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33]/85 via-[#0B1F33]/70 to-[#0B1F33]/90" />
            </div>

            <div className="relative z-10 px-8 py-16 text-center sm:px-12 md:py-24 lg:py-28">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  STAY UPDATED
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>

              <RevealHeading>
                <h2 className="mx-auto mt-4 max-w-4xl text-[34px] font-black uppercase leading-tight tracking-tight text-white sm:text-[46px] md:text-[56px] lg:text-[62px] drop-shadow-md">
                  GET THE LATEST AUTOMOTIVE INSIGHTS
                </h2>
              </RevealHeading>

              <RevealText delay={120}>
                <p className="mx-auto mt-6 max-w-2xl text-[16px] font-semibold leading-relaxed text-slate-100 sm:text-[18px] drop-shadow">
                  Get useful updates on vehicles, spare parts, automotive trends, and export information from AGTP Group.
                </p>
              </RevealText>

              <RevealButton delay={180} className="mt-10 max-w-xl mx-auto">
                {subscribed ? (
                  <div className="rounded-full border border-emerald-500/50 bg-[#0B1F33]/90 backdrop-blur-md px-8 py-4 text-[14px] font-bold text-emerald-400 shadow-xl">
                    ✓ Thank you for subscribing to AGTP Group Automotive Insights!
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[56px] rounded-full border border-[#315671] bg-[#0B1F33]/90 backdrop-blur-md px-6 text-[15px] font-medium text-white placeholder-slate-400 outline-none focus:border-[#F97316] shadow-lg transition-all"
                    />
                    <button
                      type="submit"
                      className="h-[56px] w-full sm:w-auto shrink-0 rounded-full bg-[#F97316] px-10 text-[16px] font-black text-white transition-all duration-300 hover:bg-[#EA580C] shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Subscribe</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </RevealButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
