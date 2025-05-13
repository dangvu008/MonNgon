import React, { useState } from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import Button from '../UI/Button';
import { supabase } from '../../lib/supabase';

interface FollowButtonProps {
  userId: string;
  initialFollowing: boolean;
  onFollowChange?: (following: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  initialFollowing,
  onFollowChange
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowClick = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        const { error } = await supabase
          .from('user_follows')
          .delete()
          .match({ following_id: userId });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_follows')
          .insert([{ following_id: userId }]);

        if (error) throw error;
      }

      setIsFollowing(!isFollowing);
      onFollowChange?.(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'}
      onClick={handleFollowClick}
      isLoading={isLoading}
      leftIcon={isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};

export default FollowButton;