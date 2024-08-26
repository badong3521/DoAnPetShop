import React, { useState } from "react";
import { Pet } from "@/@types/Pet";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimple, Plus, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .min(3, "Độ dài tên tối thiểu là 3 ký tự")
    .max(60, "Độ dài tên tối đa là 60 ký tự"),
  breed: z
    .string()
    .min(1, "Kích thước giống chủng tộc tối thiểu là 1 ký tự")
    .max(60, "Kích thước giống chủng tộc tối đa là 60 ký tự"),
  age: z.coerce.number().int().min(0, "Độ tuổi tối thiểu là 0"),
});

export type PetFormData = z.infer<typeof petSchema>;

type Props = {
  pet?: Pet;
  onSubmit: (pet: PetFormData) => void;
};

export function PetForm({ pet, onSubmit }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPetUpdate = pet !== undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: pet?.name ?? "",
      breed: pet?.breed ?? "",
      age: pet?.age ?? 0,
    },
  });

  function handleOpenModal() {
    resetForm();
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmitForm(data: PetFormData) {
    onSubmit(data);
    handleCloseModal();
  }

  return (
    <div>
      {isPetUpdate ? (
        <Button circle tooltipText="Chỉnh sửa" onClick={handleOpenModal}>
          <PencilSimple className="w-6 h-6" />
        </Button>
      ) : (
        <Button
          tooltipText="Thêm thú cưng"
          type="button"
          outline
          circle
          onClick={handleOpenModal}
        >
          <Plus />
        </Button>
      )}

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <PageTitle title="Thêm thú cưng" />
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn btn-ghost"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(handleSubmitForm)}>
              <fieldset>
                <Input
                  label="Tên thú cưng"
                  id={`name`}
                  errorMessage={errors.name?.message}
                  {...register(`name`)}
                />
              </fieldset>
              <fieldset>
                <Input
                  label="Giống vật nuôi"
                  id={`breed`}
                  errorMessage={errors.breed?.message}
                  {...register(`breed`)}
                />
              </fieldset>
              <fieldset className="w-32">
                <Input
                  type="number"
                  label="Tuổi của thú cưng"
                  id={`age`}
                  errorMessage={errors.age?.message}
                  {...register(`age`)}
                />
              </fieldset>

              <div className="ml-auto w-fit">
                <Button bg="submit" type="submit">
                  {isPetUpdate ? "Chỉnh sửa" : "Tạo"}
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
