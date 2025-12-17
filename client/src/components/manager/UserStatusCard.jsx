//TODO Libraries
import { useContext } from "react";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO MUI Component
import { Button } from "@mui/material";
//TODO Main Component
const UserStatusCard = ({ user }) => {
  //TODO Variables
  const { titleTheme, paperTheme, buttonTheme, navigate } =
    useContext(UserContext);
  //TODO Return
  return (
    <div className=" w-full flex flex-col md:flex-row gap-10 p-10">
      <div
        style={paperTheme}
        className="rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>messages</p>
        <p>{user?.contacts?.total}</p>
      </div>
      <div
        style={paperTheme}
        className="rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Orders #</p>
        <p>{user?.ordersCount}</p>
      </div>
      <div
        style={paperTheme}
        className="rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Spent</p>
        <p>{user?.ordersTotalAmount}$</p>
      </div>
      <div
        style={paperTheme}
        className="rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Reviews #</p>
        <p>{user?.reviewsCount}</p>
        <Button
          onClick={() =>
            navigate(
              `/manager/users-details/reviews/${user?._id}/${user?.name.first}/${user?.name.last}`
            )
          }
          sx={buttonTheme}
        >
          SHOW ALL REVIEWS
        </Button>
      </div>
      {!user?.isEmployee ? null : (
        <div
          style={paperTheme}
          className="rounded-2xl w-full flex items-center justify-center flex-col p-5"
        >
          <p style={titleTheme}>Products #</p>
          <p>{user?.employeeProductsCount}</p>
          <Button
            onClick={() =>
              navigate(
                `/manager/employee-details/product/${user?._id}/${user?.name.first}/${user?.name.last}`
              )
            }
            sx={buttonTheme}
          >
            SHOW ALL PRODUCTS
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserStatusCard;
