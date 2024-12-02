/*
 * @Description:
 */
export interface Theme {
  id: string;
  name: string;
  background: string;
  text: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

export const defaultThemes: Theme[] = [
  {
    id: "default",
    name: "默认主题",
    background: "#ffffff",
    text: "#000000",
    buttonPrimary: "#000000",
    buttonSecondary: "#4b5563"
  }
];
