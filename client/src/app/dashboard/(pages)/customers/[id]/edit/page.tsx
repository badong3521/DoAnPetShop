"use client";

import { APIError } from "@/@types/API";
import { Pet } from "@/@types/Pet";
import { AsynchronousContent } from "@/components/AsynchronousContent";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import { EditCustomerForm, EditCustomerFormData } from "@/components/customers/EditCustomerForm";
import { PetForm, PetFormData } from "@/components/customers/pets/PetForm";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { Table } from "@/components/ui/Table";
import {
  CUSTOMER_KEY,
  addCustomerPet,
  editCustomerPet,
  fetchCustomer,
  removeCustomerPet,
  updateCustomer,
} from "@/services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { toast } from "react-hot-toast";

interface EditCustomerMutationPayload {
  id: string;
  data: EditCustomerFormData;
}

interface EditPetMutationPayload {
  id: string;
  data: PetFormData;
}

const columnHelper = createColumnHelper<Pet>();

export default function EditCustomer({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const customerShowQuery = useQuery({
    queryKey: [CUSTOMER_KEY, params.id],
    queryFn: () => fetchCustomer(params.id),
  });

  const editCustomerMutation = useMutation({
    mutationFn: (payload: EditCustomerMutationPayload) => updateCustomer(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Khách hàng đã chỉnh sửa thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cố gắng chỉnh sửa ứng dụng khách.");
    },
  });

  const addPetMutation = useMutation({
    mutationFn: (payload: PetFormData) => addCustomerPet(params.id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });

      const updatedCustomer = {
        ...customerShowQuery.data?.customer,
        pets: [...(customerShowQuery.data?.customer.pets ?? []), data.pet],
      };
      queryClient.setQueryData([CUSTOMER_KEY, params.id], { customer: updatedCustomer });

      toast.success("Đã thêm thú cưng thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi thêm thú cưng vào máy khách.");
    },
  });

  const editPetMutation = useMutation({
    mutationFn: (payload: EditPetMutationPayload) => editCustomerPet(payload.id, payload.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY, params.id] });

      const customerData = customerShowQuery.data?.customer;
      const updatedCustomer = {
        ...customerData,
        pets: customerData?.pets.map((p) => {
          if (p.id === data.pet.id) {
            return data.pet;
          }
          return p;
        }),
      };
      queryClient.setQueryData([CUSTOMER_KEY, params.id], { customer: updatedCustomer });

      toast.success("Cập nhật thú cưng thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cập nhật thú cưng của khách hàng.");
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: (petId: string) => removeCustomerPet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Đã xóa thú cưng thành công!");
    },
    onError: (err: APIError | Error) => {
      if (axios.isAxiosError(err) && (err.response?.data as APIError).name === "InvalidDeleteOperation") {
        toast.error("Không thể xóa thú cưng của khách hàng vì họ đã có lịch hẹn.");
      } else {
        toast.error("Ối. Đã xảy ra sự cố khi cố gắng loại bỏ thú cưng của khách hàng.");
      }
    },
  });

  const showCustomerErrorMessage = () => {
    const error = customerShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404) return "Lỗi! Không tìm thấy khách hàng.";
  };

  async function handleEditCustomer(data: EditCustomerFormData) {
    editCustomerMutation.mutate({ id: params.id, data });
  }

  function handleCreatePet(data: PetFormData) {
    addPetMutation.mutate(data);
  }

  function handleEditPet(id: string, data: PetFormData) {
    editPetMutation.mutate({ id, data });
  }

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Tên",
    }),
    columnHelper.accessor("breed", {
      cell: (info) => info.getValue(),
      header: "Giống loài",
    }),
    columnHelper.accessor("age", {
      cell: (info) => info.getValue(),
      header: "Tuổi",
    }),
    columnHelper.display({
      header: "Tuỳ chọn",
      cell: (props) => (
        <div className="flex gap-3">
          <PetForm pet={props.row.original} onSubmit={(d) => handleEditPet(props.row.original.id, d)} />

          <ConfirmDeletePopover
            onConfirmDelete={() => {
              deletePetMutation.mutate(props.row.original.id);
            }}
          />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle renderBackOption title="Chỉnh sửa khách hàng" />

      <AsynchronousContent status={customerShowQuery.status} errorMessage={showCustomerErrorMessage()}>
        {() => (
          <>
            <EditCustomerForm
              customer={customerShowQuery.data!.customer}
              isLoading={editCustomerMutation.isLoading}
              onSubmit={handleEditCustomer}
            />
            <div className="prose flex items-center gap-2 mt-4">
              <h3 className="my-0">Pets</h3>
            </div>
            <Table data={customerShowQuery.data?.customer.pets ?? []} columns={columns} />
            <div>
              <PetForm onSubmit={handleCreatePet} />
            </div>
          </>
        )}
      </AsynchronousContent>
    </div>
  );
}
