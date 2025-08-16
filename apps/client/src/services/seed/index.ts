import { apiService } from "../api";

export const createSeed = async () => {
  const response = await apiService({
    hostname: "api",
    pathname: "seed",
  });

  return response;
};
