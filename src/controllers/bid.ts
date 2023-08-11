import { BidInput } from "../types/interfaces";

import dbConnect from "../../config/database";

import constants from "../constants";
import socket from "../../config/socket";

const { SOCKET } = constants;

const bidController = {
  createBid: async (input: BidInput, user: Object) => {
    try {
      const pool = await dbConnect();

      const { auction_id, bid_amount } = input;
      const { id, email, displayname }: any = user;

      const latestBidQuery = `
            SELECT bid_amount
            FROM bids
            WHERE auction_id = $1
            ORDER BY bid_amount DESC
            LIMIT 1;
            `;
      const latestBidResult = await pool.query(latestBidQuery, [auction_id]);
      const latestBid = latestBidResult.rows[0]?.bid_amount || 0;

      if (bid_amount <= latestBid) {
        throw new Error("Bid amount must be higher than the latest bid.");
      }

      const query = `
            INSERT INTO bids (user_id, auction_id, bid_amount, bid_time)
            SELECT
              $1 AS user_id,
              $2 AS auction_id,
              $3 AS bid_amount,
              NOW() AS bid_time
            FROM auctions
            WHERE
              id = $2
              AND status = true
              AND end_time > NOW()
              AND user_id != $1
            RETURNING *;
          `;

      const values = [id, auction_id, bid_amount];

      const result = await pool.query(query, values);

      pool.end();

      if (result.rows.length === 0) {
        throw new Error("Bid creation failed");
      }

      result.rows[0].email = email;
      result.rows[0].displayname = displayname;

      socket.pushDataByNamespace(
        SOCKET.NAMESPACES.BID,
        SOCKET.TOPICS.CREATE,
        result.rows[0]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  getBids: async (
    auction_id: Number,
    limit: number,
    offset: number,
    sortby: string,
    sortorder: "asc" | "desc"
  ) => {
    try {
      const pool = await dbConnect();

      const query = `
        SELECT
          b.id AS id,
          b.user_id AS user_id,
          u.displayname AS displayname,
          u.email AS email,
          b.auction_id AS auction_id,
          b.bid_amount AS bid_amount,
          b.bid_time AS bid_time
        FROM bids AS b
        INNER JOIN users AS u ON b.user_id = u.id
        WHERE b.auction_id = $1
        ORDER BY ${sortby} ${sortorder}
        LIMIT $2 OFFSET $3
      `;

      const result = await pool.query(query, [auction_id, limit, offset]);

      pool.end();

      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

export default bidController;
