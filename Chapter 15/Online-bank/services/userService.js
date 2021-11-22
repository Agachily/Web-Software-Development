import { executeQuery } from "../database/database.js";

const findUsersWithEmail = async (email) => {
  return await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email,
  );
};

const addUser = async (email, passwordHash) => {
  await executeQuery(
    "INSERT INTO users (email, password) VALUES ($1, $2);",
    email,
    passwordHash,
  );
};

const getAccounts = async (userID) => {
  return await executeQuery(
    "SELECT * FROM accounts WHERE user_id = $1",
    userID,
  )
}

const getAccount = async (accountID) => {
  return await executeQuery(
    "SELECT * FROM accounts WHERE id = $1",
    accountID,
  )
}


const addCount = async (countName, userID) => {
  await executeQuery(
    "INSERT INTO accounts (name, user_id) VALUES ($1, $2);",
    countName,
    userID,
  );
}

const deposits = async (currentAmount, accountID) => {
  await executeQuery(
    "UPDATE accounts SET balance=($1) WHERE id=($2);",
    currentAmount,
    accountID,
  );
}

export { addUser, findUsersWithEmail, getAccounts, addCount, getAccount, deposits};
