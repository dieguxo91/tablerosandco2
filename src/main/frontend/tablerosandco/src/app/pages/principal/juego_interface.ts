import {Usuario_interface} from "../usuario/usuario_interface";

export interface Juego_interface {
  id_juego : number;
  description : string;
  name : string;
  url: string;
  urlHexa:string;
  id_admin : Usuario_interface;
}
