"use client"

import Select from "react-select"

import useCountries from '@hooks/useCountries'

export type CountrySelectValue = {
  flag: string
  value: string
  label: string
  region: string
  latlng: number[]
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {

  const { getAll } = useCountries()

  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex items-center gap-3">
          <div>{option.flag}</div>
          <p>{option.label}, <span className="text-neutral-500 ml-1">{option.region}</span></p>

        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg"
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6"
        }
      })} />
  )
}

export default CountrySelect