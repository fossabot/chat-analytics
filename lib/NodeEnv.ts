import fs from "fs";
import path from "path";

import { Env, LoadAssetFn } from "@pipeline/Env";
import { FileInput } from "@pipeline/File";

// Loads a file from disk and wraps it into our abstraction
export const loadFile = (filepath: string): FileInput => {
    const content = fs.readFileSync(filepath);
    const stats = fs.statSync(filepath);

    return {
        name: filepath,
        size: stats.size,
        lastModified: stats.mtimeMs,
        slice: async (start, end) => content.subarray(start, end),
    };
};

const loadAsset: LoadAssetFn = async (filepath: string, type: "json" | "text" | "arraybuffer") => {
    filepath = path.join(__dirname, "..", "assets", filepath);

    const content = fs.readFileSync(filepath);

    if (type === "text") return content.toString("utf-8");
    else if (type === "json") return JSON.parse(content.toString("utf-8"));
    else return content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength);
};

export const NodeEnv: Env = {
    loadAsset,
};