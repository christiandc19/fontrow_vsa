const getApiBase = () => {
  // CRA should have process.env, but guard it anyway
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // fallback
  return "http://localhost:5297";
};

const API_BASE = getApiBase();

export async function createLead(lead) {
  const res = await fetch(`${API_BASE}/api/Leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to submit lead");
  }

  return res.json();
}
