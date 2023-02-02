import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '../App.css';

const Navbar = () => {
    return(
        <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <span className="text-3xl font-bold text-rex -ml-3 cursor-pointer">CLUSTERS</span>
            </a>
            <button className="inline-flex text-white bg-cex border-0 mb-2 py-2 px-6 focus:outline-none hover:bg-rex rounded text-lg hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <WalletMultiButton />
            </button>
        </div>
        </header>
    );
}

export default Navbar;