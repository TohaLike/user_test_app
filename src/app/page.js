import Test from "@/components/Test/Test";
import main from "./main.module.scss";
import { getStaticProps } from "@/services/food-service";

export default async function Home() {
  const food = await getStaticProps();

  return (
    <div className={main.container}>
      <Test />
    </div>
  );
}
