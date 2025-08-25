import axios from "axios";
import { Materials } from "@/type/type";

axios.defaults.baseURL =
  "https://makcchernenko.github.io/university-materials/";

export const fetchGitHab = async () => {
  const res = await axios<Materials>("materials.json");
  console.log(res.data);
  return res.data;
};

// export const fetchMaterials = async (material: string) => {
//   const list = fetchGitHab();
//   console.log(list);
//   return list.data;
// };
