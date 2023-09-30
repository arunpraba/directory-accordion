import { Directory } from "./component/List";
import { useFetch } from "./hooks/useFetch";

export default function App() {
  const { data, loading } = useFetch();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <Directory list={data} />
    </div>
  );
}
