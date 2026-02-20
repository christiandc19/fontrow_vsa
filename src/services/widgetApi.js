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
  try {
    // Get additional details for the Details table
    const userIP = await getUserIP();
    const currentURL = window.location.href;
    const referrer = document.referrer || window.location.origin;
    const browser = navigator.userAgent;
    
    console.log("Current URL:", currentURL);
    
    // Enhanced payload with details
    const leadPayload = {
      ...lead,
      details: {
        ip: userIP,
        browser: browser,
        referrer: referrer
      }
    };
    
    const res = await fetch(`${API_BASE}/api/Leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to submit lead");
    }

    return res.json();
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

export async function getUserByIP() {
  try {
    // Get user's IP address
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    const userIP = ipData.ip;
    
    // Check if user exists with this IP (should return lead data with leadId)
    const res = await fetch(`${API_BASE}/api/Leads/by-ip/${userIP}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      const userData = await res.json();
      // Make sure we have the leadId in the response
      return userData; // Should include: { leadId, firstName, lastName, email, phone }
    } else if (res.status === 404) {
      return null; // User not found
    } else {
      throw new Error('Failed to check user by IP');
    }
  } catch (error) {
    console.warn('Failed to check user by IP:', error);
    return null;
  }
}

export async function getUserIP() {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    return ipData.ip;
  } catch (error) {
    console.warn('Failed to get IP address:', error);
    return null;
  }
}
