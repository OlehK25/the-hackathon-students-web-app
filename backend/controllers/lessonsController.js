const AppDataSource = require("../data-source");

class LessonsController {
  constructor() {}

  async getLessonsData(req, res) {
    try {
      console.log(req)
      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  
}

module.exports = new LessonsController();
