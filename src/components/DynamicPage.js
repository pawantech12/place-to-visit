"use client";
import { useEffect, useState } from "react";
import { getSlugType } from "@/utils/getSlugType"; // Import the slug checker
import BaseCamp from "@/components/BaseCamp";
import TripPlanner from "@/components/TripPlanner";

const DynamicPage = ({ id }) => {
  const [slugType, setSlugType] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchSlugType = async () => {
      const type = await getSlugType(id);
      setSlugType(type);
    };

    fetchSlugType();
  }, [id]);
  console.log(slugType);

  useEffect(() => {
    const handleBackButton = () => {
      setUser(true);
    };

    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  if (!id) {
    return <div className="text-center py-10">Invalid URL parameter.</div>;
  }

  if (slugType === "post") {
    return <BaseCamp id={id} />;
  } else if (slugType === "base_category") {
    return <TripPlanner id={id} />;
  } else {
    return (
      <div className="text-center py-10">No component found for this slug.</div>
    );
  }
};

export default DynamicPage;
