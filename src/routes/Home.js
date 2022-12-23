import { useEffect, useState } from "react";
import { dbService, addDoc, collection, onSnapshot } from "fbase";
import Kweet from "components/Kweet";

const Home = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "kweets"), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setKweets(newArray);
    });
  }, []);

  //firestore에 메시지 저장
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "kweets"), {
      //collection()은 promise를 반환하기 때문에 await 필요
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={kweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />

        <input type="submit" value="Kweet" />
      </form>
      <div>
        {kweets.map((kweet) => (
          <Kweet
            key={kweet.id}
            kweetObj={kweet}
            isOwner={kweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
