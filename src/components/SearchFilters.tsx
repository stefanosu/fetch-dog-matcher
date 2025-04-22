// src/components/SearchFilters.tsx
import React from 'react'

type SearchFiltersProps = {
  breeds: string[]
  selectedBreed: string
  onBreedChange: (breed: string) => void
  sortOrder: 'asc' | 'desc'
  onSortToggle: () => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  breeds,
  selectedBreed,
  onBreedChange,
  sortOrder,
  onSortToggle
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Breed
        </label>
        <select
          id="breed"
          value={selectedBreed}
          onChange={(e) => onBreedChange(e.target.value)}
          className="border rounded px-3 py-1 shadow-sm"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort by Breed
        </label>
        <button
          onClick={onSortToggle}
          className="border px-4 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200"
        >
          {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
        </button>
      </div>
    </div>
  )
}

export default SearchFilters
