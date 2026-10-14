import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "CSULBreach — CyberSecurity Club at CSULB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "public/images/cyberclublogo.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

// ImageResponse only supports inline styles, not Tailwind classes.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "#ffffff",
          color: "#1a1a1a",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={logoSrc} width={365} height={310} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            CSULBreach
          </div>
          <div style={{ fontSize: 44, marginTop: 8 }}>CyberSecurity Club</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#6b6b6b" }}>
            csulbcyber.org
          </div>
        </div>
      </div>
    ),
    size,
  );
}
