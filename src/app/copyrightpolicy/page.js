export const metadata = {
  title: "CopyRight Policy - Place to Visit in India",
  description: "An Encyclopedia on Tourism in India",
};

import Image from "next/image";

const Copyrightpolicy = () => {
  return (
    <div>
      {/* Background Image Section */}
      <div className=" mt-20">
        <div className="w-full h-full    text-white ">
          <Image
            src={`/copyrightpolicy.webp`}
            alt="Background Image"
            width={1000}
            height={400}
            className={`object-cover w-full h-full`}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="my-12">
        <section className="mt-4">
          <div className="container p-8 bg-[#DBECF1] w-4/5 mx-auto max-md:w-11/12">
            <div className="w-full text-xl">
              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Copyright Policy
              </h4>
              <p className="text-zinc-700">
                The content, including text, images, graphics, and multimedia
                elements, displayed on the{" "}
                <span className="font-semibold text-blue-600">
                  Places to Visit India
                </span>{" "}
                website (www.placestovisitindia.com) is protected by copyright
                laws and is the intellectual property of Places to Visit India
                or its content providers.
              </p>

              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Use of Content
              </h4>
              <p className="text-zinc-700">
                Visitors to the Website are granted a limited, non-exclusive,
                and revocable license to access and use the content for
                personal, non-commercial purposes only. This license does not
                permit the reproduction, distribution, modification, or public
                display of any content without prior written consent from Places
                to Visit India.
              </p>

              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Copyright Infringement
              </h4>
              <p className="text-zinc-700">
                Places to Visit India respects the intellectual property rights
                of others and expects its users to do the same. If you believe
                that your copyrighted work has been copied in a way that
                constitutes copyright infringement on the Website, please
                provide the following information through email at{" "}
                <a
                  href="mailto:cs@placestovisitindia.com"
                  className="text-blue-600 underline"
                >
                  cs@placestovisitindia.com
                </a>
                :
              </p>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>
                  Identification of the copyrighted work claimed to have been
                  infringed.
                </li>
                <li>
                  Identification of the material that is claimed to be
                  infringing or to be the subject of infringing activity and
                  that is to be removed or access to which is to be disabled.
                </li>
                <li>
                  Your contact information, including name, address, telephone
                  number, and email address.
                </li>
                <li>
                  A statement that you have a good faith belief that use of the
                  material in the manner complained of is not authorized by the
                  copyright owner, its agent, or the law.
                </li>
                <li>
                  A statement that the information in the notification is
                  accurate, and under penalty of perjury, that you are
                  authorized to act on behalf of the owner of an exclusive right
                  that is allegedly infringed.
                </li>
                <li>Your physical or electronic signature.</li>
              </ul>

              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Claiming Copyright
              </h4>
              <p className="text-zinc-700">
                If you wish to claim copyright on any media or content found on
                the Website, please contact us at{" "}
                <a
                  href="mailto:cs@placestovisitindia.com"
                  className="text-blue-600 underline"
                >
                  cs@placestovisitindia.com
                </a>
                .
              </p>

              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Counter-Notification
              </h4>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>
                  Identification of the material that has been removed or to
                  which access has been disabled and the location at which the
                  material appeared before it was removed or access to it was
                  disabled.
                </li>
                <li>
                  A statement under penalty of perjury that you have a good
                  faith belief that the material was removed or disabled as a
                  result of mistake or misidentification.
                </li>
                <li>Your name, address, and telephone number.</li>
                <li>
                  A statement that you consent to the jurisdiction of the
                  federal district court for the judicial district in which your
                  address is located, or if your address is outside of the
                  United States, for any judicial district in which Places to
                  Visit India may be found, and that you will accept service of
                  process from the person who provided notification of the
                  alleged infringement.
                </li>
              </ul>

              <h4 className="mt-3 font-bold text-xl text-gray-700">
                Changes to Copyright Policy
              </h4>
              <p className="text-zinc-700">
                Places to Visit India reserves the right to modify or update
                this Copyright Policy at any time without prior notice. Such
                changes will be effective immediately upon posting the updated
                policy on the Website.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Copyrightpolicy;
