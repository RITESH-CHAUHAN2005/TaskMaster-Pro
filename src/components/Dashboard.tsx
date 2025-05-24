
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  Plus, 
  Bell,
  Calendar,
  BarChart3,
  UserPlus,
  ArrowRight,
  Target,
  Activity
} from "lucide-react";
import { TaskForm } from "@/components/forms/TaskForm";
import { InviteTeamForm } from "@/components/forms/InviteTeamForm";
import { MeetingForm } from "@/components/forms/MeetingForm";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { useAuth } from "@/contexts/AuthContext";

export function Dashboard() {
  const { user, hasPermission } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Completed",
      value: "18",
      change: "+8%", 
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "In Progress",
      value: "4",
      change: "+2%",
      trend: "up", 
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Team Members",
      value: "8",
      change: "+1",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Update user dashboard UI",
      assignee: "Sarah Wilson",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-15",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Review marketing campaign",
      assignee: "Mike Johnson",
      status: "todo",
      priority: "medium", 
      dueDate: "2024-01-20",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Database optimization",
      assignee: "Alex Chen",
      status: "completed",
      priority: "critical",
      dueDate: "2024-01-12",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'todo':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative hover:scale-105 transition-transform"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>
          <Button 
            onClick={() => setShowTaskForm(true)}
            className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 ml-1">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                    Recent Tasks
                  </CardTitle>
                  <CardDescription>Latest task updates and assignments</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-indigo-50">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={task.avatar} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                    <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                      {task.priority}
                    </Badge>
                    <Badge className={`${getStatusColor(task.status)} text-xs`}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => setShowTaskForm(true)}
                className="w-full justify-start bg-gradient-to-r from-indigo-50 to-sky-50 text-indigo-700 border border-indigo-200 hover:from-indigo-100 hover:to-sky-100 hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-3" />
                Create New Task
              </Button>
              
              {hasPermission('manage_users') && (
                <Button 
                  onClick={() => setShowInviteForm(true)}
                  variant="outline" 
                  className="w-full justify-start hover:bg-emerald-50 hover:border-emerald-200 hover:scale-105 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  Invite Team Member
                </Button>
              )}
              
              {(hasPermission('schedule_meetings') || user?.role === 'manager') && (
                <Button 
                  onClick={() => setShowMeetingForm(true)}
                  variant="outline" 
                  className="w-full justify-start hover:bg-purple-50 hover:border-purple-200 hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Meeting
                </Button>
              )}
              
              {hasPermission('view_analytics') && (
                <Button 
                  onClick={() => setShowAnalytics(true)}
                  variant="outline" 
                  className="w-full justify-start hover:bg-amber-50 hover:border-amber-200 hover:scale-105 transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forms and Modals */}
      <TaskForm open={showTaskForm} onOpenChange={setShowTaskForm} />
      <InviteTeamForm open={showInviteForm} onOpenChange={setShowInviteForm} />
      <MeetingForm open={showMeetingForm} onOpenChange={setShowMeetingForm} />
      <AnalyticsView open={showAnalytics} onOpenChange={setShowAnalytics} />
      <NotificationPanel open={showNotifications} onOpenChange={setShowNotifications} />
    </div>
  );
}
