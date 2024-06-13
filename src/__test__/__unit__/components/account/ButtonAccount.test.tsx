import { fireEvent, render, screen } from "@testing-library/react";
import ButtonAccount from "../../../../components/account/ButtonAccount";
import { userEvent } from "@testing-library/user-event";

describe("ButtonAccount", () => {
  test("It will have element with text HB", () => {
    const mockFunc = vi.fn();
    render(<ButtonAccount setIsAccountMenuVisible={mockFunc} />);

    const paraElement = screen.getByText(/hb/i);

    expect(paraElement.innerHTML).toBe("HB");
    expect(paraElement).toBeInTheDocument();
  });
  test("It will NOT call props function when there is no click event happend", () => {
    const mockFunc = vi.fn();
    render(<ButtonAccount setIsAccountMenuVisible={mockFunc} />);

    expect(mockFunc).toBeCalledTimes(0);
  });
  test("It will call props function when it CLICKed", async () => {
    const mockFunc = vi.fn();
    render(<ButtonAccount setIsAccountMenuVisible={mockFunc} />);

    const accontBtn = document.getElementsByClassName("account-btn")[0];

    await userEvent.click(accontBtn);

    fireEvent.click(
      accontBtn,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(mockFunc).toBeCalledTimes(2);
  });
});
