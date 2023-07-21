export const InsertMenuAPI = async (title, link, parent_id, new_window) => {
  try {
    const res = await fetch('/api/insertMenu', {
      method: 'POST',
      body: JSON.stringify({ title, link, parent_id, new_window }),
      headers: { 'Content-Type': 'application/json' },
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