import { useNavigate } from "react-router-dom";
import UpdateHero from "../../components/manager/UpdateHero";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <UpdateHero />
      <button onClick={() => navigate("/manager/manage-orders")}>Orders</button>
    </>
  );
};

export default Dashboard;
