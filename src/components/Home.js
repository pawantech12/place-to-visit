"use client";

import React, { useState, useEffect } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";

import Image from "next/image";
import { customData } from "@/utils/utils";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Home = () => {
  const [Catgory, setCatgory] = useState([]);
  const [SubCatgory, setSubCatgory] = useState([]);
  const [Video, setVideo] = useState({});
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [activeTab, setActiveTab] = useState("affordable");
  const [packages, setPackages] = useState([]);
  const [SubCatgoryId, setSubCatgoryId] = useState("");
  const [PackagesName, setPackagesName] = useState("");
  const router = useRouter(); // Initialize the router
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
  const [loader, setLoader] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
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

  const get_Api1 = async () => {
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.placestovisitindia.com/api/gethomeboking`,
        requestOptions
      );
      const result = await response.json();
      setCatgory(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const get_ApiSunCat = async (id) => {
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.placestovisitindia.com/api/getsubcategybycategory?booking_category_id=${id}`,
        requestOptions
      );
      const result = await response.json();
      setSubCatgory(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const get_ApiFor_Package = async (id, type = 1) => {
    setPackages([]);
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.placestovisitindia.com/api/getpackagebyid?sub_category_id=${id}&type=${type}`,
        requestOptions
      );
      const result = await response.json();
      setPackages(result?.data);
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
      await get_Api1();
    };
    fetchData();
  }, []);

  // fetchLatestVideo();

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    width: "100%",
    height: "auto",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
  };

  const divStyle1 = {
    backgroundImage: `url(${backgroundImage1})`,
    width: "100%",
    height: "auto",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
  };

  const divStyle3 = {
    backgroundImage: `url(${left})`,
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
  };

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

  const [selectedImage, setSelectedImage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleImageClick123 = (imgPath) => {
    setSelectedImage(imgPath);
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 2000); // Hide overlay after 3 seconds
  };

  const settings1 = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    dotsClass: "slick-dots",
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loader) {
    return <Loader loader={loader} />;
  }

  return (
    <>
      <div className="w-full pt-14">
        <div className="flex flex-col items-center">
          <div className="w-full  pt-5">
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
                      {res?.image_type === "header" ? (
                        <div>
                          <Image
                            src={res?.img_path}
                            alt="img"
                            width={500}
                            height={500}
                            quality={80} // Reduce size without loss of quality
                            priority
                            className="w-full h-full object-cover"
                          />
                          {Data.post_title && (
                            <h4
                              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/50 text-black text-[28px] w-[85%] rounded-md  px-4 py-2 font-medium !backdrop-blur-sm"
                              style={{
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",

                                textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                              }}
                            >
                              {Data?.post_title} <br />
                            </h4>
                          )}
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

      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4">
            {Catgory?.map((res, index) => {
              return (
                <div key={index} className="shrink-0">
                  <div className="w-40 md:w-48 lg:w-52">
                    <div
                      className="relative w-full h-[25vh] bg-cover bg-no-repeat rounded-lg cursor-pointer flex justify-center items-center overflow-hidden"
                      style={{
                        backgroundImage: `url(${res?.category_images})`,
                      }}
                      onClick={() => {
                        res?.packages_count > 0 && setShow(true);
                        get_ApiSunCat(res?.id);
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white text-center text-lg font-semibold">
                          {res?.packages_count} {res?.packages_count > 0 && "+"}
                          <br /> Packages
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-gray-800 font-medium">{res?.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {show1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal Container */}
          <div className="bg-[#EDE9F6] border border-black rounded-lg w-[90%] max-w-6xl p-4 shadow-lg">
            {/* Tabs */}
            <div className="flex">
              <div
                className={`w-1/2 flex items-center justify-center py-3 rounded-t-xl cursor-pointer ${
                  activeTab === "affordable" ? "bg-[#DBECF1]" : "bg-gray-200"
                }`}
                onClick={() => {
                  get_ApiFor_Package(SubCatgoryId, 1);
                  setActiveTab("affordable");
                }}
              >
                <h5 className="mt-1">Affordable Packages: {PackagesName}</h5>
              </div>

              <div
                className={`w-1/2 flex items-center justify-center py-3 rounded-t-xl cursor-pointer ${
                  activeTab === "luxury" ? "bg-[#EBF1DB]" : "bg-gray-200"
                }`}
                onClick={() => {
                  get_ApiFor_Package(SubCatgoryId, 2);
                  setActiveTab("luxury");
                }}
              >
                <h5 className="mt-1">Luxury Packages: {PackagesName}</h5>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="p-2 border">Sr. No.</th>
                    <th className="p-2 border">Time</th>
                    <th className="p-2 border">Travel Medium</th>
                    <th className="p-2 border">Stay</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Itinerary</th>
                    <th className="p-2 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, index) => (
                    <tr
                      key={pkg.id}
                      className={`${
                        activeTab === "affordable"
                          ? "bg-[#DBECF1]"
                          : "bg-[#EBF1DB]"
                      }`}
                    >
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{pkg.time}</td>
                      <td className="p-2 border">{pkg.travel_medium}</td>
                      <td className="p-2 border">{pkg.stay}</td>
                      <td className="p-2 border">{pkg.price}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => {
                            const fileExtension = pkg?.itinerary
                              ?.split(".")
                              .pop()
                              .toLowerCase();
                            if (["png", "jpg", "pdf"].includes(fileExtension)) {
                              window.open(pkg.itinerary, "_blank");
                            } else {
                              alert("Unsupported file format");
                            }
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          See Details
                        </button>
                      </td>
                      <td className="p-2 border">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => {
                            router.push(`/BookKnow/${pkg?.id}`);
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

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShow1(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal Container */}
          <div className="bg-blue-200/70 border border-black rounded-lg w-[90%] max-w-4xl p-4 shadow-lg">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShow(false)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>

            {/* Slider */}
            <Slider {...settings1}>
              {SubCatgory?.map((res, index) => (
                <div
                  key={index}
                  className="relative h-[280px] m-2 cursor-pointer rounded-lg overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${res?.image_categories})` }}
                  onClick={() => {
                    setShow(false);
                    setShow1(true);
                    setSubCatgoryId(res?.id);
                    setPackagesName(res?.name);
                    get_ApiFor_Package(res?.id, 1);
                  }}
                >
                  <p className="absolute bottom-8 left-0 right-0 text-center bg-black/50 text-white py-1">
                    {res?.name}
                  </p>
                  <p className="absolute bottom-2 left-0 right-0 text-center bg-black/50 text-white py-1">
                    {res?.packages_count} Tour Packages
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <section>
        <div className="mx-auto mt-1 py-5 px-20 max-md:px-5">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="flex max-sm:flex-col items-center justify-center gap-3">
                <div className=" flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <h2
                    className="text-2xl md:text-[1.9rem] font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    {Data?.upper_title}
                  </h2>
                </div>

                <div className="flex w-1/4 max-sm:w-full  mb-3 border-4 border-green-500 h-0"></div>
              </div>

              <p
                className="text-[21px] text-zinc-700 leading-[38px] tracking-wide mt-4 text-justify"
                style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
              >
                {Data?.upper_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-20 pt-5 max-md:px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {basicCategories?.map((res, index) => (
              <div key={index}>
                <Link
                  href={`/${res.slug}`}
                  className="block rounded-lg overflow-hidden relative cursor-pointer no-underline group"
                >
                  <div className="relative ">
                    <Image
                      src={res.topimages[0]?.img_path}
                      alt="img"
                      width={400}
                      height={400}
                      quality={80} // Reduce size without loss of quality
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-end justify-center bg-black/40 text-white font-bold text-xl sm:text-2xl text-center transition-colors duration-300 ease-in-out hover:text-yellow-400 ">
                      <div className="mt-[-30px] h-1/5 group-hover:-translate-y-2 transition-all ease-in-out duration-200">
                        {res?.name}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5">
        <div className="w-4/5 max-md:w-full mx-auto py-5">
          <div className="">
            <div className="flex max-sm:flex-col gap-3 items-center justify-center">
              <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

              <div className="w-full md:w-1/2 flex items-center justify-center">
                <h2
                  className="text-2xl md:text-[1.9rem] font-medium text-gray-800 pooja"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                    textTransform: "capitalize",
                  }}
                >
                  {Data?.middle_title}
                </h2>
              </div>

              <div className="flex w-1/4 max-sm:w-full  mb-3 border-4 border-green-500 h-0"></div>
            </div>

            <div className="flex gap-8 items-center mt-5 max-md:flex-col">
              <div className="lg:w-5/12 md:w-5/12 w-full mt-5">
                <div
                  to={`/blogs/${blogs[count]?.slug}`}
                  className=""
                  style={divStyle}
                >
                  <h2
                    className="pb-4 pt-[70%] rounded-lg text-center text-white cursor-pointer shadow-md text-2xl"
                    style={{
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "yellow"; // Change to desired hover color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    {blogs[count]?.name}
                  </h2>
                </div>
              </div>

              <div className="w-full md:w-7/12 mt-5 flex flex-col gap-2">
                {blogs?.map((res) => {
                  return (
                    <h5
                      key={res.id}
                      onClick={() => router.push(`/blogs/${res.slug}`)}
                      className="text-[25px] max-md:text-xl text-black leading-[38px] font-semibold cursor-pointer truncate hover:bg-gray-200 py-1 px-3 rounded-md hover:ml-2 transition-all ease-in-out duration-200"
                    >
                      {res.name}
                    </h5>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5">
        <div className="w-4/5 max-md:w-full mx-auto py-5 mb-2">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="flex max-sm:flex-col gap-3 items-center justify-center">
                {/* Left Orange Border */}
                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                {/* Center Title */}
                <div className="w-full md:w-6/12 flex justify-center items-center">
                  <h2
                    className="text-2xl md:text-[1.9rem] font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    {Data?.about_ptvi_title}
                  </h2>
                </div>

                {/* Right Green Border */}
                <div className="flex w-1/4 max-sm:w-full mb-3 border-4 border-green-500 h-0"></div>
              </div>

              {/* Description Section */}
              <div
                dangerouslySetInnerHTML={{ __html: Data?.about_ptvi_desc }}
                className="text-[21px] text-zinc-700 text-justify leading-8 mt-5"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" py-5 px-5">
        <div className="w-4/5 max-md:w-full mx-auto ">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="flex max-sm:flex-col gap-3 items-center justify-center">
                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                <div className="w-full md:w-6/12 flex justify-center items-center">
                  <h2
                    className="text-2xl md:text-3xl font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    A Small Mirror to Real Bharat
                  </h2>
                </div>

                <div className="flex w-1/4 max-sm:w-full mb-3 border-4 border-green-500 h-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 px-5">
        <div className="w-4/5 max-md:w-full mx-auto my-5 overflow-auto">
          <div className="flex overflow-x-auto max-md:w-[800px] space-x-4">
            {smallMirrors?.map((res, index) => (
              <div
                key={index}
                className="w-1/6 sm:w-1/2 md:w-1/3 lg:w-1/6 mt-3 cursor-pointer"
                onClick={() => handleImageClick123(res?.topimages[0]?.img_path)}
              >
                <div className="flex justify-center">
                  <Image
                    src={res?.topimages[0]?.img_path}
                    width={50}
                    height={50}
                    quality={80} // Reduce size without loss of quality
                    alt="image"
                    className="w-[45%]"
                  />
                </div>
                <h5
                  className="text-center text-xl mt-3 font-bold"
                  style={{
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {res?.name}
                </h5>
              </div>
            ))}

            {showOverlay && selectedImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="text-center text-white">
                  <Image
                    src={selectedImage}
                    width={100}
                    height={100}
                    quality={80} // Reduce size without loss of quality
                    alt="Selected"
                    className="w-1/2 mb-5"
                  />
                  <h2>Coming Soon</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-5 px-5">
        <div className="w-4/5 max-md:w-full mx-auto ">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="flex max-sm:flex-col gap-3 items-center justify-center">
                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                <div className="w-full md:w-6/12 flex justify-center items-center">
                  <h2
                    className="text-2xl md:text-3xl font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    {trendingCategory?.name}
                  </h2>
                </div>

                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-green-500 h-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5">
        <div className="w-4/5 max-md:w-full mx-auto py-5 ">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side - Large Post */}
            <div className="w-full md:w-1/2">
              <div
                onClick={() => {
                  router.push(`/${trendingCategory?.posts[Count1]?.post_slug}`);
                }}
                className="mt-2 relative flex items-center justify-center rounded-lg"
                style={divStyle1}
              >
                <h2
                  className="pb-4 pt-[70%] w-full text-center text-white text-2xl font-bold cursor-pointer transition-colors duration-300"
                  style={{
                    borderRadius: "8px",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "yellow"; // Hover color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                >
                  {trendingCategory?.posts[Count1]?.post_name}
                </h2>
              </div>
            </div>

            {/* Right Side - Small Posts */}
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-3 gap-7">
                {trendingCategory?.posts?.map((res, index) => {
                  return (
                    <div key={index} className="w-full">
                      <button
                        onClick={() => {
                          router.push(`/${res.post_slug}`);
                        }}
                        className="flex items-center justify-center p-4  cursor-pointer border border-gray-300 rounded-lg bg-gray-200/50 shadow-md transition-all duration-300 w-full
                    hover:scale-105 hover:shadow-lg"
                      >
                        <h6
                          className="text-center text-base font-semibold line-clamp-2 leading-tight"
                          style={{
                            maxHeight: "2.4em", // Keeps height limited to 2 lines
                          }}
                        >
                          {res?.post_name}
                        </h6>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 px-5">
        <div className="w-4/5 max-md:w-full mx-auto">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="flex max-sm:flex-col gap-3 items-center justify-center">
                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                <div className="w-full md:w-6/12 flex justify-center items-center">
                  <h2
                    className="text-2xl md:text-3xl font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    Comprehensive Queries
                  </h2>
                </div>

                <div className="flex w-1/4 max-sm:w-full border-4 border-green-500 h-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5">
        <div className="w-4/5 max-md:w-full mx-auto py-5 ">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Left Section - Accordion */}
            <div className="md:w-7/12 w-full">
              <div className="space-y-2">
                {Data?.homequestion_keys?.map((res, index) => {
                  return (
                    <div
                      key={index}
                      className="border-2 my-2 rounded-lg bg-transparent cursor-pointer px-2"
                    >
                      <div
                        className="flex items-center gap-5 p-3"
                        onClick={() => toggleAccordion(index)}
                      >
                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                        <h2 className="ml-4 text-lg font-medium text-zinc-800">
                          {res?.name}
                        </h2>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openIndex === index
                            ? "max-h-[1000px] opacity-100 p-3"
                            : "max-h-0 opacity-0 p-0"
                        }`}
                      >
                        <div dangerouslySetInnerHTML={{ __html: res?.value }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Section - Clickable Image */}
            <div className="md:w-5/12 w-full">
              <div
                onClick={() => {
                  router.push(`/${RightTextSlug}`);
                }}
                className="relative rounded-lg overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat h-full"
                style={{ backgroundImage: `url(${Right})` }}
              >
                <h2
                  className="absolute inset-0 flex items-center justify-center text-white text-center text-xl font-semibold rounded-lg bg-black bg-opacity-40 transition-all duration-300 "
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "yellow"; // Change to desired hover color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                >
                  <span className="absolute bottom-6 text-2xl">
                    {RightText}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-5 px-5">
        <div className="w-4/5 max-md:w-full mx-auto">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="flex flex-col gap-3 sm:flex-row items-center justify-center">
                <div className="flex w-1/4 max-sm:w-full mt-3 border-4 border-[#FFA500] h-0"></div>

                <div className="w-full md:w-6/12 flex justify-center items-center">
                  <h2
                    className="text-2xl md:text-3xl font-medium text-gray-800 pooja"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      textTransform: "capitalize",
                    }}
                  >
                    Travel Virtually with Us
                  </h2>
                </div>

                <div className="flex w-1/4 max-sm:w-full border-4 border-green-500 h-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-4/5 max-md:w-full mx-auto py-5 px-5">
          <div className="flex max-sm:flex-col gap-5">
            {/* Left Section - Clickable Image */}
            <div className="md:w-5/12 w-full ">
              <div
                onClick={() => router.push(`/${leftTextSlug}`)}
                className="relative rounded-lg overflow-hidden cursor-pointer"
              >
                <Image
                  src={left}
                  alt="image"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-lg"
                />
                <h2 className="absolute inset-0 flex items-center justify-center text-white text-center text-xl font-semibold rounded-lg bg-black bg-opacity-40 transition-all duration-300 hover:text-yellow-400">
                  <span className="absolute bottom-6 text-2xl">{leftText}</span>
                </h2>
              </div>
            </div>

            {/* Right Section - Embedded YouTube Video */}
            <div className="md:w-7/12 w-full">
              <Link
                href={`https://www.youtube.com/watch?v=${Video?.id?.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full max-sm:h-[300px]"
              >
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${Video?.id?.videoId}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ display: "none" }}>
        {customData?.map((res, index) => {
          return <Link key={index} href={`/${res.url}`}></Link>;
        })}
      </section>
    </>
  );
};

export default Home;
