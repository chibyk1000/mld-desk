"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Package, CheckCircle, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const initialWarehouses = [
  {
    id: "WH-001",
    name: "Central Hub",
    location: "New York, NY",
    capacity: "85%",
    items: 4250,
    status: "active",
    agents: ["John Doe", "Jane Smith"],
  },
  {
    id: "WH-002",
    name: "West Coast Depot",
    location: "Los Angeles, CA",
    capacity: "62%",
    items: 2890,
    status: "active",
    agents: ["Mike Brown"],
  },
];
export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState(initialWarehouses);


  const [openView, setOpenView] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [_openEdit, setOpenEdit] = useState(false);
  // Open Edit modal
  const handleEdit = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setOpenEdit(true);
  };

  // Delete warehouse
  const handleDelete = (id: string) => {
    setWarehouses((prev) => prev.filter((w) => w.id !== id));
  };
  const handleView = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setOpenView(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Warehouses</h2>
          <p className="text-muted-foreground">
            Manage your warehouse facilities and inventory
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Warehouse
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Warehouses */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Warehouses
            </CardTitle>
            <Button size={"icon-sm"} variant={"ghost"} className="bg-accent/10">
              <Package className="h-5 w-5 text-accent" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        {/* Total Capacity */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Capacity
            </CardTitle>
            <Button size={"icon-sm"} variant={"ghost"} className="bg-accent/10">
              <MapPin className="h-5 w-5 text-accent" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,490</div>
          </CardContent>
        </Card>

        {/* Average Utilization */}
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Utilization
            </CardTitle>
            <Button size={"icon-sm"} variant={"ghost"} className="bg-accent/10">
              <CheckCircle className="h-5 w-5 text-accent" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Warehouses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((wh) => (
                <TableRow key={wh.id}>
                  <TableCell className="font-medium">{wh.id}</TableCell>
                  <TableCell>{wh.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {wh.location}
                    </div>
                  </TableCell>
                  <TableCell>{wh.capacity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {wh.items}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        wh.status === "full" ? "bg-yellow-500" : "bg-green-600"
                      }
                    >
                      {wh.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{wh.agents.join(", ")}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(wh)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(wh.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(wh)}
                    >
                      {" "}
                      View Details{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* -------------------------------------------------- */}
      {/* Add Warehouse Modal */}
      {/* -------------------------------------------------- */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Warehouse</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input placeholder="Warehouse name" />
            </div>

            <div className="space-y-1">
              <Label>Location</Label>
              <Input placeholder="City, State" />
            </div>

            <div className="space-y-1">
              <Label>Capacity</Label>
              <Input placeholder="Example: 85%" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
            <Button>Add Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------------------------------------- */}
      {/* View Warehouse Modal */}
      {/* -------------------------------------------------- */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Warehouse Details</DialogTitle>
          </DialogHeader>

          {selectedWarehouse && (
            <div className="space-y-3 mt-4 text-sm">
              <p>
                <span className="font-medium">ID:</span> {selectedWarehouse.id}
              </p>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedWarehouse.name}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {selectedWarehouse.location}
              </p>
              <p>
                <span className="font-medium">Capacity:</span>{" "}
                {selectedWarehouse.capacity}
              </p>
              <p>
                <span className="font-medium">Items:</span>{" "}
                {selectedWarehouse.items}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedWarehouse.status}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setOpenView(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
