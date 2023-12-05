import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Navbar>{children}</Navbar>;
};
export default MainLayout;
