import UserHeader from "./userHeader/UserHeader";
import UserBody from "./userBody/userBody";
import ListBody from "./listBody/ListBody";
import "./UserPage.css";

function UserPage() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  const renderList = pathParts.length !== 1;
  const listId: string = pathParts.at(-1) ?? "";

  return (
    <div className="user-page">
      <UserHeader />
      {renderList ? <ListBody listId={listId} /> : <UserBody />}
    </div>
  );
}

export default UserPage;
