import { fireEvent, render, screen } from "@testing-library/react";
import ButtonAccount from "../../../../components/account/ButtonAccount";
import { userEvent } from "@testing-library/user-event";

const sumFunc = (a: number, b: number) => a + b;
const mockFunc = vi.fn().mockImplementation(sumFunc);

describe("ButtonAccount", () => {
  test("It has element with text HB", () => {
    //
    render(<ButtonAccount setIsAccountMenuVisible={mockFunc} />);

    const paraElement = screen.getByText(/hb/i);

    expect(paraElement.innerHTML).toBe("HB");
    expect(paraElement).toBeInTheDocument();
  });
  //
  test("It will NOT call props function when there is no click event happend", () => {
    //
    render(<ButtonAccount setIsAccountMenuVisible={mockFunc} />);
    expect(mockFunc).toBeCalledTimes(0);
  });
  //
  test("It will call props function and return correct result when it CLICKed", async () => {
    //
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
    expect(mockFunc(2, 2)).toBe(4);
  });
});
