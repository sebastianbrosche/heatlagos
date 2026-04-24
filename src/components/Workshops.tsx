"use client";

import Script from "next/script";
import { useEffect } from "react";

const WIDGET_ID = "bsport-widget-404125";

const WIDGET_CONFIG = {
  parentElement: WIDGET_ID,
  companyId: 5821,
  franchiseId: null,
  dialogMode: 1,
  widgetType: "workshop",
  showFab: false,
  fullScreenPopup: false,
  styles: undefined,
  config: {
    workshop: {
      coaches: [],
      establishments: [],
      metaActivities: [],
      levels: [],
    },
  },
};

export default function Workshops() {
  useEffect(() => {
    let attempts = 0;
    const mount = () => {
      if (window.BsportWidget) {
        window.BsportWidget.mount(WIDGET_CONFIG);
        return;
      }
      if (attempts++ > 50) return;
      setTimeout(mount, 100 * attempts);
    };
    mount();
  }, []);

  return (
    <section
      id="workshops"
      className="relative scroll-mt-[120px] px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32"
    >
      <Script
        id="bsport-widget-cdn-workshops"
        src="https://cdn.bsport.io/scripts/widget.js"
        strategy="afterInteractive"
      />
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            Heat Workshops
          </p>
          <p className="max-w-2xl font-serif text-2xl leading-snug sm:text-3xl lg:text-4xl">
            Our workshops are dedicated sessions for when you want to slow down
            and really explore something. Think of them as a{" "}
            <em className="text-brand">masterclass</em> on one topic, in good
            company.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-stone-dark/70 p-4 ring-1 ring-white/10 sm:p-6">
          <div id={WIDGET_ID} />
        </div>
      </div>
    </section>
  );
}
