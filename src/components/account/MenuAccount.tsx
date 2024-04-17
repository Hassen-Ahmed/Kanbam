import { createPortal } from "react-dom";
import ButtonTheme from "./ButtonTheme";
import "./MenuAccount.scss";
import MenuAccountLogo from "./MenuAccountLogo";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

interface IMenuVisiblity {
  isAccountMenuVisible: boolean;
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuAccount = ({
  isAccountMenuVisible,
  setIsAccountMenuVisible,
}: IMenuVisiblity) => {
  const [areWeCelebrating, setAreWeCelebrating] = useState(false);

  const dimension = useRef<{ width: number; height: number }>();

  const confetti = (
    <div>
      <Confetti
        width={dimension.current?.width}
        height={dimension.current?.height}
        recycle={false}
        tweenDuration={5000}
        initialVelocityY={2}
        style={{ zIndex: 2100 }}
        gravity={0.2}
        wind={0.05}
        numberOfPieces={1000}
      />
    </div>
  );

  useEffect(() => {
    dimension.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);
  return (
    <>
      {!isAccountMenuVisible ? null : (
        <div
          className="menu-account"
          style={{
            zIndex: isAccountMenuVisible ? 2100 : 0,
          }}
        >
          {isAccountMenuVisible && (
            <>
              <div className="menu">
                <h2 className="menu__heading">Account</h2>
                <MenuAccountLogo />
                <hr />
                <ButtonTheme />
                <hr />
                <div className="menu__logout">
                  <h2 className="menu__logout--text">Logout</h2>
                </div>

                {areWeCelebrating && createPortal(confetti, document.body)}

                <div
                  className="menu__donate"
                  onClick={() => {
                    setAreWeCelebrating((preValue) => {
                      return preValue ? false : true;
                    });
                  }}
                >
                  <h2 className="menu__donate--text">Donate</h2>
                </div>
              </div>

              <div
                className="menu__overlay"
                onClick={() => setIsAccountMenuVisible(false)}
              ></div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MenuAccount;
