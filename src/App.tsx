import Counter from "./features/counter/Counter";
import CounterCard from "./features/counter/CounterCard";
import Notes from "./features/notes/Notes";
import PostsList from "./features/posts/PostsList";
import UserCard from "./features/users/UserCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      <UserCard userId={1} />
      <CounterCard step={5} />
      <Counter />
      <Notes />

      <div className="col-span-full">
        <PostsList />
      </div>
      
    </div>
  );
}

export default App;