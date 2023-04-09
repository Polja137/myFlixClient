
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";

import Container from 'react-bootstrap/Container';

import { createRoot } from "react-dom/client";

import { MainView } from "./components/MainView/main-view";

import "./index.scss";

const App = () => {
  return (
  
  <Container style ={{border:"1px solid red"}}><MainView /></Container>
 
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App/>);
