import Image from "next/image";
import { FaMailBulk, FaWhatsapp, FaPhone } from "react-icons/fa";

export const metadata = {
  title: "Contact Us - Places To Visit India",
  description: "An Encyclopedia on Tourism in India",
};
const Contactus = () => {
  return (
    <div>
      {/* Background Image Section */}
      <div className=" mt-20">
        <div className="w-full h-full    text-white ">
          <Image
            src={`/Contact.webp`}
            alt="Background Image"
            width={1000}
            height={400}
            className={`object-cover w-full h-full`}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="my-8 flex flex-col gap-5">
        {/* Section 1 */}
        <section>
          <div className="container px-5 bg-[#DBECF1] rounded-lg overflow-hidden w-3/4 mx-auto max-md:w-11/12">
            <div className="flex justify-center items-center">
              <h4 className="my-4 font-bold text-gray-700 text-center text-2xl max-md:text-xl">
                We promise to revert you within 6 hours!
              </h4>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-4">
          <div className="container p-8 bg-[#F6E9E9] w-3/4 mx-auto max-md:w-11/12">
            <div className="w-full">
              <h4 className="my-4 font-bold text-2xl text-gray-700">
                Explore India with Confidence
              </h4>
              <p className="text-xl text-zinc-800">
                Embark on your Indian adventure with the assurance of accurate
                and up-to-date information, courtesy of our dedicated team of
                experts at{" "}
                <span className="text-blue-600">Places to Visit India</span>. We
                recognize that each tourist destination offers a unique
                experience, varying in ambiance and appeal with each passing
                season. Leveraging our extensive network, we provide
                comprehensive updates on crucial factors such as climate
                conditions, tourist influx, cost fluctuations, and more.
              </p>
              <p className="mt-3 text-xl text-zinc-800">
                Tailored to your preferences and constraints, our services
                include crafting personalized itineraries tailored to your
                timeframe and budget. Whether you're uncertain about where to
                begin or seeking guidance to optimize your journey, our seasoned
                experts are here to assist. From crafting a meticulous
                day-by-day itinerary to maximizing your time and resources, we
                strive to ensure a seamless travel experience.
              </p>
              <p className="mt-3 text-xl text-zinc-800">
                Best of all, our consultation services come at no cost. Feel
                free to reach out for a brief inquiry about a destination or to
                start planning your dream trip—our team is here to help you
                every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Icons Section */}
        <section className="mt-4">
          <div className="container px-5 py-3 bg-[#EDE9F6] w-3/4 mx-auto max-md:w-11/12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center p-5">
              {/* Email Icon */}
              <div className="flex flex-col items-center">
                <div className="bg-red-500 p-6 rounded-full">
                  <FaMailBulk className="text-white text-4xl" />
                </div>
                <h3 className="mt-2 text-xl font-bold">Email Us</h3>
                <h3 className="mt-1 text-gray-700 text-xl">
                  Info@placetovisitindia.com
                </h3>
              </div>

              {/* WhatsApp Icon */}
              <div className="flex flex-col items-center">
                <div className="bg-green-500 p-6 rounded-full">
                  <FaWhatsapp className="text-white text-4xl" />
                </div>
                <h3 className="mt-2 text-xl font-bold">WhatsApp Us</h3>
                <h3 className="mt-1 text-gray-700 text-xl">+91-9929107926</h3>
              </div>

              {/* Phone Icon */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-500 p-6 rounded-full">
                  <FaPhone className="text-white text-4xl" />
                </div>
                <h3 className="mt-2 text-xl font-bold">Contact Us</h3>
                <h3 className="mt-1 text-gray-700 text-xl">+91-9929107926</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contactus;
