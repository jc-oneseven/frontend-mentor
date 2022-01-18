import React, { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Comment from "./components/comment/Comment";
import ReplyForm from "./components/reply-form/ReplyForm";

function App() {
  const [comment, setComment] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const getComments = () => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("inside getComments()");
        setComment(data["comments"]);
        setCurrentUser(data["currentUser"]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getComments();
  }, []);

  const onNewCommentHandler = (newComment) => {
    let updateComments = [newComment, ...comment];
    setComment(updateComments);
    console.log(comment);
  };

  return (
    <div>
      <Header />
      {comment.length !== 0 && (
        <div className="container">
          {comment.map((comment) => {
            return (
              <>
                <Comment key={comment.id} comment={comment} />
                {/* Check if replies available */}
                {comment["replies"].length > 0 &&
                  comment["replies"].map((reply) => (
                    <div className="comment-replies">
                      <Comment comment={reply} />
                    </div>
                  ))}
              </>
            );
          })}

          {/* Reply Form */}
          {currentUser.length !== 0 && (
            <ReplyForm
              currentUser={currentUser}
              onNewComment={onNewCommentHandler}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
