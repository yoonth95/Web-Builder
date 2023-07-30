export const UpdateBlockLayoutAPI = async (block_id, design_type, design_id) => {
  console.log(block_id, design_type, design_id);
  try {
    const res = await fetch('/api/updateBlockDesign', {
      method: 'PUT',
      body: JSON.stringify({block_id, design_type, design_id}),
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