"use client"

import { useMemo, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"

import Modal from './Modal'
import Button from '@components/Button'
import InputField from '@inputs/InputField'
import useRentModal from '@hooks/useRentModal'
import { RENT_DEFAULT_VALUES, categories } from '@utils/index'
import CategoryInput from '@inputs/CategoryInput'
import CountrySelect from '@inputs/CountrySelect'
import dynamic from 'next/dynamic'

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
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FieldValues>({ defaultValues: RENT_DEFAULT_VALUES })

  const category = watch("category")
  const location = watch("location")

  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location])

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const closeModal = () => {
    rentModal.onClose()
  }

  let BodyContent = (
    <>
      <h4 className="text-2xl font-bold">Which of these best describes your place?</h4>
      <p className="font-light text-neutral-500 mt-2 mb-4">Pick a category</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1.5" id="scrollbar">
        {categories.map((item, index) => (
          <div key={index} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon} />
          </div>
        ))}
      </div>
    </>
  )

  if (step === STEPS.LOCATION) {
    BodyContent = (
      <>
        <h4 className="text-2xl font-bold">Where is your place located?</h4>
        <p className="font-light text-neutral-500 mt-2 mb-4">Help guests find you!</p>
        <div className="mt-8 flex flex-col gap-8">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      </>
    )
  }


  return (
    <Modal closeModal={closeModal} title="Airbnb your home!" isOpen={rentModal.isOpen}>
      <div className="relative p-6">
        {BodyContent}
        <div className="flex flex-row items-center gap-4 w-full mt-6">
          {step !== STEPS.CATEGORY && <Button variant="outline" type="button" onClick={onBack}>Back</Button>}
          <Button type="button" onClick={onNext}>{step === STEPS.PRICE ? "Create" : "Next"}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default RentModal

