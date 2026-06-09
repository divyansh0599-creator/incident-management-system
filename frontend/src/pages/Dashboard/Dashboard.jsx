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
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Incident Management Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, {user?.first_name} {user?.last_name}
          </p>
        </div>
        <div className="flex gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Incident
        </button>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Incidents
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {incidents.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Open Incidents
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-500">
            {
              incidents.filter(
                (i) => i.status === "OPEN"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Resolved Incidents
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-500">
            {
              incidents.filter(
                (i) => i.status === "RESOLVED"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* User Info */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
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

              <p className="font-medium">
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
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Recent Incidents
          </h2>

          {loading ? (
            <p>Loading incidents...</p>
          ) : incidents.length === 0 ? (
            <p>No incidents found.</p>
          ) : (
            <div className="overflow-x-auto">
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
                      onClick={() =>
                        handleIncidentClick(
                          incident.id
                        )
                      }
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