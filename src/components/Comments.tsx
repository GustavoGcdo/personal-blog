import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import CommentForm from './CommentForm';
import CommentLogin from './CommentLogin';
import useComments from '../hooks/useComments';
import CommentList from './CommentList';

const Comments = () => {
  const { isAuthenticated } = useAuth0();
  const { text, setText, comments, onSubmit, onDelete } = useComments();

  return (
    <div className="mt-10">
      {!isAuthenticated && <CommentLogin />}
      {isAuthenticated && <CommentForm onSubmit={onSubmit} text={text} setText={setText} />}

      <h2 className="dark:text-white  self-start font-medium text-2xl mt-10 mb-5 px-2 sm:px-10">
        Comentários
      </h2>

      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  );
};

export default Comments;
