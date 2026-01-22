import { useState, useEffect, useMemo } from 'react';
import './App.css';
import DataGrid from './components/DataGrid';
import EmployeeFormModal from './components/EmployeeFormModal';
import FilterInput from './components/FilterInput';
import PageNavigator from './components/PageNavigator';
import { getUsers, createUser, updateUser, deleteUser } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  
  const USERS_PER_PAGE = 5;

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getUsers();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Paginate filtered users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const result = await deleteUser(id);
      
      if (result.success) {
        // Update UI manually after DELETE
        setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
        showSuccess('User deleted successfully!');
        
        // Adjust current page if necessary
        if (paginatedUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        // Update existing user
        const result = await updateUser(editingUser.id, userData);
        
        if (result.success) {
          // Update UI manually after PUT
          setUsers(prevUsers =>
            prevUsers.map(u => u.id === editingUser.id ? result.data : u)
          );
          showSuccess('User updated successfully!');
        } else {
          setError(result.error);
          return;
        }
      } else {
        // Create new user
        const result = await createUser(userData);
        
        if (result.success) {
          // Update UI manually after POST
          setUsers(prevUsers => [...prevUsers, result.data]);
          showSuccess('User created successfully!');
        } else {
          setError(result.error);
          return;
        }
      }
      
      setShowForm(false);
      setEditingUser(null);
    } catch (err) {
      setError('Failed to save user');
      console.error(err);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <p>CRUD Application with Search & Pagination</p>
      </header>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError(null)} className="alert-close">×</button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      <div className="controls">
        <FilterInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <button onClick={handleAddUser} className="btn-add">
          Add New User
        </button>
      </div>

      <div className="user-count">
        Showing {paginatedUsers.length} of {filteredUsers.length} users
        {searchTerm && ` (filtered from ${users.length} total)`}
      </div>

      <DataGrid
        users={paginatedUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <PageNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showForm && (
        <EmployeeFormModal
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;
