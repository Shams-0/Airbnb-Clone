import { create } from "zustand"
import { ModalStore } from "../types";


const useRegisterModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useRegisterModal;