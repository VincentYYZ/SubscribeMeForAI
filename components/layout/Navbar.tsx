'use client'

import { Button } from "@/components/ui/Button";
import { LogIn, LogOut, Menu, UserPlus, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginMode, setLoginMode] = useState<"user" | "admin">("user");
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPin, setRegisterPin] = useState("");
    const [adminUsername, setAdminUsername] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminPin, setAdminPin] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPin, setUserPin] = useState("");
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const isLoggedIn = Boolean(currentUserName || isAdmin);
    const adminCredentials = {
        username: "admin",
        email: "admin@qq.com",
        password: "admin",
        pin: "1212",
    };
    const registerMutation = trpc.user.register.useMutation({
        onSuccess: () => {
            alert("注册成功！已同步到数据库 / Registration successful");
            setRegisterName("");
            setRegisterEmail("");
            setRegisterPassword("");
            setRegisterPin("");
            setIsRegisterOpen(false);
        },
        onError: (error) => {
            alert(error.message || "注册失败 / Registration failed");
        },
    });
    const userLoginMutation = trpc.user.login.useMutation({
        onSuccess: (user) => {
            window.localStorage.setItem("currentUserName", user.name || "用户");
            setCurrentUserName(user.name || "用户");
            setUserEmail("");
            setUserName("");
            setUserPassword("");
            setUserPin("");
            setIsLoginOpen(false);
            alert("登录成功 / Login successful");
        },
        onError: (error) => {
            alert(error.message || "登录失败 / Login failed");
        },
    });

    useEffect(() => {
        setIsAdmin(window.localStorage.getItem("isAdmin") === "true");
        setCurrentUserName(window.localStorage.getItem("currentUserName"));
    }, []);

    const handleAdminLogin = () => {
        if (
            adminUsername === adminCredentials.username &&
            adminEmail === adminCredentials.email &&
            adminPassword === adminCredentials.password &&
            adminPin === adminCredentials.pin
        ) {
            window.localStorage.setItem("isAdmin", "true");
            setIsAdmin(true);
            setAdminUsername("");
            setAdminEmail("");
            setAdminPassword("");
            setAdminPin("");
            setIsLoginOpen(false);
            alert("管理员登录成功 / Admin login successful");
            return;
        }

        alert("管理员账号信息不正确 / Invalid admin credentials");
    };

    const handleAdminLogout = () => {
        window.localStorage.removeItem("isAdmin");
        setIsAdmin(false);
    };

    const handleUserLogout = () => {
        window.localStorage.removeItem("currentUserName");
        setCurrentUserName(null);
    };

  const handleLogout = () => {
    handleUserLogout();
    handleAdminLogout();
  };

  const navLinks = [
    ...(isLoggedIn
      ? [
          { href: "/robot-xiaoyou", label: "机器人小鼬" },
          { href: "/ai-coding", label: "AI 编程" },
          { href: "/ai-agent", label: "AI-Agent" },
          { href: "/ai-model", label: "AI 模型" },
          { href: "/english-learning", label: "AI英语" },
        ]
      : []),
    { href: "/contact", label: "深度链接我" },
    ...(isAdmin ? [{ href: "/admin/settings", label: "设置" }] : []),
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/10">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6 relative">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg group-hover:shadow-xl transition-shadow">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-transparent">
              人工智能分享
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other items here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-black/15 text-slate-700 hover:text-slate-900 hover:bg-black/5"
              onClick={() => {
                setLoginMode("user");
                setIsLoginOpen(true);
              }}
            >
              <LogIn className="h-4 w-4" />
              <span className="sr-only">登录</span>
            </Button>
            {(currentUserName || isAdmin) && (
              <Button
                variant="outline"
                size="sm"
                className="border-black/15 text-slate-700 hover:text-slate-900 hover:bg-black/5"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">退出登录</span>
              </Button>
            )}
            <Button
              size="sm"
              className="bg-slate-900 text-white shadow-sm hover:bg-slate-800"
              onClick={() => setIsRegisterOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              <span className="sr-only">注册</span>
            </Button>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm text-slate-600 hover:text-slate-900 transition-colors border-b border-black/5"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">登录</h2>
              <button
                className="rounded-lg px-2 py-1 text-slate-500 hover:text-slate-700"
                onClick={() => setIsLoginOpen(false)}
              >
                关闭
              </button>
            </div>
            <div className="mt-4 flex rounded-lg border border-slate-200 p-1">
              <button
                type="button"
                onClick={() => setLoginMode("user")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${loginMode === "user"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                普通用户
              </button>
              <button
                type="button"
                onClick={() => setLoginMode("admin")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${loginMode === "admin"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                管理员
              </button>
            </div>
            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (loginMode === "admin") {
                  handleAdminLogin();
                  return;
                }
                userLoginMutation.mutate({
                  name: userName,
                  email: userEmail,
                  password: userPassword,
                  pin: userPin,
                });
              }}
            >
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">用户名</label>
                  <input
                    type="text"
                    placeholder="请输入用户名"
                    value={loginMode === "admin" ? adminUsername : userName}
                    onChange={(event) =>
                      loginMode === "admin"
                        ? setAdminUsername(event.target.value)
                        : setUserName(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">邮箱</label>
                  <input
                    type="email"
                    placeholder="请输入邮箱"
                    value={loginMode === "admin" ? adminEmail : userEmail}
                    onChange={(event) =>
                      loginMode === "admin"
                        ? setAdminEmail(event.target.value)
                        : setUserEmail(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">密码</label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    value={loginMode === "admin" ? adminPassword : userPassword}
                    onChange={(event) =>
                      loginMode === "admin"
                        ? setAdminPassword(event.target.value)
                        : setUserPassword(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">PIN码</label>
                  <input
                    type="text"
                    placeholder="请输入PIN码"
                    value={loginMode === "admin" ? adminPin : userPin}
                    onChange={(event) =>
                      loginMode === "admin"
                        ? setAdminPin(event.target.value)
                        : setUserPin(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loginMode === "user" && userLoginMutation.isPending}
                  className="w-full bg-slate-900 hover:bg-slate-800"
                >
                  {loginMode === "user" && userLoginMutation.isPending
                    ? "登录中..."
                    : "登录"}
                </Button>
              </>
            </form>
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">注册</h2>
              <button
                className="rounded-lg px-2 py-1 text-slate-500 hover:text-slate-700"
                onClick={() => setIsRegisterOpen(false)}
              >
                关闭
              </button>
            </div>
            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                registerMutation.mutate({
                  name: registerName,
                  email: registerEmail,
                  password: registerPassword,
                  pin: registerPin,
                });
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">用户名</label>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  value={registerName}
                  onChange={(event) => setRegisterName(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">邮箱</label>
                <input
                  type="email"
                  placeholder="请输入邮箱"
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">密码</label>
                <input
                  type="password"
                  placeholder="请输入密码"
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">PIN码</label>
                <input
                  type="text"
                  placeholder="请输入PIN码"
                  value={registerPin}
                  onChange={(event) => setRegisterPin(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                注册
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
