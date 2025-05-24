
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus, Clock, Users } from "lucide-react";
import { MeetingForm } from "@/components/forms/MeetingForm";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const meetings = [
    {
      id: 1,
      title: "Project Review Meeting",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: ["Sarah Wilson", "Mike Johnson", "Alex Chen"],
      date: "2024-01-15",
      type: "project"
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      duration: "45 minutes",
      attendees: ["Sarah Wilson", "Emma Davis"],
      date: "2024-01-15",
      type: "client"
    },
    {
      id: 3,
      title: "Team Standup",
      time: "9:00 AM",
      duration: "30 minutes",
      attendees: ["All Team"],
      date: "2024-01-16",
      type: "standup"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Update user dashboard UI",
      dueDate: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "Review marketing campaign",
      dueDate: "2024-01-20",
      priority: "medium"
    }
  ];

  const selectedDateString = selectedDate.toISOString().split('T')[0];
  const selectedMeetings = meetings.filter(meeting => meeting.date === selectedDateString);
  const selectedTasks = tasks.filter(task => task.dueDate === selectedDateString);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-blue-100 text-blue-700';
      case 'client':
        return 'bg-purple-100 text-purple-700';
      case 'standup':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-sky-50/30">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/40 p-4">
            <SidebarTrigger className="hover:bg-muted transition-colors" />
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                <p className="text-gray-600 mt-1">Schedule and manage your meetings and deadlines</p>
              </div>
              <Button
                onClick={() => setShowMeetingForm(true)}
                className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Events for Selected Date */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Events for {selectedDate.toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Meetings */}
                    {selectedMeetings.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Meetings</h4>
                        <div className="space-y-2">
                          {selectedMeetings.map((meeting) => (
                            <div key={meeting.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{meeting.title}</h5>
                                <Badge className={getTypeColor(meeting.type)}>
                                  {meeting.type}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{meeting.time} ({meeting.duration})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{meeting.attendees.join(', ')}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tasks Due */}
                    {selectedTasks.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tasks Due</h4>
                        <div className="space-y-2">
                          {selectedTasks.map((task) => (
                            <div key={task.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{task.title}</span>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedMeetings.length === 0 && selectedTasks.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No events scheduled for this date</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MeetingForm open={showMeetingForm} onOpenChange={setShowMeetingForm} />
    </SidebarProvider>
  );
}
