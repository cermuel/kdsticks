import { useState } from "react";
import ContactInput from "./ContactInput";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Enquiry = ({
  hideModal,
  type,
}: {
  hideModal: () => void;
  type: "Custom Beats" | "Mixing and Mastering";
}) => {
  const [form, setForm] = useState({
    artistName: "",
    email: "",
    phoneNumber: "",
    projectName: "",
    budget: "0",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.artistName.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.budget || form.budget == "0")
      newErrors.budget = "Budget is required.";
    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);

    const body = `
Enquiry Type: ${type}

Artist Name: ${form.artistName}
Email: ${form.email}
Phone Number: ${form.phoneNumber}
Project Name: ${form.projectName}
Budget (GBP): £${form.budget}

Project Description:
${form.description}
  `;

    const subject = `Enquiry - ${type} - ${form.projectName || "Untitled Project"}`;

    const mailtoLink = `mailto:egbebiolamide@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setTimeout(() => setSending(false), 1000);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center px-4"
      onClick={hideModal}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[600px] space-y-10 bg-[#121212] p-4 pt-8 rounded-md"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-white font-bold md:text-2xl text-lg">{type}</h1>
          <IoClose onClick={hideModal} size={20} className="cursor-pointer" />
        </div>
        <div className="md:flex gap-4 max-md:space-y-10">
          <ContactInput
            label="ARTIST NAME"
            id="artistName"
            name="artistName"
            value={form.artistName}
            onChange={handleChange}
            error={errors.name}
          />

          <ContactInput
            label="Email address"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <ContactInput
          label="PHONE NUMBER"
          id="phoneNumber"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <div className="md:flex gap-4 max-md:space-y-10">
          <ContactInput
            label="PROJECT NAME"
            id="projectName"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
          />

          <ContactInput
            label="BUDGET (GBP £)"
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            type="number"
            error={errors.budget}
          />
        </div>
        <ContactInput
          label="Project Description"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={sending}
            className="bg-[#737cde] text-black flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer tracking-wide p-4 font-bold text-sm rounded-sm w-full"
          >
            {sending ? (
              <AiOutlineLoading className="animate-spin" size={18} />
            ) : (
              "Send Enquiry"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Enquiry;
