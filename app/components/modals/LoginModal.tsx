import { RefObject, useImperativeHandle, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import axios from "axios"
import Button from '../Button'
import Modal from './Modal'
import InputField from '../inputs/InputField'
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

import { ModalRef } from '@/app/types'

interface LoginModalProps {
  loginModalRef: RefObject<ModalRef>
}
const DEFAULT_VALUES = { email: "", password: "" }

export default function LoginModal({ loginModalRef }: LoginModalProps) {

  let [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({ defaultValues: DEFAULT_VALUES })

  useImperativeHandle(loginModalRef, () => ({
    isOpen: (value: boolean) => setIsOpen(value)
  }))

  const closeModal = () => {
    setIsOpen(false)
    reset();
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        setIsLoading(false)
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          closeModal()
        }
        if (callback?.error) {
          toast.error(callback.error)
        }
      })

  }

  return (
    <Modal closeModal={closeModal} title="Login" isOpen={isOpen}>
      <div className="relative p-6">
        <h4 className="text-2xl font-bold">Welcome back!</h4>
        <p className="font-light text-neutral-500 mt-2 mb-4">Login to your account!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField id="email" label="Email" type="email" disabled={isLoading} errors={errors} required register={register} />
          <InputField id="password" type="password" label="Password" disabled={isLoading} errors={errors} required register={register} />
          <div className="flex flex-row items-center gap-4 w-full mt-6">
            {/* <Button isLoading={isLoading} variant="outline" onClick={closeModal} type="button">Cencal</Button> */}
            <Button type="submit" isLoading={isLoading}>Log in</Button>
          </div>
          <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button type="button" variant="outline" onClick={() => signIn("google")}>
              <FcGoogle size={24} />
              Continue with Google
            </Button>
            <Button type="button" variant="outline" onClick={() => signIn("github")}>
              <AiFillGithub size={24} />
              Continue with Github
            </Button>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <p className="font-light text-neutral-500">Alread have account?</p>
            <div className="text-neutral-800 cursor-pointer hover:underline"> Log in</div>
          </div>
        </form>
      </div>


    </Modal>
  )
}
