import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../App";

function Home() {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h2>メールアドレス: {currentUser?.email}</h2>
          <h2>名前: {currentUser?.name}</h2>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;
