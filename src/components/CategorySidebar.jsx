export default function CategorySidebar({ categories, current, onPick }) {
  return (
    <aside className="space-y-2">
      {categories.map(cat => (
        <button key={cat}
          onClick={()=>onPick(cat)}
          className={`btn btn-block ${current===cat ? 'btn-primary' : 'btn-ghost'}`}>
          {cat}
        </button>
      ))}
    </aside>
  )
}