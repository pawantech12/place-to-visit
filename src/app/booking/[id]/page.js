"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";

const BookingDetails = () => {
  const { id } = useParams();

  const [Video, setVideo] = useState({});
  const [show, setShow] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);

  console.log(Video, "Video===========================>");
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
  const [datass, setDatass] = useState({});
  const [loader, setLoader] = useState(false);
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [name, setName] = useState("");
  const [kids, setkids] = useState("");
  const [Elders, setElders] = useState("");
  const [place, setplace] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [date, setdate] = useState("");

  const handleImageClick = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  const handleImageClick1 = (imageUrl) => {
    setBackgroundImage1(imageUrl);
  };

  const HandleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("package_id", id);
    urlencoded.append("customer_name", name);
    urlencoded.append("no_of_travellers", numberOfTravelers);
    urlencoded.append("kids_number", kids);
    urlencoded.append("elder_number", Elders);
    urlencoded.append("place", place);
    urlencoded.append("mobile", mobile);
    urlencoded.append("email", email);
    urlencoded.append("travel_date", date);
    urlencoded.append("status", "1");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://api.placestovisitindia.com/api/bookings", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
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
      setLoader(false);
      console.log();
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const GetDetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.placestovisitindia.com/api/getbookingbypackage/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "resulit==================>");
        setDatass(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const fetchData = async () => {
      setcount(parseInt(await localStorage.getItem("data"))); // Parse count as integer
      await get_Api();
    };
    fetchData();
    GetDetails();
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

  return (
    <>
      <Loader loader={loader} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-12 col-sm-12 mt-5 pt-3">
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
                            style={{ height: "100%", width: "100%" }}
                            width={1000}
                            height={1000}
                          />
                          <h1
                            style={{
                              backgroundColor: "transparent",
                              fontSize: "28px",
                            }}
                            className="legend"
                          >
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

      <section className="mt-2 mb-2 p-2">
        <div className="px-2">
          <button
            className="w-100"
            style={{
              padding: 10,
              borderRadius: 10,
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: 500,
              backgroundColor: "#14265B",
              color: "#fff",
              border: "0px solid",
            }}
          >
            Package Overview
          </button>
        </div>
      </section>

      <section className="mt-2 mb-2">
        <div className="row px-5">
          <div className="col-lg-6 col-md-12 p-2">
            <Image
              src={datass?.sub_category?.images?.[0]?.img_path}
              className="main-image"
              width={1000}
              height={1000}
              alt="img"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="row">
              {datass?.sub_category?.images?.slice(1, 5).map((image, index) => (
                <div key={index} className="col-lg-6 col-6 p-2">
                  <Image
                    src={image?.img_path}
                    width={1000}
                    height={1000}
                    alt="img"
                    className="sub-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mt-2 mb-2 mx-4 pb-3"
        style={{ backgroundColor: "#DBECF1", borderRadius: 10 }}
      >
        <section>
          <div className="row py-3">
            {/* Left Section */}
            <div
              className="col-lg-7 col-md-12 mx-lg-5 py-2"
              style={{ borderRight: "2px solid gray" }}
            >
              <h1
                className="text-center text-lg-start"
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 25,
                  fontWeight: 600,
                }}
              >
                Note that the development build is not optimized
              </h1>

              {/* Image Grid */}
              <div className="row mt-4 d-flex">
                {datass?.vector_image_urls?.map((res, index) => (
                  <div
                    key={index}
                    className="col-lg-2 col-md-3 col-4 mb-3 d-flex flex-column align-items-center"
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        overflow: "hidden",
                        //   borderRadius: "50%",
                      }}
                    >
                      <Image
                        src={res}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        width={1000}
                        height={1000}
                        alt="img"
                      />
                    </div>
                    <h6 className="text-center mt-2">{datass?.keys[index]}</h6>
                  </div>
                ))}
              </div>

              {/* Read More Section */}
              <div className="d-flex mt-3">
                <h6
                  style={{
                    textShadow: "1.1px 0px 0px #c1c1c1",
                    color: "#000",
                    textDecoration: "underline",
                  }}
                >
                  Read more about places to visit in {"place"}
                </h6>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-4 col-md-12 mt-3 text-center">
              <button
                className="w-100 btn btn-primary"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  fontSize: 20,
                  fontWeight: 600,
                  backgroundColor: "#14265B",
                  color: "#fff",
                  border: "none",
                }}
              >
                Why Choose P2VI
              </button>

              {/* Feature List */}
              {[
                "A Portal By Experts",
                "Registered Travel Agent",
                "Top Class Services",
                "Instant Assistance",
              ].map((text, index) => (
                <div key={index} className="d-flex align-items-center mt-3">
                  <Image
                    src={`/check.png`}
                    style={{ width: 25, height: 25 }}
                    width={1000}
                    height={1000}
                    alt="img"
                  />
                  <h4
                    className="mx-3 text-gray"
                    style={{ textShadow: "1.1px 0px 0px #c1c1c1" }}
                  >
                    {text}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="col-lg-7 col-md-6 col-sm-12 px-5">
          <h4 style={{ fontSize: "20px", textShadow: "1.1px 0px 0px #c1c1c1" }}>
            Fill in your details below:
          </h4>
          <div
            className="card mt-4 "
            style={{
              backgroundColor: "#e9e9e98a",
              borderWidth: 1,
              borderColor: "#303091",
            }}
          >
            <div className="card-body">
              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    Your Name
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    // placeholder='Number Of Travelers'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    No. of Travelers
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    type="number"
                    // placeholder='Number Of Travelers'
                    onChange={(e) => {
                      setNumberOfTravelers(e.target.value);
                    }}
                    value={numberOfTravelers}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    Kids & Elders
                  </h6>
                </div>
                <div className="col-5" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    value={kids}
                    onChange={(e) => {
                      setkids(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
                <div className="col-4">
                  <input
                    className="form-control py-3"
                    onChange={(e) => {
                      setElders(e.target.value);
                    }}
                    value={Elders}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    Your Place
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    value={place}
                    onChange={(e) => {
                      setplace(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    Mobile
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    type="number"
                    value={mobile}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    E-Mail
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div
                className="mb-3 row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div className="col-3">
                  <h6
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    Travel Date
                  </h6>
                </div>
                <div className="col-9" style={{ marginLeft: -20 }}>
                  <input
                    className="form-control py-3"
                    type="date"
                    // placeholder='Number Of Travelers'
                    value={date}
                    onChange={(e) => {
                      setdate(e.target.value);
                    }}
                    style={{
                      fontSize: "16px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>

              <div className="mb-3 row" style={{ justifyContent: "center" }}>
                <div
                  className="col-1 mt-2 ml-5"
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <input type="checkbox" style={{ height: 20, width: 20 }} />
                </div>
                <div className="col-11">
                  <p
                    style={{
                      fontSize: "20px",
                      textShadow: "1.1px 0px 0px #c1c1c1",
                      color: "gray",
                    }}
                  >
                    I authorize Places to Visit India to contact me using the
                    provided details to confirm the selected tour package.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => {
                    HandleSubmit();
                  }}
                  style={{
                    width: "40%",
                    backgroundColor: "#303091",
                    border: "2px solid #5bc1b8",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingDetails;
