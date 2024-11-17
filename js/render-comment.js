
const socialComment = document.querySelector('.social__comment');

const createCommentElement = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  const socialAvatar = commentElement.querySelector('.social__picture');
  socialAvatar.src = comment.avatar;
  socialAvatar.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });
  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.appendChild(fragment);
};

export {renderComments};
