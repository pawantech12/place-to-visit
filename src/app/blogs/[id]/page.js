export async function generateMetadata({ params }) {
  const { id } = params; // ✅ Get id from params
  try {
    const res = await fetch(
      `https://api.placestovisitindia.com/api/blogs/${id}`
    );
    const data = await res.json();
    // ✅ Remove HTML tags from description
    const plainTextDescription = data?.data?.description
      ? stripHtmlTags(data.data.description)
      : "Explore amazing blogs about travel and tourism in India.";

    return {
      title: data?.data?.title,
      description:
        plainTextDescription ||
        "Explore amazing blogs about travel and tourism in India.",
      openGraph: {
        title: data?.data?.title,
        description:
          plainTextDescription ||
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
const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
};

import BlogDetails from "@/components/BlogDetails";
// import { useParams } from "next/navigation";
import React from "react";

const BlogDetailsPage = ({ params }) => {
  const { id } = params;
  return <BlogDetails id={id} />;
};

export default BlogDetailsPage;
