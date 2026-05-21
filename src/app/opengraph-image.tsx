import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Heat Lagos — Infrared Pilates, Yoga & Recovery in Lagos, Portugal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 80%, rgba(252,150,106,0.35), transparent 55%), linear-gradient(160deg, #1a1614 0%, #0f0d0c 100%)",
          color: "#f5efe7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#fc966a",
          }}
        >
          Heat Lagos
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 400,
              maxWidth: 1000,
              letterSpacing: "-0.02em",
            }}
          >
            Infrared Pilates, Yoga &amp; Recovery
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#fc966a",
              opacity: 0.95,
            }}
          >
            Lagos, Portugal
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,239,231,0.6)",
          }}
        >
          <span>English-speaking studio</span>
          <span>heatlagos.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
