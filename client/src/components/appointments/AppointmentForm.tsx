import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { SelectCustomerPet } from "./SelectCustomerPet";
import { Label } from "@/components/ui/Form/Label";
import { Select } from "@/components/ui/Form/Inputs/Select";
import { useQuery } from "@tanstack/react-query";
import {
  PET_SHOP_SERVICE_KEY,
  fetchPetShopServices,
} from "@/services/queries/PetshopServices";

const appointmentSchema = z.object({
  appointmentTime: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date" ? "Dữ liệu không hợp lệ" : defaultError,
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

interface Props {
  onSubmit: (d: AppointmentFormData) => Promise<void>;
  isLoading: boolean;
}
export function AppointmentForm(props: Props) {
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
    props.onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-2xl mt-4"
    >
      <div className="flex flex-col justify-between w-full gap-2">
        <div className="flex w-fit flex-col md:flex-row gap-2 md:gap-8 flex-wrap">
          <fieldset>
            <Label>Chọn thú cưng</Label>
            <input className="hidden" {...register("petId")} />
            <SelectCustomerPet onPetSelectionChange={onPetSelectionChange} />
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
              {petShopServicesListQuery.data?.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
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
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          Tạo cuộc hẹn
        </Button>
      </div>
    </form>
  );
}
