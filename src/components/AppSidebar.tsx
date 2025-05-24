
import { Bell, Calendar, Home, Settings, Users, List, BarChart3, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"

export function AppSidebar() {
  const { user, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      permission: null
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: List,
      badge: "12",
      permission: null
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
      permission: null
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      permission: "view_analytics"
    },
    {
      title: "Members",
      url: "/members",
      icon: Users,
      badge: "8",
      permission: "manage_users"
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      permission: null
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'member':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">TaskMaster Pro</h2>
            <p className="text-xs text-muted-foreground">{user?.organization || 'Acme Corporation'}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`mx-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm' 
                          : 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm'
                      }`}
                    >
                      <button 
                        onClick={() => navigate(item.url)}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : ''}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-700 text-xs animate-pulse-soft">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700">
              {user?.name.split(' ').map(n => n[0]).join('') || 'JD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || 'John Doe'}</p>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getRoleBadgeColor(user?.role || 'member')}`}>
                {user?.role || 'Member'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Bell className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors hover:scale-110" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
