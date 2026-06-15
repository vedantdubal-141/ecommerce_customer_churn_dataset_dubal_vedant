import { useState, useEffect } from 'react'
import { api } from '../api'
import StatsCard from '../components/StatsCard'
import Loader from '../components/Loader'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      api('/stats/customers/count'),
      api('/stats/customers/average-lifetime'),
      api('/stats/customers/average-credit'),
      api('/stats/customers/average-order-value'),
      api('/stats/customers/churn-count'),
      api('/stats/customers/country-count'),
      api('/stats/customers/gender-count'),
      api('/stats/customers/signup-quarter-count'),
    ])
      .then(([total, avgLifetime, avgCredit, avgOrder, churn, country, gender, signup]) => {
        setStats({
          total: total.data,
          avgLifetime: avgLifetime.data,
          avgCredit: avgCredit.data,
          avgOrder: avgOrder.data,
          churn: churn.data,
          countries: country.data,
          genders: gender.data,
          signups: signup.data,
        })
      })
      .catch(err => setError(err.message))
  }, [])

  if (error) return <div className="page"><div className="empty-state"><p>Error: {error}</p></div></div>
  if (!stats) return <Loader text="Loading dashboard..." />

  const totalC = stats.total?.totalCustomers ?? stats.total?.count ?? 0
  const churnedC = stats.churn?.churned ?? stats.churn?.count ?? 0

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="grid-4 mb-16">
        <StatsCard label="Total Customers" value={totalC.toLocaleString()} />
        <StatsCard label="Churned" value={churnedC.toLocaleString()} sub={totalC ? `${((churnedC / totalC) * 100).toFixed(1)}%` : ''} />
        <StatsCard label="Avg Lifetime Value" value={stats.avgLifetime?.averageLifetime?.toFixed(2) ?? stats.avgLifetime?.avg?.toFixed(2) ?? '-'} />
        <StatsCard label="Avg Credit Balance" value={stats.avgCredit?.averageCredit?.toFixed(2) ?? stats.avgCredit?.avg?.toFixed(2) ?? '-'} />
      </div>

      <div className="grid-3 mb-16">
        <StatsCard label="Avg Order Value" value={stats.avgOrder?.averageOrderValue?.toFixed(2) ?? stats.avgOrder?.avg?.toFixed(2) ?? '-'} />
        <StatsCard label="Countries" value={Array.isArray(stats.countries) ? stats.countries.length : '-'} />
        <StatsCard label="Signup Quarters" value={Array.isArray(stats.signups) ? stats.signups.length : '-'} />
      </div>

      <div className="dashboard-section">
        <h2>Country Distribution</h2>
        {Array.isArray(stats.countries) ? (
          <table>
            <thead><tr><th>Country</th><th>Count</th></tr></thead>
            <tbody>
              {stats.countries.slice(0, 10).map((c, i) => (
                <tr key={i}><td>{c._id || c.country}</td><td>{c.count}</td></tr>
              ))}
            </tbody>
          </table>
        ) : <p className="empty-state"><p>No country data</p></p>}
      </div>

      <div className="dashboard-section">
        <h2>Gender Distribution</h2>
        {Array.isArray(stats.genders) ? (
          <table>
            <thead><tr><th>Gender</th><th>Count</th></tr></thead>
            <tbody>
              {stats.genders.map((g, i) => (
                <tr key={i}><td>{g._id || g.gender}</td><td>{g.count}</td></tr>
              ))}
            </tbody>
          </table>
        ) : <p className="empty-state"><p>No gender data</p></p>}
      </div>
    </div>
  )
}
