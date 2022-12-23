import { authService } from "fbase";

const Profile = () => {
  const onLogOutClick = () => authService.signOut();

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
