const AppDataSource = require("../data-source");
const User  = require("../entity/users.entity");

class UsersController {
  constructor() {}

  async registerIser(req, res)
  {
    
  }

  async getAllUsers(req, res) {
    try {
      const users = await AppDataSource.getRepository(User).find();
      const usersJSON = users.map((user) => user.toJSON());
      return res.status(200).json(usersJSON);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  getMe(req, res) {
    return res.status(200).json({ user: req.body.user });
  }

  
}

module.exports = new UsersController();
