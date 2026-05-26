import React from 'react'
import { BarChart3, Brain, Database, Search, TrendingUp } from 'lucide-react'
import { intelligenceCollections } from './data/intelligenceData'
import { analyticsService } from './services/analyticsService'
import { recommendationService } from './services/recommendationService'

export default function AdminDashboard() {
  const collections = { ...intelligenceCollections, ...analyticsService.getCollections() }
  const adminSignals = recommendationService.getAdminSignals(analyticsService.getEvents())
  const dashboardItems = [
    { title: 'Top searches', value: Object.keys(adminSignals.topSearches).length || 'Ready', icon: Search },
    { title: 'Search trends', value: Object.keys(adminSignals.searchTrends).length || 'Ready', icon: TrendingUp },
    { title: 'Category popularity', value: Object.keys(adminSignals.categoryPopularity).length || 'Ready', icon: BarChart3 },
    { title: 'Weak signal detection', value: adminSignals.weakSignalDetection.length || 'Ready', icon: Brain },
  ]

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">Admin intelligence dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Phase 1 analytics foundation</h1>
          </div>
          <p className="text-sm leading-6 text-neutral-300">
            Internal placeholder for top searches, emerging searches, category popularity, WhatsApp inquiry trends, county/location interest and future LLM-assisted insights.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {dashboardItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-md border border-white/10 bg-white/5 p-5">
                <Icon className="h-5 w-5 text-emerald-300" />
                <p className="mt-4 text-2xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-neutral-300">{item.title}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-300" />
            <h2 className="font-semibold">AI-ready data structures</h2>
          </div>
          <div className="mt-4 grid gap-2 text-sm text-neutral-300 sm:grid-cols-2 lg:grid-cols-5">
            {Object.keys(collections).map((key) => (
              <span key={key} className="rounded-md bg-white/5 px-3 py-2">
                {key}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
