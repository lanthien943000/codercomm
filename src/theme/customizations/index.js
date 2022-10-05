import Link from "./Link";
import Card from "./Card";
import Tabs from "./Tabs";
import CssBaseline from "./CssBaseline";

function customizeComponents(theme) {
  return {
    ...Link(theme),
    ...Card(theme),
    ...Tabs(theme),
    ...CssBaseline(theme),
  };
}
export default customizeComponents;
