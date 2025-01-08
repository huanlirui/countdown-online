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
    id: "theme-default",
    name: "theme-default",
    background: "#ffffff",
    text: "#09090b",
    buttonPrimary: "#09090b",
    buttonSecondary: "#a1a1aa"
  },
  {
    id: "theme-dark",
    name: "theme-dark",
    background: "#09090b",
    text: "#ffffff",
    buttonPrimary: "#ffffff",
    buttonSecondary: "#52525b"  // 调整为更亮的深灰色
  }
];
