import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface OrderFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  clientType: "vip" | "regular";
}

export function OrderForm({ onClose, onSubmit, clientType }: OrderFormProps) {
  const [formData, setFormData] = useState({
    client: "",
    warehouse: "",
    destination: "",
    collectPayment: false,
    paymentReceived: "",
    productCost: "",
    serviceCost: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="client">
          {clientType === "vip" ? "VIP Client" : "Customer Name"}
        </Label>
        <Select
          onValueChange={(value) => setFormData({ ...formData, client: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client1">Client 1</SelectItem>
            <SelectItem value="client2">Client 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {clientType === "vip" && (
        <div className="space-y-2">
          <Label htmlFor="warehouse">Source Warehouse</Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, warehouse: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse1">Main Warehouse</SelectItem>
              <SelectItem value="warehouse2">Secondary Warehouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          value={formData.destination}
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="collectPayment"
          checked={formData.collectPayment}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, collectPayment: checked as boolean })
          }
        />
        <Label htmlFor="collectPayment" className="cursor-pointer">
          Collect Payment on Delivery
        </Label>
      </div>

      {formData.collectPayment && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentReceived">Payment Amount</Label>
              <Input
                id="paymentReceived"
                type="number"
                step="0.01"
                value={formData.paymentReceived}
                onChange={(e) =>
                  setFormData({ ...formData, paymentReceived: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCost">Product Cost</Label>
              <Input
                id="productCost"
                type="number"
                step="0.01"
                value={formData.productCost}
                onChange={(e) =>
                  setFormData({ ...formData, productCost: e.target.value })
                }
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="serviceCost">Service Cost</Label>
        <Input
          id="serviceCost"
          type="number"
          step="0.01"
          value={formData.serviceCost}
          onChange={(e) =>
            setFormData({ ...formData, serviceCost: e.target.value })
          }
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Order</Button>
      </div>
    </form>
  );
}
