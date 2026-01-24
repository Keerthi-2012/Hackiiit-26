import axios from "axios";
import { parseStringPromise } from "xml2js";

const CAS_BASE = process.env.CAS_BASE_URL;
const SERVICE_URL = process.env.CAS_SERVICE_URL;

export async function validateCASTicket(ticket) {
  const url = `${CAS_BASE}/serviceValidate?ticket=${ticket}&service=${SERVICE_URL}`;

  const res = await axios.get(url);
  const parsed = await parseStringPromise(res.data);

  const success =
    parsed["cas:serviceResponse"]["cas:authenticationSuccess"];

  if (!success) return null;

  const user = success[0]["cas:user"][0];
  const attrs = success[0]["cas:attributes"]?.[0] || {};

  return {
    username: user,
    email: attrs["cas:email"]?.[0] || `${user}@iiit.ac.in`,
    name: attrs["cas:displayName"]?.[0] || user,
  };
}
