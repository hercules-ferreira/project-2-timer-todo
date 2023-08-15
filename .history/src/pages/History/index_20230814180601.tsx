import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../components/context/CyclesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ptBR from "date-fns/locale/pt-BR";

export function History() {
  const { cycles } = useContext(CycleContext);

  return (
    <>
      <HistoryContainer>
        <h1>Meu Histórico</h1>

        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(cycle.startDate)}</td>
                    <td>
                      {cycle.finishDate && (
                        <Status statusColor="green">Concluído</Status>
                      )}

                      {cycle.interruptDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}

                      {!cycle.finishDate && !cycle.interruptDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </HistoryList>
      </HistoryContainer>
    </>
  );
}