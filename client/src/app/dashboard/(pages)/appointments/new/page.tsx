"use client";
import {
  AppointmentForm,
  AppointmentFormData,
} from "@/components/appointments/AppointmentForm";
import { PageTitle } from "@/components/dashboard/PageTitle";
import {
  APPOINTMENT_KEY,
  createAppointment,
} from "@/services/queries/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewAppointment() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAppointmentMutation = useMutation({
    mutationFn: (data: AppointmentFormData) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPOINTMENT_KEY] });
      toast.success("Cuộc hẹn được tạo thành công!");
      router.push("/dashboard/appointments");
    },
    onError: (err) => {
      toast.error("Ối. Đã xảy ra sự cố khi tạo lịch biểu.");
    },
  });

  async function handleCreateAppointment(data: AppointmentFormData) {
    createAppointmentMutation.mutate(data);
  }

  return (
    <div>
      <PageTitle renderBackOption title="Lịch cuộc hẹn mới" />

      <AppointmentForm
        isLoading={createAppointmentMutation.isLoading}
        onSubmit={handleCreateAppointment}
      />
    </div>
  );
}
