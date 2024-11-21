// api.ts

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

export const fetchUserType = async (address: string) => {
  console.log(`Fetching user type for address: ${address}`, `${BASE_URL}/api/find_usertype/${address}`);
  try {
    const response = await fetch(`${BASE_URL}/api/find_usertype/${address}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch user type:", response.status, errorText);
      throw new Error(
        `Failed to fetch user type: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Received user type data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchUserType:", error);
    throw error;
  }
};

export const fetchBounties = async (address: string, userType: string) => {
  console.log(
    `Fetching bounties for address: ${address}, userType: ${userType}`, `${BASE_URL}/api/find_usertype/${address}`, address
  );
  const url =
    userType === "sponser"
      ? `${BASE_URL}/api/get_sponser_bounties/${address}`
      : `${BASE_URL}/api/get_all_bounties`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch bounties:", response.status, errorText);
      throw new Error(
        `Failed to fetch bounties: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Received bounties data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchBounties:", error);
    throw error;
  }
};

export const fetchBountiesCount = async (address: string, userType: string) => {
  console.log(
    `Fetching bounties for address: ${address}, userType: ${userType}`, `${BASE_URL}/api/find_usertype/${address}`, address
  );
  const url =
    userType === "sponser"
      ? `${BASE_URL}/api/get_sponser_bounties_count/${address}`
      : `${BASE_URL}/api/get_all_bounties_count`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch bounties:", response.status, errorText);
      throw new Error(
        `Failed to fetch bounties: ${response.status} ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Received bounties data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchBounties:", error);
    throw error;
  }
};
