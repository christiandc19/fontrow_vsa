const API_BASE = "https://api.websmartassistant.com";

export async function createLead(payload) {
  const response = await fetch(`${API_BASE}/api/Leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create lead");
  }

  return response.json();
}

export async function getUserByIP() {
  const response = await fetch(`${API_BASE}/api/Leads/by-ip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    const errorText = await response.text();
    throw new Error(errorText || "Failed to find user by IP");
  }

  return response.json();
}

export async function postConversation(payload) {
  const response = await fetch(`${API_BASE}/api/Conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to save conversation");
  }

  return response.json();
}