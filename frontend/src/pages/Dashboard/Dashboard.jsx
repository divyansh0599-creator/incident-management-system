import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getIncidents } from "../../services/incidentService";
import CreateIncidentModal from "../../components/Incidents/CreateIncidentModal";
import IncidentDetailsModal from "../../components/Incidents/IncidentDetailsModal";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] =
  useState(false);
  const [selectedIncidentId, setSelectedIncidentId] =
  useState(null);

const [isDetailsOpen, setIsDetailsOpen] =
  useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleIncidentClick = (
  incidentId
) => {
  setSelectedIncidentId(incidentId);

  setIsDetailsOpen(true);
};

 const fetchIncidents = async () => {
  try {
    const data = await getIncidents();

    setIncidents(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchIncidents();
}, []);

  return (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Incident Management Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, {user?.first_name} {user?.last_name}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto"
        >
          Create Incident
        </button>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600 sm:w-auto"
        >
          Logout
        </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-slate-500">
            Total Incidents
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600 sm:text-4xl">
            {incidents.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-slate-500">
            Open Incidents
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500 sm:text-4xl">
            {
              incidents.filter(
                (i) => i.status === "Open"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-slate-500">
            Resolved Incidents
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500 sm:text-4xl">
            {
              incidents.filter(
                (i) => i.status === "Resolved"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* User Info */}
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            User Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="font-medium">
                {user?.first_name} {user?.last_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="break-words font-medium">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Role
              </p>

              <p className="font-medium capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Recent Incidents
          </h2>

          {loading ? (
            <p>Loading incidents...</p>
          ) : incidents.length === 0 ? (
            <p>No incidents found.</p>
          ) : (
            <>
            <div className="space-y-3 md:hidden">
              {incidents.map((incident) => (
                <button
                  key={incident.id}
                  type="button"
                  onClick={() =>
                    handleIncidentClick(
                      incident.id
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-slate-800">
                      {incident.title}
                    </p>

                    <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {incident.status}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
                      {incident.priority}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">
                      Title
                    </th>
                    <th className="py-3 text-left">
                      Priority
                    </th>
                    <th className="py-3 text-left">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {incidents.map((incident) => (
                    <tr
                      key={incident.id}
                      tabIndex={0}
                      onClick={() =>
                        handleIncidentClick(
                          incident.id
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === " "
                        ) {
                          handleIncidentClick(
                            incident.id
                          );
                        }
                      }}
                      className="cursor-pointer border-b hover:bg-slate-50"
                    >
                      <td className="py-4">
                        {incident.title}
                      </td>

                      <td className="py-4">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                          {incident.priority}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {incident.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
        </div>

      </div>
    </div>
    <CreateIncidentModal
      isOpen={isModalOpen}
      onClose={() =>
        setIsModalOpen(false)
      }
      onSuccess={fetchIncidents}
    />
    <IncidentDetailsModal
      isOpen={isDetailsOpen}
      incidentId={selectedIncidentId}
      onClose={() => {
        setIsDetailsOpen(false);
        setSelectedIncidentId(null);
      }}
      onSuccess={fetchIncidents}
    />
  </div>
);
};

export default Dashboard;
