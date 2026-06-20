import CounterCard from "./features/counter/CounterCard";
import UserCard from "./features/users/UserCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Redux Learn — User Dashboard
      </h1>
      <div className="max-w-md">
        <UserCard userId={1} />
      </div>
      <div className="max-w-md">
        <CounterCard step={5} />
      </div>
    </div>
  );
}

export default App;
