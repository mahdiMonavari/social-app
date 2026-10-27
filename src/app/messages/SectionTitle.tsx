"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

function SectionTitle() {
  const searchParams = useSearchParams();
  const container = searchParams.get("container") ?? "Inbox";

  return (
    <div className="text-sky-700 lg:text-2xl font-bold flex items-center justify-between text-xl">
      {container}
    </div>
  );
}

export default SectionTitle;
