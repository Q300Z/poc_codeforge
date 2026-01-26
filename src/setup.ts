import { AppBar } from "./components/AppBar.js";
import { Button } from "./components/Button.js";
import { Container } from "./components/Container.js";
import { Grid } from "./components/Grid.js";
import { Hero } from "./components/Hero.js";
import { Page } from "./components/Page.js";
import { Section } from "./components/Section.js";
import { Stack } from "./components/Stack.js";
import { registry } from "./registry.js";

export function setupRegistry() {
  registry.Page = Page;
  registry.AppBar = AppBar;
  registry.Hero = Hero;
  registry.Button = Button;
  registry.Grid = Grid;
  registry.Section = Section;
  registry.Container = Container;
  registry.Stack = Stack;
}