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
import { Plus, TrendingUp, DollarSign, Users } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { OrderForm } from "@/components/OrderForm";
import { ClientPerformanceAnalytics } from "@/components/ClientPerformanceAnalytics";

const orders = [
  {
    id: "REG-001",
    customer: "John Doe",
    phone: "+1234567890",
    pickup: "123 Main St",
    destination: "456 Oak Ave",
    category: "Pick & Drop",
    cost: "$45",
    status: "delivered",
  },
  {
    id: "REG-002",
    customer: "Jane Smith",
    phone: "+1234567891",
    pickup: "789 Elm St",
    destination: "321 Pine Rd",
    category: "Errands",
    cost: "$30",
    status: "pending",
  },
  {
    id: "REG-003",
    customer: "Bob Wilson",
    phone: "+1234567892",
    pickup: "555 Cedar Ln",
    destination: "888 Maple Dr",
    category: "Pick & Drop",
    cost: "$50",
    status: "delivered",
  },
];

export default function RegularClients() {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Regular Clients
          </h2>
          <p className="text-muted-foreground mt-1">
            On-demand pick & drop and errand services
          </p>
        </div>
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Service Request</DialogTitle>
            </DialogHeader>
            <OrderForm
              onClose={() => setIsOrderDialogOpen(false)}
              onSubmit={(data) => console.log(data)}
              clientType="regular"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Customers" value="156" icon={Users} />
        <MetricCard
          title="Completed Orders"
          value="439"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Total Revenue"
          value="$18,670"
          icon={DollarSign}
          variant="success"
        />
      </div>

      <ClientPerformanceAnalytics />

      <Card>
        <CardHeader>
          <CardTitle>Recent Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.cost}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
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
