"use server";

export async function getUserLocation(): Promise<{
  city: string;
  country: string;
  data?: string;
}> {
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch location");
    const data = await res.json();
    return {
      data,
      city: data.city || "Tehran",
      country: data.country || "",
    };
  } catch (error) {
    console.error(error);
    return { city: "", country: "" };
  }
}
