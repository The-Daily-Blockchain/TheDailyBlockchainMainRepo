import Link from "next/link";

async function getSomeData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    data: "some data",
  };
}

export default async function Home() {
  const data = await getSomeData();
  return <div></div>;
}
