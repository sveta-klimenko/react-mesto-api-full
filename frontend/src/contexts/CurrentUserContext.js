import { createContext } from "react";
import baseIcon from "../images/base_icon.jpg";

export const defaultCurrentUser = {
  name: "Загрузка...",
  about: "Загрузка...",
  avatar: baseIcon,
};
export const CurrentUserContext = createContext(defaultCurrentUser);
