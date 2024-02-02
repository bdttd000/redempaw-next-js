const { createHash } = require("crypto");

const hash256 = (string: string): string => {
  return createHash("sha256").update(string).digest("hex");
};

export default hash256;
