import { AppBar } from "./components/AppBar.js";
import { Box } from "./components/Box.js";
import { Button } from "./components/Button.js";
import { Carousel } from "./components/Carousel.js";
import { Container } from "./components/Container.js";
import { Grid } from "./components/Grid.js";
import { Hero } from "./components/Hero.js";
import { Image } from "./components/Image.js";
import { Page } from "./components/Page.js";
import { Section } from "./components/Section.js";
import { Stack } from "./components/Stack.js";
import { Text } from "./components/Text.js";
import { Title } from "./components/Title.js";
import { Video } from "./components/Video.js";
import { registry } from "./registry.js";

export function setupRegistry() {
  registry.Page = Page;
  registry.AppBar = AppBar;
  registry.Hero = Hero;
  registry.Button = Button;
  registry.Carousel = Carousel;
  registry.Grid = Grid;
  registry.Section = Section;
  registry.Container = Container;
  registry.Stack = Stack;
  registry.Box = Box;
  registry.Title = Title;
  registry.Text = Text;
  registry.Image = Image;
  registry.Video = Video;
}