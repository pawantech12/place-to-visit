import Image from "next/image";

export const metadata = {
  title: "About Us - Places To Visit India",
  description: "An Encyclopedia on Tourism in India",
};

export default function Aboutus() {
  return (
    <div>
      {/* Background Image Section */}
      <div className=" mt-20">
        <div className="w-full">
          <div className="w-full h-full    text-white ">
            <Image
              src={`/About.webp`}
              alt="Background Image"
              width={1000}
              height={400}
              className={`object-cover w-full h-full`}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-8 flex flex-col gap-5">
        {/* Section 1 */}
        <section className="mt-4">
          <div className="container p-8 bg-[#F6E9E9] w-3/4 mx-auto max-md:w-11/12">
            <div className="w-full flex flex-col gap-3">
              <h4
                className=" font-bold text-[1.5rem] "
                style={{
                  textShadow: "rgb(193, 193, 193) 1.1px 0px 0px",
                  textTransform: "capitalize",
                }}
              >
                Unveiling the Enchanting Mosaic of India:{" "}
                <span className="text-blue-600 underline">
                  PlacesToVisitIndia.com
                </span>
              </h4>
              <p className="text-[21px] text-justify">
                We are{" "}
                <span className="text-blue-600 underline">
                  PlacesToVisitIndia.com
                </span>
                , a passionate team of travel enthusiasts from diverse
                backgrounds. United by a love for exploration, we aim to
                simplify travel experiences for everyone.
              </p>
              <h4 className="mt-3 font-medium text-[1.5rem] text-gray-900">
                A Nation Reborn for Exploration
              </h4>
              <p className="text-[21px] text-justify">
                India is brimming with renewed energy. We, as a nation, are
                rediscovering the magic of our heritage and the captivating
                beauty of our landscapes. From ancient wonders to untouched
                natural sanctuaries, India's tourist destinations are a treasure
                trove waiting to be explored.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-4">
          <div className="container p-8 bg-[#DBECF1] w-3/4 mx-auto max-md:w-11/12">
            <div className="w-full flex flex-col gap-3">
              <h4 className="mt-3 font-medium text-[1.5rem] text-gray-900">
                Our Mission: Unveiling the Jewel of Incredible India
              </h4>
              <p className="text-[21px] text-justify">
                Travel and tourism are flourishing globally, and India, with its
                rich tapestry of history stretching back millennia, is
                captivating the world's imagination. We envision a future where
                both domestic and international tourists can explore India with
                ease, enjoying comfortable stays and delectable cuisine. We want
                to transform the travel landscape in India by adhering to the
                highest industry standards.
              </p>
              <h4 className="mt-3 font-medium text-[1.5rem] text-gray-900">
                Beyond Survival: Reclaiming Travel as a Way of Life
              </h4>
              <p className="text-[21px] text-justify">
                Travel in India transcends mere survival; it's woven into the
                very fabric of our culture. From historic pilgrimages that
                encouraged exploration to the vibrant tapestry of communities
                and traditions, travel fosters unity and understanding.
              </p>
              <h4 className="mt-3 font-medium text-[1.5rem] text-gray-900">
                Embracing the Influx: Preparing for a Tourist Boom
              </h4>
              <p className="text-[21px] text-justify">
                As India gears up for a surge in international tourism, we
                recognize the importance of responsible travel practices. Both
                tourists and locals have a role to play. Travelers can learn
                valuable lessons about respecting cultural norms and responsible
                behavior at destinations.
              </p>
              <p className="text-[21px] text-justify">
                <span className="text-blue-600">PlacesToVisitIndia.com</span> is
                committed to providing the latest updates and comprehensive
                information on tourist destinations, empowering travelers to
                plan their itineraries efficiently and make the most of their
                experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-4">
          <div className="container p-8 bg-[#F6E9E9]  w-3/4 mx-auto max-md:w-11/12">
            <div className="w-full flex flex-col gap-3">
              <h4 className="mt-3 font-medium text-[1.5rem] text-gray-900">
                Our Goals: Transforming Travel in India
              </h4>
              <p className="text-[21px] text-justify">
                Travel and tourism have the potential to not only elevate the
                lives of Indians but also accelerate our nation's economic
                growth. Our mission is to make travel an integral part of life
                for Indians, as essential as early education.
              </p>
              <p className="text-[21px] text-justify">
                <span className="text-blue-600">PlacesToVisitIndia.com</span>{" "}
                goes beyond promoting established tourist destinations. We aim
                to shine a spotlight on hidden gems, fostering their potential
                and empowering local communities. We believe in empowering
                self-planned travel, breaking the cycle of reliance on travel
                agents, and allowing local businesses to thrive.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
