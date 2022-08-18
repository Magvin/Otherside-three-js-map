import lands from "../lands.json";
import Dots from "./Dots";

const Container = () => {
  const jsonData = lands.data.parcels;
  const n = jsonData.slice(0, 25000);
  const n1 = jsonData.slice(25000, 50000);
  const n2 = jsonData.slice(50000, 75000);
  const n3 = jsonData.slice(75000, 99999);

  return (
    <>
      <group>
        <Dots parcel={n} />
      </group>
      <group>
        <Dots parcel={n1} />
      </group>
      <group>
        <Dots parcel={n2} />
      </group>
      <group>
        <Dots parcel={n3} />
      </group>
    </>
  );
};
export default Container;
