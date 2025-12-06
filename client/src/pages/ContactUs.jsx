//TODO Libraries
import { useContext } from "react";
//TODO Components
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";
import ContactViews from "../components/users/ContactViews";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Main Function
const ContactUs = () => {
  //TODO Variables
  const { theme } = useContext(UserContext);
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-20">
      {/* Page Title */}
      <div className="text-center text-3xl pt-10 w-full">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-28">
        {/* Google Map */}
        <div className="w-full md:w-1/2 h-[350px] rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="store-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.214713636198!2d35.2615234!3d32.9368179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151da44e5edb2b4d%3A0x1b7cf84f3f2f412!2sMajd%20al-Krum!5e0!3m2!1sen!2sil!4v1697279400000!5m2!1sen!2sil"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div
          style={{
            background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
            transition: "background 0.3s ease",
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
          }}
          className="w-full md:w-1/2 flex flex-col justify-center items-start gap-6 bg-white p-6 rounded-2xl shadow-md"
        >
          <h3
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextPrimary
                  : LIGHT_MODE.TextPrimary,
            }}
            className="font-semibold text-2xl "
          >
            Our Store
          </h3>
          <p className=" leading-relaxed">
            20190, Majd-al-Kurom <br />
            Israel
          </p>

          <p className=" leading-relaxed">
            📞 Tel: <span className="font-medium">055-6609514</span> <br />
            ✉️ Email:{" "}
            <a
              style={{
                color: DARK_MODE.Accent,
              }}
              href="mailto:majdioa7sh@gmail.com"
              className="font-medium underline "
            >
              majdioa7sh@gmail.com
            </a>
          </p>

          <div className="border-t border-gray-300 w-full my-2"></div>

          <h3
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextPrimary
                  : LIGHT_MODE.TextPrimary,
            }}
            className="font-semibold text-2xl "
          >
            Careers at Forever
          </h3>
          <p>Learn more about our teams and job openings.</p>

          <button
            style={{
              background: DARK_MODE.Accent,
              color: "white",
            }}
            className="mt-2 border cursor-pointer px-8 py-3 text-sm font-medium rounded-full   transition-all duration-300"
          >
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />
      <ContactViews />
    </div>
  );
};

export default ContactUs;
