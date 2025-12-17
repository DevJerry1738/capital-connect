
export default function Filters({
  category,
  setCategory,
  district,
  setDistrict,
  availability,
  setAvailability,
  categories,
  districts,
}: {
  category: string
  setCategory: (c: string) => void
  district: string
  setDistrict: (d: string) => void
  availability?: boolean
  setAvailability: (v?: boolean) => void
  categories: string[]
  districts: string[]
}) {
  return (
    <div className="filters">
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        District:
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">All</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <label className="availability">
        <input
          type="checkbox"
          checked={availability === true}
          onChange={(e) => setAvailability(e.target.checked ? true : undefined)}
        />
        Available now
      </label>
    </div>
  )
}
