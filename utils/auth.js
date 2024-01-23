const bcrypt = require("bcrypt");

const auth = {
  // Hashes a password
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  // Compares a plaintext password with a hashed password
  comparePassword: async (plaintextPassword, hashedPassword) => {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  },
};

module.exports = auth;
