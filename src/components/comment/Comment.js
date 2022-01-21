import "./Comment.scss";

import iconPlus from "../../assets/images/icon-plus.svg";
import iconMinus from "../../assets/images/icon-minus.svg";
// import userDp from "../../assets/images/avatars/image-amyrobson.png";
import iconReply from "../../assets/images/icon-reply.svg";
import iconDelete from "../../assets/images/icon-delete.svg";
import iconEdit from "../../assets/images/icon-edit.svg";
import ReplyForm from "../reply-form/ReplyForm";
import { useState } from "react";

const Comment = (props) => {
  let allowModify = false;

  let userName = props.comment.user.username;
  let userDp = require("../../assets" + props.comment.user.image.png);
  let content = props.comment.content;
  let score = props.comment.score;
  let createdAt = props.comment.createdAt;

  let [isReplyModeOn, setReplyMode] = useState(false);

  console.log(props.currentUser);

  const onNewReplyHandler = (newReply) => {
    props.comment.replies.push(newReply);
    props.onNewComment(props.comment);
    replyModeHandler();
  };

  const replyModeHandler = () => {
    setReplyMode((isReplyModeOn = !isReplyModeOn));
  };

  return (
    <div>
      <section className="comment-box card">
        {/* Vote control */}
        <aside className="vote-control">
          <button className="vote-control__btn">
            <img src={iconPlus} alt="btn-plus-up-vote" />
          </button>
          <span className="vote-control__counts"> {score} </span>
          <button className="vote-control__btn">
            <img src={iconMinus} alt="btn-plus-up-vote" />
          </button>
        </aside>

        <div className="comment-box__container">
          {/* comment's meta data & toolbar */}
          <header className="comment-box__header">
            {/* user info */}
            <div className="user-info">
              <figure className="user-info__dp">
                <img src={userDp} alt="user-dp" />
              </figure>
              <h5 className="user-info__name"> {userName} </h5>
            </div>

            {/* Comment time */}
            <div className="comment-box__time">{createdAt}</div>

            {/* Toolbar */}
            <div className="comment-box__toolbar">
              {!allowModify && (
                <button
                  disabled={isReplyModeOn}
                  onClick={replyModeHandler}
                  className="btn"
                >
                  <img src={iconReply} alt="btn-reply" /> Reply
                </button>
              )}

              {allowModify && (
                <>
                  <button className="btn btn__delete">
                    <img src={iconDelete} alt="btn-delete" /> Delete
                  </button>

                  <button className="btn">
                    <img src={iconEdit} alt="btn-edit" /> Edit
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Comment */}
          <p className="comment-box__comment">{content}</p>
        </div>
      </section>
      {isReplyModeOn && (
        <ReplyForm
          currentUser={props.currentUser}
          onNewComment={onNewReplyHandler}
        />
      )}
    </div>
  );
};

export default Comment;
