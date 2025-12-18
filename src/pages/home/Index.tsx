import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome Home</h1>
      <div className="grid gap-6">
        
        {/* Card linking to WW2 Story */}
        <Link to="/home/Technology-and-WW2" className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
          <h2 className="text-2xl font-bold text-amber-400">Technology & WW2</h2>
          <p>How the war transformed computers and aviation.</p>
        </Link>

        {/* Card linking to Food Story */}
        <Link to="/home/Food-and-Being-Healthy" className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
          <h2 className="text-2xl font-bold text-green-400">Food & Health</h2>
          <p>Understanding nutrition in the modern age.</p>
        </Link>

      </div>
    </div>
  );
};

export default Home;