import axios from "axios";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const multiFetcher = async (urls: string[]) => {
  const responses = await Promise.all(
    urls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    })
  );

  const mergedData = responses.reduce((acc, response, index) => {
    const match = urls[index].match(/symbol=([^&]*)/);
    if (match) {
      const symbol = match[1].toLocaleLowerCase();
      acc[symbol] = response;
    }
    return acc;
  }, {});
  return mergedData;
};
