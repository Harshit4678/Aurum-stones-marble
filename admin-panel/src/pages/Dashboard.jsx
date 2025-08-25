const Dashboard = () => {
  const email = "admin@marquise.com";
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome Admin</h1>
      <p className="text-gray-600 mt-2">Logged in as: {email}</p>
    </div>
  );
};

export default Dashboard;
