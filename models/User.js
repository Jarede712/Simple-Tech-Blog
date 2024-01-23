const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const bcrypt = require("bcrypt");

class User extends Model {
  // Method to check password
  checkPassword(loginPw) {
    try {
      return bcrypt.compareSync(loginPw, this.password);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false; // Return false in case of an error
    }
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length of password
      },
    },
  },
  {
    hooks: {
      // Before saving, hash the password
      async beforeCreate(newUser) {
        try {
          newUser.password = await bcrypt.hash(newUser.password, 10);
        } catch (error) {
          console.error("Error hashing password:", error);
          throw new Error("Error hashing password");
        }
      },
      async beforeUpdate(updatedUser) {
        try {
          if (updatedUser.password) {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
          }
        } catch (error) {
          console.error("Error hashing password:", error);
          throw new Error("Error hashing password");
        }
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
