export async function generateMetadata({ params }) {
  if (!params) return {}; // Ensure params is available

  const { id } = params;
  try {
    const res = await fetch(
      `https://api.placestovisitindia.com/api/getPost/${id}`
    );
    const data = await res.json();

    if (data?.data?.meta_title && data?.data?.meta_description) {
      return {
        title: data?.data?.meta_title || "Blogs - places to visit india",
        description:
          data?.data?.meta_description ||
          "Explore amazing blogs about travel and tourism in India.",
        openGraph: {
          title: data?.data?.meta_title || "Blogs - Places to Visit India",
          description:
            data?.data?.meta_description ||
            "Explore amazing blogs about travel and tourism in India.",
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Blogs - Places To Visit India",
      description: "Explore amazing blogs about travel and tourism in India.",
    };
  }
}

import DynamicPage from "@/components/DynamicPage";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <DynamicPage id={id} />;
};

export default page;
