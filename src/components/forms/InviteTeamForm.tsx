
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Mail, Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InviteTeamFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteTeamForm({ open, onOpenChange }: InviteTeamFormProps) {
  const { toast } = useToast();
  const [inviteMethod, setInviteMethod] = useState<'email' | 'link'>('email');
  const [formData, setFormData] = useState({
    email: '',
    role: 'member',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inviteMethod === 'email') {
      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${formData.email}`,
      });
    } else {
      toast({
        title: "Invite Link Generated",
        description: "Invite link copied to clipboard",
      });
    }
    
    // Reset form
    setFormData({
      email: '',
      role: 'member',
      message: ''
    });
    onOpenChange(false);
  };

  const generateInviteLink = () => {
    const link = `https://taskmaster-pro.com/invite/abc123`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Invite link copied to clipboard",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite Team Member</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={inviteMethod === 'email' ? 'default' : 'outline'}
              onClick={() => setInviteMethod('email')}
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Invite
            </Button>
            <Button
              type="button"
              variant={inviteMethod === 'link' ? 'default' : 'outline'}
              onClick={() => setInviteMethod('link')}
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              Invite Link
            </Button>
          </div>

          {inviteMethod === 'email' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">
                      <div className="flex items-center space-x-2">
                        <span>Member</span>
                        <Badge variant="secondary" className="text-xs">View & Update Tasks</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center space-x-2">
                        <span>Manager</span>
                        <Badge variant="secondary" className="text-xs">Manage Tasks</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <span>Admin</span>
                        <Badge variant="secondary" className="text-xs">Full Access</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Welcome to our team! Looking forward to working with you."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-primary-500 to-sky-500 hover:from-primary-600 hover:to-sky-600">
                  Send Invitation
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <Label className="text-sm font-medium">Invite Link</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input 
                    value="https://taskmaster-pro.com/invite/abc123" 
                    readOnly 
                    className="bg-background"
                  />
                  <Button size="sm" onClick={generateInviteLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This link will expire in 7 days and can be used once.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Default Role for Link</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={generateInviteLink} className="bg-gradient-to-r from-primary-500 to-sky-500 hover:from-primary-600 hover:to-sky-600">
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
