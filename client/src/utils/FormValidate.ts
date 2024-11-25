export const validate = (name: string, value: unknown): string => {
  const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  switch (name) {
    case "email":
      if (value === "") {
        return "Email is resquired!";
      } else if (typeof value === "string" && !value.match(email)) {
        return "Invalid Email address!";
      }
      return "";
    case "name":
      if (value === "") return "name is required!";
      if ((value as string).length > 15) return "Maximum 15 charecter!";
      return "";
    case "password":
      if (!value || value === "") return "Password is required!";
      if ((value as string).length < 6)
        return "Password must contain 6 charecters";
      if ((value as string).length > 16) return "Maximum 16 charecters!";
      return "";
    case "passwordLogin":
      if (!value || value === "") return "Password is required!";
      return "";
    case "required":
      if (!value || value === "") return "required!";
      return "";
    default:
      return "";
  }
};
