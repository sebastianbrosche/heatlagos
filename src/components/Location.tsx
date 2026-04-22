const LAT = 37.1032;
const LNG = -8.6738;
const BBOX_DELTA = 0.004;
const MAPS_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${
  LNG - BBOX_DELTA
},${LAT - BBOX_DELTA * 0.7},${LNG + BBOX_DELTA},${
  LAT + BBOX_DELTA * 0.7
}&layer=mapnik&marker=${LAT},${LNG}`;
const MAPS_DIRECTIONS = "https://maps.app.goo.gl/XshkRJWAZpEs5gWw8";

export default function Location() {
  return (
    <section id="find-us" className="relative px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start gap-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Where to find us
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Come sweat
            <br />
            <em className="text-brand">by the beach.</em>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                Address
              </p>
              <p className="mt-2 font-serif text-2xl leading-snug">
                Edificio da Fabrica da Ribeira
                <br />
                Av. dos Descobrimentos, Loja G
                <br />
                8600-854 Lagos, Portugal
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                Parking
              </p>
              <p className="mt-2 text-foreground/80">
                <a
                  href="https://maps.app.goo.gl/umYisNgE5cfhaNQb8?g_st=afm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  Parking 300 m up the road
                </a>
              </p>
              <p className="mt-1 text-foreground/80">
                <a
                  href="https://maps.app.goo.gl/Xz2bmku8xperBXWd7?g_st=afm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  Alternative parking garage
                </a>
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                Contact
              </p>
              <p className="mt-2 text-foreground/80">
                <a
                  href="mailto:hello@heatlagos.com"
                  className="hover:text-brand"
                >
                  hello@heatlagos.com
                </a>
                <br />
                <a href="tel:+351927290812" className="hover:text-brand">
                  +351 927 290 812
                </a>
              </p>
            </div>

            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-dark hover:bg-brand-soft transition-colors"
            >
              Get Directions
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 lg:col-span-3">
            <iframe
              title="Heat Lagos location"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
