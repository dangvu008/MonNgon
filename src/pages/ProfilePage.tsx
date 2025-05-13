import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { username } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {username ? `${username}'s Profile` : 'My Profile'}
      </h1>
      {/* Profile content will be implemented later */}
    </div>
  );
};

export default ProfilePage;