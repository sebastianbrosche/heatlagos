import type { Metadata } from "next";
import CheckinClient from "./CheckinClient";

export const metadata: Metadata = {
  title: "Class Check-in",
  description: "Studio attendance check-in for Heat Lagos classes.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.heatlagos.com/checkin",
  },
};

export default function CheckinPage() {
  return <CheckinClient />;
}
