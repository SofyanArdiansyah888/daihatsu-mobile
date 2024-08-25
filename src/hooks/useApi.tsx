import {create, destroy, getDetail, getList, update} from "../lib/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {message} from "antd";


interface IGet {
    name: string;
    endpoint: string;
    params: object;
}


export function useGetList<T>({
                                  name,
                                  endpoint,
                                  params
                              }: IGet) {

    return useQuery<T>({
        queryKey: [name, params],
        queryFn: async ({queryKey}) => await getList(endpoint, queryKey[1]),
    });
}


interface IGetDetail extends Omit<IGet, "params"> {
    id: string
}

export function useGetDetail<T>({
                                    name,
                                    endpoint,
                                    id
                                }: IGetDetail) {

    return useQuery<T>({
        queryKey: [name, id],
        queryFn: async ({queryKey}) => await getDetail<T>(endpoint, queryKey[1] as string),
    });
}

interface IPOST {
    name: string;
    endpoint: string;
    onSuccess?: (result: any) => void,
    onError?: (error: Error) => void,
    successMessage?: string,
    errorMessage?: string
}


export function usePost({
                            name,
                            endpoint,
                            onError,
                            onSuccess,
                            successMessage,
                            errorMessage
                        }: IPOST) {
    const queryClient = useQueryClient()
    const emptyArray = [null, "", undefined];
    return useMutation({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: [name]
            })
            if (onSuccess) {
                onSuccess(data)
                return;
            }
            if (!emptyArray.includes(successMessage))
                message.success("Berhasil membuat data")
            else
                message.success(successMessage)
        },
        onError: async (error) => {

            if (onError) {
                onError(error)
                return
            }

            // JIKA INPUT INVALID
            // @ts-ignore
            if (error?.status === 422) {
                message.error(error.message);
                return;
            }

            if (!emptyArray.includes(errorMessage))
                message.error("Gagal membuat data")
            else
                message.error(errorMessage)
        },
        mutationFn: (data) => {
            return create(endpoint, data)
        },
    })
}

export function usePut({
                           name,
                           endpoint,
                           onError,
                           onSuccess,
                           successMessage,
                           errorMessage
                       }: IPOST) {
    const queryClient = useQueryClient()
    const emptyArray = [null, "", undefined];
    return useMutation({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: [name]
            })
            if (onSuccess) {
                onSuccess(data)
                return;
            }
            if (!emptyArray.includes(successMessage))
                message.success("Berhasil mengupdate data")
            else
                message.success(successMessage)
        },
        onError: async (error) => {

            if (onError) {
                onError(error)
                return
            }

            // JIKA INPUT INVALID
            // @ts-ignore
            if (error?.status === 422) {
                message.error(error.message);
                return;
            }

            if (!emptyArray.includes(errorMessage))
                message.error("Gagal mengupdate data")
            else
                message.error(errorMessage)
        },
        mutationFn: (data) => {
            return update(endpoint, data)
        },
    })
}


interface IExport extends IPOST {
    filename: string
}

export function useExport({
                              name,
                              endpoint,
                              onError,
                              onSuccess,
                              successMessage = "Berhasil mengexport data",
                              errorMessage = "Gagal mengexport data",
                              filename
                          }: IExport) {
    const queryClient = useQueryClient()
    return useMutation({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: [name]
            })

            const url = window.URL.createObjectURL(new Blob([data as BlobPart]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();

            message.success(successMessage)

            if (onSuccess) {
                onSuccess(data)
                return;
            }

        },
        onError: async (error) => {
            if (onError) {
                onError(error)
                return
            }
            message.error(errorMessage)

        },
        mutationFn: (data) => {
            return create(endpoint, data, 'blob')
        },
    })
}

export function useDelete({
                              name,
                              endpoint,
                              onSuccess,
                              onError,
                              errorMessage,
                              successMessage,
                          }: IPOST) {
    const queryClient = useQueryClient()
    const emptyArray = [null, "", undefined];
    return useMutation({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: [name]
            })
            if (onSuccess) {
                onSuccess(data)
                return;
            }
            if (!emptyArray.includes(successMessage))
                message.success("Berhasil menghapus data")
            else
                message.success(successMessage)
        },
        onError: async (error) => {

            if (onError) {
                onError(error)
                return
            }

            // JIKA INPUT INVALID
            // @ts-ignore
            if (error?.status === 422) {
                message.error(error.message);
                return;
            }

            if (!emptyArray.includes(errorMessage))
                message.error("Gagal menghapus data")
            else
                message.error(errorMessage)
        },
        mutationFn: (id: string) => {
            return destroy(id, endpoint)
        },
    })
}

