import { api } from "./api";
import moment from "moment";
import { NeoResponseOK, NeoWsResponse, NeoPromise } from "../../types/neoWs";
import { Average } from "../utils/Avarage";
import CronsController from "../controllers/cronsController";

require("dotenv").config();
const token = process.env["NEO_TOKEN"] as string;
const today = moment().format("YYYY-MM-DD");

export default class NeoWs {
  async getTodayDetails(): NeoPromise {
    try {
      const response = await api.get("/rest/v1/feed/today", {
        api_key: token,
        detailed: true,
      });
      const data = response.data as NeoWsResponse;
      const near_earth = data.near_earth_objects[today];
      const result = near_earth
        .filter(
          (item: NeoResponseOK) => !!item.is_potentially_hazardous_asteroid
        )
        .map(
          (item: NeoResponseOK) =>
            `Nome: *${item.name}*, Diâmetro estimado: *${Average(
              item.estimated_diameter.kilometers.estimated_diameter_max,
              item.estimated_diameter.kilometers.estimated_diameter_min
            )}km*, Distância em que ele irá passar em relação à Terra: *${Math.round(
              Number(item.close_approach_data[0].miss_distance.kilometers)
            )}km*, Velocidade relativa à Terra: *${Math.round(
              Number(
                item.close_approach_data[0].relative_velocity
                  .kilometers_per_hour
              )
            )}km/h*, Mais informações: ${item.nasa_jpl_url}`
        );
      if (result) return result;
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createCron(chat_id: number) {
    return await new CronsController().store(chat_id);
  }

  async getCrons() {
    const crons = await new CronsController().index();
    if (crons.length > 0) return crons;
    return [];
  }

  async cancelCrons(chat_id: number) {
    return await new CronsController().destroy(chat_id);
  }
}
