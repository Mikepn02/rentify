import { atom } from "recoil";


export const currentVideo = atom<string | null>({
    key: "currentVideo",
    default: null
})

export const currentImage = atom<string | null>({
    key: "currentImage",
    default: null
})

export const showModal = atom<boolean>({
    key: "showModal",
    default: false,
})
