import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { ITokenContext, TokenContext } from "../context/TokenContext";

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

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(url, { accessTokenFactory: () => `${tokenInCtx}` })
      .withAutomaticReconnect()
      .build();

    await configureOnHandler(connect);

    connectionRef.current = connect;
    setConnection(connect);

    try {
      await connect.start();
      console.log("Connectted to SignalR server!");
    } catch (error) {
      console.log(`Error when starting connection: ${error}`);
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
