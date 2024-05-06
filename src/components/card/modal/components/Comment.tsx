import React from "react";

interface IComment {
  isCommentVisible: boolean;
  comment: string;
  handleSave: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setIsCommentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Comment({
  isCommentVisible,
  comment,
  handleSave,
  setComment,
  setIsCommentVisible,
}: IComment) {
  return (
    <div className="activity__comment">
      {isCommentVisible ? (
        <div className="activity__comment--editor">
          <textarea
            name="comment"
            placeholder="Write a comment..."
            id="comment"
            value={comment}
            autoFocus
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="activity__comment--btns">
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() => {
                setIsCommentVisible(false);
                setComment("");
              }}
            >
              Cancel
            </button>
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
  );
}
