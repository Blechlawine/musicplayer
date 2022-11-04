import mm, { IAudioMetadata } from "music-metadata";
import { convertBuffersToBase64 } from "../utils/utils";
import { ParametersWithoutFirst } from "../utils/helpers";

const filesApi = () => ({
    readMetadata: async (event: any, path: string): Promise<IAudioMetadata> => {
        let meta = await mm.parseFile(path);
        return convertBuffersToBase64(meta);
    },
});

export default filesApi;

export type TFilesApi = ReturnType<typeof filesApi>;
export type InferFilesApiOutput<T extends keyof TFilesApi> = ReturnType<TFilesApi[T]>;
export type InferFilesApiInput<T extends keyof TFilesApi> = ParametersWithoutFirst<TFilesApi[T]>;
