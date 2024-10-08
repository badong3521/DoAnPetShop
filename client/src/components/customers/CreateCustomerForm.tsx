import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { petSchema } from "./pets/PetForm";
import { PatternFormat } from "react-number-format";
import { removeNonNumericFromString } from "@/utils/removeNonNumericFromString";
import { cellPhonePattern } from "@/utils/phoneNumber";

const customerSchema = z.object({
  name: z
    .string()
    .min(3, "Độ dài tên tối thiểu là 3 ký tự")
    .max(60, "Độ dài tên tối đa là 60 ký tự"),
  phone: z.string().refine((value) => {
    const rawValue = removeNonNumericFromString(value);
    return rawValue.length === 10;
  }, "Số điện thoại không hợp lệ"),
  pets: z.array(petSchema),
});

export type CreateCustomerFormData = z.infer<typeof customerSchema>;

interface Props {
  onSubmit: (d: CreateCustomerFormData) => Promise<void>;
  isLoading: boolean;
}
export function CreateCustomerForm(props: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      pets: [],
    },
  });
  const fieldArrayForm = useFieldArray({
    name: "pets",
    control,
  });

  function addPetForm() {
    fieldArrayForm.append({
      name: "",
      breed: "",
      age: 0,
    });
  }

  function handleSubmitForm(d: CreateCustomerFormData) {
    props.onSubmit({ ...d, phone: removeNonNumericFromString(d.phone) });
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col w-full mt-4 gap-4 flex-wrap"
    >
      <div className="flex gap-2 flex-wrap">
        <fieldset>
          <Input
            label="Tên"
            id="name"
            errorMessage={errors.name?.message}
            {...register("name")}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={control}
            name="phone"
            render={({ field: { name, onChange, value, ref } }) => (
              <PatternFormat
                format={cellPhonePattern}
                patternChar="#"
                customInput={Input}
                // Input props are passed to customInput
                label="Số điện thoại"
                id="phone"
                type="tel"
                errorMessage={errors.phone?.message}
                name={name}
                onChange={onChange}
                value={value}
                getInputRef={ref}
              />
            )}
          />
        </fieldset>
      </div>

      <div className="prose flex items-center gap-2">
        <h3 className="my-0">Thú cưng</h3>
      </div>
      <div className="flex flex-wrap gap-2 items-center max-h-96 overflow-y-auto">
        {fieldArrayForm.fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className={`flex items-center gap-2 border-2 p-2 rounded-[var(--rounded-box)] relative flex-wrap`}
            >
              <fieldset>
                <Input
                  label="Tên thú cưng"
                  id={`pets.${index}.name`}
                  errorMessage={errors.pets?.[index]?.name?.message}
                  {...register(`pets.${index}.name` as const)}
                />
              </fieldset>
              <fieldset>
                <Input
                  label="Giống vật nuôi"
                  id={`pets.${index}.breed`}
                  errorMessage={errors.pets?.[index]?.breed?.message}
                  {...register(`pets.${index}.breed` as const)}
                />
              </fieldset>
              <fieldset className="w-32">
                <Input
                  type="number"
                  label="Tuổi của thú cưng"
                  id={`pets.${index}.age`}
                  errorMessage={errors.pets?.[index]?.age?.message}
                  {...register(`pets.${index}.age` as const)}
                />
              </fieldset>

              <button
                className="tooltip tooltip-left absolute right-2 top-2 bg-error text-primary-content rounded-[--var(rounded-btn)]"
                data-tip="Loại bỏ thú cưng"
                type="button"
                onClick={() => fieldArrayForm.remove(index)}
              >
                <X />
              </button>
            </div>
          );
        })}
        <div>
          <Button
            onClick={addPetForm}
            tooltipText="Thêm thú cưng"
            type="button"
            outline
            circle
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div>
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          Tạo Khách hàng
        </Button>
      </div>
    </form>
  );
}
