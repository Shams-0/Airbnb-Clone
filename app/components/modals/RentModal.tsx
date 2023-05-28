"use client"

import { signIn } from 'next-auth/react'
import { useState } from 'react'

import axios from "axios"
import { toast } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from 'react-icons/ai'
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"

import Modal from './Modal'
import Button from '@components/Button'
import InputField from '@inputs/InputField'
import useRentModal from '@hooks/useRentModal'

const DEFAULT_VALUES = { name: "", email: "", password: "" }

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5

}

const RentModal = () => {

  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY)

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const closeModal = () => {
    rentModal.onClose()
  }

  return (
    <Modal closeModal={closeModal} title="Airbnb you home!" isOpen={rentModal.isOpen}>
      <div className="relative p-6">

      </div>
    </Modal>
  )
}

export default RentModal