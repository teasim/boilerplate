import React from "react";
import { samplesOf } from "teasim-samples";
import { Button } from "teasim";

samplesOf("Button", module)
  .add("default", () => <Button skin="blue">Hello World!</Button>);