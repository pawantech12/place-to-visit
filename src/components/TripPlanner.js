import React, { useState, useEffect, useRef } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Slider from "react-slick";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "./Loader";

const TripPlanner = ({ id }) => {
  const router = useRouter();

  const [Data, setData] = useState();
  const [Gallery, setGallery] = useState([]);
  const [moreData, setMoreData] = useState();
  const galleryContainerRef = useRef(null);
  const galleryContainerRef1 = useRef(null);
  const galleryContainerRef2 = useRef(null);
  const [colWidth, setColWidth] = useState(0);
  const [numColumns, setNumColumns] = useState(4);
  const [colWidth1, setColWidth1] = useState(0);
  const [numColumns1, setNumColumns1] = useState(4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [slected, setslected] = useState(0);
  const [carausl, setCarausl] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [timeInHand, setTimeInHand] = useState("");
  const [tripType, setTripType] = useState("");
  const [tripLocation, setTripLocation] = useState("");
  const [overallBudget, setOverallBudget] = useState("");
  const [travelMedium, setTravelMedium] = useState("");
  const [mobileNumbers, setMobileNumbers] = useState("");
  const selectedRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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

  useEffect(() => {
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

  const Get_Api = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setLoader(true);

    fetch(
      `https://api.placestovisitindia.com/api/getBaseCategories/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.data);

        const data = result.data.images?.filter(
          (image) => image.image_type == "header"
        );

        console.log(data, "000000000000000000====>");

        setCarausl(data); // Assuming setCarausl is a function to set carousel data

        // setCarausl(data);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log("error", error));

    setLoader(false);
  };

  useEffect(() => {
    Get_Api();
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
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
        />

        <section>
          <div className="w-full mt-16">
            <div className="flex flex-wrap">
              <div className="w-full">
                {carausl?.length > 0 && (
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={3000}
                    showThumbs={false}
                    showIndicators={true}
                    renderIndicator={renderCustomIndicator}
                  >
                    {carausl?.map((res, index) => {
                      return (
                        <div key={index}>
                          <div className="relative">
                            <Image
                              src={res.img_path}
                              width={1000}
                              height={1000}
                              alt="img"
                              className="h-full"
                            />
                            <h4
                              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/50 text-black text-[28px] w-[85%] rounded-md  px-4 py-2 font-medium !backdrop-blur-sm"
                              style={{
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",

                                textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                              }}
                            >
                              {Data?.name} <br />
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="my-3">
          <div className="max-md:px-5 md:w-4/5 mx-auto">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-6/12 flex justify-center items-center">
                <h2
                  className="text-center text-[1.9rem] font-semibold text-gray-900"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.upr_sec_title}
                </h2>
              </div>
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>
            <div className="mt-4">
              <div
                className="w-full text-[21px] text-zinc-700"
                dangerouslySetInnerHTML={{ __html: Data?.upr_sec_desc }}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="w-full mx-auto my-5 max-md:px-5 md:w-4/5">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full mt-3 justify-center items-center border-4 border-orange-500 h-0"></div>

              <div className="w-full md:w-6/12 flex justify-center items-center">
                <h2 className="text-center text-[1.9rem] font-semibold capitalize overflow-hidden text-ellipsis whitespace-nowrap ">
                  {Data?.most_popular_category?.name}
                </h2>
              </div>

              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>

            <div className="w-full mx-auto mt-4">
              <div className="flex flex-wrap justify-center">
                {Data?.most_popular_category?.posts?.map((res, index) => {
                  return (
                    <div key={index} className="w-full sm:w-6/12 lg:w-4/12 p-2">
                      <div
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer "
                        onClick={() => {
                          if (res.status === 1) {
                            router.push(`/${Data?.slug}/${res?.post_slug}`);
                          }
                        }}
                      >
                        <div className="relative h-[250px] overflow-hidden">
                          <Image
                            src={res?.images[0]?.img_path}
                            alt="img"
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            width={300}
                            height={300}
                          />
                        </div>
                        <h4
                          className="text-center py-2 text-2xl font-semibold shadow-sm shadow-gray-400 bg-[#F7F7F7] "
                          style={{
                            textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                          }}
                        >
                          {res?.post_title}
                        </h4>
                        <div className="p-3">
                          {res?.short_keys?.slice(0, 3).map((item, index) => (
                            <h5
                              key={index}
                              className=" font-medium text-xl"
                              style={{
                                textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                              }}
                            >
                              {item.name}: {item.value}
                            </h5>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className=" mx-auto my-4 md:w-4/5 w-full max-md:px-5">
            <div className="flex max-sm:flex-col items-center gap-3">
              <div className="flex w-3/12 max-sm:w-full mt-3 justify-center items-center border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-6/12 flex justify-center items-center">
                <h2
                  className="text-center text-[1.9rem] font-semibold text-gray-800"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.middle_section_category?.title}
                </h2>
              </div>
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>
            <div className="w-full mt-5 text-[21px] text-zinc-700">
              <div
                dangerouslySetInnerHTML={{
                  __html: Data?.middle_section_category?.description,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section>
          <div className=" mx-auto px-4 md:w-4/5 w-full mt-8">
            <div className="mb-4 mx-2 flex overflow-x-scroll justify-around scrollbar-none">
              {Data?.middle_section_category?.children?.map((res, index) => (
                <div key={index} className="mx-1 flex items-center w-[200px]">
                  <button
                    onClick={() => {
                      setslected(index);
                      selectedRef.current.slickGoTo(index);
                    }}
                    className={`p-2 mx-2 w-[200px] border-0 rounded-lg ${
                      slected === index ? "bg-gray-400" : "bg-[#F0F0F0]"
                    }`}
                  >
                    <h5 className="text-lg font-semibold">{res?.title}</h5>
                  </button>
                </div>
              ))}
            </div>
            <div className="row ">
              <h2 className="font-bold text-xl md:text-2xl text-shadow">
                {Data?.photo_galary_title}
              </h2>
              <div className="mt-8 pb-3">
                <Slider key={slected} ref={selectedRef} {...settings}>
                  {[Data?.middle_section_category?.children[slected]]?.map(
                    (res) =>
                      res?.posts?.map((post, postIndex) => (
                        <div
                          key={postIndex}
                          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3"
                          onClick={() => {
                            if (post?.status === 1) {
                              router.push(`/${Data?.slug}/${post?.post_slug}`);
                            }
                          }}
                        >
                          <div className="cursor-pointer">
                            <div className="card-body p-0">
                              {post?.images?.map(
                                (image, imageIndex) =>
                                  image?.image_type === "top" && (
                                    <Image
                                      key={imageIndex}
                                      src={image.img_path}
                                      alt="image"
                                      priority
                                      className="w-full h-[270px] rounded-lg overflow-hidden"
                                      width={200}
                                      height={200}
                                    />
                                  )
                              )}
                            </div>
                            <h5
                              className="my-2 text-center text-shadow text-xl font-medium"
                              style={{
                                textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                              }}
                            >
                              {post.post_title}
                            </h5>
                          </div>
                        </div>
                      ))
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto my-5 px-5 md:w-4/5 w-full">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full mt-3 justify-center items-center border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-6/12 flex justify-center items-center">
                <h2
                  className="text-center text-[1.9rem] font-semibold text-gray-900"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.lower_section_category?.title}
                </h2>
              </div>
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>
            <div className="mt-4">
              <div
                className="w-full text-[21px] text-zinc-700"
                dangerouslySetInnerHTML={{
                  __html: Data?.lower_section_category?.description,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="max-md:w-full w-4/5 mx-auto px-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl text-gray-900 drop-shadow-sm">
                {Data?.photo_galary_title}
              </h2>
              <div className="slider-container mt-4">
                <Slider {...settings}>
                  {Data?.lower_section_category?.posts?.map((res, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3"
                      onClick={() => {
                        if (res.status === 1) {
                          router.push(`/${Data?.slug}/${res?.post_slug}`);
                        }
                      }}
                    >
                      <div className="cursor-pointer">
                        <div className="p-0">
                          {res?.images?.map(
                            (image, imageIndex) =>
                              image?.image_type === "top" && (
                                <Image
                                  key={imageIndex}
                                  src={image.img_path}
                                  alt="image"
                                  className="w-full h-[270px] rounded-lg overflow-hidden object-cover"
                                  width={300}
                                  height={200}
                                />
                              )
                          )}
                        </div>
                        <h5
                          className="my-2 text-center text-gray-900 text-xl font-medium"
                          style={{
                            textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                          }}
                        >
                          {res.post_title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto my-5 px-5 md:w-4/5 w-full">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full mt-3 border-4 border-orange-500 h-0 justify-center items-center"></div>

              <div className=" w-full md:w-6/12 flex justify-center items-center">
                <h2
                  className="text-center text-[1.9rem] font-semibold text-gray-900"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.additional_lower_section_category?.title}
                </h2>
              </div>

              <div className="flex w-3/12 max-sm:w-full border-4 border-green-500 h-0 justify-center items-center"></div>
            </div>

            <div className="w-full mt-5">
              <div
                className="prose max-w-full text-[21px] text-zinc-700"
                dangerouslySetInnerHTML={{
                  __html: Data?.additional_lower_section_category?.description,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className=" mx-auto px-5 md:w-4/5 w-full">
            <div className="grid">
              <h2 className="font-bold text-2xl text-gray-800 shadow-[1.1px_0px_0px_#c1c1c1]">
                {Data?.photo_galary_title}
              </h2>
              <div className=" mt-4">
                <Slider {...settings}>
                  {Data?.additional_lower_section_category?.posts?.map(
                    (res, index) => (
                      <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3"
                        onClick={() => {
                          if (res.status === 1) {
                            router.push(`/${Data?.slug}/${res?.post_slug}`);
                          }
                        }}
                      >
                        <div className="cursor-pointer">
                          <div className="p-0">
                            {res?.images?.map(
                              (image, imageIndex) =>
                                image?.image_type === "top" && (
                                  <Image
                                    key={imageIndex}
                                    src={image.img_path}
                                    alt="image"
                                    className="w-full h-[270px] rounded-lg overflow-hidden"
                                    width={300}
                                    height={200}
                                  />
                                )
                            )}
                          </div>
                          <h5
                            className="my-2 text-center text-gray-800 font-medium text-xl"
                            style={{
                              textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                            }}
                          >
                            {res.post_title}
                          </h5>
                        </div>
                      </div>
                    )
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5">
          <div className=" mx-auto md:w-4/5 w-full max-md:px-5">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full mt-3 justify-center items-center border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-6/12 flex justify-center items-center">
                <h2
                  className="text-center text-[1.9rem] font-semibold text-gray-800"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.low_sec_title}
                </h2>
              </div>
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>
            <div
              className="w-full mt-5 text-[21px] text-zinc-700"
              dangerouslySetInnerHTML={{ __html: Data?.low_sec_desc }}
            ></div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto px-5 md:w-4/5 w-full">
            <div className="flex max-sm:flex-col gap-3 items-center justify-center">
              <div className="block w-1/4 max-sm:w-full mt-3 border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-1/2 text-center">
                <h2
                  className="text-[1.9rem] font-semibold text-gray-800 "
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="block w-1/4 max-sm:w-full mt-3 border-4 border-green-500 h-0"></div>
            </div>

            <div className="mt-6">
              <div className="space-y-4">
                {Data?.basecategoryquestion?.map((res, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-300 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left flex justify-between items-center px-4 py-3 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      {res?.name}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 py-3 bg-white text-gray-700">
                        <h6 className="text-md">{res?.value}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className=" mx-auto my-5 px-5 md:w-4/5 w-full">
            <div className="flex max-sm:flex-col gap-3 items-center">
              <div className="flex w-3/12 max-sm:w-full mt-3 justify-center items-center border-4 border-orange-500 h-0"></div>
              <div className="w-full md:w-6/12 flex flex-col items-center">
                <h2
                  className="text-[1.9rem] font-bold text-gray-800 text-center text-shadow-md capitalize mt-[-1px]"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "1.1px 0px 0px #c1c1c1",
                  }}
                >
                  {Data?.cta_title}
                </h2>
              </div>
              <div className="flex w-3/12 max-sm:w-full justify-center items-center border-4 border-green-500 h-0"></div>
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="w-full md:w-7/12 text-[21px] text-zinc-700">
                <div
                  dangerouslySetInnerHTML={{ __html: Data?.cta_description }}
                />
              </div>
              <div className="w-full md:w-5/12 mt-2 p-4">
                <div className="bg-gray-200 bg-opacity-50 border border-blue-700 p-4 rounded-lg">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Number Of Travelers"
                      value={numberOfTravelers}
                      onChange={handleNumberOfTravelersChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Time in Hand (Days & Nights)"
                      value={timeInHand}
                      onChange={handleTimeInHandChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Trip Type (Trek/Adventure/etc)"
                      value={tripType}
                      onChange={handleTripTypeChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Trip Location (Ex- Rishikesh)"
                      value={tripLocation}
                      onChange={handleTripLocationChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Overall Budget (INR)"
                      value={overallBudget}
                      onChange={handleOverallBudgetChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Travel Medium (Air/Rail/Road/All)"
                      value={travelMedium}
                      onChange={handleTravelMediumChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full py-3 px-4 text-lg shadow-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      placeholder="Mobile numbers"
                      value={mobileNumbers}
                      onChange={handleMobileNumbersChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-3/4 bg-blue-700 border-2 border-teal-500 py-2 text-lg text-white rounded-lg hover:bg-blue-800 transition"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TripPlanner;
