import { FormContainer, TaskInput, MinutesAmountInput} from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, "Informe no mínimo 3 caracteres!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo de tempo deve ter no mínimo 5 minutos!")
    .max(60, "O ciclo de tempo deve ter no máximo 60 minutos!"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;


export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome para seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestion">
        <option value="projeto 1" />
        <option value="projeto 2" />
        <option value="projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
