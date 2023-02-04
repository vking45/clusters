import { FC } from 'react';
import '../App.css';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';
import heroImg from "./logo.png";

const Home : FC = () => {
  const wallet = useAnchorWallet();

  return (
    <main>
    <section className="text-gray-600 body-font-roboto">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
  <div className="lg:max-w-lg lg:w-full md:w-1/4 w-4/6 mb-10 md:mb-0">
      <img className="object-cover object-center rounded" alt="hero" src={heroImg}/>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Fluency On-chain
      </h1>
      <p className="mb-8 leading-relaxed">No more hassle to perform operations at multiple cryptos, use clusters and manage your portfolio with a click.</p>
      <div className="flex justify-center">
        <Link to="/browse/">Browse</Link>
      </div>
    </div>
  </div>
</section>

<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Features</h1>
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-cex inline-flex"></div>
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-cex mb-5 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
</svg>

        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Arbitrage Oppurtunities</h2>
          <p className="leading-relaxed text-base">With us, utilize and create arbitrage opportunities with the help of DEXs and the Issue/Redeem operations.</p>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-cex mb-5 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
</svg>

        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Efficient Repositioning</h2>
          <p className="leading-relaxed text-base">Within a single click, you can shift your portfolio's position, say goodbye to multiple gas and maximize your profits.</p>
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
      </div>
    </div>
  </div>
</section>
</main>
  );
};

export default Home;
