"use client";

import {
  CreateCustomerFormData,
  CreateCustomerForm,
} from "@/components/customers/CreateCustomerForm";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { createCustomer, CUSTOMER_KEY } from "@/services/queries/Customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NewCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: (d: CreateCustomerFormData) => createCustomer(d),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Khách hàng được tạo thành công!");
      router.push(`/dashboard/customers/${data.customer.id}/edit`);
    },
    onError: (e: any) => {
      toast.error(
        `Ối. Đã xảy ra sự cố khi tạo khách hàng mới. ${e.response.data.message}`
      );
    },
  });

  async function handleCreateCustomer(data: CreateCustomerFormData) {
    createCustomerMutation.mutate(data);
  }

  return (
    <div>
      <PageTitle renderBackOption title="Khách hàng mới" />

      <CreateCustomerForm
        onSubmit={handleCreateCustomer}
        isLoading={createCustomerMutation.isLoading}
      />
    </div>
  );
}
