type LogType = "success" | "error" | "info" | "table";

export const logger = (message: string | object, type: LogType = "info") => {
  // process.env.NODE_ENV will have checked by vites.
  // Skip logging in production environments.
  if (process.env.NODE_ENV === "production") return;

  const timestamp = new Date().toISOString();
  const logMessage =
    typeof message == "string"
      ? `[${timestamp}] ${message} `
      : { timestamp, ...message };

  const logFunctions: Record<LogType, (msg: string | object) => void> = {
    info: console.info,
    success: console.log,
    error: console.error,
    table: console.table,
  };

  logFunctions[type](logMessage);
};
