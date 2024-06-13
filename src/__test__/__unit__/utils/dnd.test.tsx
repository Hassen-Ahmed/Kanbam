import { fireEvent, render, screen } from "@testing-library/react";
import { handleRemoveCloneElem } from "../../../utils/dnd";
import MockElement from "./MockElement";
import { createNewElem } from "./testUtils";
import MockCloneElement from "./MockCloneElement";

describe("dnd", () => {
  //
  describe("testing handleRemoveCloneElem func", () => {
    //
    test("display I am clone element properly", () => {
      render(<MockElement />);

      createNewElem();
      const elementOne = screen.getByText(/I am clone element/i);

      expect(elementOne).toBeInTheDocument();
    });
    //
    test("remove element which has class name cloneElem", () => {
      render(<MockElement />);
      createNewElem();

      const elementOne = screen.queryByText(/I am clone element/i);
      const elementTwo = screen.getByText(/I am head/i);

      expect(elementOne).toBeInTheDocument();

      handleRemoveCloneElem();

      expect(elementOne).not.toBeInTheDocument();
      expect(elementTwo).toBeInTheDocument();
    });
  });

  describe("testing handleDragstartUtil func", () => {
    //
    test("NO dragStart NO div with className cloneElem ", () => {
      render(<MockCloneElement />);

      const clonedElem = document.getElementsByClassName("cloneElem")[0];

      expect(clonedElem).toBeUndefined();
    });
    //
    test("When dragStart THERE is div with className cloneElem", () => {
      render(<MockCloneElement />);
      const outerDiv = document.getElementsByClassName("outer-div")[0];

      fireEvent.dragStart(
        outerDiv,
        new MouseEvent("dragStart", {
          bubbles: true,
          cancelable: true,
        })
      );

      const clonedElem = document.getElementsByClassName("cloneElem")[0];

      expect(clonedElem).not.toBeUndefined();
      expect(clonedElem).toBeInTheDocument();
    });
  });
});
