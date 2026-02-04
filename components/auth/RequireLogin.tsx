'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

interface RequireLoginProps {
  children: React.ReactNode
}

export function RequireLogin({ children }: RequireLoginProps) {
  const [checked, setChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const hasUser = window.localStorage.getItem('currentUserName')
    const hasAdmin = window.localStorage.getItem('isAdmin') === 'true'
    setIsLoggedIn(Boolean(hasUser || hasAdmin))
    setChecked(true)
  }, [])

  if (!checked) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6 text-slate-300">
          正在检查登录状态...
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="rounded-xl glass-surface p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-white">请先登录</h1>
            <p className="mt-2 text-slate-300">登录后即可访问此页面。</p>
            <Button
              className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
              onClick={() => (window.location.href = '/')}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

