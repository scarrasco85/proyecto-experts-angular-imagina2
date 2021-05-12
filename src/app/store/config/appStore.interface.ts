// Creamos una interface que servirá como blueprint de el STORE de la aplicación
// Es decir, los STATES que comprondrán el STORE y sus tipos

// My States Interfaces
import HeaderState from "./header/headerState.interface";
import SessionState from "./session/sessionState.interface";

export interface AppStore {
  
  headerState: HeaderState;
  sessionState: SessionState;
  // Aquí añadiríamos el resto de STATES que vinieran más adelante
}
