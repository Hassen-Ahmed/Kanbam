import { useEffect, useRef } from "react";
import Confetti from "react-confetti";

export default function ConfettiComp() {
  const dimension = useRef<{ width: number; height: number }>();

  useEffect(() => {
    dimension.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  return (
    <div>
      <Confetti
        width={dimension.current?.width}
        height={dimension.current?.height}
        recycle={false}
        tweenDuration={5000}
        initialVelocityY={2}
        gravity={0.2}
        wind={0.05}
        numberOfPieces={1000}
        style={{ zIndex: 2100 }}
      />
    </div>
  );
}
