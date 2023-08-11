import { Server } from "socket.io";

import jwt from "../src/services/jwt";
import constants from "../src/constants";

let socketIoServer: Server | null = null;

function init(httpServer: any): void {
  // create socket server
  const socketOptions = { cors: { origin: "*" } };
  socketIoServer = new Server(httpServer, socketOptions);

  // Get all namespaces
  const SOCKET_NAMESPACE = constants.SOCKET.NAMESPACES;
  const allNameSpaces = [SOCKET_NAMESPACE.AUCTION, SOCKET_NAMESPACE.BID];

  // create namespaces
  allNameSpaces.forEach((nameSpace) => {
    createNamespaceById(nameSpace);
  });

  socketIoServer.on("connection", function (socketConnection) {});
}

function createNamespaceById(nameSpace: string) {
  if (
    nameSpace &&
    socketIoServer &&
    socketIoServer._nsps &&
    !socketIoServer._nsps.has(nameSpace)
  ) {
    socketIoServer.of(nameSpace).use((socket, next) => {
      socketValidator(socket, next);
    });

    socketIoServer.of(nameSpace).on("connection", (connectionObject) => {});
  }
}

function socketValidator(socket: any, next: any) {
  try {
    const token = socket?.handshake?.headers?.authorization;

    if (!token) return;

    socket.user = jwt.decryptToken(token);
    next();
  } catch (error) {
    console.log(error);
  }
}

// function removeNameSpace(nameSpace: any) {
//   if (!socketIoServer) return;

//   const socketNamespace = socketIoServer.of(nameSpace);

//   if (socketNamespace) socketNamespace.removeAllListeners();
// }

function pushDataByNamespace(nameSpace: string, topic: any, data: any) {
  if (socketIoServer && socketIoServer._nsps.has(nameSpace)) {
    socketIoServer.of(nameSpace).emit(topic, data);
  }
}

export default { init, pushDataByNamespace };
