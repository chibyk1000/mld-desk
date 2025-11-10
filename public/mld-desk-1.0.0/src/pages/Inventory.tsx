import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Package, AlertTriangle } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";

const inventory = [
  {
    id: 1,
    client: "TechStore Inc",
    product: "Laptop - Dell XPS 15",
    sku: "LAP-001",
    warehouse: "Main Warehouse",
    quantity: 45,
    status: "in-stock",
  },
  {
    id: 2,
    client: "Fashion Hub",
    product: "Designer Handbag",
    sku: "BAG-123",
    warehouse: "Main Warehouse",
    quantity: 12,
    status: "low-stock",
  },
  {
    id: 3,
    client: "Electronics World",
    product: "Wireless Headphones",
    sku: "AUD-456",
    warehouse: "Secondary Warehouse",
    quantity: 89,
    status: "in-stock",
  },
  {
    id: 4,
    client: "TechStore Inc",
    product: "Gaming Mouse",
    sku: "ACC-789",
    warehouse: "Main Warehouse",
    quantity: 5,
    status: "low-stock",
  },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Inventory Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Track products stored in warehouses
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Items" value="1,456" icon={Package} />
        <MetricCard
          title="Low Stock Items"
          value="23"
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Warehouses"
          value="3"
          icon={Package}
          variant="success"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.client}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell className="text-center font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "in-stock" ? "default" : "destructive"
                      }
                    >
                      {item.status === "in-stock" ? "In Stock" : "Low Stock"}
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
