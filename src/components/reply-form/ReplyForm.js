import { useState } from "react";
import "./ReplyForm.scss";
// import currentUserDp from "../../assets/images/avatars/image-juliusomo.png";

const ReplyForm = (props) => {
  const [commentContent, setCommentContent] = useState("");

  // Current User Details
  let currentUser = props.currentUser;

  // Current User Profile Picture
  let currentUserDp = require("../../assets" + currentUser.image.png);

  const commentContentChangeHandler = (e) => {
    let inputValue = e.target.value;
    setCommentContent(inputValue);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let commentData = {
      id: Math.random(),
      content: commentContent,
      createdAt: "1 Minutes Ago",
      score: "0",
      user: currentUser,
      replies: [],
    };
    props.onNewComment(commentData);

    setCommentContent("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="card reply-form">
      <div className="current-user">
        <figure className="current-user__dp">
          <img src={currentUserDp} alt="user-dp" />
        </figure>
      </div>
      <textarea
        value={commentContent}
        onChange={commentContentChangeHandler}
        placeholder="Add a comment..."
      ></textarea>
      <button disabled={commentContent === ""} className="btn-primary">
        Send
      </button>
    </form>
  );
};

export default ReplyForm;
