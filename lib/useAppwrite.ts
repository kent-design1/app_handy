import {Account, Avatars, Client, Databases, ID} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform : "com.kentdzn.fast_food",
    databaseId : "6873aa1c002a7b91ffeb",
    userCollectionId : "6873aa49000b87e99576",
}




export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


export const account = new Account(client)
export const databases = new Databases(client)
const avatars = new Avatars(client)

export const createUser = async({email, password, name}:CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)

        if (!newAccount) throw Error

        await  signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountID: newAccount.$id,
                email, name, avatar : avatarUrl
            }
        )
    }catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async({email, password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    }catch (e) {
        throw new Error(e as string)
    }
}




// import { useCallback, useEffect, useState } from "react";
// import { Alert } from "react-native";
//
// interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
//     fn: (params: P) => Promise<T>;
//     params?: P;
//     skip?: boolean;
// }
//
// interface UseAppwriteReturn<T, P> {
//     data: T | null;
//     loading: boolean;
//     error: string | null;
//     refetch: (newParams?: P) => Promise<void>;
// }
//
// const useAppwrite = <T, P extends Record<string, string | number>>({
//                                                                        fn,
//                                                                        params = {} as P,
//                                                                        skip = false,
//                                                                    }: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState(!skip);
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchData = useCallback(
//         async (fetchParams: P) => {
//             setLoading(true);
//             setError(null);
//
//             try {
//                 const result = await fn({ ...fetchParams });
//                 setData(result);
//             } catch (err: unknown) {
//                 const errorMessage =
//                     err instanceof Error ? err.message : "An unknown error occurred";
//                 setError(errorMessage);
//                 Alert.alert("Error", errorMessage);
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [fn]
//     );
//
//     useEffect(() => {
//         if (!skip) {
//             fetchData(params);
//         }
//     }, []);
//
//     const refetch = async (newParams?: P) => await fetchData(newParams!);
//
//     return { data, loading, error, refetch };
// };
//
// export default useAppwrite;