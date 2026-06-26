import { useEffect, useState,useContext} from "react";

import {
  getIncidentById,
  updateIncident,
} from "../../services/incidentService";
import { getUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";

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

const [fetching, setFetching] =
  useState(false);

const [error, setError] =
  useState("");

const [users, setUsers] =
  useState([]);

const [assignedToId, setAssignedToId] =
  useState("");

  const { user } =
  useContext(AuthContext);

  const canManageAssignment =
    user?.role === "Admin" ||
    user?.role === "Manager";


  useEffect(() => {
  if (!isOpen || !incidentId) {
    setIncident(null);
    setStatus("");
    setError("");
    return;
  }

  let isMounted = true;

  const fetchIncident = async () => {
    try {
      setFetching(true);
      setError("");
      setIncident(null);

      const data =
        await getIncidentById(
          incidentId
        );

      if (!isMounted) return;

      setIncident(data);

      setStatus(data.status);
      setAssignedToId(
        data.assigned_to_id || ""
    );
    } catch (error) {
      console.error(error);
      if (isMounted) {
        setError(
          error?.response?.data?.detail ||
          "Failed to load incident details"
        );
      }
    } finally {
      if (isMounted) {
        setFetching(false);
      }
    }
  };

  fetchIncident();

  return () => {
    isMounted = false;
  };
}, [isOpen, incidentId]);

useEffect(() => {
  if (!canManageAssignment) {
    return;
  }

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUsers();
}, [canManageAssignment]);

 if (!isOpen) return null;

const selectedUser = users.find(
  (user) =>
    String(user.id) === String(assignedToId)
);

const assignedUser = selectedUser ||
  incident?.assigned_to;

const assignedUserName = assignedUser
  ? `${assignedUser.first_name} ${assignedUser.last_name}`
  : "Unassigned";

const handleSave = async () => {
  try {
    setLoading(true);
    setError("");

    const payload = {
      status,
    };

    if (canManageAssignment) {
      payload.assigned_to_id =
        assignedToId || null;
    }

    await updateIncident(
      incidentId,
      payload
    );

    await onSuccess();

    onClose();
  } catch (error) {
    console.error(error);

    setError(
      error?.response?.data?.detail ||
      "Failed to update incident"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
   onClick={onClose}>
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-xl sm:p-6"
    onClick={(e) => e.stopPropagation()} >
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold sm:text-2xl">
      Incident Details
    </h2>

    <button
      onClick={onClose}
      className="text-xl text-gray-500 hover:text-black"
    >
      ×
    </button>
  </div>

  {fetching ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
      {error}
    </p>
  ) : !incident ? (
    <p>No incident selected.</p>
  ) : (
    <div className="space-y-5">

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Title
        </label>

        <p className="break-words font-medium">
          {incident.title}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Description
        </label>

        <p className="break-words">
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

      <div>
        <label className="mb-1 block text-sm text-gray-500">
          Assigned To
        </label>

        <p className="font-medium">
          {assignedUserName}
        </p>
      </div>

      {canManageAssignment && (
  <div>
    <label className="mb-2 block text-sm text-gray-500">
      Update Assignment
    </label>

    <select
      value={assignedToId}
      onChange={(e) =>
        setAssignedToId(
          e.target.value
            ? Number(e.target.value)
            : ""
        )
      }
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    >
      <option value="">
        Unassigned
      </option>

      {users.map((user) => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.first_name} {user.last_name}
        </option>
      ))}
    </select>
  </div>
)}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
