export const DeleteMenuAPI = async (id, isParent, order_num, parent_id) => {
  try {
    const res = await fetch(`/api/deleteMenu/${id}_${isParent}_${order_num}_${parent_id}`, {
      method: 'DELETE',
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