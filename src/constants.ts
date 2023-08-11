const OTP_CONSTS = {
  REQUEST_TYPES: {
    ALL_VALUES: ["forgotpassword", "register"],
    FORGOT_PASSWORD: "forgotpassword",
    REGISTER: "register",
  },
};

const SOCKET = {
  NAMESPACES: {
    AUCTION: "/auction",
    BID: "/bid",
  },
  TOPICS: {
    CREATE: "create",
    UPDATE: "update",
  },
};

export default { OTP_CONSTS, SOCKET };
