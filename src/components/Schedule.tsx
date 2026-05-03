"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, unknown>) => void;
    };
  }
}

const WIDGET_ID = "bsport-widget-177399";

const WIDGET_CONFIG = {
  parentElement: WIDGET_ID,
  companyId: 5821,
  franchiseId: null,
  dialogMode: 1,
  widgetType: "calendar",
  language: "en-GB",
  showFab: false,
  fullScreenPopup: false,
  styles: undefined,
  config: {
    calendar: {
      todayOnly: false,
      cardMode: null,
      groupSessionByPeriod: false,
    },
  },
};

type Props = { hideHeading?: boolean };

export default function Schedule({ hideHeading = false }: Props = {}) {
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
    <section id="schedule" className="relative py-24 lg:py-32">
      <Script
        id="bsport-widget-cdn"
        src="https://cdn.bsport.io/scripts/widget.js"
        strategy="afterInteractive"
      />
      {!hideHeading && (
        <div className="mx-auto mb-12 flex max-w-[1400px] flex-col items-start gap-4 px-6 lg:px-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Heat Schedule
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Find your class,
            <br />
            <em className="text-brand">book your mat.</em>
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Every class, every teacher — updated daily and bookable straight from
            this page.
          </p>
        </div>
      )}

      <div
        id="book"
        className="overflow-hidden scroll-mt-[96px] bg-stone-dark/70 py-4 sm:mx-auto sm:max-w-[1400px] sm:rounded-3xl sm:p-6 sm:ring-1 sm:ring-white/10"
      >
        <div id={WIDGET_ID} />
      </div>
    </section>
  );
}
