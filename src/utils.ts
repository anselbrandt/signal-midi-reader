import fs from "fs/promises";

export const mkdirs = async (dirs: string[]) => {
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir);
      console.log("creating ", dir);
    } catch (error: any) {
      if (error.code !== "EEXIST") console.log(error);
    }
  }
};
