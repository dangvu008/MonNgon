import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RecipeLikeButtonProps {
  recipeId: string;
  initialLiked: boolean;
  likeCount: number;
  onLikeChange?: (liked: boolean) => void;
}

const RecipeLikeButton: React.FC<RecipeLikeButtonProps> = ({
  recipeId,
  initialLiked,
  likeCount,
  onLikeChange
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeClick = async () => {
    setIsLoading(true);
    try {
      if (isLiked) {
        const { error } = await supabase
          .from('recipe_likes')
          .delete()
          .match({ recipe_id: recipeId });

        if (error) throw error;
        setLikes(prev => prev - 1);
      } else {
        const { error } = await supabase
          .from('recipe_likes')
          .insert([{ recipe_id: recipeId }]);

        if (error) throw error;
        setLikes(prev => prev + 1);
      }

      setIsLiked(!isLiked);
      onLikeChange?.(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      disabled={isLoading}
      className={`
        flex items-center gap-1 px-3 py-1.5 rounded-full
        transition-colors duration-200
        ${isLiked
          ? 'text-red-500 bg-red-50 hover:bg-red-100'
          : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <Heart
        className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
      />
      <span className="font-medium">{likes}</span>
    </button>
  );
};

export default RecipeLikeButton;