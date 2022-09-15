function createID(day, time) {
  return `${day.slice(0, 3)}-${time}`;
}

function getPlanBySlotID(plans, cellID) {
  if (plans.length) {
    const result = plans.find((obj) => {
      return obj.slot === cellID;
    });
    return result;
  }
  return "";
}

export { createID, getPlanBySlotID };
