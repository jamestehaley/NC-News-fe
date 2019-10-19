import React from 'react';

export default function UserCard({ user, handleProfileClick }) {
  console.log(user);
  return (
    <button
      onClick={() => {
        handleProfileClick(user.username);
      }}
      className="userCard"
    >
      <p>Username: {user.username}</p>
      <img
        className="profilePic"
        src={user.avatar_url}
        alt={`${user.username}`}
      />
      <p>Name: {user.name}</p>
    </button>
  );
}
