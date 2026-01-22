const DataGrid = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actions">
                  <button 
                    onClick={() => onEdit(user)} 
                    className="btn-edit"
                    title="Edit user"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(user.id)} 
                    className="btn-delete"
                    title="Delete user"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
