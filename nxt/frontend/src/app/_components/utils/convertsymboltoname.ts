const symbolToNameMap: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  DOGE: "Dogecoin",
  SOL: "Solana",
  XRP: "Ripple",
  BNB: "Binance Coin",
  MATIC: "Polygon",
  ADA: "Cardano",
  DOT: "Polkadot",
  AVAX: "Avalanche",
  LTC: "Litecoin",
  LINK: "Chainlink",
  UNI: "Uniswap",
  TRX: "TRON",
};

export const convertSymbolToName = (symbol: string) => {
  const name = symbolToNameMap[symbol];
  const imageUrl = `https://res.cloudinary.com/dkijmsxo5/image/upload/v1709742430/images/${symbol}.webp`;
  return { name, imageUrl };
};
