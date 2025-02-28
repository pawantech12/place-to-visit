"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "./Loader";

const BlogDetails = ({ id }) => {
  const router = useRouter();
  const [recentTranding, setRecentTranding] = useState([]);
  const [Data, setData] = useState();
  const [recentPost, setRecentPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Get_blogs();
  }, []);

  const Get_blogs = () => {
    setLoading(true);
    fetch(`https://api.placestovisitindia.com/api/blogs/${id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result?.data);
        setRecentPost(result?.recent_post);
        setRecentTranding(result?.trending_stories?.posts);
      })
      .catch((error) => console.error(error));
    setLoading(false);
  };

  function extractParagraphs(htmlContent) {
    const paragraphRegex = /<p>(.*?)<\/p>/g;
    const paragraphs = [];
    let match;

    while ((match = paragraphRegex.exec(htmlContent)) !== null) {
      paragraphs.push(match[1]);
    }

    return paragraphs;
  }

  function getFirstParagraph(htmlContent) {
    const paragraphs = extractParagraphs(htmlContent);
    return paragraphs[0] || "";
  }

  if (loading) {
    return <Loader loader={loading} />;
  }

  return (
    <>
      {/* Background Image Section */}
      <div className="container-fluid mt-16">
        <div className="flex justify-center items-center">
          <div
            className="w-full bg-cover bg-center min-h-[300px] flex items-center justify-center relative text-white"
            style={{
              backgroundImage: `url(${Data?.images?.[0]?.img_path || ""})`,
            }}
          >
            <h1 className="absolute bottom-5 text-white text-4xl font-semibold text-center max-md:text-2xl">
              {Data?.title}
            </h1>
          </div>
        </div>
      </div>

      <section>
        <div className=" my-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-4/5 mx-auto max-md:w-11/12">
            {/* Left Section */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <h3 className="text-3xl font-semibold max-md:text-2xl">
                {Data?.title}
              </h3>
              <span
                className="text-gray-600 text-xl font-normal "
                dangerouslySetInnerHTML={{ __html: Data?.description }}
              />

              {Data?.posts?.map((res, index) => (
                <div key={index} className="mt-5 flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">{res.post_title}</h3>
                  <p className="text-gray-500 text-xl font-medium">
                    {getFirstParagraph(res.post_up_fst_desc)}
                  </p>

                  {/* Post Image & Read More */}
                  <div className="my-3">
                    <Image
                      src={res?.images?.[0]?.img_path}
                      alt="image"
                      width={600}
                      height={400}
                      className="w-full rounded-lg"
                    />
                    <h5 className="mt-3 text-neutral-800 text-xl font-medium  cursor-pointer">
                      Read More:
                      <span
                        onClick={() =>
                          res?.status === 1 && router.push(`/${res.post_slug}`)
                        }
                        className="underline text-blue-600"
                      >
                        {res?.post_slug} travel guide
                      </span>
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="md:col-span-1">
              {/* Recent Posts */}
              <div className="bg-gray-300 rounded-lg shadow-md border">
                <h5 className="text-center font-semibold text-neutral-800 text-xl py-4">
                  Recent Posts
                </h5>
                <div className="bg-gray-200 p-5">
                  {recentPost?.map((res, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-gray-500 py-3 cursor-pointer"
                      onClick={() => router.push(`/${res.post_slug}`)}
                    >
                      <Image
                        src={res?.images?.[0]?.img_path}
                        alt="image"
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <span className="ml-3 text-gray-500 text-base font-medium">
                        {res?.post_title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Stories */}
              <div className="bg-gray-300 rounded-lg shadow-md border mt-4">
                <h5 className="text-center font-bold p-4">Trending Stories</h5>
                <div className="bg-gray-200 p-5">
                  {recentTranding?.map((res, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-gray-600 py-2"
                    >
                      <Image
                        src={res?.images?.[0]?.img_path}
                        alt="image"
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {res?.post_title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
