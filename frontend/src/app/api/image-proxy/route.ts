import { NextRequest, NextResponse } from "next/server";

// This proxy fetches backend images server-side, bypassing CORS for html-to-image canvas generation.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  // Only allow images from our known backend domain
  const backendBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api").replace("/api", "");
  if (!imageUrl.startsWith(backendBase) && !imageUrl.startsWith("http://127.0.0.1") && !imageUrl.startsWith("http://localhost")) {
    return NextResponse.json({ error: "Forbidden: invalid image origin" }, { status: 403 });
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        "User-Agent": "UPHA-Frontend/1.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("Image proxy error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
