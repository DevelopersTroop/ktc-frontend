import { InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Control, FieldPath } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

export type FieldValues = Record<string, any>;
// Define TextInputProps interface

export function TextInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    label,
    control,
    variant = 'primary',
    type,
    ...props
}: InputProps & {
    name?: TName;
    control?: Control<TFieldValues>;
    label?: string;
    variant?: 'primary' | 'secondary';
}) {
    const [show, setShow] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {

        if (type === 'password') {
            if (show) {
                setInputType('text')
            } else {
                setInputType('password')
            }
        }
    }, [show, type])
    return (
        <FormField
            render={({ field }) => {
                return (
                    <FormItem className={'w-full'}>
                        <div
                            className={cn(
                                variant === 'secondary' ? 'flex items-center' : '',
                                'w-full',
                            )}
                        >
                            {label ? (
                                <FormLabel className={cn('w-full max-w-fit mb-3 inline-block text-[#210203] font-normal text-[1.1rem]', props.className)}>
                                    {props.required ? <span>
                                        {label}{' '}
                                        <span className='text-primary'>*</span>
                                    </span> : label}
                                </FormLabel>
                            ) : (
                                ''
                            )}
                            <FormControl className={'w-full'}>
                                <div className='relative'>
                                    <Input className={cn('placeholder:text-base text-btext placeholder:text-muted h-14', props.className)} key={inputType} type={inputType} {...field} {...props} />

                                    {
                                        type === 'password' ? (
                                            <div onClick={() => {
                                                setShow(prev => !prev)
                                            }} className='absolute -translate-y-1/2 cursor-pointer right-3 top-1/2'>
                                                {
                                                    show ? <EyeClosed className='cursor-pointer text-gray-600' /> : <Eye className='cursor-pointer text-gray-600' />
                                                }
                                            </div>
                                        ) : ''
                                    }
                                </div>
                            </FormControl>
                        </div>
                        <FormMessage className='text-red-500' />
                    </FormItem>
                );
            }}
            name={name ?? '' as any}
            control={control}
        />
    );
}