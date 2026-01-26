import { AppBar } from "./components/AppBar.js";
import { Button } from "./components/Button.js";
import { Grid } from "./components/Grid.js";
import { Hero } from "./components/Hero.js";
import { Page } from "./components/Page.js";
import { registry } from "./registry.js";

export function setupRegistry() {
  // On s'assure de ne pas écraser si déjà présent ou de réinitialiser proprement
  registry.Page = Page;
  registry.AppBar = AppBar;
  registry.Hero = Hero;
  registry.Button = Button;
  registry.Grid = Grid;
}
