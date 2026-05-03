import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
  bookingHref?: string;
};

export default function SeoPageShell({
  eyebrow,
  title,
  lede,
  children,
  bookingHref = "/#book",
}: Props) {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <article className="px-5 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-24 lg:px-20 lg:pt-48 lg:pb-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
              {eyebrow}
            </p>
            <h1 className="font-serif text-[2.2rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
              {title}
            </h1>
            <p className="mt-6 text-lg text-foreground/80 leading-relaxed sm:mt-8 sm:text-xl">
              {lede}
            </p>

            <div className="seo-prose mt-12 flex flex-col gap-10 text-foreground/80 leading-relaxed sm:mt-16 sm:gap-12 sm:text-lg">
              {children}
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-4 sm:mt-20">
              <a
                href={bookingHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-dark transition-colors hover:bg-brand-soft sm:px-8 sm:py-4 sm:text-[12px]"
              >
                Book a class →
              </a>
              <a
                href="/#memberships"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-brand hover:text-brand sm:px-8 sm:py-4 sm:text-[12px]"
              >
                See memberships
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
