import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "FlockPilot — The operating system for profitable poultry farms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A1F12 0%, #122A1A 50%, #0A1F12 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #22C55E, #86EFAC, #22C55E)",
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "white",
              fontWeight: 700,
            }}
          >
            FP
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#22C55E",
              letterSpacing: "-0.02em",
            }}
          >
            FlockPilot
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          The operating system for profitable poultry farms
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "#86EFAC",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          Farm ops · Feed tracking · Financials · Payroll · AI Assistant
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
          }}
        >
          {[
            { value: "30+", label: "Modules" },
            { value: "₦25K", label: "From/month" },
            { value: "99.9%", label: "Uptime" },
            { value: "AI", label: "Built-in" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#6EE7A0",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#4ADE80",
            fontSize: "16px",
          }}
        >
          <span style={{ fontWeight: 600 }}>flockpilot.com</span>
          <span style={{ color: "#22C55E40" }}>|</span>
          <span style={{ color: "#86EFAC" }}>by Enro Agro Limited</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
