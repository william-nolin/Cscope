import ChartSection from "./components/ChartSection";
import Navbar from "./components/Navbar";
import SourceInput from "./components/SourceInput";
import { FilterProvider } from "./providers/FilterProvider";
import { RepositoryProvider } from "./providers/RepositoryProvider";

const App = () => {

  /*
  * Hide console warnings related to rechart using deprecated default props, 
  * will be fixed with the 2.13 version that'll come out with React 19
  * https://github.com/recharts/recharts/issues/3615
  */
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <FilterProvider>
      <RepositoryProvider>
        <div className="min-h-screen flex flex-col items-center">
          <Navbar />
          <SourceInput />
          <ChartSection />
        </div>
      </RepositoryProvider>
    </FilterProvider>
  );
}

export default App
