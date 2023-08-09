import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

const { HASURA_ACCESS_KEY } = process.env;

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ACCESS_KEY,
};

export async function makeHasuraApiCall(
  query: string,
  variables: object
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      "https://magical-tomcat-34.hasura.app/v1/graphql",
      { query, variables },
      { headers }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
