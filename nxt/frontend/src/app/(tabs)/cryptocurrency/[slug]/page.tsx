"use client";
import React from "react";
import CryptoPage from "../cryptopage";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <CryptoPage params={params.slug} />
    </div>
  );
}
