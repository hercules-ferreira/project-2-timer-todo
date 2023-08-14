import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

export const CycleContext = createContext({} as CycleContextType);


export function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>

    <CycleContext.Provider>
            value={{
              activeCycle,
              activeCycleId,
              markCurrentCycleAsFinished,
              amountSecondsPassed,
              setSecondsPassed,
            }}
          >

      <Router />
          </CycleContext.Provider>
      <GlobalStyle />
    </ThemeProvider>
</BrowserRouter>
  );
}
