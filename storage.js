export function getRecords(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function saveRecord(key, record) {
  const records = getRecords(key);
  records.unshift(record);
  localStorage.setItem(key, JSON.stringify(records));
}

export function deleteRecordItem(storageKey, id) {
  const records = getRecords(storageKey).filter((r) => r.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(records));
}
