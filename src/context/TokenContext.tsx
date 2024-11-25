import { createContext, useCallback, useMemo, useState } from "react";

export interface ITokenContext {
  tokenInCtx: string | null;
  handleSetAccessToken: (tokenStr: string | null) => void;
}

export const TokenContext = createContext<ITokenContext | null>(null);

const TokenContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenInCtx, setAsscessToken] = useState<string | null>(null);

  const handleSetAccessToken = useCallback((tokenStr: string | null) => {
    setAsscessToken(() => tokenStr);
  }, []);

  const contextValue = useMemo(
    () => ({ tokenInCtx, handleSetAccessToken }),
    [tokenInCtx, handleSetAccessToken]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
