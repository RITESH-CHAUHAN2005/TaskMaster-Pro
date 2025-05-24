
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Activity,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Star
} from "lucide-react";
import { useState } from "react";
import { InviteTeamForm } from "@/components/forms/InviteTeamForm";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showInviteForm, setShowInviteForm] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      role: "admin",
      department: "Engineering",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "2023-01-15",
      tasksCompleted: 45,
      efficiency: 92,
      status: "online"
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "manager",
      department: "Marketing",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      joinDate: "2023-02-20",
      tasksCompleted: 38,
      efficiency: 88,
      status: "online"
    },
    {
      id: 3,
      name: "Alex Chen",
      email: "alex.chen@company.com",
      role: "member",
      department: "Engineering",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 345-6789",
      location: "Seattle, WA",
      joinDate: "2023-03-10",
      tasksCompleted: 52,
      efficiency: 95,
      status: "away"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@company.com",
      role: "manager",
      department: "Sales",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      joinDate: "2023-01-30",
      tasksCompleted: 41,
      efficiency: 89,
      status: "online"
    },
    {
      id: 5,
      name: "James Rodriguez",
      email: "james.rodriguez@company.com",
      role: "member",
      department: "HR",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 567-8901",
      location: "Miami, FL",
      joinDate: "2023-04-05",
      tasksCompleted: 29,
      efficiency: 85,
      status: "offline"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      role: "member",
      department: "Marketing",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 678-9012",
      location: "Los Angeles, CA",
      joinDate: "2023-03-25",
      tasksCompleted: 33,
      efficiency: 87,
      status: "online"
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'manager':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'member':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const departmentStats = [
    { name: "Engineering", count: 2, color: "bg-blue-500" },
    { name: "Marketing", count: 2, color: "bg-green-500" },
    { name: "Sales", count: 1, color: "bg-purple-500" },
    { name: "HR", count: 1, color: "bg-orange-500" }
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
                    <Users className="w-6 h-6 mr-2 text-indigo-600" />
                    Team Members
                  </h1>
                  <p className="text-gray-600">Manage your team and track performance</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowInviteForm(true)}
                className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Members</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Online Now</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {teamMembers.filter(m => m.status === 'online').length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {Math.round(teamMembers.reduce((sum, m) => sum + m.efficiency, 0) / teamMembers.length)}%
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Departments</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{departmentStats.length}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                  Department Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                      <div className={`w-12 h-12 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <span className="text-white font-bold">{dept.count}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-600">{dept.count} members</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-indigo-500 to-sky-500 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-white">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-white text-indigo-600 font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <Badge className={`${getRoleBadgeColor(member.role)} text-xs`}>
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{member.tasksCompleted}</p>
                          <p className="text-xs opacity-80">Tasks Done</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{member.efficiency}%</p>
                          <p className="text-xs opacity-80">Efficiency</p>
                        </div>
                        <div className="text-center">
                          <Star className="w-6 h-6 mx-auto mb-1" />
                          <p className="text-xs opacity-80">Top Performer</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{member.location}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Department</span>
                          <Badge variant="outline" className="text-xs">
                            {member.department}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Mail className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or invite new team members.</p>
                  <Button 
                    onClick={() => setShowInviteForm(true)}
                    className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Team Member
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <InviteTeamForm open={showInviteForm} onOpenChange={setShowInviteForm} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Members;
