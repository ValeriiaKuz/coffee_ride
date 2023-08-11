import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CafeItem } from "@/src/components/cafes-selection/cafe-selection-item";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";

export const CafeSelection = async () => {
  const coffeePointsData = await getDocs(collection(db, "selection"));
  const coffeePoints = coffeePointsData.docs.map(
    (point) => point.data() as CoffeePointType,
  );
  return (
    <section>
      <div>
        {coffeePoints.map((cafe: CoffeePointType, index) => {
          return <CafeItem cafe={cafe} key={cafe.id} index={index} />;
        })}
      </div>
    </section>
  );
};
