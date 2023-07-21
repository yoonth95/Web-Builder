export const GetMenuAPI = async () => {
  try {
    const res = await fetch('/api/getMenu', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};