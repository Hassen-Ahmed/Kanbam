import { DragEventMy } from "../../../types/html.type";
import { handleDragstartUtil } from "../../../utils/dnd";

export default function MockCloneElement() {
  const handleOnDragStart = (ev: DragEventMy) => {
    handleDragstartUtil(ev, "inner-div");
  };

  return (
    <div className="outer-div" onDragStart={(ev) => handleOnDragStart(ev)}>
      <div className="inner-div">
        <p>inner element</p>
        <h1>I am clone element</h1>
      </div>
    </div>
  );
}
