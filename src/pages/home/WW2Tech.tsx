import HeroScrolly1 from '../../components/HeroScrolly1';
import LondonScrolly from '../../components/LondonScrolly';
import BletchleyScrolly from '../../components/BletchleyScrolly';
import TheMachinesScrolly from '../../components/TheMachinesScrolly';
import FinaleScrolly from '../../components/FinaleScrolly';

const WW2Tech = () => {
  return (
    <main className="bg-black w-full overflow-x-hidden">
      {/* 1. The Hook */}
      <HeroScrolly1 />
      
      {/* 2. The Dread */}
      <LondonScrolly />
      
      {/* 3. The Intel */}
      <BletchleyScrolly />
      
      {/* 4. The Invention */}
      <TheMachinesScrolly />
      
      {/* 5. The Conclusion */}
      <FinaleScrolly />
    </main>
  );
};

export default WW2Tech;