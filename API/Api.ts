import axios from "axios";
import Env from "../env";

export const geoApi = async (lat: any, lng: any): Promise<any> => {
  const response: any = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Env.googleApiKey}`
  );
  return response;
};
