import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  HomeContainer,
  CountdownContainer,
  StartCountDownButton,
} from "./styles";

import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { StopCountDownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./countdown/index";

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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  console.log(activeCycle);


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

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };
  //   console.log({ newCycle });

  //   setCycles([...cycles, newCycle]);
  //   setActiveCycleId(id);
  //   setAmountSecondsPassed(0);

  //   reset();
  // }

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

  // const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <CycleContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}} >

          <NewCycleForm />
          <Countdown />
           </CycleContext.Provider>

          {activeCycle ? (
            <StopCountDownButton onClick={handleInterruptCycle} type="button">
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
