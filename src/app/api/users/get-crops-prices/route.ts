// app/api/get-crop-prices/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import type { AgriPriceItem } from "@/types/agriPrice";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop");
  const state = searchParams.get("state");
  const district = searchParams.get("district");

  if (!crop || !state || !district) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  try {
    const url = `https://agmarknet.gov.in/PriceAndArrivals/CommodityDailyStateWise.aspx?Tx_State=${state}&Tx_Commodity=${encodeURIComponent(crop)}`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const rows = $("table#DataGrid1 tbody tr");
    if (!rows.length) {
      return NextResponse.json({ message: "No data", stale: true }, { status: 404 });
    }

    const prices: AgriPriceItem[] = [];
    rows.each((_, row) => {
      const cols = $(row).find("td");
      prices.push({
        date: $(cols[0]).text().trim(),
        mandi: $(cols[1]).text().trim(),
        minPrice: $(cols[4]).text().trim(),
        maxPrice: $(cols[5]).text().trim(),
        modalPrice: $(cols[6]).text().trim(),
      });
    });

    return NextResponse.json({ crop, state, district, prices, updated: true });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
