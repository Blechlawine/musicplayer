import mm, { IAudioMetadata } from "music-metadata";
import { convertBuffersToBase64 } from "../utils/utils";

export default () => [
    {
        event: "readMetadata",
        handler: async (event: any, path: string): Promise<IAudioMetadata> => {
            let meta = await mm.parseFile(path);
            return convertBuffersToBase64(meta);
        },
    },
];
