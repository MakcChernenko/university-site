import { Material } from "@/type/type";

interface PredmetListProps {
  predmet: Material;
}

function PredmetList({ predmet }: PredmetListProps) {
  return (
    <li key={predmet.name}>
      <a href={predmet.url}>{predmet.name}</a>
    </li>
  );
}

export default PredmetList;
