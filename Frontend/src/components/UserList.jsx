import { useState, useEffect } from "react";

export default function UserList({ users, onSelectUser }) {
  return (
    <div style={{ borderRight: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <h4>Users</h4>
      {users.map((user) => (
        <div
          key={user._id}
          style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
