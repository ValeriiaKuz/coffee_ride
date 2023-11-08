import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { CafeItem } from "@/src/components/cafes-selection/cafe-selection-item";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";

export const CafeSelection = async () => {
  const coffeePointsIds = await getDoc(doc(db, "selection", "selected-cafes"));
  const ids = coffeePointsIds.data() as { cafes: string[] };
  const q = query(collection(db, "coffeepoints"), where("id", "in", ids.cafes));
  const coffeePointsData = await getDocs(q);
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
