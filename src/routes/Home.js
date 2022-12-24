import { useEffect, useState } from "react";
import {
  dbService,
  addDoc,
  collection,
  onSnapshot,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
} from "fbase";
import Kweet from "components/Kweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // console.log(`${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      // console.log(response);
      // console.log(await getDownloadURL(response.ref));
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "kweets"), {
      //collection()은 promise를 반환하기 때문에 await 필요
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setKweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //파일 1개만 이용
    const reader = new FileReader(); //사진 출력

    reader.onloadend = (finishedEvent) => {
      //load의 end를 알려주는 event
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result); //currentTarget.result에 있던 URL 주소
    };
    reader.readAsDataURL(theFile); //
  };

  const onClearAttachment = () => setAttachment("");

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Kweet" />
        {attachment && (
          <div>
            <img src={attachment} height="50px" alt="attachedImg" />
            <button onClick={onClearAttachment}>clear</button>
          </div>
        )}
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
