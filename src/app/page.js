import Test from "@/components/Test/Test";
import main from "./main.module.scss";
import TestDrawer from "@/components/TestDrawer/TestDrawer";

export default async function Home() {
  return (
    <div className={main.container}>
      <Test />
      <TestDrawer />
    </div>
  );
}
