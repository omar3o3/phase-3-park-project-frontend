import '../App.css';
import HomePage from './HomePage';
import YourEvents from './YourEvents';
import NavComponent from './NavComponent';
import { Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavComponent />
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/personal-events'>
          <YourEvents />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
