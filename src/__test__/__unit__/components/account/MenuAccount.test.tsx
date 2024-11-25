import { fireEvent, render, screen } from "@testing-library/react";
import MenuAccount from "../../../../components/account/MenuAccount";
import { MemoryRouter } from "react-router-dom";
import { KanbamContext } from "../../../../context/kanbamContext";
import { TokenContext } from "../../../../context/TokenContext";

let mockIsAccountMenuVisible = false;
const mockSetIsAccountMenuVisible = vi.fn();
const mockTheme2 = "dark";

const userDetail = {
  email: "string",
  userName: "string",
};
const setUserDetail = vi.fn();
const mockTokenInCtx = "dark";

const renderWithMemoryRouter = () => {
  render(
    <MemoryRouter>
      <TokenContext.Provider
        value={{ tokenInCtx: mockTokenInCtx, handleSetAccessToken: vi.fn() }}
      >
        <KanbamContext.Provider
          value={{
            theme: mockTheme2,
            themeSetter: vi.fn(),
            itemDragging: { current: null },
            userDetail,
            setUserDetail,
          }}
        >
          <MenuAccount
            isAccountMenuVisible={mockIsAccountMenuVisible}
            setIsAccountMenuVisible={mockSetIsAccountMenuVisible}
          />
        </KanbamContext.Provider>
      </TokenContext.Provider>
    </MemoryRouter>
  );
};

describe("MenuAccount component", () => {
  //
  test("It should NOT has html elements with terms Account, Logout and Donate, if isAccountMenuVisible set to false", () => {
    renderWithMemoryRouter();

    const menuHeading = screen.queryByText(/Logout/i);

    expect(menuHeading).toBeNull();
  });
  //
  test("It should has html elements with terms Account, Logout and Donate", () => {
    mockIsAccountMenuVisible = true;

    renderWithMemoryRouter();
    const menuHeading = screen.getByText(/Account/i);
    const menuLogout = screen.getByText(/Logout/i);
    const menuDonate = screen.getByText(/donate/i);

    expect(menuHeading).toBeInTheDocument();
    expect(menuLogout).toBeInTheDocument();
    expect(menuDonate).toBeInTheDocument();
  });
  //
  test("It should has html elements of MenuAccountLogo and ButtonTheme comps", () => {
    mockIsAccountMenuVisible = true;

    renderWithMemoryRouter();
    const menuTheme = screen.getByText(/theme/i);
    const buttonLight = screen.getByText(/light/i);

    expect(menuTheme).toBeInTheDocument();
    expect(buttonLight).toBeInTheDocument();
  });
  test("It should will NOT trigger/call handleLogout and  setIsAccountMenuVisible functions, when there is NO click event happeded logout and overlay.", () => {
    mockIsAccountMenuVisible = true;

    renderWithMemoryRouter();

    expect(mockSetIsAccountMenuVisible).toBeCalledTimes(0);
  });
  //
  test("It should will trigger/call setIsAccountMenuVisible functions, when there is click event happeded to overlay.", () => {
    mockIsAccountMenuVisible = true;
    renderWithMemoryRouter();

    const overlay = document.getElementsByClassName("menu__overlay")[0];

    fireEvent.click(overlay);

    expect(mockSetIsAccountMenuVisible).toBeCalledTimes(1);
  });
});
