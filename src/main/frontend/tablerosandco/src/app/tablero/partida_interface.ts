import {Juego_interface} from "../pages/principal/juego_interface";
import {Usuario_interface} from "../pages/usuario/usuario_interface";

export interface Partida_interface {
  id_juego_partida: Juego_interface
  id_jugador_partida: Usuario_interface
}
