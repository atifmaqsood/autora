import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function PageHero({ title, subtitle, badge, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800",
        className
      )}
    >
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-2 duration-500">
            {badge}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans animate-in fade-in slide-in-from-bottom-3 duration-500 delay-75">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-normal leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-500 delay-150">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}


