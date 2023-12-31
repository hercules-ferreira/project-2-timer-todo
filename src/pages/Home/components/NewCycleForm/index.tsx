import { FormContainer, TaskInput, MinutesAmountInput} from './styles';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { CycleContext } from '../../../../components/context/CyclesContext';


export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  
  return (
    <FormContainer>
      <label htmlFor="task">Atividade</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestion">
        <option value="projeto 1" />
        <option value="projeto 2" />
        <option value="projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">tempo</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>min.</span>
    </FormContainer>
  );
}
