import { render } from "@testing-library/react";
import MenuAccountLogo from "../../../../components/account/MenuAccountLogo";

describe("MenuAccountLogo component", () => {
  test("It should has p element with className menu__logo, ", () => {
    render(<MenuAccountLogo />);
    const menuLogo = document.getElementsByClassName("menu__logo")[0];

    expect(menuLogo).toBeInTheDocument();
  });
});
