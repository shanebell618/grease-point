import { redirect } from "next/navigation";

// TODO: point this at /dashboard once the dashboard breadcrumb page exists.
const Home = () => {
  redirect("/equipment");
};

export default Home;
