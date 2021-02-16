import db from "../models";

class CronsController {
  async store(chat_id: number) {
    try {
      const exists = await db.crons.findOne({ where: { chat_id } });
      if (!exists) await db.crons.create({ chat_id });
      return true;
    } catch (error) {
      console.error("you cannot create");
      return false;
    }
  }

  async index(): Promise<[]> {
    try {
      return await db.crons.findAll();
    } catch (error) {
      console.error("you cannot access");
      return [];
    }
  }

  async destroy(chat_id: number) {
    try {
      await db.crons.destroy({ where: { chat_id } });
      return true;
    } catch (error) {
      console.error("you cannot delete");
      return false;
    }
  }
}

export default CronsController;
