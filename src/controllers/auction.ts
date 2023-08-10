import { AuctionInput } from "../types/interfaces";

import dbConnect from "../../config/database";

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

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  updateAuctionStatus: async (id: Number, status: Boolean, userId: Number) => {
    try {
      const pool = await dbConnect();

      // Add condition to verify end_date before update
      const updateQuery = `
        UPDATE auctions
        SET status = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *;
      `;

      const updateValues = [status, id, userId];

      const updateResult = await pool.query(updateQuery, updateValues);

      pool.end();

      if (updateResult.rows.length === 0) {
        throw new Error("Auction not found or unauthorized");
      }

      return updateResult.rows[0];
    } catch (error) {
      throw error;
    }
  },
  getAuctions: async (filter: string, limit: number, offset: number) => {
    try {
      const pool = await dbConnect();

      // Add sorting functionality as well
      const query = `
        SELECT *
        FROM auctions
        WHERE title ILIKE $1
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
