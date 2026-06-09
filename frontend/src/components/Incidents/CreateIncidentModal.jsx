import { useState } from "react";
import { createIncident } from "../../services/incidentService";

const CreateIncidentModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  priority: "Medium",
});

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    await createIncident(formData);

    onSuccess();

    onClose();
  } catch (error) {
    setError(
      error?.response?.data?.detail ||
      "Failed to create incident"
    );
  } finally {
    setLoading(false);
  }
};
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
   onClick={onClose}>
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
    onClick={(e) => e.stopPropagation()} >
      <h1 className="mb-6 text-3xl font-bold">
        Create Incident
      </h1>

      <form
  onSubmit={handleSubmit}
  className="space-y-5"
>
  <div>
    <label className="mb-2 block font-medium">
      Title
    </label>

    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
      placeholder="Enter incident title"
      required
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Description
    </label>

    <textarea
      name="description"
      rows="5"
      value={formData.description}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
      placeholder="Describe the incident"
      required
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Priority
    </label>

    <select
      name="priority"
      value={formData.priority}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    >
      <option value="Low">
        Low
      </option>

      <option value="Medium">
        Medium
      </option>

      <option value="High">
        High
      </option>

      <option value="Critical">
        Critical
      </option>
    </select>
  </div>

  {error && (
    <p className="text-sm text-red-500">
      {error}
    </p>
  )}

  <div className="flex justify-end gap-3">
    <button
      type="button"
      onClick={onClose}
      className="rounded-lg border px-4 py-2"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={loading}
      className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
    >
      {loading
        ? "Creating..."
        : "Create Incident"}
    </button>
  </div>
</form>
    </div>
  </div>
);
};

export default CreateIncidentModal;