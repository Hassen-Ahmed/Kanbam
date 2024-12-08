type LogType = "success" | "error" | "info" | "table";

export const logger = (type: LogType = "info", message: string | object) => {
  // process.env.NODE_ENV will have checked by vites.
  // Skip logging in production environments.
  if (process.env.NODE_ENV === "production") return;

  // Stack trace for caller of this logger
  const error = new Error();
  const stack = error.stack || "";
  const stackLines = stack.split("\n");
  const callerLine = stackLines[2]?.trim();

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

  logFunctions[type](logMessage + "\n" + callerLine);
};
