import Navbar from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Navbar>{children}</Navbar>;
};
export default MainLayout;
