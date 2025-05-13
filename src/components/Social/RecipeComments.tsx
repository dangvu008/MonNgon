import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../UI/Button';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
}

interface RecipeCommentsProps {
  recipeId: string;
  comments: Comment[];
  onCommentAdded?: () => void;
}

const RecipeComments: React.FC<RecipeCommentsProps> = ({
  recipeId,
  comments,
  onCommentAdded
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('recipe_comments')
        .insert([
          { recipe_id: recipeId, content: newComment }
        ]);

      if (error) throw error;

      setNewComment('');
      onCommentAdded?.();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
      </div>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.user.avatar_url || 'https://via.placeholder.com/40'}
              alt={comment.user.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-sm text-gray-900 mb-1">
                  {comment.user.username}
                </p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          rightIcon={<Send size={16} />}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default RecipeComments;