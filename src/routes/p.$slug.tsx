import { useParams } from "react-router";

export default function PostRoute() {
  const { slug } = useParams();

  return <p>{slug}</p>;
}
