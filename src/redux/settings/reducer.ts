import {TOGGLE_THEME} from '.';
import {Themes} from '../../constants';
import {AnyAction} from 'redux';

export type SettingsState = {
  theme: string;
};

const initialState = {
  theme: Themes.LIGHT,
};

export default function settings(
  state: SettingsState = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT,
      };
    default:
      return state;
  }
}
