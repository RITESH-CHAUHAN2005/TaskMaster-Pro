
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Users, Video } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface MeetingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingForm({ open, onOpenChange }: MeetingFormProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    duration: '60',
    attendees: [] as string[],
    meetingType: 'video',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Meeting Scheduled",
      description: `"${formData.title}" has been scheduled successfully.`,
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      time: '',
      duration: '60',
      attendees: [],
      meetingType: 'video',
      location: ''
    });
    setDate(undefined);
    onOpenChange(false);
  };

  const teamMembers = [
    "Sarah Wilson",
    "Mike Johnson", 
    "Alex Chen",
    "Emma Davis",
    "Tom Brown",
    "Lisa Garcia"
  ];

  const toggleAttendee = (member: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(member)
        ? prev.attendees.filter(a => a !== member)
        : [...prev.attendees, member]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Schedule Meeting</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Sprint Planning Meeting"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Meeting agenda and objectives..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Meeting Type</Label>
            <Select value={formData.meetingType} onValueChange={(value) => setFormData(prev => ({ ...prev, meetingType: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>Video Call</span>
                  </div>
                </SelectItem>
                <SelectItem value="in-person">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>In Person</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.meetingType === 'in-person' && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Conference Room A, Office Building"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Attendees</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {teamMembers.map((member) => (
                <label key={member} className="flex items-center space-x-2 p-2 rounded-lg border cursor-pointer hover:bg-muted/50">
                  <input
                    type="checkbox"
                    checked={formData.attendees.includes(member)}
                    onChange={() => toggleAttendee(member)}
                    className="rounded"
                  />
                  <span className="text-sm">{member}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary-500 to-sky-500 hover:from-primary-600 hover:to-sky-600">
              Schedule Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
