import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    dispatch(resetForm()); // Reset form after submission
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Contact Me</h2>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => dispatch(updateField({ field: "name", value: e.target.value }))}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => dispatch(updateField({ field: "email", value: e.target.value }))}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => dispatch(updateField({ field: "message", value: e.target.value }))}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
