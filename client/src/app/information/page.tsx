"use client";

import {
  AppointmentForm,
  AppointmentFormData,
} from "@/components/appointments/AppointmentForm";
import {
  CreateCustomerForm,
  CreateCustomerFormData,
} from "@/components/customers/CreateCustomerForm";
import { PageTitle } from "@/components/dashboard/PageTitle";
import ComponentMain from "@/components/main-component";
import {
  APPOINTMENT_KEY,
  createAppointment,
} from "@/services/queries/Appointment";
import {
  CUSTOMER_KEY,
  createCustomer,
  fetchCustomer,
  fetchCustomers,
} from "@/services/queries/Customer";
import { useSessionStore } from "@/stores/session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Table } from "@/components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Customer } from "@/@types/Customer";
import { patternFormatter } from "react-number-format";
import { cellPhonePattern } from "@/utils/phoneNumber";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PencilSimple } from "phosphor-react";
import { PetForm } from "@/components/customers/pets/PetForm";

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info?.getValue(),
    header: "Tên",
  }),
  columnHelper.accessor("phone", {
    cell: (info) =>
      patternFormatter(info?.getValue(), {
        format: cellPhonePattern,
        patternChar: "#",
      }),
    header: "Số điện thoại",
  }),
  columnHelper.accessor("pets", {
    cell: (info) => info?.getValue().length,
    header: "Số lượng thú cưng",
  }),
  // columnHelper.display({
  //   header: "Tuỳ chọn",
  //   cell: (props) => (
  //     <div className="flex gap-3">
  //       <Button circle tooltipText="Chỉnh sửa" asChild>
  //         <Link href={`/dashboard/customers/${props.row.original.id}/edit`}>
  //           <PencilSimple className="w-6 h-6" />
  //         </Link>
  //       </Button>
  //     </div>
  //   ),
  // }),
];

export default function Information() {
  const [user] = useSessionStore((state) => [state.user, state.signOut]);
  const queryClient = useQueryClient();

  const customersListQuery = useQuery({
    queryKey: [CUSTOMER_KEY],
    queryFn: () => fetchCustomers(user?.id || ""),
  });

  //   const customerShowQuery = useQuery({
  //     queryKey: [CUSTOMER_KEY, user?.id],
  //     queryFn: () => fetchCustomer(customersListQuery.data?.customers[0].id || ''),
  //   });

  const createCustomerMutation = useMutation({
    mutationFn: (d: CreateCustomerFormData) => createCustomer(d),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] });
      toast.success("Khách hàng được tạo thành công!");
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

  const createAppointmentMutation = useMutation({
    mutationFn: (data: AppointmentFormData) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPOINTMENT_KEY] });
      toast.success("Cuộc hẹn được tạo thành công!");
    },
    onError: (err) => {
      toast.error(`Ối. Đã xảy ra sự cố khi tạo lịch biểu. ${err}`);
    },
  });

  async function handleCreateAppointment(data: AppointmentFormData) {
    createAppointmentMutation.mutate(data);
  }

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info?.getValue(),
      header: "Tên",
    }),
    columnHelper.accessor("phone", {
      cell: (info) =>
        patternFormatter(info?.getValue(), {
          format: cellPhonePattern,
          patternChar: "#",
        }),
      header: "Số điện thoại",
    }),
    columnHelper.accessor("pets", {
      cell: (info) => info?.getValue().length,
      header: "Số lượng thú cưng",
    }),
    columnHelper.display({
      header: "Tuỳ chọn",
      cell: (props) => (
        <div className="flex gap-3">
          <Button circle tooltipText="Chỉnh sửa" asChild>
            <Link href={`/dashboard/customers/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
          <div className="container mx-auto ">
            <PageTitle title="* Lịch hẹn" className="text-black" />
            <h2 className="h2">Thông tin của bạn</h2>
            <div>
              <Table
                data={customersListQuery.data?.customers ?? []}
                columns={columns}
                asyncStatus={customersListQuery.status}
              />
            </div>
            <div className="">
              <AppointmentForm
                isLoading={createAppointmentMutation.isLoading}
                onSubmit={handleCreateAppointment}
              />
              {/* <Table
                data={customerShowQuery.data?.customer.pets ?? []}
                columns={columns}
              /> */}
              {/* <div>
                <PetForm onSubmit={handleCreatePet} />
              </div> */}
              {/* <CreateCustomerForm
                onSubmit={handleCreateCustomer}
                isLoading={createCustomerMutation.isLoading}
              /> */}
            </div>
          </div>
        </section>
      </ComponentMain>
    </div>
  );
}
