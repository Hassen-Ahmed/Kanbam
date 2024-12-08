import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { ITokenContext, TokenContext } from "../context/TokenContext";
import { logger } from "../utils/logger";

interface IUseSignalRConnection {
  url: string;
  configureOnConnections: (connection: signalR.HubConnection) => Promise<void>;
}

export default function useSignalRConnection({
  url,
  configureOnConnections,
}: IUseSignalRConnection) {
  const { tokenInCtx } = useContext(TokenContext) as ITokenContext;
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const handleConnection = useCallback(async () => {
    if (!tokenInCtx) return;

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(url, { accessTokenFactory: () => `${tokenInCtx}` })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();

    await configureOnConnections(connect);

    connectionRef.current = connect;
    setConnection(connect);

    try {
      await connect.start();
      logger("info", `Connectted to SignalR server! \nUrl: (${url})\n`);
    } catch (error) {
      logger("error", `Error when starting connection: ${error}`);
    }
  }, [url, configureOnConnections, tokenInCtx]);

  useEffect(() => {
    handleConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current
          .stop()
          .then(() =>
            logger("success", `Stoped the connectin for Hub Url: ${url}`)
          )
          .catch((error) =>
            logger("error", `Error stopping SignalR connection: ${error}`)
          );
      }
    };
  }, [handleConnection, url]);

  return connection;
}
