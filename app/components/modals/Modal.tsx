"use client"

import React, { Fragment } from 'react'
import { MdClose } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean,
  closeModal: () => void,
  title: string
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, closeModal, title }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full md:w-4/6 lg:w-3/6 xl:w-2/5 transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9" onClick={closeModal}>
                  <MdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal