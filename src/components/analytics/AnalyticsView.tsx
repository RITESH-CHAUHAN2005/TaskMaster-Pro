
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Users, CheckCircle } from "lucide-react";

interface AnalyticsViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const taskStatusData = [
  { name: 'Todo', value: 12, color: '#3B82F6' },
  { name: 'In Progress', value: 8, color: '#F59E0B' },
  { name: 'Completed', value: 32, color: '#10B981' },
  { name: 'Overdue', value: 3, color: '#EF4444' }
];

const weeklyProgress = [
  { week: 'Week 1', completed: 8, assigned: 12 },
  { week: 'Week 2', completed: 12, assigned: 15 },
  { week: 'Week 3', completed: 15, assigned: 18 },
  { week: 'Week 4', completed: 20, assigned: 22 }
];

export function AnalyticsView({ open, onOpenChange }: AnalyticsViewProps) {
  const totalTasks = taskStatusData.reduce((sum, item) => sum + item.value, 0);
  const completedTasks = taskStatusData.find(item => item.name === 'Completed')?.value || 0;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Task Analytics</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <p className="text-2xl font-bold mt-1">{totalTasks}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <p className="text-2xl font-bold mt-1">{completedTasks}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Completion Rate</span>
                </div>
                <p className="text-2xl font-bold mt-1">{completionRate}%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium">Active Members</span>
                </div>
                <p className="text-2xl font-bold mt-1">8</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
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
                <div className="flex flex-wrap gap-2 mt-4">
                  {taskStatusData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
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
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Wilson', completed: 12, assigned: 15, efficiency: 80 },
                  { name: 'Mike Johnson', completed: 8, assigned: 10, efficiency: 80 },
                  { name: 'Alex Chen', completed: 10, assigned: 11, efficiency: 91 },
                  { name: 'Emma Davis', completed: 6, assigned: 8, efficiency: 75 }
                ].map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.completed}/{member.assigned} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24">
                        <Progress value={member.efficiency} className="h-2" />
                      </div>
                      <Badge variant={member.efficiency >= 80 ? "default" : "secondary"}>
                        {member.efficiency}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
