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
  TRX: "Tron",
};
const versionMap: Record<string, string> = {
  BTC: "v1709742430",
  ETH: "v1709742430",
  DOGE: "v1709742431",
  SOL: "v1709742430",
  XRP: "v1709742432",
  BNB: "v1709742433",
  MATIC: "v1709742434",
  ADA: "v1709742431",
  DOT: "v1709742433",
  AVAX: "v1709742432",
  LTC: "v1709742430",
  LINK: "v1709742435",
  UNI: "v1709749749",
  TRX: "v1709742434",
};

const defaultVersion = "v1709742430";
const CACHE_KEY_PREFIX = "symbol_cache_";

export const convertSymbolToName = (symbol: string) => {
  if (!symbol) {
    return { name: "", imageUrl: "" };
  }

  const cacheKey = `${CACHE_KEY_PREFIX}${symbol}`;
  try {
    const cachedImageUrl = localStorage.getItem(cacheKey);
    if (cachedImageUrl) {
      const EXPIRATION_TIME_MS = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

      if (cachedImageUrl) {
        try {
          const { timestamp, imageUrl } = JSON.parse(cachedImageUrl);
          const currentTime = new Date().getTime();

          if (currentTime - timestamp < EXPIRATION_TIME_MS) {
            return { name: symbolToNameMap[symbol], imageUrl };
          }
          localStorage.removeItem(cacheKey);
        } catch (error) {
          console.error("Error parsing cached data:", error);
          localStorage.removeItem(cacheKey);
        }
      }
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  const version = versionMap[symbol] || defaultVersion;
  const imageUrl = `https://res.cloudinary.com/dkijmsxo5/image/upload/${version}/images/${symbol}.webp`;

  const newData = { timestamp: new Date().getTime(), imageUrl };
  localStorage.setItem(cacheKey, JSON.stringify(newData));

  return { name: symbolToNameMap[symbol], imageUrl };
};
