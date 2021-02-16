module.exports = (sequelize: any, DataTypes: any) => {
  const crons = sequelize.define("crons", {
    chat_id: DataTypes.STRING,
  });

  return crons;
};
