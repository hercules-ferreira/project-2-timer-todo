import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { CycleContext } from "../../components/context/CyclesContext";




const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, "Informe no mínimo 3 caracteres!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo de tempo deve ter no mínimo 5 minutos!")
    .max(60, "O ciclo de tempo deve ter no máximo 60 minutos!"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CycleContext)



  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, /*reset*/ } = newCycleForm;


  const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(createNewCycle)} action="">
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <StopCountDownButton onClick={interruptCurrentCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton>
          )}
        </form>
      </HomeContainer>
    </>
  );
}
