export async function generateMetadata({ params }) {
  if (!params) return {}; // Ensure params is available

  const { slug } = params;
  try {
    const res = await fetch(
      `https://api.placestovisitindia.com/api/getPost/${slug}`
    );
    const data = await res.json();

    return {
      title: data?.data?.meta_title,
      description:
        data?.data?.meta_description ||
        "Explore amazing blogs about travel and tourism in India.",
      openGraph: {
        title: data?.data?.meta_title,
        description:
          data?.data?.meta_description ||
          "Explore amazing blogs about travel and tourism in India.",
      },
    };
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
  const { slug } = params;
  return <DynamicPage id={slug} />;
};

export default page;
