"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getApi();
  }, []);

  const getCatApi = (data) => {
    fetch("https://api.placestovisitindia.com/api/focaaeegor")
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "Category Data:");
        const newEntry = {
          name: "Categories",
          onlyposts: result?.data,
        };
        data.splice(1, 0, newEntry);
        setData([...data]);
      })
      .catch((error) => console.error(error));
  };

  const getApi = () => {
    fetch("https://api.placestovisitindia.com/api/getfooter")
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "Footer Data:");
        getCatApi(result?.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <footer className="bg-[#14265B] text-white py-8 px-8 max-md:px-4">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-sm:justify-center max-sm:text-center">
          {/* Left Section */}
          <div>
            <h5 className="font-bold text-xl">Places to Visit India</h5>
            <ul className="mt-2 space-y-1 text-base font-medium">
              <li className="cursor-pointer">An Encyclopedia on Tourism</li>
              <li className="cursor-pointer">in India</li>
            </ul>
          </div>

          {/* Dynamic Categories from API */}
          {/* Dynamic Categories from API */}
          {data?.slice(0, 3)?.map((res, index) => (
            <div key={index}>
              {" "}
              {/* Prevent CLS */}
              <h5 className="font-bold text-xl">{res?.name}</h5>
              <ul className="mt-2 space-y-1 text-sm">
                {res?.onlyposts?.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer font-medium hover:underline text-base"
                    onClick={() => {
                      router.push(`/${item?.post_slug || item?.slug}`);
                    }}
                  >
                    {item?.post_title || item?.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-xl">Quick Links</h5>
            <ul className="mt-2 space-y-1 text-base font-medium">
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/aboutus")}
              >
                About Us
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/contactus")}
              >
                Contact Us
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/privacypolicy")}
              >
                Privacy Policy
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/copyrightpolicy")}
              >
                Copyright Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-6"></div>

        {/* Bottom Section */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base font-medium">
            © 2024 Places-to-Visit-India. All rights reserved.
          </p>
          <div className="hidden lg:flex space-x-3">
            <Link
              href="https://www.facebook.com/placestovisitIndiaofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebook.webp"
                alt="Facebook"
                width={25}
                height={25}
                priority // Ensures faster loading
                className="w-[25px] h-[25px]"
              />
            </Link>
            <Link
              href="https://www.instagram.com/placestovisitindiaofficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/Instagram.webp"
                alt="Instagram"
                width={25}
                height={25}
                priority // Ensures faster loading
                className="w-[25px] h-[25px]"
              />
            </Link>
            <Link
              href="https://www.youtube.com/@placestovisitIndiaofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/youtube.webp"
                alt="YouTube"
                width={25}
                height={25}
                priority // Ensures faster loading
                className="w-[25px] h-[25px]"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/103039021/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/linkedin.webp"
                alt="LinkedIn"
                width={25}
                height={25}
                priority // Ensures faster loading
                className="w-[25px] h-[25px]"
              />
            </Link>
            <Link
              href="https://twitter.com/Places2visitind"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/Twitter.webp"
                alt="Twitter"
                width={25}
                height={25}
                priority // Ensures faster loading
                className="w-[25px] h-[25px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
