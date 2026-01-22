const FilterInput = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">
        <img width="20" height="20" src="https://img.icons8.com/windows/32/search--v1.png" alt="search--v1"/>
      </span>
    </div>
  );
};

export default FilterInput;
