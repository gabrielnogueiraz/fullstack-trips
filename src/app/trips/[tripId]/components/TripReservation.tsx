'use client'
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { differenceInDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'

interface TripReservationProps {
  tripId: string
  tripStartDate: Date,
  tripEndDate: Date,
  maxGuests: number,
  princePerDay: number
} 

interface TripReservationForm {
  guests: number,
  startDate: Date | null 
  endDate: Date | null 
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, princePerDay }: TripReservationProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    control,
    watch, 
    setError
  } = useForm<TripReservationForm>()

  const router = useRouter()

  const OnSubmit = async (data: TripReservationForm) => {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: Buffer.from(JSON.stringify({
        startDate: data.startDate,
        endDate: data.endDate,
        tripId
      }))
    })

    const res = await response.json()

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });

      return setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada.",
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }
    
    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`
    );
  }   

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  return (
      <div className="flex flex-col px-5">
        <div className="flex gap-4">
          <Controller 
            name="startDate"
            rules={{
              required: {
                value: true,
                message: "Data inicial é obrigatória."
              }
            }}
            control={control}
            render={({ field }) => 
              <DatePicker 
                className="w-full"
                placeholderText="Data de Início" 
                onChange={field.onChange}
                error={!!errors?.startDate}
                errorMessage={errors?.startDate?.message}
                selected={field.value}
                minDate={tripStartDate}
              />
            }
        />

          <Controller 
            name="endDate"
            rules={{
              required: {
                value: true,
                message: "Data final é obrigatória."
              }
            }}
            control={control}
            render={({ field }) => 
              <DatePicker 
                className="w-full"
                placeholderText="Data Final" 
                onChange={field.onChange}
                error={!!errors?.endDate}
                errorMessage={errors?.endDate?.message}
                selected={field.value}
                minDate={startDate ?? tripStartDate}
              />
            }
        />
      </div>  

        <Input {...register('guests', {
          required: {
            value: true,
            message: "Número de hóspedes obrigatório."
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que: ${maxGuests}`
          }
        })} 
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
          placeholder={`Número de hóspedes (max: ${maxGuests})`} 
          className="mt-4"
          type="number"
        /> 

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">
            {startDate && endDate ?  
            `R$${differenceInDays(endDate, startDate) * princePerDay ?? 1}`
            : 'R$0'}
          </p>
        </div>

        <div className="pb-10 border-b border-grayLighter w-full">
          <Button
            onClick={() => handleSubmit(OnSubmit)()} 
            className="mt-3 w-full">
            Reservar agora
          </Button>
        </div>
      </div>
  );
}

export default TripReservation;