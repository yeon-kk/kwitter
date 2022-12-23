import { doc, deleteDoc, dbService, updateDoc } from "fbase";
import { useState } from "react";

const Kweet = ({ kweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `kweets/${kweetObj.id}`));
    }
  };

  const onEditClick = () => {
    const ok = window.confirm("수정하시겠습니까?");
    if (ok) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const onResultClick = async () => {
    const ok = window.confirm("수정하시겠습니까?");
    if (ok) {
      await updateDoc(doc(dbService, `kweets/${kweetObj.id}`), {
        text: newKweet,
      });
      setEditing(false);
    }
  };

  const onResultChange = (e) => {
    const newValue = e.target.value;
    setNewKweet(newValue);
  };

  return (
    <div>
      {editing ? (
        <>
          <input value={newKweet} onChange={onResultChange}></input>{" "}
          <button onClick={onResultClick}>수정</button>
        </>
      ) : (
        <h4>{kweetObj.text}</h4>
      )}
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Kweet</button>
          <button onClick={onEditClick}>Edit Kweet</button>
        </>
      )}
    </div>
  );
};
export default Kweet;
