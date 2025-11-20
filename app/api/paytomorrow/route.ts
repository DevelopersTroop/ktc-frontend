// app/paytomorrow/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  //id="1.0:0128c75b90dbc7001939a05ed64b00bb"
  const html = `
    <div id="pt-finance-page">&nbsp;</div>
    <script
      type="text/javascript"
      src="https://cdn.paytomorrow.com/js/financing-page/staging-paytomorrow-finance-page.js"
    ></script>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self';",
    },
  });
}
