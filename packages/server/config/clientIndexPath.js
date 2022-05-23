import { fileURLToPath } from "url";
import path, { dirname } from "path";

const clientIndexPath = () => {
  const currentPath = dirname(fileURLToPath(import.meta.url));
  let indexPath = path.join(currentPath, "../public/index.html");
  if (process.env === "production") {
    indexPath = path.join(currentPath, "../../public/dist/index.html");
  }

  return indexPath;
};

export default clientIndexPath;
