import bcrypt from "bcrypt";
import jwt from "../services/jwt";
import { makeHasuraApiCall } from "../services/hasura";

const userController = {
  save: async (displayName: string, email: string, password: string) => {
    try {
      password = await bcrypt.hash(password, 10);

      const mutation = `
        mutation ($displayName: String!, $email: String!, $password: String!) {
          insert_users_one(object: { displayname: $displayName, email: $email, password: $password }) {
            id
          }
        }
      `;

      const variables = {
        displayName,
        email,
        password,
      };

      const response = await makeHasuraApiCall(mutation, variables);

      return response?.data?.data;
    } catch (err) {
      throw err;
    }
  },

  updatePassword: async (email: string, password: string) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const mutation = `
        mutation ($filter: users_bool_exp!, $password: String!) {
          update_users(_set: { password: $password }, where: $filter) {
            affected_rows
          }
        }
      `;

      const variables = {
        filter: {
          email: {
            _eq: email,
          },
        },
        password: hashedPassword,
      };

      const response = await makeHasuraApiCall(mutation, variables);

      return response?.data?.data;
    } catch (err) {
      throw err;
    }
  },

  checkEmail: async (email: string) => {
    try {
      const query = `
        query ($email: String!) {
          users(where: { email: { _eq: $email } }) {
            id
          }
        }
      `;

      const variables = {
        email,
      };

      const response = await makeHasuraApiCall(query, variables);

      return response.data.data.users.length > 0;
    } catch (err) {
      throw err;
    }
  },

  verifyUserPassword: async (
    email: string,
    password: string,
    isGenerateToken = false
  ) => {
    try {
      const query = `
        query ($filter: users_bool_exp!) {
          users(where: $filter) {
            email
            password
            displayname
          }
        }
      `;

      const variables = {
        filter: {
          email: {
            _eq: email,
          },
        },
      };

      const response = await makeHasuraApiCall(query, variables);

      const user = response?.data?.data?.users[0];

      // Check if user exists
      if (!user) return { user: false };

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return { user: false };

      delete user.password;

      const responseObj: any = { user };

      // Generate token
      if (isGenerateToken) {
        const token = jwt.generateToken(user);
        responseObj.token = token;
      }

      return responseObj;
    } catch (err) {
      throw err;
    }
  },
};

export default userController;
