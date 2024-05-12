const bcrypt = require("bcryptjs");

class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.created_at = null;
    this.email = null;
    this.password = null;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      email: this.email,
    };
  }
}

module.exports = User;
