import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import ContactInput from "../components/ui/ContactInput";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
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

    const body = `${form.message}\n\nBest regards,\n${form.name}`;
    const mailtoLink = `mailto:egbebiolamide@gmail.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setTimeout(() => setSending(false), 1000);
  };

  return (
    <div className="w-full h-full md:px-40 px-4 py-10 pt-5">
      <h1 className="w-full md:text-center text-white md:text-[40px] md:mb-6 text-2xl font-extrabold">
        Contact
      </h1>

      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] space-y-10"
        >
          <div className="md:flex gap-4 max-md:space-y-10">
            <ContactInput
              label="YOUR NAME"
              id="name"
              name="name"
              value={form.name}
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
            label="Subject"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            error={errors.subject}
          />
          <ContactInput
            label="Message"
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
          />

          <div className="w-full flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className="bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer tracking-wide p-4 font-bold text-sm rounded-sm"
            >
              {sending ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
