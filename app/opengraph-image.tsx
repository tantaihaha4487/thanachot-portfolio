import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const imageData = await readFile(
    join(process.cwd(), "public", "hero-background.png"),
  );
  const imageSrc = `data:image/png;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#000",
        }}
      >
        <img
          src={imageSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2))",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 80px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 16,
            }}
          >
            Developer · Creator · Builder
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1 }}>
            Thanachot Phomthong
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              marginTop: 20,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            tantaihaha4487
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
