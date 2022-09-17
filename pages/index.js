import React, { useEffect, useState } from "react";
import HeadComponent from '../components/Head';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Product from "../components/Product";
import CreateProduct from "../components/CreateProduct";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;



const App = () => {
  const { publicKey } = useWallet();
  const isOwner = (publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false);
  const [products, setProducts] = useState([]);
  const [creating, setCreating] = useState(false);

  console.log(publicKey);

  const renderNotConnectedContainer = () => (
    <div>
      {/* <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" /> */}

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );



  return (
    <div className="App">
      {/* <HeadComponent /> */}
      <div className="container">
        <header className="header-container">
          <p className="header"> Buildspace Emoji Store</p>
          <p className="sub-text">The only emoji store that accepts cheap money</p>

          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {/* We only render the connect button if public key doesn't exist */}
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}

        </main>


      </div>
    </div>
  );
};

export default App;
