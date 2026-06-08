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