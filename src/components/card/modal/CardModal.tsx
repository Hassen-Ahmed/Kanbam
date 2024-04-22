import { FaRegCreditCard } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { GiRank3 } from "react-icons/gi";
import {
  MdOutlineWatchLater,
  MdOutlineAttachment,
  MdContentCopy,
  MdOutlineArchive,
} from "react-icons/md";
import { IoMdCard, IoMdArrowRoundForward } from "react-icons/io";
import { BsTextParagraph } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";

import "./CardModal.scss";
import TextEditor from "./TextEditor";
import { useState } from "react";

const sizeOne = 26;
const sizeTwo = 22;

export default function CardModal({
  handleModalCardId,
  id,
}: {
  handleModalCardId: (value: string) => void;
  id: string;
}) {
  const [comment, setComment] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const handleSave = () => {
    setComment("");
  };

  return (
    <div className="card-modal--container" style={{ zIndex: 2300 }}>
      <div className="card-modal">
        <div
          className="card-modal__btn--close"
          onClick={() => handleModalCardId("")}
        >
          <VscClose size={sizeOne} />
        </div>

        <div className="card-modal__heading">
          <div className="card-modal__heading--icon">
            <FaRegCreditCard size={sizeTwo} />
          </div>
          <h1>create SQL db tso store data{id}</h1>
        </div>
        <div className="card-modal__main">
          <div className="card-modal__left-bar">
            <div className="left-bar--container">
              <div className="priority">
                <h3>Priority</h3>
              </div>
              <div className="description">
                <div className="description__heading">
                  <BsTextParagraph size={sizeOne} />
                  <h2>Description</h2>
                </div>

                <div>
                  <TextEditor description={""} />
                </div>
              </div>

              <div className="activity">
                <div className="activity__heading">
                  <RxActivityLog size={sizeOne} />
                  <h2>Activity</h2>
                </div>
                <div className="activity__comment">
                  {isCommentVisible ? (
                    <div className="activity__comment--editor">
                      <textarea
                        name="comment"
                        placeholder="Write a comment..."
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <div
                        className="activity__comment--btns"
                        onClick={() => setIsCommentVisible(false)}
                      >
                        <button onClick={handleSave}>Save</button>
                        <button>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p
                      onClick={() => setIsCommentVisible(true)}
                      className="activity__comment--para"
                    >
                      Write a comment...
                    </p>
                  )}
                </div>
                <div className="comment-list"></div>
              </div>
            </div>
          </div>
          <div className="card-modal__right-bar">
            <div className="right-bar--container">
              <h3>Add to card</h3>
              <div className="priority right-bar__btn">
                <GiRank3 size={sizeTwo} />
                <h2>Priority</h2>
              </div>
              <div className="dates right-bar__btn">
                <MdOutlineWatchLater size={sizeTwo} />
                <h2>Dates</h2>
              </div>
              <div className="attachment right-bar__btn">
                <MdOutlineAttachment size={sizeTwo} />
                <h2>Attachment</h2>
              </div>
              <div className="cover right-bar__btn">
                <IoMdCard size={sizeTwo} />
                <h2>Cover</h2>
              </div>
              <h3>Actions</h3>
              <div className="move right-bar__btn">
                <IoMdArrowRoundForward size={sizeTwo} />
                <h2>Move</h2>
              </div>
              <div className="copy right-bar__btn">
                <MdContentCopy size={sizeTwo} />
                <h2>Copy</h2>
              </div>
              <div className="archive right-bar__btn">
                <MdOutlineArchive size={sizeTwo} />
                <h2>Archive</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-modal__overlay"></div>
    </div>
  );
}
