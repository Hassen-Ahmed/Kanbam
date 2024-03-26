import "./ButtonAccount.scss";

interface IMenuVisiblitySingle {
  setIsAccountMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonAccount: React.FC<IMenuVisiblitySingle> = ({
  setIsAccountMenuVisible,
}) => {
  return (
    <div
      className="account-btn"
      onClick={() => {
        setIsAccountMenuVisible((preValue) => {
          return preValue ? false : true;
        });
      }}
    >
      <p>HB</p>
    </div>
  );
};

export default ButtonAccount;
