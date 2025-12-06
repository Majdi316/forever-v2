import EarningCharts from "../../components/manager/EarningCharts";
import HeroView from "../../components/manager/HeroView";
import ViewTotal from "../../components/manager/ViewTotal";

const Dashboard = () => {
  return (
    <div className=" w-full h-full">
      <ViewTotal />
      <HeroView />
      <EarningCharts />
    </div>
  );
};

export default Dashboard;
