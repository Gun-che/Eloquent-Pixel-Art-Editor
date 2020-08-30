import { IConfig } from '../ts/index';

export function keyDown({ dispatch, tools }: IConfig) {
  return (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
      dispatch({ undo: true })
      console.log(tools)

    } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      for (const tool of Object.keys(tools)) {

        if (tool[0] === e.key) {
          e.preventDefault();
          dispatch({ tool });
          return;
        }
      }
    }
  }
}