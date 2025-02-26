"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Booking = () => {
  // const { id } = useParams();

  const [Video, setVideo] = useState({});
  const [show, setShow] = useState(false);

  const router = useRouter();
  const [Data, setData] = useState();
  const [basicCategories, setbasicCategories] = useState([]);
  const [blogs, setblogs] = useState([]);
  const [smallMirrors, setsmallMirrors] = useState([]);
  const [trendingCategory, settrendingCategory] = useState();
  const [count, setcount] = useState(0);
  const [Count1, setCount1] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundImage1, setBackgroundImage1] = useState("");
  const [Right, setRight] = useState("");
  const [left, setleft] = useState("");
  const [RightText, setRightText] = useState("");
  const [leftText, setleftText] = useState("");
  const [RightTextSlug, setRightTextSlug] = useState("");
  const [leftTextSlug, setleftTextSlug] = useState("");
  // console.log(backgroundImage,count, "background");
  const [loader, setLoader] = useState(false);
  const handleImageClick = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  const handleImageClick1 = (imageUrl) => {
    setBackgroundImage1(imageUrl);
  };

  const get_Api = async () => {
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.placestovisitindia.com/api/getHomeSettings/${1}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      window.scrollTo(0, 0);
      setData(result?.homeSetting);
      setbasicCategories(result?.basicCategories);
      setblogs(result?.blogs);
      setsmallMirrors(result?.smallMirrors);
      settrendingCategory(result?.trendingCategory);
      const random = Math.floor(Math.random() * result?.blogs?.length);
      const random1 = Math.floor(
        Math.random() * result?.trendingCategory?.posts?.length
      );
      console.log(random, random1, "============>random");
      handleImageClick(result?.blogs[random]?.images[0]?.img_path);
      handleImageClick1(
        result?.trendingCategory?.posts[random1]?.images[0]?.img_path
      );
      setcount(random);
      setCount1(random1);
      setRight(result?.post_right[0]?.images[0]?.img_path);
      setleft(result?.post_left[0]?.images[0]?.img_path);
      setRightText(result?.post_right[0]?.post_title);
      setleftText(result?.post_left[0]?.post_title);
      setRightText(result?.post_right[0]?.post_title);
      setleftText(result?.post_left[0]?.post_title);
      setRightTextSlug(result?.post_right[0]?.post_slug);
      setleftTextSlug(result?.post_left[0]?.post_slug);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setcount(parseInt(await localStorage.getItem("data"))); // Parse count as integer
      await get_Api();
    };
    fetchData();
    // fetchLatestVideo();
  }, []);

  const renderCustomIndicator = (clickHandler, isSelected, index, label) => {
    const indicatorStyle = {
      width: "20px",
      height: "20px",
      margin: "0 5px",
      background: isSelected ? "#fff" : "#888", // Change the background color based on selection
      borderRadius: "10%",
      cursor: "pointer",
      display: "inline-block",
    };

    return (
      <li
        key={index}
        style={indicatorStyle}
        onClick={clickHandler}
        role="button"
        tabIndex={0}
        title={`${label} ${index + 1}`}
      />
    );
  };

  const packages = [
    {
      id: 1,
      time: "2N - 2D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹3999",
    },
    {
      id: 2,
      time: "2N - 3D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹4999",
    },
    {
      id: 3,
      time: "3N - 3D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹5999",
    },
    {
      id: 4,
      time: "3N - 4D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹6999",
    },
    {
      id: 5,
      time: "4N - 4D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹7999",
    },
    {
      id: 6,
      time: "4N - 5D",
      travel: "Train, Bus, Private Cab",
      stay: "Good rated hotels & Home stays",
      price: "₹9999",
    },
  ];

  if (loader) {
    return <Loader loader={loader} />;
  }

  return (
    <>
      <div className="w-full mt-12">
        <div className="flex justify-center">
          <div className="w-full mt-5 pt-3">
            {Data?.images?.length > 0 && (
              <Carousel
                autoPlay
                infiniteLoop
                interval={3000}
                showThumbs={false}
                showIndicators={true}
                renderIndicator={renderCustomIndicator}
              >
                {Data?.images?.map((res, index) => {
                  return (
                    <div key={index}>
                      {res?.image_type == "header" ? (
                        <div>
                          <Image
                            src={res.img_path}
                            alt="img"
                            width={1000}
                            height={500}
                            className="w-full h-full"
                          />
                          <h1 className="legend bg-transparent text-2xl">
                            {Data?.post_title} <br />
                          </h1>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>
      </div>

      <section className="py-12 bg-[#DBECF1]">
        <div className="container mx-auto px-4 w-4/5 max-md:w-11/12 max-md:px-0">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            Affordable Packages: Kashmir
          </h4>
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-[800px] lg:w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-transparent text-neutral-800">
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Sr. No.
                  </th>
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Travel Medium
                  </th>
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Stay
                  </th>
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left border-y border-l border-gray-300">
                    Itinerary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-200">
                {packages.map((pkg, index) => (
                  <tr key={pkg.id}>
                    <td className="px-4 py-3 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {pkg.time}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {pkg.travel}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {pkg.stay}
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600 border border-gray-300">
                      {pkg.price}
                    </td>
                    <td className="px-4 py-3 flex space-x-2  border-b border-gray-300">
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md shadow-sm hover:bg-gray-300 transition">
                        See Details
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-600 transition"
                        onClick={() => {
                          router.push(`/booking/${pkg.id}`);
                        }}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
