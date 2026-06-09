import { useEffect, useState } from "react";

import {
  getIncidentById,
  updateIncidentStatus,
} from "../../services/incidentService";

const IncidentDetailsModal = ({
  isOpen,
  onClose,
  incidentId,
  onSuccess,
}) => {
  const [incident, setIncident] =
  useState(null);

const [status, setStatus] =
  useState("");

const [loading, setLoading] =
  useState(false);

  useEffect(() => {
  if (!incidentId) return;

  const fetchIncident = async () => {
    try {
      const data =
        await getIncidentById(
          incidentId
        );

      setIncident(data);

      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  fetchIncident();
}, [incidentId]);
 if (!isOpen) return null;

const handleSave = async () => {
  try {
    setLoading(true);

    await updateIncidentStatus(
      incidentId,
      status
    );

    await onSuccess();

    onClose();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
   onClick={onClose}>
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
    onClick={(e) => e.stopPropagation()} >
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-bold">
      Incident Details
    </h2>

    <button
      onClick={onClose}
      className="text-xl text-gray-500 hover:text-black"
    >
      ×
    </button>
  </div>

  {!incident ? (
    <p>Loading...</p>
  ) : (
    <div className="space-y-5">

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Title
        </label>

        <p className="font-medium">
          {incident.title}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Description
        </label>

        <p>
          {incident.description}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Priority
        </label>

        <p>
          {incident.priority}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-500">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

          <option value="Closed">
            Closed
          </option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          {loading
            ? "Saving..."
            : "Save"}
        </button>
      </div>
    </div>
  )}
    </div>
  </div>
  );
};

export default IncidentDetailsModal;