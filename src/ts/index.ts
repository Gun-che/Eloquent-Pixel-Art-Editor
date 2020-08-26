
import { Picture } from "../Components/Picture";

export interface IState {
  tool: string;
  color: string;
  picture: Picture;
}

export interface IAction {
  tool?: string;
  color?: string;
  picture?: Picture;
}

export interface IConfig {
  tools: any;
  controls: any[];
  dispatch(action: IAction): void;
}

export interface IPos {
  x: number;
  y: number;
}

export type IDispatch = (action: IAction) => void;