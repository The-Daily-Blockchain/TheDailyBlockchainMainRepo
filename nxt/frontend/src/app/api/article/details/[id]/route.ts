import { API_URL } from "@/app/config";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const response = await axios.get(`${API_URL}/articles/${id}`);

  const data = await response.data;

  return Response.json(data);
}
