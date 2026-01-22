import { useState, useEffect } from 'react';

const EmployeeFormModal = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        address: {
          street: user.address?.street || '',
          suite: user.address?.suite || '',
          city: user.address?.city || '',
          zipcode: user.address?.zipcode || ''
        },
        company: {
          name: user.company?.name || '',
          catchPhrase: user.company?.catchPhrase || '',
          bs: user.company?.bs || ''
        }
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.suite">Suite</label>
              <input
                type="text"
                id="address.suite"
                name="address.suite"
                value={formData.address.suite}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.zipcode">Zipcode</label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company.name">Company Name</label>
              <input
                type="text"
                id="company.name"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="company.catchPhrase">Company Catch Phrase</label>
              <input
                type="text"
                id="company.catchPhrase"
                name="company.catchPhrase"
                value={formData.company.catchPhrase}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="company.bs">Company BS</label>
              <input
                type="text"
                id="company.bs"
                name="company.bs"
                value={formData.company.bs}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
