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
    const adminLoginMutation = trpc.admin.login.useMutation({
        onSuccess: (data) => {
            window.localStorage.setItem("isAdmin", "true");
            setIsAdmin(true);
            setAdminUsername("");
            setAdminEmail("");
            setAdminPassword("");
            setAdminPin("");
            setIsLoginOpen(false);
            alert("管理员登录成功 / Admin login successful");
        },
        onError: (error) => {
            alert(error.message || "管理员账号信息不正确 / Invalid admin credentials");
        },
    });
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
        adminLoginMutation.mutate({
            name: adminUsername,
            email: adminEmail,
            password: adminPassword,
            pin: adminPin,
        });
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
    <div className="topbar pt-8">
      <div className="flex items-center gap-4 shrink-0">
        <Link href="/" className="font-bold text-foreground text-lg hover:underline transition-colors whitespace-nowrap">
          人工智能分享
        </Link>
        <div className="hidden md:flex items-center gap-3 flex-nowrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted hover:text-foreground hover:underline transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <button
                className="lang-toggle"
                onClick={() => {
                  setLoginMode("user");
                  setIsLoginOpen(true);
                }}
              >
                登录
              </button>
              <button
                className="lang-toggle"
                onClick={() => setIsRegisterOpen(true)}
              >
                注册
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-muted">
                {isAdmin ? "👑 管理员" : "👤"} {currentUserName}
              </span>
              <button
                className="lang-toggle"
                onClick={handleLogout}
              >
                退出
              </button>
            </>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">登录</h2>
              <button
                className="text-muted hover:text-foreground text-sm underline"
                onClick={() => setIsLoginOpen(false)}
              >
                关闭
              </button>
            </div>
            <div className="mt-4 flex gap-2 border-b border-border pb-2">
              <button
                type="button"
                onClick={() => setLoginMode("user")}
                className={`text-sm ${loginMode === "user"
                  ? "font-bold text-foreground"
                  : "text-muted hover:text-foreground"
                  }`}
              >
                普通用户
              </button>
              <span className="text-muted">/</span>
              <button
                type="button"
                onClick={() => setLoginMode("admin")}
                className={`text-sm ${loginMode === "admin"
                  ? "font-bold text-foreground"
                  : "text-muted hover:text-foreground"
                  }`}
              >
                管理员
              </button>
            </div>
            <form
              className="mt-6 space-y-4"
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
              <div className="space-y-1">
                <label className="text-xs text-muted">用户名</label>
                <input
                  type="text"
                  value={loginMode === "admin" ? adminUsername : userName}
                  onChange={(event) =>
                    loginMode === "admin"
                      ? setAdminUsername(event.target.value)
                      : setUserName(event.target.value)
                  }
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">邮箱</label>
                <input
                  type="email"
                  value={loginMode === "admin" ? adminEmail : userEmail}
                  onChange={(event) =>
                    loginMode === "admin"
                      ? setAdminEmail(event.target.value)
                      : setUserEmail(event.target.value)
                  }
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">密码</label>
                <input
                  type="password"
                  value={loginMode === "admin" ? adminPassword : userPassword}
                  onChange={(event) =>
                    loginMode === "admin"
                      ? setAdminPassword(event.target.value)
                      : setUserPassword(event.target.value)
                  }
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">PIN码</label>
                <input
                  type="text"
                  value={loginMode === "admin" ? adminPin : userPin}
                  onChange={(event) =>
                    loginMode === "admin"
                      ? setAdminPin(event.target.value)
                      : setUserPin(event.target.value)
                  }
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                disabled={
                  (loginMode === "user" && userLoginMutation.isPending) ||
                  (loginMode === "admin" && adminLoginMutation.isPending)
                }
                className="w-full mt-4 bg-foreground text-background py-2 rounded text-sm font-medium hover:opacity-90"
              >
                {loginMode === "user" && userLoginMutation.isPending
                  ? "登录中..."
                  : loginMode === "admin" && adminLoginMutation.isPending
                    ? "登录中..."
                    : "登录"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">注册</h2>
              <button
                className="text-muted hover:text-foreground text-sm underline"
                onClick={() => setIsRegisterOpen(false)}
              >
                关闭
              </button>
            </div>
            <form
              className="mt-6 space-y-4"
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
              <div className="space-y-1">
                <label className="text-xs text-muted">用户名</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(event) => setRegisterName(event.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">邮箱</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">密码</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted">PIN码</label>
                <input
                  type="text"
                  value={registerPin}
                  onChange={(event) => setRegisterPin(event.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-foreground text-background py-2 rounded text-sm font-medium hover:opacity-90"
              >
                注册
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
