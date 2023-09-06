'use client'
import React from 'react'
import Input from '../Input'
import DatePicker from '../DatePicker'
import CurrencyInput from '../CurrencyInput'
import Button from '../Button'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface TripSearchForm {
  text: string,
  startDate: Date | null,
  budget: string
}

const TripSearch = () => {
  const router = useRouter()
  const { control, register, handleSubmit, formState: { errors } } = useForm<TripSearchForm>()

  const onSubmit = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`);
  }

  return(
    <div className='container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat md:h-80'>
      <h1 className='font-semibold text-2xl text-primaryDarker text-center md:mt-20'>
        Encontre sua próxima <span className='text-primary'>viagem!</span>
      </h1>

      <div className='flex flex-col gap-4 mt-5 md:flex-row'>
        <Input
          className='w-full'
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text", {
            required: {
              value: true,
              message: "Texto é obrigatório.",
            },
          })}
        />

        <div className="flex gap-4">
        <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker onChange={field.onChange} selected={field.value} placeholderText="Data Final" className="w-full md:w-72" minDate={new Date()} />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                className='md:w-72'
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button className='md:w-72' onClick={() => {handleSubmit(onSubmit)()}}>Buscar</Button>
      </div>
    </div>
  )
}

export default TripSearch