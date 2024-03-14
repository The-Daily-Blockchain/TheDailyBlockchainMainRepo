import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  const params = { symbol };

  //   ${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/`, {
    params,
  });
  const data = response.data;
  return Response.json(data);
}
//need help not working brain
