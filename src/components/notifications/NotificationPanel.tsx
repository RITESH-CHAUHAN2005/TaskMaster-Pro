
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Clock, User, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

interface NotificationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'task_overdue' | 'meeting_scheduled' | 'user_invited';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_overdue',
    title: 'Task Overdue',
    message: 'Fix authentication bug is now overdue',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Alex Chen completed "Implement dark mode"',
    time: '4 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned "Update landing page design"',
    time: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'meeting_scheduled',
    title: 'Meeting Scheduled',
    message: 'Sprint Planning meeting scheduled for tomorrow at 10:00 AM',
    time: '1 day ago',
    read: true
  },
  {
    id: '5',
    type: 'user_invited',
    title: 'New Team Member',
    message: 'Jennifer Lopez has joined your organization',
    time: '2 days ago',
    read: true
  }
];

export function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'task_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'task_assigned':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'meeting_scheduled':
        return <Bell className="h-4 w-4 text-purple-500" />;
      case 'user_invited':
        return <User className="h-4 w-4 text-indigo-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: Notification['type']) => {
    switch (type) {
      case 'task_overdue':
        return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
      case 'task_completed':
        return <Badge className="bg-green-100 text-green-700 text-xs">Completed</Badge>;
      case 'task_assigned':
        return <Badge className="bg-blue-100 text-blue-700 text-xs">Assigned</Badge>;
      case 'meeting_scheduled':
        return <Badge className="bg-purple-100 text-purple-700 text-xs">Meeting</Badge>;
      case 'user_invited':
        return <Badge className="bg-indigo-100 text-indigo-700 text-xs">Team</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[600px]">
        <DialogHeader className="border-b border-border/40 pb-4">
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            <Badge variant="secondary" className="ml-auto">
              {mockNotifications.filter(n => !n.read).length} new
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 hover:bg-muted/50",
                  notification.read ? "border-border/40 bg-background" : "border-primary/20 bg-primary/5"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        {getNotificationBadge(notification.type)}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border/40 pt-4">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Mark All as Read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
