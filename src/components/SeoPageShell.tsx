import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import { getCluster } from "@/lib/blog-cluster";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
  bookingHref?: string;
  heroImage?: string;
  heroImageAlt?: string;
  extras?: React.ReactNode;
  /** Blog post slug (folder name). Renders hub landings + related spokes. */
  clusterSlug?: string;
  /** ISO date for Article schema, e.g. 2026-07-23 */
  dateModified?: string;
  datePublished?: string;
  canonicalUrl?: string;
};

export default function SeoPageShell({
  eyebrow,
  title,
  lede,
  children,
  bookingHref = "/#book",
  heroImage,
  heroImageAlt,
  extras,
  clusterSlug,
  dateModified,
  datePublished,
  canonicalUrl,
}: Props) {
  const cluster = clusterSlug ? getCluster(clusterSlug) : null;

  const articleLd =
    canonicalUrl && datePublished
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: lede,
          datePublished,
          dateModified: dateModified ?? datePublished,
          mainEntityOfPage: canonicalUrl,
          author: {
            "@type": "Organization",
            name: "Heat Lagos",
            url: "https://www.heatlagos.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Heat Lagos",
            url: "https://www.heatlagos.com",
            logo: {
              "@type": "ImageObject",
              url: "https://www.heatlagos.com/logo%20heat.png",
            },
          },
        }
      : null;

  return (
    <>
      <Header />
      <Marquee />
      <main>
        {articleLd && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
          />
        )}
        {heroImage && (
          <div className="relative mx-auto mt-24 max-w-[1400px] px-5 sm:mt-28 sm:px-6 lg:mt-32 lg:px-20">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 sm:aspect-[21/9]">
              <img
                src={heroImage}
                alt={heroImageAlt ?? title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/70 via-transparent to-transparent" />
            </div>
          </div>
        )}

        <article
          className={`px-5 sm:px-6 lg:px-20 ${
            heroImage
              ? "pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
              : "pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28"
          }`}
        >
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

            {cluster && (
              <nav
                aria-label="Related guides and classes"
                className="mt-14 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12"
              >
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                  Classes and next reads
                </h2>
                <p className="mt-3 text-base text-foreground/70 sm:text-lg">
                  Book a class at Heat Lagos, or keep reading the local cluster.
                </p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand">
                      Class pages
                    </p>
                    <ul className="mt-3 space-y-2">
                      {cluster.landings.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-foreground/90 underline decoration-white/20 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand">
                      Related guides
                    </p>
                    <ul className="mt-3 space-y-2">
                      {cluster.related.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-foreground/90 underline decoration-white/20 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>
            )}

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

        {extras}
      </main>
      <Footer />
    </>
  );
}
