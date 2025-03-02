"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let dropdownTimeout = null;
  const router = useRouter();

  const toggleDropdown = (index) => {
    clearTimeout(dropdownTimeout);
    setIsOpen(index);
  };
  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before hiding
  };
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        "https://api.placestovisitindia.com/api/getmenu"
      );
      const data = await response.json();
      setMenuData(data?.data || []);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-5 px-4 lg:px-0">
        {/* Logo */}
        <Link href={`/`}>
          <figure className="w-28 h-12">
            <Image
              src="/Logo.webp"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="cursor-pointer object-cover w-full h-full"
            />
          </figure>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuData.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => toggleDropdown(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer text-gray-500 capitalize flex items-center gap-1 text-xl font-medium">
                {item?.name}
                {isOpen === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>

              {isOpen === index && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  {item?.onlyposts?.map((post, i) => (
                    <li key={i} className="px-4 py-2 hover:bg-gray-100">
                      <Link
                        href={`/${post.post_slug}`}
                        className="text-gray-700 block font-medium text-[1.2rem]"
                      >
                        {post?.post_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <Link
            href="/blogs"
            className="text-gray-500 hover:underline underline-offset-4 hover:text-gray-900 text-lg font-medium"
          >
            Blogs
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="hidden lg:flex space-x-3">
          <Link
            href="https://www.facebook.com/placestovisitIndiaofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/facebook.webp" alt="Facebook" width={25} height={25} />
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
            />
          </Link>
          <Link
            href="https://www.youtube.com/@placestovisitIndiaofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/youtube.webp" alt="YouTube" width={25} height={25} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/103039021/admin/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/linkedin.webp" alt="LinkedIn" width={25} height={25} />
          </Link>
          <Link
            href="https://twitter.com/Places2visitind"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/Twitter.webp" alt="Twitter" width={25} height={25} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-xl border border-gray-200 px-2 py-1 rounded text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <LuMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-md transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-center space-y-4 py-6">
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-xl text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✖
          </button>

          {menuData.slice(0, 5).map((item, index) => (
            <div key={index} className="w-full text-center">
              <button
                className="text-gray-700 font-medium text-lg w-full py-2 flex justify-center items-center"
                onClick={() => toggleDropdown(index)}
              >
                {item?.name}
                {isOpen === index ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>

              {isOpen === index && (
                <ul className="bg-gray-100 rounded-md py-2 w-64 mx-auto">
                  {item?.onlyposts?.map((post, i) => (
                    <li key={i} className="px-4 py-2 hover:bg-gray-200">
                      <Link
                        href={`/${post.post_slug}`}
                        className="text-gray-700 block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {post?.post_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <Link
            href="/blogs"
            className="text-gray-700 font-medium text-lg py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blogs
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
