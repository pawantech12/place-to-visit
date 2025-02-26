export const metadata = {
  title: "Privacy Policy - Place to Visit in India",
  description: "An Encyclopedia on Tourism in India",
};

import Image from "next/image";

const PrivacyPolicy = () => {
  return (
    <section>
      {/* Background Image Section */}
      <div className=" mt-20">
        <div className="w-full h-full    text-white ">
          <Image
            src={`/Privacy.webp`}
            alt="Background Image"
            width={1000}
            height={400}
            className={`object-cover w-full h-full`}
          />
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="my-12">
        <section className="mt-4 w-4/5 mx-auto max-md:w-11/12">
          <div className="container p-8 bg-[#DBECF1]">
            <div className="w-full">
              <div className="text-xl flex flex-col gap-3">
                <h4 className="mt-3 font-semibold">Privacy Policy</h4>
                <p className="text-zinc-700">
                  This Privacy Policy outlines how Places to Visit India
                  collects, uses, protects, and manages personal information
                  obtained through the website www.placestovisitindia.com.
                </p>
                <h4 className="mt-3 font-semibold">Information Collection</h4>
                <p className="text-zinc-700">
                  We collect personal information through forms on our Website,
                  such as the contact form or newsletter subscription form. The
                  types of personal information we collect may include names and
                  email addresses.
                </p>
                <h4 className="mt-3 font-semibold">Use of Information</h4>
                <p className="text-zinc-700">
                  The personal information collected is used solely for the
                  purpose of responding to inquiries, providing requested
                  services, and improving user experience on our Website. We do
                  not share this information with third parties.
                </p>
                <h4 className="mt-3 font-semibold">Data Security</h4>
                <p className="text-zinc-700">
                  We take appropriate measures to ensure the security of the
                  personal information provided to us and to protect it from
                  unauthorized access, alteration, disclosure, or destruction.
                  User data is stored securely and accessed only by authorized
                  personnel.
                </p>
                <h4 className="mt-3 font-semibold">Dispute Resolution</h4>
                <p className="text-zinc-700">
                  Any disputes arising from the use of our Website or concerning
                  this Privacy Policy shall be resolved in accordance with the
                  laws of Jaipur, India, and the exclusive jurisdiction of the
                  courts in Jaipur shall apply.
                </p>
                <h4 className="mt-3 font-semibold">Cookies</h4>
                <p className="text-zinc-700">
                  We do not use cookies or similar tracking technologies on our
                  Website.
                </p>
                <h4 className="mt-3 font-semibold">Data Retention</h4>
                <p className="text-zinc-700">
                  We do not store user data beyond the scope necessary to
                  fulfill the intended purpose of the information provided. User
                  data provided for inquiries is retained only for as long as
                  necessary to respond to the inquiry effectively.
                </p>
                <h4 className="mt-3 font-semibold ">
                  Changes to this Privacy Policy
                </h4>
                <p className="text-zinc-700">
                  We reserve the right to update or modify this Privacy Policy
                  at any time. Any changes will be effective immediately upon
                  posting the revised Privacy Policy on the Website.
                </p>
                <h4 className="mt-3 font-semibold ">Contact Us</h4>
                <p className="text-zinc-700">
                  If you have any questions or concerns about this Privacy
                  Policy or the handling of your personal information, please
                  contact us at{" "}
                  <a
                    href="mailto:contact@placestovisitindia.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact@placestovisitindia.com
                  </a>
                </p>{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
