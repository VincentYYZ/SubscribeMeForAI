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
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPin, setNewPin] = useState('')

  const usersQuery = trpc.user.list.useQuery()
  const deleteMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      usersQuery.refetch()
    },
  })
  const registerMutation = trpc.user.register.useMutation({
    onSuccess: () => {
      usersQuery.refetch()
      setShowAddForm(false)
      setNewName('')
      setNewEmail('')
      setNewPassword('')
      setNewPin('')
      alert('用户创建成功 / User created successfully')
    },
    onError: (error) => {
      alert(error.message || '创建失败 / Failed to create user')
    },
  })

  useEffect(() => {
    setIsAdmin(window.localStorage.getItem('isAdmin') === 'true')
    setChecked(true)
  }, [])

  if (!checked) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="rounded-md glass-surface p-8 shadow-sm text-muted">
            正在检查管理员权限...
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="rounded-md glass-surface p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-muted">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">需要管理员登录</h1>
            <p className="mt-2 text-muted">请先使用管理员账号登录，才能查看此页面。</p>
            <Button
              className="mt-6"
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
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">管理员设置</h1>
            <p className="mt-2 text-muted">Admin Settings</p>
          </div>
          <Button
            onClick={() => usersQuery.refetch()}
            disabled={usersQuery.isFetching}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            {usersQuery.isFetching ? '刷新中...' : '刷新'}
          </Button>
        </div>

        <div className="rounded-md glass-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold">注册用户</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">
                {usersQuery.data?.length ?? 0} 位用户
              </span>
              <Button
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? '取消' : '添加用户'}
              </Button>
            </div>
          </div>

          {showAddForm && (
            <div className="border-b border-border px-6 py-4 bg-secondary/30">
              <h3 className="text-sm font-medium text-foreground mb-3">添加新用户</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted block mb-1">用户名</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">邮箱</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">密码</label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">PIN 码</label>
                  <input
                    type="text"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  disabled={registerMutation.isPending}
                  onClick={() => {
                    if (!newName || !newEmail || !newPassword || !newPin) {
                      alert('请填写所有字段 / Please fill in all fields')
                      return
                    }
                    registerMutation.mutate({
                      name: newName,
                      email: newEmail,
                      password: newPassword,
                      pin: newPin,
                    })
                  }}
                >
                  {registerMutation.isPending ? '创建中...' : '创建用户'}
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary text-left text-muted">
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
                    <td className="px-6 py-6 text-muted" colSpan={5}>
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
                    <td className="px-6 py-6 text-muted" colSpan={5}>
                      暂无注册用户
                    </td>
                  </tr>
                )}
                {usersQuery.data?.map((user: UserRow) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {user.name || '未填写'}
                    </td>
                    <td className="px-6 py-4 text-muted">{user.email}</td>
                    <td className="px-6 py-4 text-muted">{user.pin || '-'}</td>
                    <td className="px-6 py-4 text-muted">
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


