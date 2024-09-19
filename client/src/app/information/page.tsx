"use client";

// import {
//   AppointmentForm,
//   AppointmentFormData,
// } from "@/components/appointments/AppointmentForm";
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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { Label } from "@/components/ui/Form/Label";
import { Select } from "@/components/ui/Form/Inputs/Select";
import {
  PET_SHOP_SERVICE_KEY,
  fetchPetShopServices,
} from "@/services/queries/PetshopServices";
import { SelectCustomerPet } from "@/components/appointments/SelectCustomerPet";

const columnHelper = createColumnHelper<Customer>();

// const columns = [
//   columnHelper.accessor("name", {
//     cell: (info) => info?.getValue(),
//     header: "Tên",
//   }),
//   columnHelper.accessor("phone", {
//     cell: (info) =>
//       patternFormatter(info?.getValue(), {
//         format: cellPhonePattern,
//         patternChar: "#",
//       }),
//     header: "Số điện thoại",
//   }),
//   columnHelper.accessor("pets", {
//     cell: (info) => info?.getValue().length,
//     header: "Số lượng thú cưng",
//   }),
//   // columnHelper.display({
//   //   header: "Tuỳ chọn",
//   //   cell: (props) => (
//   //     <div className="flex gap-3">
//   //       <Button circle tooltipText="Chỉnh sửa" asChild>
//   //         <Link href={`/dashboard/customers/${props.row.original.id}/edit`}>
//   //           <PencilSimple className="w-6 h-6" />
//   //         </Link>
//   //       </Button>
//   //     </div>
//   //   ),
//   // }),
// ];

export default function Information() {
  const [user] = useSessionStore((state) => [state.user, state.signOut]);
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customersListQuery = useQuery({
    queryKey: [CUSTOMER_KEY],
    queryFn: () => fetchCustomers(user?.id || ""),
    onError: () => {
      toast.error("Không thể tải khách hàng.");
    },
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

  const todayTimestamp = dayjs().format("YYYY-MM-DD[T]HH:mm");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentTime: undefined,
      petId: undefined,
      serviceId: "",
    },
  });

  const petShopServicesListQuery = useQuery({
    queryKey: [PET_SHOP_SERVICE_KEY],
    queryFn: fetchPetShopServices,
  });

  function onPetSelectionChange(petId: string | undefined) {
    if (petId) {
      setValue("petId", petId);
    } else {
      resetField("petId", {
        defaultValue: undefined,
      });
    }
  }

  const handleFormSubmit = (data: AppointmentFormData) => {
    handleCreateAppointment(data);
  };

  console.log(
    "customersListQuery.data",
    customersListQuery.data?.customers.length === 0
  );

  const renderContent = () => {
    return (
      <div className="btn-primary-client overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-white">
            Thông tin của bạn
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 text-orange-500">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-white">Tên</dt>
              <dd className="mt-1 text-sm text-orange-500 sm:mt-0 sm:col-span-2">
                {customersListQuery.data?.customers[0]?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-white">Email</dt>
              <dd className="mt-1 text-sm text-orange-500 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-white">Số điện thoại</dt>
              <dd className="mt-1 text-sm text-orange-500 sm:mt-0 sm:col-span-2">
                {customersListQuery.data?.customers[0]?.phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      {isClient ? (
        <ComponentMain>
          <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
            <div className="container mx-auto ">
              <div>
                {customersListQuery.isLoading ? (
                  <p>Đang tải danh sách khách hàng...</p>
                ) : customersListQuery.isError ? (
                  <p>Không thể tải danh sách khách hàng.</p>
                ) : (
                  <div>
                    {customersListQuery.data?.customers.length !== 0 ? (
                      renderContent()
                    ) : (
                      <>
                        <CreateCustomerForm
                          onSubmit={handleCreateCustomer}
                          isLoading={createCustomerMutation.isLoading}
                        />
                      </>
                    )}
                    <div className="mt-5">
                      <PageTitle title="* Lịch hẹn" className="text-black" />
                      <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="w-full max-w-2xl mt-4"
                      >
                        <div className="flex flex-col justify-between w-full gap-2">
                          <div className="flex w-fit flex-col md:flex-row gap-2 md:gap-8 flex-wrap">
                            <fieldset>
                              <Label>Chọn thú cưng</Label>
                              <input
                                className="hidden"
                                {...register("petId")}
                              />
                              <SelectCustomerPet
                                onPetSelectionChange={onPetSelectionChange}
                              />
                              {errors.petId?.message && (
                                <Label error>{errors.petId?.message}</Label>
                              )}
                            </fieldset>

                            <fieldset>
                              <Select
                                label="Dịch vụ"
                                id="serviceId"
                                errorMessage={errors.serviceId?.message}
                                {...register("serviceId")}
                              >
                                <option disabled value="">
                                  Chọn một dịch vụ
                                </option>
                                {petShopServicesListQuery.data?.services.map(
                                  (service) => (
                                    <option key={service.id} value={service.id}>
                                      {service.title}
                                    </option>
                                  )
                                )}
                              </Select>
                            </fieldset>
                          </div>

                          <fieldset className="w-60">
                            <Input
                              type="datetime-local"
                              label="Thời gian"
                              id="appointmentTime"
                              errorMessage={errors.appointmentTime?.message}
                              {...register("appointmentTime")}
                              required
                              min={todayTimestamp}
                            />
                          </fieldset>
                        </div>

                        <div className="mt-8">
                          <Button
                            type="submit"
                            bg="submit"
                            isLoading={createAppointmentMutation.isLoading}
                          >
                            Tạo cuộc hẹn
                          </Button>
                        </div>
                      </form>
                      {/* <Table
                data={customerShowQuery.data?.customer.pets ?? []}
                columns={columns}
              /> */}
                      {/* <div>
                  <PetForm onSubmit={handleCreatePet} />
                </div>
                <CreateCustomerForm
                  onSubmit={handleCreateCustomer}
                  isLoading={createCustomerMutation.isLoading}
                /> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </ComponentMain>
      ) : (
        <ComponentMain>
          <div className="flex justify-center">Đang tải...</div>
        </ComponentMain>
      )}
    </div>
  );
}

const appointmentSchema = z.object({
  appointmentTime: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date" ? "Dữ liệu không hợp lệ" : defaultError, // https://github.com/colinhacks/zod/issues/1526
      }),
    })
    .refine(
      (d) => {
        const now = dayjs();
        return dayjs(d).isAfter(now);
      },
      {
        message: "Thời gian hẹn không thể sớm hơn thời gian hiện tại",
      }
    ),
  petId: z
    .string({
      required_error: "Bạn cần chọn thú cưng",
    })
    .uuid("Bạn cần chọn thú cưng"),
  serviceId: z
    .string({
      required_error: "Bạn cần chọn dịch vụ",
    })
    .uuid("Bạn cần chọn dịch vụ"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
