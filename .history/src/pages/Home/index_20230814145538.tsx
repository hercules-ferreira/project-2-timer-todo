import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import *as zod from 'zod'
import { createContext, useState } from "react";

// import { differenceInSeconds } from "date-fns";


import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm"; 
import { Countdown } from "./components/Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishDate?: Date;
}


interface CycleContextType{
  activeCycle: Cycle | undefined; 
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}


export const CycleContext = createContext({} as CycleContextType )


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, "Informe no mínimo 3 caracteres!"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo de tempo deve ter no mínimo 5 minutos!")
    .max(60, "O ciclo de tempo deve ter no máximo 60 minutos!"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;





export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  console.log(activeCycle);




  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });


  function markCurrentCycleAsFinished(){
    setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    console.log({ newCycle });

    setCycles([...cycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <>
      <HomeContainer>
        <form  /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
          <CycleContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}} >

          {/* <NewCycleForm /> */}
          <Countdown />
           </CycleContext.Provider>

          {activeCycle ? (
            <StopCountDownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton /* disabled={isSubmitDisabled} */ type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton>
          )}
    
        </form>
      </HomeContainer>
    </>
  );
}
