import axios from 'axios';

const API_URL = '/users.json';

// In-memory storage to simulate a real API
let usersCache = null;
let nextId = 11;

// Initialize users from JSON file
const initializeUsers = async () => {
  if (!usersCache) {
    try {
      const response = await axios.get(API_URL);
      usersCache = [...response.data];
      nextId = Math.max(...usersCache.map(u => u.id)) + 1;
      console.log('Users loaded successfully:', usersCache.length);
    } catch (error) {
      console.error('Failed to load users.json:', error);
      throw error;
    }
  }
  return usersCache;
};

// GET all users
export const getUsers = async () => {
  try {
    await initializeUsers();
    return { success: true, data: [...usersCache] };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
};

// GET user by ID
export const getUserById = async (id) => {
  try {
    await initializeUsers();
    const user = usersCache.find(u => u.id === id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
};

// POST new user
export const createUser = async (userData) => {
  try {
    await initializeUsers();
    const newUser = {
      id: nextId++,
      ...userData,
      address: userData.address || {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      },
      company: userData.company || {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
    usersCache.push(newUser);
    return { success: true, data: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
};

// PUT update user
export const updateUser = async (id, userData) => {
  try {
    await initializeUsers();
    const index = usersCache.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: 'User not found' };
    }
    usersCache[index] = { ...usersCache[index], ...userData, id };
    return { success: true, data: usersCache[index] };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update user' };
  }
};

// DELETE user
export const deleteUser = async (id) => {
  try {
    await initializeUsers();
    const index = usersCache.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: 'User not found' };
    }
    usersCache.splice(index, 1);
    return { success: true, data: { id } };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
};
