
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Users, CheckCircle, Target, Activity, Calendar, Award, Zap } from "lucide-react";

const Analytics = () => {
  const taskStatusData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 23, color: '#F59E0B' },
    { name: 'Todo', value: 18, color: '#3B82F6' },
    { name: 'Overdue', value: 8, color: '#EF4444' }
  ];

  const weeklyProgress = [
    { week: 'Week 1', completed: 12, assigned: 18, productivity: 67 },
    { week: 'Week 2', completed: 18, assigned: 24, productivity: 75 },
    { week: 'Week 3', completed: 25, assigned: 30, productivity: 83 },
    { week: 'Week 4', completed: 32, assigned: 36, productivity: 89 }
  ];

  const monthlyTrends = [
    { month: 'Jan', tasks: 85, efficiency: 78 },
    { month: 'Feb', tasks: 92, efficiency: 82 },
    { month: 'Mar', tasks: 105, efficiency: 85 },
    { month: 'Apr', tasks: 118, efficiency: 88 },
    { month: 'May', tasks: 134, efficiency: 91 }
  ];

  const departmentStats = [
    { dept: 'Engineering', completed: 45, total: 52, efficiency: 87 },
    { dept: 'Marketing', completed: 28, total: 35, efficiency: 80 },
    { dept: 'Sales', completed: 35, total: 40, efficiency: 88 },
    { dept: 'HR', completed: 18, total: 22, efficiency: 82 }
  ];

  const kpis = [
    {
      title: "Task Completion Rate",
      value: "87.5%",
      change: "+12.3%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Average Response Time",
      value: "2.4h",
      change: "-18%",
      trend: "up",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Team Productivity",
      value: "94.2%",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Project Velocity",
      value: "42 pts",
      change: "+15.2%",
      trend: "up",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-sky-50/30">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-muted transition-colors" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-indigo-600" />
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600">Comprehensive insights and performance metrics</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => (
                <Card key={kpi.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600 ml-1">{kpi.change}</span>
                        </div>
                      </div>
                      <div className={`${kpi.bgColor} p-3 rounded-xl`}>
                        <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Task Distribution */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Target className="w-5 h-5 mr-2 text-indigo-600" />
                    Task Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {taskStatusData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="tasks" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress and Department Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="assigned" fill="#E5E7EB" name="Assigned" />
                      <Bar dataKey="completed" fill="#10B981" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Performance */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    Department Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentStats.map((dept) => (
                      <div key={dept.dept} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-sky-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-sm">
                              {dept.dept.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{dept.dept}</p>
                            <p className="text-sm text-gray-600">
                              {dept.completed}/{dept.total} tasks completed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24">
                            <Progress value={dept.efficiency} className="h-2" />
                          </div>
                          <Badge variant={dept.efficiency >= 85 ? "default" : "secondary"} className="min-w-[60px]">
                            {dept.efficiency}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-600" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Top Performer</h3>
                    <p className="text-2xl font-bold text-emerald-600">Engineering</p>
                    <p className="text-sm text-gray-600">87% efficiency rate</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fastest Completion</h3>
                    <p className="text-2xl font-bold text-blue-600">2.1 days</p>
                    <p className="text-sm text-gray-600">Average task duration</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Team Growth</h3>
                    <p className="text-2xl font-bold text-purple-600">+23%</p>
                    <p className="text-sm text-gray-600">Productivity increase</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
