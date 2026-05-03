const LAT = 37.1032;
const LNG = -8.6738;
const BBOX_DELTA = 0.004;
const MAPS_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${
  LNG - BBOX_DELTA
},${LAT - BBOX_DELTA * 0.7},${LNG + BBOX_DELTA},${
  LAT + BBOX_DELTA * 0.7
}&layer=mapnik&marker=${LAT},${LNG}`;
const MAPS_DIRECTIONS = "https://maps.app.goo.gl/XshkRJWAZpEs5gWw8";

export default function LocationPreview() {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-start gap-3 sm:mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            Where to find us
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl">
            Heat Lagos, by the beach.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                Address
              </p>
              <p className="mt-3 text-foreground/90 leading-relaxed">
                Edificio da Fabrica da Ribeira,
                <br />
                Av. dos Descobrimentos, Loja G,
                <br />
                8600-854 Lagos, Portugal
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                Reach us
              </p>
              <p className="mt-3 flex flex-col gap-1 text-foreground/90">
                <a href="mailto:hello@heatlagos.com" className="hover:text-brand">
                  hello@heatlagos.com
                </a>
                <a href="tel:+351927290812" className="hover:text-brand">
                  +351 927 290 812
                </a>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
                From the area
              </p>
              <ul className="mt-3 flex flex-col gap-1 text-foreground/85">
                <li>Praia da Luz — about 12-13 min</li>
                <li>Burgau — about 15-16 min</li>
                <li>Portimão — about 19-23 min</li>
              </ul>
            </div>
            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-dark transition-colors hover:bg-brand-soft"
            >
              Get directions
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
