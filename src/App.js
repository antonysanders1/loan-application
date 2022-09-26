import './Main.css';
import { MainProvider } from './Context';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <MainProvider>
      <ApplicationForm/>
    </MainProvider>
  );
}

export default App;
