export function createNewElem() {
  const mockRootElem = document.getElementsByClassName("mock-root")[0];
  const newDivElem = document.createElement("div");
  newDivElem.classList.add("cloneElem");
  const headOne = document.createElement("h1");
  headOne.innerHTML = "I am clone element";
  newDivElem.append(headOne);
  mockRootElem.appendChild(newDivElem);
}
