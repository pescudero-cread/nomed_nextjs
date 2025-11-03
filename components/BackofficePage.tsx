'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

export default function BackofficePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('create')

  const tabs = [
    { id: 'create', name: 'Crear Blog', icon: '✍️' },
    { id: 'manage', name: 'Gestionar Blogs', icon: '📝' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-nomed-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Backoffice NOMED</h1>
                <p className="text-gray-600">Panel de administración</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={session?.user?.image || '/images/default-avatar.png'}
                  alt={session?.user?.name || 'Usuario'}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">
                  {session?.user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-nomed-primary text-nomed-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'create' && <BlogForm />}
          {activeTab === 'manage' && <BlogList />}
        </motion.div>
      </div>
    </div>
  )
}
