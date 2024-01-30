"use client";
import React from "react";
interface Props {
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export default function CommonPage({
  title,
  content,
  image,
  author,
  date,
}: Props) {
  return (
    <>
      <div>
        <div>{title}</div>
        <div>{author}</div>
        <div>{date}</div>
        <div>{content}</div>
      </div>
    </>
  );
}
