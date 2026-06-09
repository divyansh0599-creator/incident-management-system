import api from "./api";

export const getIncidents = async () => {
  const response = await api.get("/incidents");

  return response.data;
};

export const createIncident = async (incidentData) => {
  const response = await api.post(
    "/incidents",
    incidentData
  );

  return response.data;
};

export const getIncidentById = async (
  incidentId
) => {
  const response = await api.get(
    `/incidents/${incidentId}`
  );

  return response.data;
};

export const updateIncidentStatus = async (
  incidentId,
  status
) => {
  const response = await api.patch(
    `/incidents/${incidentId}/status`,
    {
      status,
    }
  );

  return response.data;
};