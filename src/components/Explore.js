"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "./Loader";

const Explore = () => {
  const [Data, setData] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Get_blogs();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace === -1
      ? truncated
      : truncated.substr(0, lastSpace) + "...";
  };

  const Get_blogs = () => {
    setLoading(true);
    fetch("https://api.placestovisitindia.com/api/blogs")
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "blogs");
        setData(result);
      })
      .catch((error) => console.error(error));
    setLoading(false);
  };

  function removeHtmlTags(html) {
    return html.replace(/<[^>]*>/g, "");
  }

  if (loading) {
    return <Loader loader={loading} />;
  }

  return (
    <div>
      {/* Background Image Section */}
      <div className="container-fluid mt-16">
        <div className="flex justify-center items-center">
          <div className="relative w-full">
            <Image
              src={Data?.parent_blogs?.images[0]?.img_path}
              alt="image"
              width={1000}
              height={400}
              className="w-full h-full object-cover"
            />
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold max-md:text-2xl w-full text-center">
              {Data?.parent_blogs?.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto max-sm:w-11/12">
          {Data?.blogs?.map((res, index) => (
            <div key={index} className="mt-4">
              <div
                className="bg-white border shadow-md rounded-lg cursor-pointer transition hover:shadow-xl"
                onClick={() => router.push(`/blogs/${res.slug}`)}
              >
                {/* Blog Image */}
                <div className="relative w-full h-60">
                  <Image
                    src={res?.images[0]?.img_path}
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2">{res?.title}</h5>
                  <p className="text-gray-600">
                    {removeHtmlTags(truncateText(res.description, 120))}
                  </p>
                  <span
                    className="text-blue-600 font-semibold cursor-pointer inline-block mt-3"
                    onClick={() => router.push(`/blogs/${res.slug}`)}
                  >
                    Read More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
