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
  try {
    // Get user's IP address
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;

    const response = await fetch(`${API_BASE}/api/Leads/by-ip/${userIP}`, {
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
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      // If we can't get the IP, try with a fallback or skip IP detection
      console.warn("Could not determine IP address:", error.message);
      return null;
    }
    throw error;
  }
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