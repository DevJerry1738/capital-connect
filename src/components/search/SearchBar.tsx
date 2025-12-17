import './SearchBar.css'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="searchbar">
      <input
        aria-label="Search providers"
        placeholder="Search providers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
