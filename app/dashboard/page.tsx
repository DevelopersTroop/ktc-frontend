import { redirect } from 'next/navigation';

const Dashboard = () => {
  redirect("/dashboard/orders");
};

export default Dashboard;