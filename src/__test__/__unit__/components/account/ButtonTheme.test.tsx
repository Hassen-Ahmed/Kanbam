import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ButtonTheme from "../../../../components/account/ButtonTheme";
import { KanbamContext } from "../../../../context/kanbamContext";

const mockThemeSetter = vi.fn();
const mockItemDragging = { current: null };

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <KanbamContext.Provider
      value={{
        themeSetter: mockThemeSetter,
        itemDragging: mockItemDragging,
      }}
    >
      {component}
    </KanbamContext.Provider>
  );
};

describe("ButtonAccount component", () => {
  //
  test("It should has elements with text Light and Dark", () => {
    renderWithContext(<ButtonTheme />);

    const themeLightElement = screen.getByText(/light/i);
    const themeDarkElement = screen.getByText(/dark/i);

    expect(themeLightElement).toBeInTheDocument();
    expect(themeDarkElement).toBeInTheDocument();
  });
  //
  test("It should will NOT call themeSetter func if there is NO click event happend to LIGHT theme button", async () => {
    //
    renderWithContext(<ButtonTheme />);
    expect(mockThemeSetter).toBeCalledTimes(0);
  });
  //
  test("It will call themeSetter func 2x if there are click events happend from both Light and Dark theme buttons", async () => {
    //
    renderWithContext(<ButtonTheme />);

    const firstLiElement = screen.getAllByRole("listitem", {
      hidden: true,
    });

    for (let i = 0; i < firstLiElement.length; i++) {
      await userEvent.click(firstLiElement[i]);
    }

    expect(mockThemeSetter).toBeCalledTimes(2);
  });
});
