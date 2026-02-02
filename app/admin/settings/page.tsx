'use client'

import { useEffect, useState } from 'react'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/Button'
import { Users, RefreshCcw, Lock } from 'lucide-react'
import type { AppRouter } from '@/server/routers'
import type { inferRouterOutputs } from '@trpc/server'

type UserList = inferRouterOutputs<AppRouter>['user']['list']
type UserRow = UserList[number]

export default function AdminSettingsPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checked, setChecked] = useState(false)
  const usersQuery = trpc.user.list.useQuery()
  const deleteMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      usersQuery.refetch()
    },
  })

  useEffect(() => {
    setIsAdmin(window.localStorage.getItem('isAdmin') === 'true')
    setChecked(true)
  }, [])

  if (!checked) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto p-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            正在检查管理员权限...
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto p-6">
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">需要管理员登录</h1>
            <p className="mt-2 text-slate-600">请先使用管理员账号登录，才能查看此页面。</p>
            <Button
              className="mt-6 bg-slate-900 hover:bg-slate-800"
              onClick={() => (window.location.href = '/')}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">管理员设置</h1>
            <p className="text-slate-600 mt-2">Admin Settings</p>
          </div>
          <Button
            onClick={() => usersQuery.refetch()}
            className="bg-slate-900 hover:bg-slate-800"
            disabled={usersQuery.isFetching}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            {usersQuery.isFetching ? '刷新中...' : '刷新'}
          </Button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-2 text-slate-800">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold">注册用户</h2>
            </div>
            <span className="text-sm text-slate-500">
              {usersQuery.data?.length ?? 0} 位用户
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-6 py-3 font-medium">用户名</th>
                  <th className="px-6 py-3 font-medium">邮箱</th>
                  <th className="px-6 py-3 font-medium">PIN</th>
                  <th className="px-6 py-3 font-medium">注册时间</th>
                  <th className="px-6 py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {usersQuery.isLoading && (
                  <tr>
                    <td className="px-6 py-6 text-slate-500" colSpan={5}>
                      正在加载用户数据...
                    </td>
                  </tr>
                )}
                {usersQuery.error && (
                  <tr>
                    <td className="px-6 py-6 text-red-500" colSpan={5}>
                      读取失败：{usersQuery.error.message}
                    </td>
                  </tr>
                )}
                {!usersQuery.isLoading && !usersQuery.error && (usersQuery.data?.length ?? 0) === 0 && (
                  <tr>
                    <td className="px-6 py-6 text-slate-500" colSpan={5}>
                      暂无注册用户
                    </td>
                  </tr>
                )}
                {usersQuery.data?.map((user: UserRow) => (
                  <tr key={user.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {user.name || '未填写'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 text-slate-600">{user.pin || '—'}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (confirm(`确认删除 ${user.name || user.email} 吗？`)) {
                            deleteMutation.mutate({ id: user.id })
                          }
                        }}
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
