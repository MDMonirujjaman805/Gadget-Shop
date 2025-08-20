import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer } from 'recharts'
import data from '../assets/data.json'
import { Helmet } from 'react-helmet-async'

const chartData = data.map(d => ({ name: d.product_title, price: d.price, rating: d.rating }))

export default function Stats() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet><title>Stats | GadgetHeaven</title></Helmet>
      <div className="bg-base-100 rounded-2xl p-6 h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" fillOpacity={0.3} />
            <Bar dataKey="price" barSize={18} />
            <Scatter dataKey="rating" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}