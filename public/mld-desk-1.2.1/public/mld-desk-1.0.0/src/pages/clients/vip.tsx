import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign, TrendingUp } from "lucide-react";
import { VIPClientForm } from "@/components/VipClientForm";
import { OrderForm } from "@/components/OrderForm";
import { MetricCard } from "@/components/MetricCard";
import { ClientPerformanceAnalytics } from "@/components/ClientPerformanceAnalytics";

const clients = [
  {
    id: 1,
    company: "TechStore Inc",
    contact: "John Smith",
    phone: "+1234567890",
    email: "john@techstore.com",
    orders: 45,
    stock: 234,
  },
  {
    id: 2,
    company: "Fashion Hub",
    contact: "Sarah Lee",
    phone: "+1234567891",
    email: "sarah@fashionhub.com",
    orders: 67,
    stock: 456,
  },
  {
    id: 3,
    company: "Electronics World",
    contact: "Mike Johnson",
    phone: "+1234567892",
    email: "mike@electronics.com",
    orders: 89,
    stock: 789,
  },
];

export default function VIPClients() {
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">VIP Clients</h2>
          <p className="text-muted-foreground mt-1">
            Manage e-commerce vendors and their inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Package className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create VIP Order</DialogTitle>
              </DialogHeader>
              <OrderForm
                onClose={() => setIsOrderDialogOpen(false)}
                onSubmit={(data) => console.log(data)}
                clientType="vip"
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isClientDialogOpen}
            onOpenChange={setIsClientDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add VIP Client</DialogTitle>
              </DialogHeader>
              <VIPClientForm
                onClose={() => setIsClientDialogOpen(false)}
                onSubmit={(data) => console.log(data)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total VIP Clients" value="24" icon={Package} />
        <MetricCard
          title="Total Orders"
          value="845"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Pending Remittance"
          value="$8,450"
          icon={DollarSign}
          variant="warning"
        />
      </div>

      <ClientPerformanceAnalytics />

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-center">Stock Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.company}
                  </TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{client.orders}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{client.stock}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
