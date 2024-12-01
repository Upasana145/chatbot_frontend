export const getStatusColor = (status) => {
  switch (status) {
    case "Complete":
      return "green";
    case "Work in process":
      return "blue";
    case "Pending":
      return "red";
    default:
      return "black";
  }
};

export const checkTypeArr = (data) => {
  return data && Array.isArray(data);
};
