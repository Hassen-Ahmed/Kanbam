import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { ITokenContext, TokenContext } from "../context/TokenContext";
import { logger } from "../utils/logger";

interface IUseSignalRConnection {
  url: string;
  configureOnHandler: (connection: signalR.HubConnection) => Promise<void>;
}

export default function useSignalRConnection({
  url,
  configureOnHandler,
}: IUseSignalRConnection) {
  const { tokenInCtx } = useContext(TokenContext) as ITokenContext;
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const handleConnection = useCallback(async () => {
    if (!tokenInCtx) return;

    const isProduction = process.env.NODE_ENV === "production";

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(url, { accessTokenFactory: () => `${tokenInCtx}` })
      .withAutomaticReconnect()
      .configureLogging(
        !isProduction ? signalR.LogLevel.None : signalR.LogLevel.Information
      )
      .build();

    await configureOnHandler(connect);

    connectionRef.current = connect;
    setConnection(connect);

    try {
      await connect.start();
      logger("Connectted to SignalR server!", "info");
    } catch (error) {
      logger(`Error when starting connection: ${error}`, "error");
    }
  }, [url, configureOnHandler, tokenInCtx]);

  useEffect(() => {
    handleConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current
          .stop()
          .catch((error) =>
            console.error("Error stopping SignalR connection:", error)
          );
      }
    };
  }, [handleConnection]);

  return connection;
}
