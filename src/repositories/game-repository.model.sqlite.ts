
import sequelize from './database';
import { DataTypes } from 'sequelize';


  const GameDbModel = sequelize.define('Game', {
    publisherId: DataTypes.STRING,
    name: DataTypes.STRING,
    platform: DataTypes.STRING,
    storeId: DataTypes.STRING,
    bundleId: DataTypes.STRING,
    appVersion: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
  }, {});


  export default GameDbModel;
