import { useState } from "react";
import Enquiry from "../components/ui/Enquiry";

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<"Custom Beats" | "Mixing and Mastering">(
    "Custom Beats"
  );
  return (
    <div className="w-full h-full md:px-40 px-4 py-10 pt-5 flex flex-col items-center justify-center text-white">
      <h1 className="w-full text-left text-white md:text-[40px] md:mb-6 text-2xl font-extrabold">
        Services
      </h1>
      <div className="max-md:mt-5 flex w-full justify-center md:justify-start items-center gap-4 md:gap-8 max-md:flex-wrap">
        <div className="max-md:p-4 flex h-max rounded-md items-center text-center flex-col w-full md:w-max gap-2 md:gap-4">
          <img
            src="/kdstick.JPG"
            alt=""
            className="w-[250px] h-[220px] object-cover rounded-md"
            width={500}
            height={500}
          />
          <div className="">
            <h1 className="text-xl font-bold">Custom Beats </h1>
            <p className="text-sm text-[#999]">£150.00</p>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setType("Custom Beats");
            }}
            className="w-max px-8 rounded text-xs text-black font-bold bg-[#737cde] py-2 text-center cursor-pointer"
          >
            MAKE ENQUIRY
          </button>
        </div>
        <div className="max-md:p-4 flex h-max rounded-md items-center text-center flex-col w-full md:w-max gap-2 md:gap-4">
          <img
            src="/kdsticks.JPG"
            alt=""
            className="w-[250px] h-[220px] object-cover rounded-md"
            width={500}
            height={500}
          />
          <div className="">
            <h1 className="text-xl font-bold">Mixing and Mastering</h1>
            <p className="text-sm text-[#999]">£150.00</p>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setType("Mixing and Mastering");
            }}
            className="w-max px-8 rounded text-xs text-black font-bold bg-[#737cde] py-2 text-center cursor-pointer"
          >
            MAKE ENQUIRY
          </button>
        </div>
      </div>
      {showModal && (
        <Enquiry hideModal={() => setShowModal(false)} type={type} />
      )}
    </div>
  );
};

export default Services;
