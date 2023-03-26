import mysql from "mysql2/promise";
import { mysqlConfig } from "../../config.js";
import { userSchema } from "../models/User.js";

export const registerUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect user data" }).end();
  }

  const query = `INSERT INTO defaultdb.users (name, surname, email, birthdate, event_name, event_id) VALUES (${mysql.escape(
    userData.name
  )}, ${mysql.escape(userData.surname)}, ${mysql.escape(
    userData.email
  )}, ${mysql.escape(userData.birthdate)}, ${mysql.escape(
    userData.event_name
  )},${mysql.escape(userData.event_id)} )`;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    await con.execute(query);

    await con.end();

    return res.status(200).send("User was registered to the event").end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" });
  }
};

export const getUsers = async (_, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(`SELECT * FROM defaultdb.users`);

    await con.end();

    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(err).end();

    return console.error(err);
  }
};

export const getSpecificUser = async (req, res) => {
  const { id } = req.params;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(
      `SELECT * FROM defaultdb.users WHERE id = ${mysql.escape(id)}`
    );

    await con.end();

    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(err).end();

    return console.error(err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(
      `DELETE FROM defaultdb.users WHERE id = ${mysql.escape(id)}`
    );

    await con.end();

    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(err).end();

    return console.error(err);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect user data" }).end();
  }

  const query = `UPDATE defaultdb.users SET name = ${mysql.escape(
    userData.name
  )}, surname = ${mysql.escape(userData.surname)}, email = ${mysql.escape(
    userData.email
  )}, birthdate = ${mysql.escape(
    userData.birthdate
  )}, event_name = ${mysql.escape(
    userData.event_name
  )}, event_id = ${mysql.escape(userData.event_id)} WHERE id = ${mysql.escape(
    id
  )}`;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    await con.execute(query);

    await con.end();

    return res.status(200).send("User was updated").end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" });
  }
};
