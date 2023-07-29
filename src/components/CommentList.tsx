import { useAuth0 } from '@auth0/auth0-react';
import { Comment } from '../interfaces';
import distanceToNow from './dateRelative';

type Props = {
  comments?: Comment[];
  onDelete: (comment: Comment) => Promise<void>;
};

export default function CommentList({ comments = [], onDelete }: Props) {
  const { user } = useAuth0();

  return (
    <div className="space-y-6 mt-10">
      {comments?.length > 0 ? (
        comments.map((comment) => {
          const isAuthor = user && user.sub === comment.user.sub;
          const isAdmin = user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;

          return (
            <div key={comment.created_at} className="flex space-x-2">
              <div className="flex-shrink-0">
                <img
                  src={comment.user.picture}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <div className="flex-grow bg-white px-3 py-2 rounded relative">
                <div className="flex space-x-2 w-full">
                  <b>{comment.user.name}</b>
                  <time className="text-gray-400 grow">{distanceToNow(comment.created_at)}</time>
                  {(isAdmin || isAuthor) && (
                    <div className='p-2 absolute top-2 right-2' onClick={() => onDelete(comment)} aria-label="Close">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div>{comment.text}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Ainda não existem comentários aqui</div>
      )}
    </div>
  );
}
