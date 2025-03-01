import React, { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

import { GiPeaks } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import Slider from "react-slick";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "./Loader";

const BaseCamp = ({ id }) => {
  const [Data, setData] = useState();
  const [HeaderImages, setHeaderImages] = useState([]);
  const [Top, setTop] = useState();
  const [Top_first, setTop_first] = useState();
  const [top_second, setTop_second] = useState();
  const [Gallery, setGallery] = useState([]);
  const [moreData, setMoreData] = useState();
  const galleryContainerRef = useRef(null);
  const galleryContainerRef1 = useRef(null);
  const galleryContainerRef2 = useRef(null);
  const [colWidth, setColWidth] = useState(0);
  const [numColumns, setNumColumns] = useState(4);
  const [colWidth1, setColWidth1] = useState(0);
  const [numColumns1, setNumColumns1] = useState(4);
  const [colWidth2, setColWidth2] = useState(0);
  const [numColumns2, setNumColumns2] = useState(4);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [ShortImage, setShortImage] = useState();
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [timeInHand, setTimeInHand] = useState("");
  const [tripType, setTripType] = useState("");
  const [tripLocation, setTripLocation] = useState("");
  const [overallBudget, setOverallBudget] = useState("");
  const [travelMedium, setTravelMedium] = useState("");
  const [mobileNumbers, setMobileNumbers] = useState("");
  const [ImageBaseUrl, setImageBaseUrl] = useState("");
  const [Videoss, setVideo] = useState({});

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const router = useRouter();
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const [showFullContent1, setShowFullContent1] = useState(false);

  const toggleContent1 = () => {
    setShowFullContent1(!showFullContent1);
  };

  const handleNumberOfTravelersChange = (event) => {
    setNumberOfTravelers(event.target.value);
  };

  const handleTimeInHandChange = (event) => {
    setTimeInHand(event.target.value);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleTripLocationChange = (event) => {
    setTripLocation(event.target.value);
  };

  const handleOverallBudgetChange = (event) => {
    setOverallBudget(event.target.value);
  };

  const handleTravelMediumChange = (event) => {
    setTravelMedium(event.target.value);
  };

  const handleMobileNumbersChange = (event) => {
    setMobileNumbers(event.target.value);
  };

  const handleFormSubmit = () => {
    // Check if any field is empty
    if (
      !numberOfTravelers ||
      !timeInHand ||
      !tripType ||
      !tripLocation ||
      !overallBudget ||
      !travelMedium ||
      !mobileNumbers
    ) {
      toast.error("All fields are required!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("travellers", numberOfTravelers);
    urlencoded.append("time_hand", timeInHand);
    urlencoded.append("trip_type", tripType);
    urlencoded.append("trip_location", tripLocation);
    urlencoded.append("budget", overallBudget);
    urlencoded.append("travel_medium", travelMedium);
    urlencoded.append("mobile_no", mobileNumbers);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    setLoader(true);

    fetch("https://api.placestovisitindia.com/api/inquiries", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        clearForm();
        toast.success("Form submitted successfully!");
      })
      .catch((error) => console.error(error));

    setLoader(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Gallery?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Gallery?.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Calculate the width of a single col-lg-3 element
    if (galleryContainerRef.current) {
      const col = galleryContainerRef.current.querySelector(".col-lg-3");
      if (col) {
        const width = col.offsetWidth;
        setColWidth(width);
      }
    }
    // Calculate the number of columns for mobile
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setNumColumns(1);
      } else {
        setNumColumns(4);
      }
    };
    handleResize(); // Call once to set initial number of columns
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => window.removeEventListener("resize", handleResize); // Remove event listener on component unmount
  }, [Gallery]);

  useEffect(() => {
    // Calculate the width of a single col-lg-3 element
    if (galleryContainerRef1.current) {
      const col = galleryContainerRef1.current.querySelector(".col-lg-3");
      if (col) {
        const width = col.offsetWidth;
        setColWidth1(width);
      }
    }
    // Calculate the number of columns for mobile
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setNumColumns1(1);
      } else {
        setNumColumns1(4);
      }
    };
    handleResize(); // Call once to set initial number of columns
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => window.removeEventListener("resize", handleResize); // Remove event listener on component unmount
  }, [moreData]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setNumColumns2(1); // Adjust number of columns for mobile view
      } else {
        setNumColumns2(4); // Reset number of columns for desktop view
      }
    };

    const calculateColWidth = () => {
      if (galleryContainerRef2.current) {
        const col = galleryContainerRef2.current.querySelector(".col-lg-3"); // Adjust class selector as per your grid structure
        if (col) {
          const width = col.offsetWidth;
          setColWidth2(width);
        }
      }
    };

    calculateColWidth(); // Initial calculation of column width
    handleResize(); // Initial handle resize call

    window.addEventListener("resize", handleResize); // Event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on component unmount
    };
  }, [moreData?.expolore_more_post]);

  const Get_Api = () => {
    setVideo({});
    setLoader(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://api.placestovisitindia.com/api/getPost/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("post data", result);
        fetchLatestVideo(result?.data?.post_name);
        setData(result.data);
        setMoreData(result);
        const filteredImages = result.data.images?.filter(
          (image) => image.image_type == "header"
        );
        const filteredImages1 = result.data.images?.filter(
          (image) => image.image_type == "top"
        );
        const filteredImages2 = result.data.images?.filter(
          (image) => image.image_type == "top_first"
        );
        const filteredImages3 = result.data.images?.filter(
          (image) => image.image_type == "top_second"
        );
        const filteredImages4 = result.data.images?.filter(
          (image) => image.image_type == "gallery"
        );
        const filteredImages5 = result.data.images?.filter(
          (image) => image.image_type == "short"
        );
        console.log(filteredImages);
        setTop(filteredImages1[0]?.img_path);
        setTop_first(filteredImages2[0]?.img_path);
        setTop_second(filteredImages3[0]?.img_path);
        setGallery(filteredImages4);
        setHeaderImages(filteredImages);
        setShortImage(filteredImages5[0]?.img_path);

        window.scrollTo(0, 0);
        setImageBaseUrl(result?.image_url);
      })
      .catch((error) => console.log("error", error));

    setLoader(false);
  };

  useEffect(() => {
    Get_Api();
  }, []);

  function parseISODuration(duration) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match[1] ? parseInt(match[1].replace("M", "")) : 0;
    const seconds = match[2] ? parseInt(match[2].replace("S", "")) : 0;
    return minutes * 60 + seconds;
  }

  const fetchLatestVideo = async (slug) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBwRnur5TdTAEjuDlAZ_fGCr2onDcPMXEA&channelId=UCwp_HL_VSkt4PmPY8XJWZDw&q=${slug}&part=snippet,id&order=date&maxResults=100&type=video`
    );

    const data = await response.json();

    for (const item of data?.items) {
      const videoId = item.id.videoId;

      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBwRnur5TdTAEjuDlAZ_fGCr2onDcPMXEA&id=${videoId}&part=contentDetails`
      );
      const videoDetailsData = await videoDetailsResponse.json();

      if (videoDetailsData?.items && videoDetailsData?.items?.length > 0) {
        const duration = videoDetailsData?.items[0]?.contentDetails.duration;
        console.log(duration, "duration============>");
        // Parse the ISO 8601 duration to total seconds
        const durationInSeconds = parseISODuration(duration);

        if (durationInSeconds >= 60) {
          // Full-length video
          console.log("Latest full-length video:", item);
          setVideo(item);
          return item;
        }
      }
    }
    console.log("No recent full-length video found.");
    return null;
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
      <>
        <li
          key={index}
          onClick={clickHandler}
          role="button"
          style={indicatorStyle}
          tabIndex={0}
          title={`${label} ${index + 1}`}
        />
      </>
    );
  };

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) return text;
    return text?.substr(0, maxLength) + "...";
  }

  function truncateText1(text, maxLength) {
    if (text?.length <= maxLength) return text;
    return text?.substr(0, maxLength) + "...";
  }

  const clearForm = () => {
    setNumberOfTravelers("");
    setTimeInHand("");
    setTripType("");
    setTripLocation("");
    setOverallBudget("");
    setTravelMedium("");
    setMobileNumbers("");
  };

  const settings = {
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
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      <section>
        <div className="w-full mt-20">
          <div className="w-full">
            {Videoss?.id?.videoId ? (
              <iframe
                className="w-full h-[500px] rounded-[10px] mt-5"
                src={`https://www.youtube.com/embed/${Videoss?.id?.videoId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <Carousel
                autoPlay
                infiniteLoop
                interval={3000}
                showThumbs={false}
                showIndicators={true}
                renderIndicator={renderCustomIndicator}
              >
                {HeaderImages?.map((res, index) => (
                  <div key={index}>
                    <div className="relative">
                      <Image
                        src={res.img_path}
                        alt="img"
                        width={1000}
                        height={1000}
                        className="h-full w-full"
                      />
                      <h1 className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-5/6 text-2xl font-semibold bg-white/50 backdrop-blur-sm text-black opacity-100 p-2 py-3 rounded-lg text-center">
                        {Data?.post_title} <br />
                      </h1>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#e9e9e98a] p-8 px-10 max-md:px-5 mt-10 w-4/5 mx-auto max-md:w-11/12">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left Section */}
            <div className="lg:w-1/2 w-full flex flex-col gap-3">
              <h3
                className="font-bold text-2xl md:text-3xl"
                style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
              >
                {Data?.post_up_title}
              </h3>
              <div className="flex flex-col gap-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: showFullContent
                      ? Data?.post_up_fst_desc
                      : truncateText(Data?.post_up_fst_desc, 840),
                  }}
                  className="text-xl text-zinc-600"
                />
                {Data?.post_up_fst_desc &&
                  Data?.post_up_fst_desc?.length > 840 && (
                    <span className="mb-5">
                      <i>
                        <strong
                          className="text-blue-500 cursor-pointer"
                          onClick={toggleContent}
                        >
                          {showFullContent ? "Read Less" : "Read More"}
                        </strong>
                      </i>
                    </span>
                  )}
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 w-full mt-2">
              <Image
                src={Top_first}
                alt="image"
                className="w-full h-auto"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#e9e9e98a] p-8 px-10 max-md:px-5 w-4/5 mx-auto max-md:w-11/12">
          <div className="flex  items-center gap-5 max-lg:flex-col ">
            {/* Left Column (Image) */}
            <div className="w-full lg:w-1/2 p-3">
              <Image
                src={top_second}
                alt="image"
                className="w-full"
                width={1000}
                height={1000}
              />
            </div>

            {/* Right Column (Text) */}
            <div className="w-full lg:w-1/2 p-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: showFullContent1
                    ? Data?.post_up_sec_desc
                    : truncateText1(Data?.post_up_sec_desc, 900),
                }}
                className="text-xl text-zinc-600 flex flex-col gap-2"
              />
              {Data?.post_up_sec_desc &&
                Data?.post_up_sec_desc?.length > 900 && (
                  <span className="mb-5">
                    <i>
                      <strong
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleContent1}
                      >
                        {showFullContent1 ? "Read Less" : "Read More"}
                      </strong>
                    </i>
                  </span>
                )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-8 px-10 py-5 max-md:px-5 bg-[#DBECF1] rounded-lg w-4/5 mx-auto max-md:w-11/12">
          <div className="w-full">
            <h2 className="my-4 font-bold text-3xl text-gray-900 shadow-text">
              {Data?.post_mid_title}
            </h2>

            <div
              dangerouslySetInnerHTML={{
                __html: Data?.post_mid_description,
              }}
              className="text-xl flex flex-col gap-3"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="  bg-[#f8f9fa] mt-8 px-10 max-md:px-5 py-5 w-4/5 mx-auto max-md:w-11/12">
          <div className="flex flex-col">
            <h2
              className="p-3 font-bold text-3xl text-neutral-800"
              style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
            >
              {Data?.post_short_title}
            </h2>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 items-center mt-4">
              {/* Left Side - Card */}
              <div className="w-full h-full mt-3">
                <div
                  className="rounded-lg flex flex-col gap-3 p-4 text-xl bg-[#e9e9e98a] shadow-none"
                  style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
                >
                  {Data?.short_keys?.map((res, index) => (
                    <div key={index}>
                      <div className="flex items-center ">
                        <div className="w-6 h-6 flex-shrink-0">
                          {res?.vector_image?.imgpath ? (
                            <Image
                              src={`${ImageBaseUrl}/${res?.vector_image?.imgpath}`}
                              alt="#"
                              className="w-5"
                              width={1000}
                              height={1000}
                            />
                          ) : (
                            <GiPeaks className="text-orange-500 text-2xl" />
                          )}
                        </div>
                        <div className="ml-3">
                          <strong className="text-2xl font-bold">
                            {res?.name}:
                            <span className="ml-1 text-2xl font-normal">
                              {res?.value}
                            </span>
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="w-full mt-3">
                <Image
                  src={ShortImage}
                  alt="image"
                  className="w-full rounded-lg"
                  width={1000}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" mx-auto px-10 max-md:px-5 py-5 mt-8 bg-[#EBF1DB] w-4/5 max-md:w-11/12">
          <div className="w-full">
            <h2 className="my-4 font-bold text-3xl text-gray-900 ">
              {/* How to reach Panchachuli Base camp with the minimum facility */}
              {Data?.places_visit_title}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: Data?.post_expolore_section,
              }}
              className="text-xl flex flex-col gap-3"
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="px-10 max-md:px-5 py-5 bg-[#F6E9E9] w-4/5 mx-auto max-md:w-11/12">
          <div className="w-full">
            <div className="w-full">
              <h2 className="my-4 font-bold text-3xl text-shadow">
                {Data?.things_to_do_title}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: Data?.post_activity_section,
                }}
                className="text-xl flex flex-col gap-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* slider start */}

      <section className="mt-8">
        <div
          className=" px-10 max-md:px-5 py-5 hii w-4/5 mx-auto max-md:w-11/12"
          style={{ backgroundColor: "#e9e9e98a" }}
        >
          <h2
            style={{
              fontWeight: "700",
              textShadow: "1.1px 0px 0px #c1c1c1",
            }}
            className="text-3xl text-neutral-700"
          >
            {Data?.photo_galary_title}
          </h2>
          <div className="slider-container py-4">
            <Slider {...settings}>
              {Gallery.map((res, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Image
                        onClick={() => {
                          setShowModal(true);
                          setSelectedImage(res?.img_path);
                          setCurrentImageIndex(index);
                        }}
                        className="p-3 w-100"
                        src={res.img_path}
                        alt="image"
                        style={{
                          height: "270px",
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: 30,
                        }}
                        priority
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>

      <section>
        <div className=" mx-auto px-10 max-md:px-5 py-5 mt-8 bg-[#EDE9F6] w-4/5 max-md:w-11/12">
          <div className="grid grid-cols-1">
            <div
              className="text-[22px] font-normal flex flex-col gap-3"
              style={{
                textShadow: "1.1px 0px 0px #c1c1c1",
              }}
              dangerouslySetInnerHTML={{
                __html: Data?.post_consider_section,
              }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div
          className="px-10 py-5 max-md:px-5 hii mx-auto w-4/5 max-md:w-11/12"
          style={{ backgroundColor: "#e9e9e98a" }}
        >
          <div>
            <h2
              className="font-bold text-gray-800 text-3xl"
              style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
            >
              {Data?.post_explore_more_title}
            </h2>

            <div className=" py-4">
              <Slider {...settings}>
                {moreData?.expolore_more_post?.map((res, index) => (
                  <div
                    key={index}
                    className={`w-full md:w-${
                      12 / numColumns2
                    }/12 cursor-pointer`}
                  >
                    {res?.images?.map(
                      (res1, imgIndex) =>
                        res1?.image_type === "top" && (
                          <div
                            key={imgIndex}
                            className="cursor-pointer"
                            onClick={() => {
                              if (res.status === 1) {
                                router.push(`/${res?.post_slug}`);
                              }
                            }}
                          >
                            <Image
                              className="p-3 w-full h-[270px] rounded-[30px] object-cover"
                              src={res1.img_path}
                              alt="image"
                              width={1000}
                              height={1000}
                            />
                            <div className="flex justify-center items-center">
                              <h1
                                className="text-lg text-gray-800 legend"
                                style={{
                                  backgroundColor: "transparent",
                                  textShadow: "1.1px 0px 0px #c1c1c1",
                                }}
                              >
                                {res.post_title}
                              </h1>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="px-10 max-md:px-5 py-5 hii bg-[#e9e9e98a] w-4/5 mx-auto max-md:w-11/12">
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl">
              {Data?.trending_destination_title}
            </h2>

            <div className="slider-container py-4">
              <Slider {...settings}>
                {moreData?.trending_more_post?.map((res, index) => (
                  <div
                    key={index}
                    className={`w-full md:w-[${
                      100 / numColumns1
                    }%] cursor-pointer`}
                  >
                    {res?.images?.map(
                      (res1, imgIndex) =>
                        res1?.image_type === "top" && (
                          <div
                            key={imgIndex}
                            onClick={() => {
                              if (res.status === 1) {
                                router.push(`/${res?.post_slug}`);
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <Image
                              className="p-3 rounded-[30px] object-cover w-full h-[270px]"
                              src={res1.img_path}
                              alt="image"
                              width={1000}
                              height={1000}
                            />
                            <div className="flex justify-center items-center">
                              <h1 className="text-lg font-semibold text-shadow-sm bg-transparent">
                                {res.post_title}
                              </h1>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mx-auto px-10 max-md:px-5 py-5 bg-[#DBECF1] rounded-lg  w-11/12 md:w-4/5">
          <div className="w-full">
            <h2 className="font-bold text-3xl text-gray-900 ">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-3">
              {Data?.question_keys?.map((res, index) => (
                <div
                  key={index}
                  className="border-2 border-[#00000020] rounded-lg bg-transparent cursor-pointer transition-all duration-300"
                >
                  {/* Accordion Header */}
                  <button
                    className="w-full text-left flex justify-between items-center px-4 py-3 text-lg font-semibold focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    {res?.name}
                  </button>

                  {/* Accordion Body (Smooth Transition) */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-3 text-gray-700">
                      <h6 className="text-lg">{res?.value}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" mx-auto px-10 max-md:px-5 py-5 my-8 bg-[#EDE9F6] w-4/5 max-md:w-11/12">
          <div className="flex flex-wrap  max-lg:flex-col">
            {/* Left Section */}
            <div className="w-full lg:w-7/12 mt-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: Data?.post_plan_section,
                }}
                className="text-[21px] text-zinc-700 flex flex-col gap-3"
              />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-5/12 mt-4 p-4">
              <div className="bg-[#e9e9e98a] border border-[#303091] rounded-lg p-5">
                <div className="space-y-3">
                  <input
                    type="number"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Number Of Travelers"
                    value={numberOfTravelers}
                    onChange={handleNumberOfTravelersChange}
                  />

                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Time in Hand (Days & Nights)"
                    value={timeInHand}
                    onChange={handleTimeInHandChange}
                  />

                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Trip Type (Trek/Adventure/etc)"
                    value={tripType}
                    onChange={handleTripTypeChange}
                  />

                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Trip Location (Ex- Rishikesh)"
                    value={tripLocation}
                    onChange={handleTripLocationChange}
                  />

                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Overall Budget (INR)"
                    value={overallBudget}
                    onChange={handleOverallBudgetChange}
                  />

                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Travel Medium (Air/Rail/Road/All)"
                    value={travelMedium}
                    onChange={handleTravelMediumChange}
                  />

                  <input
                    type="number"
                    className="w-full p-3 border rounded-lg text-[20px] shadow-sm focus:outline-none font-medium"
                    placeholder="Mobile Numbers"
                    value={mobileNumbers}
                    onChange={handleMobileNumbersChange}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-[70%] bg-[#303091] border-2 border-[#5bc1b8] text-white text-[22px] py-2 px-4 rounded-lg hover:bg-[#232277] transition duration-300"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-black/90 w-full h-full flex flex-col justify-center items-center relative">
            {/* Navigation Controls */}
            <div className="absolute top-4 left-0 right-0 flex justify-center items-center">
              <div className="flex items-center justify-between w-[300px]">
                <button
                  className="text-blue-500 border-0"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <div className="text-white">
                  {currentImageIndex + 1}/{Gallery?.length}
                </div>
                <button className="text-blue-500 border-0" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>

            {/* Image Display with Arrows */}
            <div className="flex items-center justify-center w-full h-full">
              {/* Left Arrow */}
              <div
                className="cursor-pointer absolute left-4"
                onClick={handlePrevious}
              >
                <FaArrowCircleLeft size={40} className="text-white" />
              </div>

              {/* Image */}
              <div className="w-[90%] flex justify-center">
                <Image
                  src={Gallery[currentImageIndex]?.img_path}
                  alt="image"
                  width={1000}
                  height={1000}
                  className="object-contain w-full h-auto"
                />
              </div>

              {/* Right Arrow */}
              <div
                className="cursor-pointer absolute right-4"
                onClick={handleNext}
              >
                <FaArrowCircleRight size={40} className="text-white" />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white bg-red-600 px-3 py-2 rounded-full hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BaseCamp;
