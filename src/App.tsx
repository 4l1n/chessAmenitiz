import GrandMastersList from './components/GrandMastersList';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Chess Grandmasters Wiki</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8 flex-grow">
        <GrandMastersList />
      </main>
      
      <footer className="bg-gray-100 py-4 border-t mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Data provided by Chess.com API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
