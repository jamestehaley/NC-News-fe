import React from 'react';

export default function UserCard({ user, handleProfileClick, status }) {
  return (
    <button
      className={`userCard ${status}`}
      onClick={() => {
        handleProfileClick(user.username);
      }}
    >
      <p className="username">Username: {user.username}</p>
      <img
        className="profilePic"
        src={user.avatar_url}
        alt={`${user.username}`}
      />
      <p className="name">Name: {user.name}</p>
    </button>
  );
}
