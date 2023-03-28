import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { mysqlConfig } from "../../config.js";
import { adminSchema } from "../models/Admin.js";

export const registerAdmin = async (req, res) => {
  let userData = req.body;

  try {
    userData = await adminSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect email or password" }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(mysqlConfig);

    const [data] = await con.execute(
      `INSERT INTO defaultdb.admin_users (username, password) VALUES (${mysql.escape(
        userData.username
      )}, '${hashedPassword}')`
    );

    await con.end();

    return res.status(200).send(data).end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" });
  }
};
