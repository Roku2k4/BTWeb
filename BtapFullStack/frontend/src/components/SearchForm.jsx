import React from 'react'
import './SearchForm.css'

function SearchForm({ onChangeValue }) {
  return (
    <div className="search-container">
      <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo tên học sinh..."
        onChange={(e) => onChangeValue && onChangeValue(e.target.value)}
      />
    </div>
  );
}

export default SearchForm