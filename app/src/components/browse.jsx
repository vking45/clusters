import { lazy, FC, Suspense } from "react";
import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getClusters } from "./funcs";
import Home from "./home";
const List = lazy(() => import("./List")); 

let ListTitles = [];

const Browse = () => {
    const wallet = useAnchorWallet();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const clustorList = await getClusters(wallet);
            for (const i in clustorList){
                console.log(clustorList[i].publicKey.toBase58());
                if(clustorList[i].publicKey.toBase58() !== "ECVGYXg9bV8f1SXj9SL1RpjkFN4iSPGKFjh2z7Jy7VSh" && clustorList[i].publicKey.toBase58() !== "3bH9yB5hkMKzJtjfLwLb5EVhexrvBjQiTbPkz8K7XMzc" && clustorList[i].publicKey.toBase58() !== "5LBwoHeQC2vbbQoAYZWsn5S4ENvMJ5qTQbE3fnsX1ry9" && clustorList[i].publicKey.toBase58() !== "HBrXb2fLBq9zsX9qdZ3PM4NcTNfxrfHP8gfsWWbwqmkq"){
                    const found = ListTitles.find(el => el.address === clustorList[i].publicKey.toBase58());
                    console.log(found);
                    if(!found){
                        ListTitles.push({address: clustorList[i].publicKey.toBase58(), cname: clustorList[i]["account"].clusterName});   
                    }
                }         
            }
            setLoading(false);                  
        })();
    }, []); 
  return(
   <section className="m-auto p-auto h-max">
    <Suspense fallback={<Home />}> 
    <List listTitles={ListTitles}/>
    </Suspense>    
   </section>  
  );
};
 
export default Browse;
