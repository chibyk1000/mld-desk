"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star, Users, UserCheck, TrendingUp, Trash2 } from "lucide-react";
import {  Tooltip, Legend, ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy agent data with assigned warehouse, role, and performance
const initialAgents = [
  {
    id: "AG-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "1234567890",
    warehouse: "Central Hub",
    role: "Storekeeper",
    weekly: { assigned: 20, completed: 18, failed: 2 },
    monthly: { assigned: 150, completed: 145, failed: 5 },
    rating: 4.8,
    status: "active",
  },
  {
    id: "AG-002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "0987654321",
    warehouse: "West Coast Depot",
    role: "Delivery Agent",
    weekly: { assigned: 18, completed: 17, failed: 1 },
    monthly: { assigned: 140, completed: 132, failed: 8 },
    rating: 4.9,
    status: "active",
  },
];

export default function AgentList() {
  const [agents, setAgents] = useState(initialAgents);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
const [reportPeriod, setReportPeriod] = useState<"weekly" | "monthly">(
  "weekly"
);
  const handleEdit = (agent: any) => {
    setSelectedAgent(agent);
    setOpenEdit(true);
  };

  const handleDelete = (id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };
  const chartData = agents.map((agent) => ({
    name: agent.name,
    assigned: agent[reportPeriod].assigned,
    completed: agent[reportPeriod].completed,
    failed: agent[reportPeriod].failed,
  }));
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">
            Manage your delivery agents and track performance
          </p>
        </div>

        <div className="flex justify-end mb-4 w-40">
          <Select
            value={reportPeriod}
            onValueChange={(value) =>
              setReportPeriod(value as "weekly" | "monthly")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-primary text-primary-foreground ml-2 hover:bg-primary/90"
            onClick={() => setOpenAdd(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Agents */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Agents
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
          </CardContent>
        </Card>

        {/* Active Agents */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Agents
            </CardTitle>
            <UserCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>

        {/* Avg Rating */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Rating
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              4.7 <Star className="h-5 w-5 fill-warning text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Agent Performance
          </h2>
        </div>

        {/* Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Assigned vs Completed vs Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="assigned" fill="#8884d8" name="Assigned" />
                  <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                  <Bar dataKey="failed" fill="#ff6b6b" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => {
                const data = agent[reportPeriod]; // weekly or monthly

                return (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {agent.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.warehouse}</TableCell>
                    <TableCell>{agent.role}</TableCell>
                    <TableCell>
                      {data.completed}/{data.assigned} (
                      {Math.round((data.completed / data.assigned) * 100)}%)
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />{" "}
                        {agent.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          agent.status === "active" ? "bg-success" : "bg-muted"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(agent)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Agent Modal */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input placeholder="Agent name" />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="Email address" />
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input placeholder="Phone number" />
            </div>
            <div className="space-y-1">
              <Label>Assigned Warehouse</Label>
              <Input placeholder="Warehouse name" />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <Input placeholder="Storekeeper / Agent" />
            </div>
            <div className="space-y-1">
              <Label>Assigned Orders</Label>
              <Input placeholder="Total assigned orders" />
            </div>
            <div className="space-y-1">
              <Label>Completed Orders</Label>
              <Input placeholder="Orders completed" />
            </div>
            <div className="space-y-1">
              <Label>Failed Orders</Label>
              <Input placeholder="Orders failed" />
            </div>
            <div className="space-y-1">
              <Label>Rating</Label>
              <Input placeholder="Rating 0-5" />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Input placeholder="active / inactive" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
            <Button>Add Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Agent Modal */}
      {/* Edit Agent Modal */}
      <Dialog open={openEdit} onOpenChange={() => setOpenEdit(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-4 mt-4">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input defaultValue={selectedAgent.name} />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input defaultValue={selectedAgent.email} />
              </div>

              <div className="space-y-1">
                <Label>Phone</Label>
                <Input defaultValue={selectedAgent.phone} />
              </div>

              <div className="space-y-1">
                <Label>Assigned Warehouse</Label>
                <Input defaultValue={selectedAgent.warehouse} />
              </div>

              <div className="space-y-1">
                <Label>Role</Label>
                <Input defaultValue={selectedAgent.role} />
              </div>

              {/* WEEKLY FIELDS */}
              <div className="space-y-1">
                <Label>Weekly Assigned</Label>
                <Input defaultValue={selectedAgent.weekly.assigned} />
              </div>

              <div className="space-y-1">
                <Label>Weekly Completed</Label>
                <Input defaultValue={selectedAgent.weekly.completed} />
              </div>

              <div className="space-y-1">
                <Label>Weekly Failed</Label>
                <Input defaultValue={selectedAgent.weekly.failed} />
              </div>

              {/* MONTHLY FIELDS */}
              <div className="space-y-1">
                <Label>Monthly Assigned</Label>
                <Input defaultValue={selectedAgent.monthly.assigned} />
              </div>

              <div className="space-y-1">
                <Label>Monthly Completed</Label>
                <Input defaultValue={selectedAgent.monthly.completed} />
              </div>

              <div className="space-y-1">
                <Label>Monthly Failed</Label>
                <Input defaultValue={selectedAgent.monthly.failed} />
              </div>

              <div className="space-y-1">
                <Label>Rating</Label>
                <Input defaultValue={selectedAgent.rating} />
              </div>

              <div className="space-y-1">
                <Label>Status</Label>
                <Input defaultValue={selectedAgent.status} />
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedAgent.id)}
            >
              Delete
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpenEdit(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
