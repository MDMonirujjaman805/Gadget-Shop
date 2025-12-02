// export default function CategorySidebar({ categories, current, onPick }) {
//   return (
//     <aside className="space-y-2">
//       {categories.map(cat => (
//         <button key={cat}
//           onClick={()=>onPick(cat)}
//           className={`btn btn-block ${current===cat ? 'btn-primary' : 'btn-ghost'}`}>
//           {cat}
//         </button>
//       ))}
//     </aside>
//   )
// }



// claude............
import { memo } from 'react'

const CategorySidebar = memo(function CategorySidebar({ categories, current, onPick }) {
  if (!categories || categories.length === 0) {
    return <div className="text-center py-4 opacity-60">No categories available</div>
  }

  return (
    <aside className="space-y-2" role="navigation" aria-label="Product categories">
      {categories.map(cat => (
        <button 
          key={cat}
          onClick={() => onPick(cat)}
          className={`btn btn-block ${current === cat ? 'btn-primary' : 'btn-ghost'}`}
          aria-pressed={current === cat}
          aria-label={`Filter by ${cat.replace('-', ' ')} category`}
        >
          {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </button>
      ))}
    </aside>
  )
})

export default CategorySidebar