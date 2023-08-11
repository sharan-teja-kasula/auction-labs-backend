import { AuctionInput } from "../types/interfaces";

import dbConnect from "../../config/database";

import constants from "../constants";
import socket from "../../config/socket";

const { SOCKET } = constants;

const auctionController = {
  createAuction: async (input: AuctionInput, userId: Number) => {
    try {
      const pool = await dbConnect();

      const { title, description, category, imageurl, start_time, end_time } =
        input;

      const query = `
        INSERT INTO auctions (title, description, category, imageurl, start_time, end_time, current_bid_amount, user_id, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;

      const values = [
        title,
        description,
        category,
        imageurl,
        start_time,
        end_time,
        0,
        userId,
        1,
      ];

      const result = await pool.query(query, values);

      pool.end();

      if (result.rows.length === 0) {
        throw new Error("Auction creation failed");
      }

      socket.pushDataByNamespace(
        SOCKET.NAMESPACES.AUCTION,
        SOCKET.TOPICS.CREATE,
        result.rows[0]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  updateAuctionStatus: async (id: Number, status: Boolean, userId: Number) => {
    try {
      const pool = await dbConnect();

      const updateQuery = `
        UPDATE auctions
        SET status = $1
        WHERE id = $2 AND user_id = $3 AND end_time > NOW()
        RETURNING *;
      `;

      const updateValues = [status, id, userId];

      const updateResult = await pool.query(updateQuery, updateValues);

      pool.end();

      if (updateResult.rows.length === 0) {
        throw new Error("Auction not found, unauthorized, or expired");
      }

      socket.pushDataByNamespace(
        SOCKET.NAMESPACES.AUCTION,
        SOCKET.TOPICS.UPDATE,
        updateResult.rows[0]
      );

      return updateResult.rows[0];
    } catch (error) {
      throw error;
    }
  },
  getAuctions: async (
    filter: string,
    limit: number,
    offset: number,
    sortby: string,
    sortorder: "asc" | "desc"
  ) => {
    try {
      const pool = await dbConnect();

      const query = `
        SELECT *
        FROM auctions
        WHERE title ILIKE $1
        ORDER BY ${sortby} ${sortorder}
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [`%${filter}%`, limit, offset]);

      pool.end();

      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

export default auctionController;
