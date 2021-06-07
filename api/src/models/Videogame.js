const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate:{
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.STRING,
    },
    background_image:{
      type: DataTypes.STRING,
    }
  });
};
