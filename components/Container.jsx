import lands from "../lands.json";
import Dots from "./Dots";

const Container = () => {
  const jsonData = lands.data.parcels;
  const n = jsonData.slice(0, ((jsonData.length - 1 )/ 2));
  const n1 = jsonData.slice(n + 1, jsonData.length - 1);
  return (
    <>
    <Dots parcel={n} />
    <Dots parcel={n1} />
    </>
  );
};
export default Container;
