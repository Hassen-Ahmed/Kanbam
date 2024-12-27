import { useEffect, useState } from "react";

export default function useAnimatekComp(animationDelay: number) {
  const [animObj, setAnimObj] = useState({
    animationDelay: `${animationDelay / 10}s`,
    animationFillMode: "forwards",
    opacity: "0",
    transform: "translateY(2rem)",
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimObj((preValue) => {
        return {
          ...preValue,
          animationFillMode: "none",
          opacity: "1",
          transform: "none",
        };
      });
    }, 1500);
  }, []);

  return animObj;
}
