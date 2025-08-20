import { useEffect, useMemo, useState } from 'react'
import Banner from '../components/Banner.jsx'
import CategorySidebar from '../components/CategorySidebar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import data from '../assets/data.json'
import { Helmet } from 'react-helmet-async'

const allCats = Array.from(new Set(data.map(d => d.category)))

export default function Home() {
  const [cat, setCat] = useState(allCats[0])
  const filtered = useMemo(() => data.filter(d => d.category === cat), [cat])

  useEffect(()=>{ window.scrollTo(0,0) },[])

  return (
    <div className="container mx-auto px-4 space-y-8 py-6">
      <Helmet><title>Home | GadgetHeaven</title></Helmet>
      <Banner />
      <div className="grid md:grid-cols-[220px,1fr] gap-6">
        <CategorySidebar categories={allCats} current={cat} onPick={setCat} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 9).map(item => (
            <ProductCard key={item.product_id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}