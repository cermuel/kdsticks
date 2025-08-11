import { useEffect, useState } from "react";
import { discography } from "../constants";

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768);
    });
  }, []);

  return (
    <div className="w-full h-full md:px-40 px-4 py-10 pt-5 flex flex-col items-center justify-center text-white">
      <h1 className="w-full text-center text-white md:text-[40px] md:mb-6 text-2xl font-extrabold">
        About
      </h1>
      <img
        src="/logo.jpg"
        className="md:w-40 max-md:hidden w-20 aspect-square rounded-full my-2"
        alt="kdsticks"
      />
      <div className="max-md:flex gap-2 items-center max-md:mt-4">
        <img
          src="/logo.jpg"
          className="md:w-40 md:hidden w-20 aspect-square rounded-full my-2"
          alt="kdsticks"
        />
        <div>
          <h2 className="font-bold max-md:hidden md:text-2xl md:my-2">
            Biography
          </h2>
          <p className="max-md:text-sm font-semibold">
            Multi Platinum Music Producer 💿 IG: @kd_sticks
          </p>
        </div>
      </div>
      <h2 className="font-bold md:text-2xl mb-2 mt-10 md:mt-20">Discography</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {discography.map((d) => (
          <div className={`my-4`} key={d.url}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: 12 }}
              src={d.url}
              width="100%"
              height={isMobile ? "250" : "100"}
              allowFullScreen
              className=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <div className="relative">
              <span
                className={`text-gray-400 text-sm absolute ${isMobile ? "-top-2" : " -top-4"}`}
              >
                {d.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
